import { FaBox, FaRegStickyNote } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { GiProgression } from "react-icons/gi";
import { LuLayoutPanelLeft, LuPanelsTopLeft } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import { PiCalendarHeartDuotone } from "react-icons/pi";

const allNavLinks = [
  {
    icon: LuPanelsTopLeft,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: FaBox,
    label: "Orders",
    path: "/orders",
  },
  {
    icon: FiUser,
    label: "Customers",
    path: "/customers",
  },
  {
    icon: MdOutlineCategory,
    label: "Category",
    path: "/category",
  },
  {
    icon: FaBoxArchive,
    label: "Products",
    path: "/products",
  },
  {
    icon: GiProgression,
    label: "Marketing",
    path: "/marketing",
  },
  {
    icon: PiCalendarHeartDuotone,
    label: "Wishlist",
    path: "/wishlist",
  },
  {
    icon: LuLayoutPanelLeft,
    label: "Masters",
    path: "/masters",
  },
  {
    icon: FaRegStickyNote,
    label: "Components",
    path: "/components",
  },
];

export { allNavLinks as NavLinkData };
