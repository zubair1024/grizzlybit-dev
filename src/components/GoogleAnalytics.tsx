const GoogleAnalytics = () => {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-ZD3BELKQE2`}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-ZD3BELKQE2', { 'send_page_view': true });
            `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
