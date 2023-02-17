import Script from 'next/script';

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-ZD3BELKQE2`}
      />

      <Script id="ga-tracking" strategy="lazyOnload">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', G-ZD3BELKQE2, {
      page_path: window.location.pathname,
      });`}</Script>
    </>
  );
};

export default GoogleAnalytics;
