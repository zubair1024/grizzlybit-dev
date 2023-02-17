import defaultTags from 'data/defaultTags';
import Script from 'next/script';

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${defaultTags.GA_TRACKING_CODE}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', ${defaultTags.GA_TRACKING_CODE});
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
