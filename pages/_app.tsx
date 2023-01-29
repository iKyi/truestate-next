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
          agents {
            data {
              attributes {
                nume
                telefon
                email
              }
            }
          }
          tips {
            data {
              attributes {
                name
                slug
              }
            }
          }
          categories {
            data {
              attributes {
                name
                slug
                color
                order
              }
            }
          }
          deOptions: des {
            data {
              attributes {
                name
                slug
              }
            }
          }

          global {
            data {
              attributes {
                vandutImage {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                footerContactTitle
                contactEntries {
                  nume
                  titlu
                  telefon
                  email
                }
                emailGlobal
                logoWhite {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                logo {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                officeEmail
                officePhone
                footerDisclamer
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
    return response?.data;
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
            <link rel="shortcut icon" href={getStrapiMedia(global?.favicon)} />
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
  const [appProps, response] = await Promise.all([
    App.getInitialProps(ctx),
    getGlobalData(),
  ]);

  const globalData = {
    ...response?.global?.data?.attributes,
    deOptions: response?.deOptions?.data?.map((item: any) => item.attributes),
    categories: response?.categories?.data?.map((item: any) => item.attributes),
    tipuri: response?.tips?.data?.map((item: any) => item.attributes),
  };
  return {
    ...appProps,
    pageProps: {
      global: globalData,
    },
  };
};

export default MyApp;
