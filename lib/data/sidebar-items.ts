import { Home, Inbox, Calendar, Search, Settings, Contact, File } from "lucide-react"; // or your icon source
import { ADMINROUTES } from "./routes";

export type SidebarItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>; // Adjust based on your icon type
  badge?: number;
};

export const sidebarItems: SidebarItem[] = [
  {
    title: "Home",
    url: ADMINROUTES.DASHBOARD,
    icon: Home,
  },

  {
    title: "LandingPage",
    url: ADMINROUTES.EDIT_LANDINGPAGE,
    icon: File,
  },
  {
    title: "Gallery",
    url: ADMINROUTES.EDIT_GALLERY,
    icon: File,
  },

  {
    title: "Navbar",
    url: ADMINROUTES.EDIT_NAVBAR,
    icon: File,
  },
  {
    title: "Footer",
    url: ADMINROUTES.EDIT_FOOTER,
    icon: File,
  },

  {
    title: "Inbox",
    url: "#",
    icon: Search,
    badge: 8, // Added badge count here for better data structure
  },
];
