import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        {/* DNS Prefetch for external resources - establishes early connections */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Preconnect to critical domains for faster resource loading */}
        {/* Performs DNS lookup, TCP handshake, and TLS negotiation early */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />

        {/* RSS feed autodiscovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Grizzlybit — Zubair Ahmed Blog"
          href="/rss.xml"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.querySelectorAll('style[data-next-hide-fouc]').forEach(function(e){e.remove();});document.body.style.display='';}catch(e){}})();`,
          }}
        />
      </body>
    </Html>
  );
}
