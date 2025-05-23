import { BsBox2 } from "react-icons/bs";
import { FaRegStickyNote } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { GiProgression } from "react-icons/gi";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { LuLayoutPanelLeft, LuPanelsTopLeft } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import { PiMoneyWavyBold } from "react-icons/pi";

const allNavLinks = [
  {
    icon: LuPanelsTopLeft,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: BsBox2,
    label: "Orders",
    path: "/orders?page=1",
  },
  {
    icon: FiUser,
    label: "Customers",
    path: "/customers?page=1",
  },
  {
    icon: MdOutlineCategory,
    label: "Category",
    path: "/add-manage-category",
  },
  {
    icon: HiOutlineArchiveBox,
    label: "Products",
    path: "/products?page=1",
  },
  {
    icon: PiMoneyWavyBold,
    label: "Payments",
    path: "/payments?page=1",
  },
  {
    icon: GiProgression,
    label: "Marketing",
    dropdown: [
      {
        label: "Coupon",
        path: "/marketing/add-manage-coupon?page=1",
      },
      {
        label: "WishList",
        path: "/marketing/wishlist?page=1",
      },
      {
        label: "Reviews",
        path: "/marketing/reviews?page=1",
      },
    ],
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
        label: "Variable",
        path: "/masters/variable?page=1",
      },
      {
        label: "Users",
        path: "/masters/users",
      },
      {
        label: "Attributes",
        path: "/masters/attributes?page=1",
      },
    ],
  },
  {
    icon: FaRegStickyNote,
    label: "Components",
    dropdown: [
      {
        label: "Slider",
        path: "/components/slider?page=1",
      },
      {
        label: "Banner",
        path: "/components/banner?page=1",
      },
      {
        label: "Logo",
        path: "/components/logo?page=1",
      },
      {
        label: "Popup",
        path: "/components/popup?page=1",
      },
    ],
  },
];

export { allNavLinks as NavLinkData };
