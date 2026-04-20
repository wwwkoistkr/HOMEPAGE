/**
 * KOIST - HTML Sanitiser for Stored XSS Prevention
 *
 * Lightweight allowlist-based sanitiser suitable for Cloudflare Workers runtime.
 * No Node.js dependencies — uses regex-based tag/attribute filtering.
 */

// Allowed HTML tags (admin-managed rich content)
const ALLOWED_TAGS = new Set([
  // Block
  'p', 'br', 'hr', 'div', 'span', 'blockquote', 'pre', 'code',
  // Headings
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  // Lists
  'ul', 'ol', 'li',
  // Links & media
  'a', 'img',
  // Tables
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup', 'col',
  // Formatting
  'strong', 'b', 'em', 'i', 'u', 's', 'del', 'ins', 'sub', 'sup', 'small', 'mark',
  // Other
  'figure', 'figcaption', 'details', 'summary', 'abbr', 'cite', 'q', 'dfn', 'time',
  'address', 'section', 'article', 'aside', 'header', 'footer', 'nav', 'main',
]);

// Allowed attributes per tag (or '*' for all tags)
const ALLOWED_ATTRS: Record<string, Set<string>> = {
  '*': new Set(['class', 'id', 'style', 'title', 'lang', 'dir', 'data-*', 'role', 'aria-*', 'tabindex']),
  a: new Set(['href', 'target', 'rel', 'download']),
  img: new Set(['src', 'alt', 'width', 'height', 'loading', 'decoding', 'sizes', 'srcset']),
  td: new Set(['colspan', 'rowspan', 'headers']),
  th: new Set(['colspan', 'rowspan', 'scope', 'headers']),
  col: new Set(['span']),
  colgroup: new Set(['span']),
  ol: new Set(['start', 'type', 'reversed']),
  time: new Set(['datetime']),
  blockquote: new Set(['cite']),
  q: new Set(['cite']),
};

// Dangerous protocols in href/src
const DANGEROUS_PROTO_RE = /^\s*(javascript|vbscript|data\s*:(?!image\/(png|jpe?g|gif|webp|svg\+xml)))/i;

/**
 * Sanitise HTML by stripping disallowed tags and attributes.
 * Scripts, iframes, objects, embeds, forms, and event handlers are always removed.
 */
export function sanitizeHtml(dirty: string): string {
  if (!dirty) return '';

  let html = dirty;

  // 1. Remove dangerous tags entirely (including content)
  const STRIP_TAGS = ['script', 'style', 'iframe', 'object', 'embed', 'applet', 'form', 'input',
    'textarea', 'select', 'button', 'link', 'meta', 'base', 'noscript', 'template', 'slot'];
  for (const tag of STRIP_TAGS) {
    // Remove opening + content + closing
    html = html.replace(new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi'), '');
    // Remove self-closing / orphan opening tags
    html = html.replace(new RegExp(`<${tag}[^>]*/?>`, 'gi'), '');
  }

  // 2. Remove HTML comments
  html = html.replace(/<!--[\s\S]*?-->/g, '');

  // 3. Process remaining tags
  html = html.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)((?:\s+[^>]*)?)\s*\/?>/g, (match, tag, attrsStr) => {
    const lowerTag = tag.toLowerCase();

    // Closing tag
    if (match.startsWith('</')) {
      return ALLOWED_TAGS.has(lowerTag) ? `</${lowerTag}>` : '';
    }

    // Opening tag — check allowlist
    if (!ALLOWED_TAGS.has(lowerTag)) return '';

    // Parse and filter attributes
    const cleanAttrs = filterAttributes(lowerTag, attrsStr || '');
    const selfClose = match.endsWith('/>') ? ' /' : '';
    return `<${lowerTag}${cleanAttrs}${selfClose}>`;
  });

  return html;
}

function filterAttributes(tag: string, attrsStr: string): string {
  if (!attrsStr.trim()) return '';

  const globalAllowed = ALLOWED_ATTRS['*'] || new Set();
  const tagAllowed = ALLOWED_ATTRS[tag] || new Set();

  const result: string[] = [];

  // Match attribute patterns: name="value", name='value', name=value, name (boolean)
  const attrRe = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  let m: RegExpExecArray | null;

  while ((m = attrRe.exec(attrsStr)) !== null) {
    const attrName = m[1].toLowerCase();
    const attrValue = m[2] ?? m[3] ?? m[4] ?? '';

    // Always block event handlers
    if (attrName.startsWith('on')) continue;

    // Check if attribute is allowed
    const isAllowed = isAttrAllowed(attrName, globalAllowed) || isAttrAllowed(attrName, tagAllowed);
    if (!isAllowed) continue;

    // Validate href/src against dangerous protocols
    if ((attrName === 'href' || attrName === 'src') && DANGEROUS_PROTO_RE.test(attrValue)) {
      continue;
    }

    // Force target="_blank" links to have rel="noopener noreferrer"
    if (attrName === 'target' && attrValue === '_blank') {
      result.push(`target="_blank"`);
      // We'll add rel separately
      continue;
    }

    result.push(`${attrName}="${escapeAttr(attrValue)}"`);
  }

  // If target="_blank" was added, ensure rel="noopener noreferrer"
  if (result.some(a => a.startsWith('target="_blank"')) && !result.some(a => a.startsWith('rel='))) {
    result.push('rel="noopener noreferrer"');
  }

  return result.length > 0 ? ' ' + result.join(' ') : '';
}

