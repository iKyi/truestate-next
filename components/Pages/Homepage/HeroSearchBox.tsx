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
  const [tipOmobiValue, setTipImobilValue] = useState<string>("");
  const [searchString, setSearchString] = useState<string>("");
  const [categoryValue, setCategoryValue] = useState<string>("");

  const globalContext = useContext(GlobalContext) ?? {};

  const { deOptions, tipuri, categories } = globalContext ?? {};


  const handleThingChange = (item: string, value: any) => {
    switch (item) {
      case "de":
        setDeValue(value);
        break;
      case "cat":
        setTipImobilValue(value);
        break;
      case "cuvant":
        setSearchString(value);
        break;
      case "localCat":
        setCategoryValue(value);
        break;
      default:
        break;
    }
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    let urlLink = "cauta?";
    urlLink += `${deValue.length > 0 ? "de=" + deValue : ""}`;
    urlLink += `${tipOmobiValue.length > 0 ? "&cat=" + tipOmobiValue : ""}`;
    urlLink += `${searchString.length > 0 ? "&incl=" + searchString : ""}`;
    urlLink += `${categoryValue.length > 0 ? "&localCat=" + categoryValue : ""}`;
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
              flexBasis: mobile ? undefined : "160px",
            }}
            size="small"
          >
            <InputLabel id="label-for-type">Tip Tranzactie</InputLabel>
            <Select
              labelId="label-for-type"
              id="type-select"
              value={deValue}
              label="Tip Tranzactie"
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
              flexBasis: mobile ? undefined : "160px",
            }}
            size="small"
          >
            <InputLabel id="label-for-tipImobil">Tip Imobil</InputLabel>
            <Select
              labelId="label-for-tipImobil"
              id="tipImobil-select"
              value={tipOmobiValue}
              label="Tip Imobil"
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
        {categories && (
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
              value={categoryValue}
              label="Categorie"
              onChange={(e) => handleThingChange("localCat", e.target.value)}
            >
              <MenuItem value="">Toate</MenuItem>
              {categories?.map((item: any) => {
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
