import { ADMINROUTES, USERROUTES } from "./routes";

// constants/navbar.ts
export const fallbackNavbar = {
  logo: "/core/888.png",
  menuItems: [
    { name: "Home", path: USERROUTES.HOME },
    { name: "Events", path: USERROUTES.EVENTS },
    { name: "Gallery", path: USERROUTES.GALLERY },
    { name: "About", path: USERROUTES.ABOUT },
    { name: "Contact", path: USERROUTES.CONTACT },
    // { name: "FAQ", path: USERROUTES.FAQ },
    { name: "Login", path: ADMINROUTES.LOGIN },
  ],
};