function isAttrAllowed(name: string, allowed: Set<string>): boolean {
  if (allowed.has(name)) return true;
  // Wildcard patterns like 'data-*' and 'aria-*'
  for (const pattern of allowed) {
    if (pattern.endsWith('*') && name.startsWith(pattern.slice(0, -1))) return true;
  }
  return false;
}

/**
 * Escape all HTML (for user-generated text that should NOT contain any HTML)
 * v39.0: null/undefined/\uc22b\uc790/\uac1d\uccb4 \uc548\uc804 \ucc98\ub9ac
 */
export function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) return '';
  const s = typeof str === 'string' ? str : String(str);
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * v39.0: HTML \uc18d\uc131(attribute) \uc804\uc6a9 \uc774\uc2a4\ucf00\uc774\ud504
 * \ubc31\ud2f1(`), \uacf5\ubc31 \ub4f1 \uc18d\uc131 \ud0c8\ucd9c \ubb38\uc790\ub3c4 \ucc28\ub2e8
 */
export function escapeAttr(str: unknown): string {
  if (str === null || str === undefined) return '';
  const s = typeof str === 'string' ? str : String(str);
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/`/g, '&#096;');
}

/**
 * v39.0: URL \uc774\uc2a4\ucf00\uc774\ud504 + \uc704\ud5d8 \ud504\ub85c\ud1a0\ucf5c \ucc28\ub2e8
 */
export function safeUrl(url: unknown): string {
  if (url === null || url === undefined) return '';
  const s = (typeof url === 'string' ? url : String(url)).trim();
  if (!s) return '';
  const normalized = s.toLowerCase().replace(/[\s\u0000-\u001f\u007f]/g, '');
  if (
    normalized.startsWith('javascript:') ||
    normalized.startsWith('vbscript:') ||
    normalized.startsWith('data:text/html') ||
    normalized.startsWith('data:text/javascript') ||
    normalized.startsWith('data:application/javascript')
  ) {
    return '';
  }
  return escapeAttr(s);
}

/**
 * v39.0: CSS \uac12 \uc548\uc804 \ucc98\ub9ac - CSS \uc778\uc81d\uc158 \ubc29\uc9c0
 */
export function safeCss(value: unknown): string {
  if (value === null || value === undefined) return '';
  const s = typeof value === 'string' ? value : String(value);
  return s
    .replace(/[<>"'`\\]/g, '')
    .replace(/[{}]/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '')
    .replace(/expression\s*\(/gi, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/url\s*\(/gi, '')
    .replace(/@import/gi, '')
    .replace(/@charset/gi, '')
    .trim();
}

/**
 * v39.0: \uc9dc\ub978 CSS \uc0c9\uc0c1 \uac12 \ud5c8\uc6a9 (hex, rgb(), rgba(), \ubbf8\ub9ac \uc815\uc758\ub41c \uc774\ub984 \ub4f1)
 */
export function safeColor(value: unknown): string {
  if (value === null || value === undefined) return '';
  const s = (typeof value === 'string' ? value : String(value)).trim();
  // hex(#abc, #aabbcc, #aabbccdd), rgb(), rgba(), hsl(), hsla(), \ub2e8\uc21c \uc0c9\uc774\ub984
  if (/^#[0-9a-fA-F]{3,8}$/.test(s)) return s;
  if (/^rgba?\(\s*[\d.,\s%]+\s*\)$/.test(s)) return s;
  if (/^hsla?\(\s*[\d.,\s%deg]+\s*\)$/.test(s)) return s;
  if (/^[a-zA-Z]+$/.test(s) && s.length < 30) return s;
  return '';
}

/**
 * v39.0: FontAwesome icon class \uac80\uc99d (fa-\ud504\ub9ac\ud53d\uc2a4 + \uc601\uc22b\uc790/\ud558\uc774\ud508)
 */
export function safeFaIcon(value: unknown): string {
  if (value === null || value === undefined) return '';
  const s = (typeof value === 'string' ? value : String(value)).trim();
  return /^fa-[a-z0-9\-]+$/i.test(s) ? s : '';
}
