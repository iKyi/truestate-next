import { Instagram, Facebook, LinkedIn } from "@mui/icons-material";

const CommonIcon = (props: any) => {
  // *************** RENDER *************** //
  if (props.icon === "facebook") return <Facebook {...props} />;
  if (props.icon === "linkedin") return <LinkedIn {...props} />;
  if (props.icon === "instagram") return <Instagram {...props} />;
  return <Facebook />;
};

export default CommonIcon;
