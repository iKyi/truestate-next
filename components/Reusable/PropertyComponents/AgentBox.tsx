import { Box, Typography, IconButton } from "@mui/material";
import {
  PhoneEnabledOutlined,
  WhatsApp,
  EmailOutlined,
} from "@mui/icons-material";

interface IAgentBox {
  agentData: {
    nume: string;
    email: string;
    telefon: number;
  };
}
const AgentBox: React.FC<IAgentBox> = ({ agentData }) => {
  const { email, nume, telefon } = agentData;
  return (
    <Box
      sx={{
        py: 2,
      }}
    >
      <Typography
        variant="h3"
        component="div"
        sx={{
          fontSize: ["1.1rem", "1.1rem", "1.2rem"],
        }}
      >
        Contact: {nume}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "4px",
          mt: 2,
        }}
      >
        {telefon && (
          <IconButton href={`tel:+40${telefon}`} rel="noreferrer">
            <PhoneEnabledOutlined />
          </IconButton>
        )}
        {telefon && (
          <IconButton
            href={`https://wa.me/+40${telefon}`}
            rel="noreferrer"
            target="_blank"
          >
            <WhatsApp />
          </IconButton>
        )}
        {email && (
          <IconButton href={`mailto:${email}`} rel="noreferrer">
            <EmailOutlined />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default AgentBox;
