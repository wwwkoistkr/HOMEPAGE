/**
 * XSS Sanitisation Unit Tests
 *
 * Run: npx tsx src/__tests__/xss.test.ts
 */
import { sanitizeHtml, escapeHtml } from '../utils/sanitize';

let passed = 0;
let failed = 0;

function assert(desc: string, actual: string | boolean, expected: string | boolean) {
  const a = String(actual);
  const e = String(expected);
  if (a === e) {
    console.log(`  PASS: ${desc}`);
    passed++;
  } else {
    console.error(`  FAIL: ${desc}`);
    console.error(`    Expected: ${JSON.stringify(e)}`);
    console.error(`    Actual  : ${JSON.stringify(a)}`);
    failed++;
  }
}

function assertNoMatch(desc: string, actual: string, forbidden: RegExp) {
  if (!forbidden.test(actual)) {
    console.log(`  PASS: ${desc}`);
    passed++;
  } else {
    console.error(`  FAIL: ${desc}`);
    console.error(`    Output should NOT match: ${forbidden}`);
    console.error(`    Actual: ${JSON.stringify(actual)}`);
    failed++;
  }
}

// ── escapeHtml ──
console.log('\n=== escapeHtml ===');
assert('escapes <script>', escapeHtml('<script>alert(1)</script>'), '&lt;script&gt;alert(1)&lt;/script&gt;');
assert('escapes quotes', escapeHtml('a "b" & c\'d'), 'a &quot;b&quot; &amp; c&#039;d');
assert('preserves normal text', escapeHtml('Hello World'), 'Hello World');

// ── sanitizeHtml: script removal ──
console.log('\n=== sanitizeHtml: Script Removal ===');
assertNoMatch('removes <script> tags', sanitizeHtml('<p>Hello</p><script>alert("xss")</script>'), /<script/i);
assertNoMatch('removes <script> with src', sanitizeHtml('<script src="evil.js"></script>'), /<script/i);
assertNoMatch('removes nested scripts', sanitizeHtml('<div><script>document.cookie</script></div>'), /script/i);

// ── sanitizeHtml: event handlers ──
console.log('\n=== sanitizeHtml: Event Handler Removal ===');
assertNoMatch('removes onclick', sanitizeHtml('<p onclick="alert(1)">click</p>'), /onclick/i);
assertNoMatch('removes onerror on img', sanitizeHtml('<img src=x onerror="alert(1)">'), /onerror/i);
assertNoMatch('removes onload', sanitizeHtml('<body onload="alert(1)">test</body>'), /onload/i);
assertNoMatch('removes onmouseover', sanitizeHtml('<div onmouseover="alert(1)">hover</div>'), /onmouseover/i);

// ── sanitizeHtml: dangerous tags ──
console.log('\n=== sanitizeHtml: Dangerous Tag Removal ===');
assertNoMatch('removes <iframe>', sanitizeHtml('<iframe src="evil.html"></iframe>'), /<iframe/i);
assertNoMatch('removes <object>', sanitizeHtml('<object data="malware.swf"></object>'), /<object/i);
assertNoMatch('removes <embed>', sanitizeHtml('<embed src="flash.swf">'), /<embed/i);
assertNoMatch('removes <form>', sanitizeHtml('<form action="/steal"><input></form>'), /<form/i);
assertNoMatch('removes <style>', sanitizeHtml('<style>body{display:none}</style>'), /<style/i);

// ── sanitizeHtml: javascript: protocol ──
console.log('\n=== sanitizeHtml: Protocol Blocking ===');
assertNoMatch('blocks javascript: in href', sanitizeHtml('<a href="javascript:alert(1)">click</a>'), /javascript/i);
assertNoMatch('blocks vbscript: in href', sanitizeHtml('<a href="vbscript:msgbox(1)">click</a>'), /vbscript/i);

// ── sanitizeHtml: allowed tags preserved ──
console.log('\n=== sanitizeHtml: Allowed Content ===');
const cleanHtml = sanitizeHtml('<h2>Title</h2><p>Hello <strong>world</strong></p><a href="https://example.com" target="_blank">link</a>');
assert('preserves h2', cleanHtml.includes('<h2>'), true.toString());
assert('preserves p', cleanHtml.includes('<p>'), true.toString());
assert('preserves strong', cleanHtml.includes('<strong>'), true.toString());
assert('preserves safe link', cleanHtml.includes('href="https://example.com"'), true.toString());
assert('adds rel=noopener', cleanHtml.includes('rel="noopener noreferrer"'), true.toString());

// ── sanitizeHtml: img with srcset ──
console.log('\n=== sanitizeHtml: Image Handling ===');
const imgHtml = sanitizeHtml('<img src="/static/logo.png" alt="Logo" width="100" loading="lazy">');
assert('preserves img src', imgHtml.includes('src="/static/logo.png"'), true.toString());
assert('preserves img alt', imgHtml.includes('alt="Logo"'), true.toString());
assert('preserves img width', imgHtml.includes('width="100"'), true.toString());

// ── sanitizeHtml: table preserved ──
console.log('\n=== sanitizeHtml: Table Handling ===');
const tableHtml = sanitizeHtml('<table><thead><tr><th>Col</th></tr></thead><tbody><tr><td>Data</td></tr></tbody></table>');
assert('preserves table', tableHtml.includes('<table>'), true.toString());
assert('preserves th', tableHtml.includes('<th>'), true.toString());
assert('preserves td', tableHtml.includes('<td>'), true.toString());

// ── sanitizeHtml: empty / null ──
console.log('\n=== sanitizeHtml: Edge Cases ===');
assert('handles empty string', sanitizeHtml(''), '');
assert('handles plain text', sanitizeHtml('Just plain text'), 'Just plain text');

// ── sanitizeHtml: HTML comments ──
assertNoMatch('removes HTML comments', sanitizeHtml('<!-- comment --><p>visible</p>'), /<!--/);

// ── Results ──
console.log(`\n${'='.repeat(40)}`);
console.log(`Results: ${passed} passed, ${failed} failed, ${passed + failed} total`);
if (failed > 0) process.exit(1);
