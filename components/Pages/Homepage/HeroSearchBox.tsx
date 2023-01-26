import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { GlobalContext } from "../../../pages/_app";
import { centerFlex } from "../../../utils/sxUtils";
import { SearchOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import useIsMobile from "../../../hooks/useIsMobile";

interface IHeroSearchBox {}
const HeroSearchBox: React.FC<IHeroSearchBox> = () => {
  const { push } = useRouter();
  const mobile = useIsMobile();

  const [deValue, setDeValue] = useState<string>("");
  const [categorieValue, setCategorieValue] = useState<string>("");
  const [searchString, setSearchString] = useState<string>("");

  const globalContext = useContext(GlobalContext) ?? {};

  const { deOptions, tipuri } = globalContext ?? {};

  const handleThingChange = (item: string, value: any) => {
    switch (item) {
      case "de":
        setDeValue(value);
        break;
      case "cat":
        setCategorieValue(value);
        break;
      case "cuvant":
        setSearchString(value);
        break;
      default:
        break;
    }
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    let urlLink = "cauta?";
    urlLink += `${deValue.length > 0 ? "de=" + deValue : ""}`;
    urlLink += `${categorieValue.length > 0 ? "&cat=" + categorieValue : ""}`;
    urlLink += `${searchString.length > 0 ? "&incl=" + searchString : ""}`;
    push(urlLink);
  };

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        minHeight: "50px",
        width: "960px",
        maxWidth: "100%",
        margin: "0 auto",
        borderRadius: "6px",
        p: 1,
        boxShadow: `0px 0px 15px rgba(0,0,0,1)`,
        ...centerFlex,
      }}
    >
      <Box
        component="form"
        onSubmit={onFormSubmit}
        sx={{
          width: "100%",
          display: "flex",
          gap: "10px",
          flexDirection: mobile ? "column" : undefined,
        }}
      >
        {deOptions && (
          <FormControl
            sx={{
              flexBasis: mobile ? undefined : "200px",
            }}
            size="small"
          >
            <InputLabel id="label-for-type">Tip</InputLabel>
            <Select
              labelId="label-for-type"
              id="type-select"
              value={deValue}
              label="Tip"
              onChange={(e) => handleThingChange("de", e.target.value)}
            >
              <MenuItem value="">Toate</MenuItem>
              {deOptions?.map((item: any) => {
                return (
                  <MenuItem key={item.name} value={item.slug}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}

        {tipuri && (
          <FormControl
            sx={{
              flexBasis: mobile ? undefined : "200px",
            }}
            size="small"
          >
            <InputLabel id="label-for-category">Categorie</InputLabel>
            <Select
              labelId="label-for-category"
              id="category-select"
              value={categorieValue}
              label="Categorie"
              onChange={(e) => handleThingChange("cat", e.target.value)}
            >
              <MenuItem value="">Toate</MenuItem>
              {tipuri?.map((item: any) => {
                return (
                  <MenuItem key={item.name} value={item.slug}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
        <TextField
          size="small"
          id="outlined-basic"
          label="Zona / Detalii"
          variant="outlined"
          value={searchString}
          onChange={(e) => handleThingChange("cuvant", e.target.value)}
          sx={{
            flexBasis: mobile ? undefined : "200px",
            flex: 1,
          }}
        />
        <Button
          type="submit"
          endIcon={<SearchOutlined />}
          variant="contained"
          color="primary"
          sx={{
            flexBasis: mobile ? undefined : "120px",
            ml: "auto",
            width: mobile ? "100%" : undefined,
          }}
        >
          Cauta
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSearchBox;
