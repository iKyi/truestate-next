import { EmailOutlined, Phone } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  Link as MuiLinkDefault,
  SxProps,
  Theme,
} from "@mui/material";
import { useContext } from "react";
import { GlobalContext } from "../../pages/_app";
import { centerFlex } from "../../utils/sxUtils";

interface IContactBox {
  sx?: SxProps<Theme>;
}
const ContactBox: React.FC<IContactBox> = ({ sx }) => {
  const { footerContactTitle, contactEntries, emailGlobal } =
    useContext(GlobalContext);

  return (
    <Box
      sx={{
        color: "#fff",
        pt: 3,
        textAlign: "center",
        ...sx,
      }}
    >
      {footerContactTitle && (
        <Typography
          component="div"
          sx={{
            fontSize: "1.35rem",
            mb: 2,
          }}
        >
          {footerContactTitle}
        </Typography>
      )}
      <Box
        sx={{
          ...centerFlex,
          gap: "10px",
        }}
      >
        {emailGlobal && (
          <IconButton
            LinkComponent={MuiLinkDefault}
            aria-label="phone link"
            href={`mailto:${emailGlobal}`}
            sx={{
              color: "inherit",
              display: "block",
              mb: 0.3,
            }}
          >
            <EmailOutlined />
          </IconButton>
        )}
        {contactEntries.map((item: any) => {
          const { nume, email, telefon, titlu } = item ?? {};
          return (
            <Box key={nume + titlu}>
              <Box
                sx={{
                  gap: "5px",
                  ...centerFlex,
                }}
              >
                {telefon && (
                  <IconButton
                    LinkComponent={MuiLinkDefault}
                    aria-label="phone link"
                    href={`tel:+${telefon}`}
                    sx={{
                      color: "inherit",
                      display: "block",
                      mb: 0.3,
                    }}
                  >
                    <Phone />
                  </IconButton>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ContactBox;
