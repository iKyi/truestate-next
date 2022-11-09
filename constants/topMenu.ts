interface IPageLink {
  name: string;
  url: string;
  servicesList?: boolean;
}

const topMenu: IPageLink[] = [
  {
    name: "Acasa",
    url: "/",
  },
  {
    name: "Despre Noi",
    url: "/despre-noi",
  },
  {
    name: "Proprietati",
    url: "/proprietati",
  },
  {
    name: "Servicii",
    url: "/servicii",
    servicesList: false,
  },
];

export default topMenu;
