import { html } from 'htm/preact'
import { render } from 'preact-render-to-string'

export default function defaultRootLayout ({
  vars: {
    title,
    siteName = 'TopBun',
    basePath,
    googleSiteVerification
  },
  scripts,
  styles,
  children,
  /* pages */
  /* page */
}) {
  return /* html */`
    <!DOCTYPE html>
    <html>
      ${render(html`
        <head>
          <meta charset="utf-8" />
          <title>${title ? `${title}` : ''}${title && siteName ? ' | ' : ''}${siteName}</title>
          <meta name="google-site-verification" content="${googleSiteVerification}" />
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          ${scripts
            ? scripts.map(script => html`<script type='module' src="${script.startsWith('/') ? `${basePath ?? ''}${script}` : script}" />`)
            : null}
          ${styles
            ? styles.map(style => html`<link rel="stylesheet" href="${style.startsWith('/') ? `${basePath ?? ''}${style}` : style}" />`)
            : null}
        </head>
      `)}
      ${render(html`
        <body>
            <header class="top-nav">
                <nav id="#top">
                    <a href="#contact">Elena Comnes</a>
                    <div>Personal Stylist</div>
                </nav>
            </header>
            ${typeof children === 'string'
                ? html`<section class="main-content" dangerouslySetInnerHTML="${{ __html: children }}"/>`
                : html`<section class="main-content">${children}</section>`
            }
            <footer class="footer">
              <p>© 2025 Elena Comnes</p>
            </footer>
        </body>
      `)}
    </html>
  `
}
