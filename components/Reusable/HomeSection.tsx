import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { ReactNode } from "react";
import MarkdownParser from "./MarkdownParser";

interface IHomeSection {
  children?: ReactNode;
  title?: string;
  description?: string;
}
const HomeSection: React.FC<IHomeSection> = ({
  title,
  children,
  description,
}) => {
  return (
    <Box
      component="section"
      sx={{
        py: [3, 3, 5],
        px: [1, 1, 3],
      }}
    >
      <Container>
        {title && (
          <Typography
            component="div"
            sx={{
              px: [2, 2, 4],
              fontSize: [22, 22, 28],
              mb: description ? 2 : 4,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            <MarkdownParser>{title}</MarkdownParser>
          </Typography>
        )}
        {description && (
          <Typography
            component="div"
            sx={{
              px: [2, 2, 4],
              fontSize: [18, 18, 22],
              mb: 4,
            }}
          >
            <MarkdownParser>{description}</MarkdownParser>
          </Typography>
        )}
        {children && <Box>{children}</Box>}
      </Container>
    </Box>
  );
};

export default HomeSection;
