import { HomeIcon, BarChart2, ShoppingCart, Users, Layers } from "lucide-react";
import Index from "./pages/Index.jsx";
import MarketInsights from "./pages/MarketInsights.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Market Insights",
    to: "/market-insights",
    icon: <BarChart2 className="h-4 w-4" />,
    page: <MarketInsights />,
  },
  {
    title: "Marketplace",
    to: "/marketplace",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    title: "Community",
    to: "/community",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "DEX",
    to: "/dex",
    icon: <Layers className="h-4 w-4" />,
  },
];
