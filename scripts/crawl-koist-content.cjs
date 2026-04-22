#!/usr/bin/env node
/**
 * KOIST v39.6 — Original koist.kr content crawler
 *
 * Purpose: Fetch 27 sub-pages from koist.kr, extract #sh_content region,
 *          transform dl.dl_cm/dt/dd → section/h3/ul (sanitizer-compatible),
 *          rewrite image URLs to /api/images/legacy/* proxy,
 *          emit JSON keyed by {deptSlug}/{pageSlug}.
 *
 * Usage: node scripts/crawl-koist-content.cjs
 * Output: /tmp/koist_crawl/migrated_content.json
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const URL_MAP = {
  cc: {
    overview:   'http://www.koist.kr/cc/summary',
    apply:      'http://www.koist.kr/cc/application',
    consulting: 'http://www.koist.kr/cc/consulting',
    progress:   'http://www.koist.kr/cc_progress',
  },
  'security-test': {
    overview: 'http://www.koist.kr/test1/summary',
    apply:    'http://www.koist.kr/test1/application',
    progress: 'http://www.koist.kr/test1_progress',
  },
  kcmvp: {
    overview: 'http://www.koist.kr/cryptomodtest/overview',
    apply:    'http://www.koist.kr/cryptomodtest/howto',
    // progress: original site uses a dynamic validation-search page (no static content)
  },
  performance: {
    overview:  'http://www.koist.kr/test2/summary',
    procedure: 'http://www.koist.kr/test2/application',
    progress:  'http://www.koist.kr/test2_progress',
  },
  certificate: {
    overview: 'http://www.koist.kr/test3/page01',
    rnd:      'http://www.koist.kr/test3/page02',
    ai:       'http://www.koist.kr/test3/page03',
    network:  'http://www.koist.kr/test3/page04',
  },
  diagnosis: {
    readiness:       'http://www.koist.kr/test4/page01',
    ddos:            'http://www.koist.kr/test4/page02',
    'security-perf': 'http://www.koist.kr/test4/page03',
    vulnerability:   'http://www.koist.kr/test4/page04',
    weakness:        'http://www.koist.kr/test4/page05',
  },
  consulting: {
    cc:       'http://www.koist.kr/consulting/cc',
    kcmvp:    'http://www.koist.kr/consulting/vcm',
    'isms-p': 'http://www.koist.kr/consulting/isms_p',
  },
  'enterprise-security': {
    info: 'http://www.koist.kr/indsecconsult/info',
  },
  readiness: {
    overview: 'http://www.koist.kr/readiness/info',
  },
};

const OUT_DIR = '/tmp/koist_crawl';
const OUT_FILE = path.join(OUT_DIR, 'migrated_content.json');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ────────── HTTP fetch (Node.js builtin http, follow 302 once) ──────────
function fetchHtml(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, { timeout: 15000, headers: {
      'User-Agent': 'Mozilla/5.0 (KOIST-Migration-Bot/1.0)',
      'Accept': 'text/html,*/*;q=0.8',
    }}, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && redirects < 3) {
        const loc = res.headers.location;
        return resolve(fetchHtml(loc.startsWith('http') ? loc : new URL(loc, url).href, redirects + 1));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      let buf = [];
      res.on('data', (c) => buf.push(c));
      res.on('end', () => resolve(Buffer.concat(buf).toString('utf-8')));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

// ────────── Extract #sh_content region ──────────
function extractShContent(html) {
  // Find opening <div id="sh_content"
  const openMatch = /<div[^>]*id=["']sh_content["'][^>]*>/i.exec(html);
  if (!openMatch) return null;
  const start = openMatch.index + openMatch[0].length;
  // Ends before #fix_tel or </body>
  let end = html.indexOf('id="fix_tel"');
  if (end < 0) end = html.indexOf("id='fix_tel'");
  if (end < 0) end = html.indexOf('<!-- sh_content');
  if (end < 0) end = html.indexOf('</body>');
  if (end < 0) end = html.length;
  // walk back to the previous '<'
  const backIdx = html.lastIndexOf('<', end);
  return html.slice(start, backIdx > start ? backIdx : end);
}

// ────────── Utility: decode HTML entities (minimal) ──────────
function unescape(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

// ────────── Transform original HTML to sanitizer-compatible HTML ──────────
function transform(rawContent, pageUrl) {
  let html = rawContent;

  // 1) Remove <!-- comments -->
  html = html.replace(/<!--[\s\S]*?-->/g, '');

  // 2) Drop the tit_cm block (page header redundancy)
  html = html.replace(/<div[^>]*class=["'][^"']*tit_cm[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, '');

  // 3) Drop the cs_cm block (contact redundancy — KOIST page already shows CTA)
  html = html.replace(/<div[^>]*class=["'][^"']*cs_cm[^"']*["'][^>]*>[\s\S]*?<\/div>\s*(?=<\/div>|$)/gi, '');
  // fallback simpler (greedy)
  html = html.replace(/<div[^>]*class=["'][^"']*cs_cm[^"']*["'][^>]*>[\s\S]*?(?=<\/div>\s*<\/div>|<\/div>\s*$)/gi, '');

  // 4) Remove outer wrapper <div class="pagecommon" id="pXX"> ... but preserve children
  html = html.replace(/<div[^>]*class=["'][^"']*pagecommon[^"']*["'][^>]*>/gi, '');

  // 5a) Convert numbered lists (dl.num_dl_cm) — BEFORE dl.dl_cm (more specific first)
  //     Structure: <dl class="num_dl_cm"> (<dt>title</dt>)? (<dd><span>N</span>text</dd>)+ </dl>
  html = html.replace(/<dl[^>]*class=["'][^"']*num_dl_cm[^"']*["'][^>]*>([\s\S]*?)<\/dl>/gi, (m, inner) => {
    // Collect dt titles (may be multiple — join) and dd items
    const dts = Array.from(inner.matchAll(/<dt[^>]*>([\s\S]*?)<\/dt>/gi)).map(x => x[1].trim());
    const dds = Array.from(inner.matchAll(/<dd[^>]*>([\s\S]*?)<\/dd>/gi)).map(x => x[1].trim());
    const title = dts.length ? dts.join(' / ') : '';
    // Each dd becomes a numbered step. <span>N</span> prefix → clean "<strong>N.</strong> text"
    const steps = dds.map(body => {
      const numMatch = /<span[^>]*>(\d+)<\/span>/i.exec(body);
      const num = numMatch ? numMatch[1] : '';
      const text = body.replace(/<span[^>]*>\d+<\/span>/i, '').trim();
      return `<li class="service-step">${num ? `<strong class="service-step-num">${num}.</strong> ` : ''}${text}</li>`;
    }).join('\n    ');
    return `<section class="service-section" data-koist-block="section-numbered">
  ${title ? `<h3 class="service-section-title">${title}</h3>` : ''}
  <ol class="service-steps">
    ${steps}
  </ol>
</section>`;
  });

  // 5b) Convert dl.dl_cm + dt + dd into <section><h3><content></section>
  const dlRegex = /<dl[^>]*class=["'][^"']*dl_cm[^"']*["'][^>]*>([\s\S]*?)<\/dl>/gi;
  html = html.replace(dlRegex, (m, inner) => {
    const dtMatch = /<dt[^>]*>([\s\S]*?)<\/dt>/i.exec(inner);
    const ddMatch = /<dd[^>]*>([\s\S]*?)<\/dd>/i.exec(inner);
    const title = dtMatch ? dtMatch[1].trim() : '';
    const body = ddMatch ? ddMatch[1].trim() : '';
    return `<section class="service-section" data-koist-block="section">
  <h3 class="service-section-title">${title}</h3>
  <div class="service-section-body">${body}</div>
</section>`;
  });

  // 6) Rewrite ul.ul_dot_cm → ul.service-bullets
  html = html.replace(/<ul[^>]*class=["'][^"']*ul_dot_cm[^"']*["'][^>]*>/gi,
    '<ul class="service-bullets">');

  // 7) Rewrite img_box / img_wrap → figure.service-image
  html = html.replace(/<div[^>]*class=["'][^"']*img_box[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi,
    '<figure class="service-image">$1</figure>');
  html = html.replace(/<div[^>]*class=["'][^"']*img_wrap[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi,
    '<figure class="service-image">$1</figure>');

  // 8) Rewrite <img src="...">  — all legacy to HTTPS proxy
  html = html.replace(/<img([^>]*?)src=["']([^"']+)["']([^>]*?)\/?>/gi, (m, pre, src, post) => {
    let finalSrc = src.trim();
    // Resolve relative URL
    if (finalSrc.startsWith('//')) {
      finalSrc = 'http:' + finalSrc;
    } else if (finalSrc.startsWith('/')) {
      finalSrc = 'http://www.koist.kr' + finalSrc;
    } else if (!finalSrc.startsWith('http')) {
      // relative to pageUrl
      try {
        finalSrc = new URL(finalSrc, pageUrl).href;
      } catch {
        // keep as-is
      }
    }
    // Only proxy if it's a koist.kr URL
    if (/koist\.kr/i.test(finalSrc)) {
      const pathOnly = finalSrc.replace(/^https?:\/\/[^/]+\//i, '');
      finalSrc = '/api/images/legacy/' + pathOnly;
    }
    // Extract alt attribute if present; strip onX handlers & trailing slash
    const cleanPre = pre.replace(/\s*on\w+=["'][^"']*["']/gi, '').replace(/\/+$/, '').trim();
    const cleanPost = post.replace(/\s*on\w+=["'][^"']*["']/gi, '').replace(/\/+$/, '').trim();
    const allAttrs = [cleanPre, cleanPost].filter(Boolean).join(' ');
    return `<img src="${finalSrc}" ${allAttrs} loading="lazy" decoding="async">`.replace(/\s+/g, ' ').replace(/\s>/, '>');
  });

  // 9) Normalize whitespace (preserve structure)
  html = html.replace(/\r\n/g, '\n')
             .replace(/\t/g, ' ')
             .replace(/\n{3,}/g, '\n\n');

  // 10) Drop trailing unmatched </div> tags (leftover from wrapper removal in steps 2-4)
  //     We counted how many <div> we removed without closing; strip same number from end.
  //     Simple heuristic: iteratively trim trailing whitespace + </div>
  html = html.replace(/(?:\s*<\/div>\s*)+$/g, '').trim();

  // 11) Collapse excessive blank lines & trim
  html = html.replace(/\n{3,}/g, '\n\n').replace(/[ \t]+$/gm, '').trim();

  return html;
}

// ────────── Main ──────────
(async () => {
  const results = {};
  let total = 0, success = 0, failed = 0;
  const failures = [];

  for (const deptSlug of Object.keys(URL_MAP)) {
    results[deptSlug] = {};
    for (const pageSlug of Object.keys(URL_MAP[deptSlug])) {
      const url = URL_MAP[deptSlug][pageSlug];
      total++;
      try {
        process.stdout.write(`[${total.toString().padStart(2)}] ${deptSlug}/${pageSlug} ← ${url} ... `);
        const html = await fetchHtml(url);
        const content = extractShContent(html);
        if (!content) throw new Error('sh_content not found');
        const transformed = transform(content, url);
        if (transformed.length < 100) throw new Error(`too short: ${transformed.length}`);
        // Count quality markers
        const sections = (transformed.match(/<section\b/g) || []).length;
        const lists = (transformed.match(/<ul\b/g) || []).length;
        const imgs = (transformed.match(/<img\b/g) || []).length;
        results[deptSlug][pageSlug] = {
          url,
          content: transformed,
          length: transformed.length,
          sections, lists, imgs,
        };
        success++;
        console.log(`OK (${transformed.length}B, ${sections}sec, ${lists}ul, ${imgs}img)`);
      } catch (err) {
        failed++;
        failures.push({ deptSlug, pageSlug, url, error: err.message });
        console.log(`FAIL: ${err.message}`);
      }
    }
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(results, null, 2), 'utf-8');
  console.log('');
  console.log('=== CRAWL SUMMARY ===');
  console.log(`Total: ${total}, Success: ${success}, Failed: ${failed}`);
  console.log(`Output: ${OUT_FILE}`);
  if (failures.length) {
    console.log('Failures:');
    failures.forEach(f => console.log(`  - ${f.deptSlug}/${f.pageSlug}: ${f.error}`));
  }
  process.exit(failed > 0 && failed === total ? 1 : 0);
})().catch(err => { console.error('FATAL:', err); process.exit(2); });
