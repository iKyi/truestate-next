import { gql } from "@apollo/client";
import { Box, Grid, Typography, Stack } from "@mui/material";
import { Container } from "@mui/system";
import { NextPage } from "next";
import LayoutWrapper from "../components/Reusable/Layout/LayoutWrapper";
import MarkdownParser from "../components/Reusable/MarkdownParser";
import PageHeader from "../components/Reusable/PageHeader";
import client from "../lib/apolloClient";
import { getStrapiMedia } from "../lib/media";
import { centerFlex } from "../utils/sxUtils";

const getServiciiData = async () => {
  const reps = await client.query({
    query: gql`
      query GetDespreNoi {
        despreNoiPage {
          data {
            attributes {
              pageHeader {
                title
                description
              }
              seo {
                metaTitle
                metaDescription
                shareImage {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
              boxes {
                titlu
                descriere
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                right
              }
            }
          }
        }
      }
    `,
  });

  return reps.data;
};

interface IDesprenoi {
  main: any;
}
const Desprenoi: NextPage<IDesprenoi> = ({ main }) => {
  const { boxes, pageHeader, seo } =
    main?.despreNoiPage?.data?.attributes ?? {};
  return (
    <LayoutWrapper seo={seo}>
      <Container>
        <PageHeader {...pageHeader} />
        <Box
          sx={{
            py: [2, 2, 4],
          }}
        >
          <Grid container spacing={[2, 2, 4]}>
            {boxes?.map((item: any) => {
              const { descriere, image, titlu, right } = item;
              const imageUrl = getStrapiMedia(image);
              return (
                <Grid key={titlu} item xs={12}>
                  <Grid container spacing={2}>
                    {imageUrl && (
                      <Grid
                        item
                        md={4}
                        sx={{
                          order: right && imageUrl ? 3 : 1,
                        }}
                      >
                        <Box
                          sx={{
                            background: `url('${imageUrl}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center center",
                            backgroundRepeat: "no-repeat",
                            height: "100%",
                            width: "100%",
                            minHeight: "300px",
                          }}
                        />
                      </Grid>
                    )}
                    <Grid
                      item
                      md={imageUrl ? 8 : 12}
                      sx={{
                        ...centerFlex,
                        order: 2,
                      }}
                    >
                      <Stack>
                        <Typography
                          component="div"
                          variant="h4"
                          sx={{
                            mb: 1.5,
                            fontSize: "1.4rem",
                          }}
                        >
                          {titlu}
                        </Typography>
                        {descriere && (
                          <Typography component="div" variant="body1">
                            <MarkdownParser>{descriere}</MarkdownParser>
                          </Typography>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </LayoutWrapper>
  );
};

export default Desprenoi;

export async function getStaticProps() {
  //Run API calls in parallel
  const [main] = await Promise.all([getServiciiData()]);
  return {
    props: {
      main: main,
    },
    revalidate: 60,
  };
}
