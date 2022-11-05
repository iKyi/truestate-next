import type { AppProps } from "next/app";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";
import { EmotionCache } from "@emotion/cache";
import App from "next/app";
import Head from "next/head";
import { fetchAPI } from "../lib/api";
import { createContext, useEffect, useState } from "react";
import { getStrapiMedia } from "../lib/media";
import { TruestateThemeProvder } from "../lib/theme";
import client from "../lib/apolloClient";
import { gql } from "@apollo/client";

const getGlobalData = async () => {
  try {
    const response = await client.query({
      query: gql`
        query getGlobal {
          global {
            data {
              attributes {
                siteName
                logo {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                seo {
                  metaTitle
                  metaDescription
                }
                socialLinks {
                  linkedin
                  facebook
                  instagram
                }
                favicon {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      `,
    });
    return response.data?.global?.data?.attributes;
  } catch (err) {
    console.log(err);
  }
};

export type ExtendedAppProps = AppProps & {
  emotionCache: EmotionCache;
};

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface ILangContext {
  langValue: string;
  toggleLang: any;
}

export const LanguageContext = createContext<ILangContext>({
  langValue: "ro",
  toggleLang: null,
});

// Store Strapi Global object in context
export const GlobalContext = createContext<Record<any, any>>({});

const MyApp = (props: ExtendedAppProps) => {
  const [language, setLanguage] = useState("ro");

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { global } = pageProps;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const initValue = localStorage.getItem("lang");
      if (initValue && ["ro", "en"].includes(initValue)) {
        setLanguage(initValue);
      }
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ ...global }}>
      <LanguageContext.Provider
        value={{
          langValue: language,
          toggleLang: () => {
            const newValue = language === "ro" ? "en" : "ro";
            setLanguage(newValue);
            if (typeof window !== "undefined") {
              localStorage.setItem("lang", newValue);
            }
          },
        }}
      >
        <CacheProvider value={emotionCache}>
          <Head>
            {/* <link rel="shortcut icon" href={getStrapiMedia(global?.favicon)} /> */}
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <TruestateThemeProvder>
            <Component {...pageProps} />
          </TruestateThemeProvder>
        </CacheProvider>
      </LanguageContext.Provider>
    </GlobalContext.Provider>
  );
};

MyApp.getInitialProps = async (ctx: any) => {
  const [appProps, global] = await Promise.all([
    App.getInitialProps(ctx),
    getGlobalData(),
    // await fetchAPI("/global?populate=*"),
    // await fetchAPI("/services"),
    // await fetchAPI("/articles?populate=*&sort[0]=updatedAt"),
  ]);
  // const lastThreeArticles =
  //   articles.length > 3
  //     ? articles.slice(Math.max(articles.length - 3, 1))
  //     : articles;
  return {
    ...appProps,
    pageProps: {
      global,
      // global, services, lastThreeArticles
    },
  };
};

export default MyApp;
