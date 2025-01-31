import { BsBox2 } from "react-icons/bs";
import { FaRegStickyNote } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { GiProgression } from "react-icons/gi";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { LuLayoutPanelLeft, LuPanelsTopLeft } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import { PiCalendarHeartDuotone } from "react-icons/pi";

const allNavLinks = [
  {
    icon: LuPanelsTopLeft,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: BsBox2,
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
    path: "/add-manage-category",
  },
  {
    icon: HiOutlineArchiveBox,
    label: "Products",
    path: "/products",
  },
  {
    icon: GiProgression,
    label: "Marketing",
    path: "/add-manage-coupon",
  },
  {
    icon: PiCalendarHeartDuotone,
    label: "Wishlist",
    path: "/wishlist",
  },
  {
    icon: LuLayoutPanelLeft,
    label: "Masters",
    dropdown: [
      {
        label: "Pick Up",
        path: "/masters/pick-up",
      },
      {
        label: "Coupon",
        path: "/masters/add-manage-coupon",
      },
      {
        label: "Variable",
        path: "/masters/variable",
      },
    ],
  },
  {
    icon: FaRegStickyNote,
    label: "Components",
    dropdown: [
      {
        label: "Slider",
        path: "/components/slider",
      },
      {
        label: "Banner",
        path: "/components/banner",
      },
      {
        label: "Logo",
        path: "/components/logo",
      },
      {
        label: "Popup",
        path: "/components/pop-up",
      },
    ],
  },
];

export { allNavLinks as NavLinkData };
