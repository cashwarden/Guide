export default {
  github: 'https://github.com/cashwarden',
  docsRepositoryBase: 'https://github.com/cashwarden/guide',
  titleSuffix: ' – CashWarden',
  logo: (
    <>
      <span className="mr-2 font-extrabold hidden md:inline">CashWarden</span>
      <span className="text-gray-600 font-normal hidden md:inline">
        使用指南
      </span>
    </>
  ),
  head: (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content="CashWarden: 一款开源的资产管理系统" />
      <meta
        name="og:description"
        content="CashWarden: 一款开源的资产管理系统"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:image"
        content="https://blog-1251237404.cos.ap-guangzhou.myqcloud.com/20211018mFoYxP.png"
      />
      <meta name="twitter:site:domain" content="cashwarden.com" />
      <meta name="twitter:url" content="https://cashwarden.com/" />
      <meta name="og:title" content="CashWarden: 一款开源的资产管理系统" />
      <meta
        name="og:image"
        content="https://blog-1251237404.cos.ap-guangzhou.myqcloud.com/20211018mFoYxP.png"
      />
      <meta name="apple-mobile-web-app-title" content="CashWarden" />
      <link rel="apple-touch-icon" sizes="152x152" href="/favicon.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="120x120"
        href="/favicon-120x120.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="60x60"
        href="/favicon-60x60.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="76x76"
        href="/favicon-76x76.png"
      />
    </>
  ),
  search: true,
  prevLinks: true,
  nextLinks: true,
  footer: true,
  footerEditLink: 'Edit this page on GitHub',
  footerText: <>MIT {new Date().getFullYear()} © Nextra.</>,
  unstable_faviconGlyph: '👋',
}
