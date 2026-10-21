import assert from 'node:assert/strict'
import test from 'node:test'
import { html } from 'fragtml'
import layout from '../src/layouts/root.layout.js'

test('renders trusted page HTML and nested fragtml templates', () => {
  for (const children of ['<p>Page content</p>', html`<p>Page content</p>`]) {
    const output = layout({ vars: {}, children })
    assert.match(output, /<section class="main-content"><p>Page content<\/p><\/section>/)
    assert.match(output, /<title>elenacomnes.com<\/title>/)
    assert.doesNotMatch(output, /undefined|null|dangerouslySetInnerHTML/)
  }
})

test('escapes metadata instead of treating it as markup', () => {
  const output = layout({
    vars: { title: '<em>Title</em>', siteName: 'A & B', googleSiteVerification: '"<token>' }
  })
  assert.match(output, /<title>&lt;em&gt;Title&lt;\/em&gt; \| A &amp; B<\/title>/)
  assert.match(output, /content="&quot;&lt;token&gt;"/)
})

test('prefixes root-relative assets, escapes URLs, and closes scripts', () => {
  const output = layout({
    vars: { basePath: '/portfolio' },
    scripts: ['/client.js?a=1&b=2', './local.js', 'https://example.com/app.js'],
    styles: ['/global.css', './page.css']
  })
  assert.match(output, /src="\/portfolio\/client.js\?a=1&amp;b=2"><\/script>/)
  assert.match(output, /src="\.\/local.js"><\/script>/)
  assert.match(output, /src="https:\/\/example.com\/app.js"><\/script>/)
  assert.match(output, /href="\/portfolio\/global.css"/)
  assert.match(output, /href="\.\/page.css"/)
  assert.doesNotMatch(output, /<script[^>]*\/>/)
})
