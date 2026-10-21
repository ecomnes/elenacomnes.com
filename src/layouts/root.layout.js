import { html, raw, render } from 'fragtml'

export default function defaultRootLayout ({
  vars: {
    title,
    siteName = 'elenacomnes.com',
    basePath,
    googleSiteVerification
  },
  scripts,
  styles,
  children
}) {
  return render(html`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="color-scheme" content="light dark" />
        <title>${title ? `${title}` : ''}${title && siteName ? ' | ' : ''}${siteName}</title>
        ${googleSiteVerification != null
          ? html`<meta name="google-site-verification" content="${googleSiteVerification}" />`
          : html`<meta name="google-site-verification" />`}
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="QUhmuXWPfQfZDv/AUK4d1Q" async></script>
        <meta name="viewport" content="width=device-width, user-scalable=no" />

        ${scripts?.map(script => html`<script type="module" src="${script.startsWith('/') ? `${basePath ?? ''}${script}` : script}"></script>`)}
        ${styles?.map(style => html`<link rel="stylesheet" href="${style.startsWith('/') ? `${basePath ?? ''}${style}` : style}" />`)}
      </head>
      <body>
        <header class="top-nav">
          <nav id="#top">
            <a href="#contact">Elena Comnes</a>
            <div>Personal Stylist</div>
          </nav>
        </header>
        <section class="main-content">${typeof children === 'string' ? raw(children) : children}</section>
        <footer class="footer">
          <p>© 2025 Elena Comnes</p>
        </footer>
      </body>
    </html>
  `)
}
