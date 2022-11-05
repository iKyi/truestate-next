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
    name: "Servicii",
    url: "/servicii",
    servicesList: true,
  },
];

export default topMenu;
