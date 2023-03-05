import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { vilaBoxIcons, vilaBoxText } from "./vilaBoxData";

interface IVilaBox {
  vilaData: Record<any, any>;
}
const VilaBox: React.FC<IVilaBox> = ({ vilaData }) => {
  return (
    <Box component="section">
      <List disablePadding>
        <Grid container>
          {Object.keys(vilaData).map((item) => {
            if (item === "esteVila") return null;
            const EntryIcon = vilaBoxIcons[item as string];
            const EntryLabel = vilaBoxText[item as string];
            const value = vilaData[item];
            const isMeasurement = [
              "deschidere",
              "suprafataUtila",
              "suprafataTeren",
              "suprafataConstruita",
              "suprafataDesfasurata",
              "amprentaLaSol",
            ].includes(item);
            let textValue = "";
            if (isMeasurement) {
              textValue = `${value} mp`;
            } else {
              if (!value) {
                textValue = "Nu";
              } else {
                textValue = "Da";
              }
            }

            return (
              <Grid
                key={item}
                item
                xs={12}
                md={6}
                xl={4}
                sx={{
                  order: isMeasurement ? 1 : 5,
                  display: "flex",
                }}
              >
                <ListItem>
                  <ListItemIcon>
                    <EntryIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {EntryLabel} : {textValue}
                  </ListItemText>
                </ListItem>
              </Grid>
            );
          })}
        </Grid>
      </List>
    </Box>
  );
};

export default VilaBox;
