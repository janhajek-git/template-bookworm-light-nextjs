import config from "@config/config.json";
import theme from "@config/theme.json";
import { JsonContext } from "context/state";
import Head from "next/head";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import "styles/style.scss";

const App = ({ Component, pageProps }) => {
  // google tag manager (gtm)
  const tagManagerArgs = {
    gtmId: config.params.tag_manager_id,
  };
  useEffect(() => {
    setTimeout(() => {
      config.params.tag_manager_id && TagManager.initialize(tagManagerArgs);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <JsonContext>
      <Head>
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </Head>
      <Component {...pageProps} />
    </JsonContext>
  );
};

export default App;
