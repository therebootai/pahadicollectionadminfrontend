import React, { useContext } from "react";
import { FaRegBell } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { LuMessageSquareText } from "react-icons/lu";
import { PiUserCircleFill } from "react-icons/pi";
import { NavLinkData } from "../../lib/NavLink";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import { AuthContext } from "../../context/AuthContextProvider";
import axiosFetch from "../../config/axios.config";

const TopHeader = () => {
  const pathname = useLocation().pathname;

  const { user, logout } = useContext(AuthContext);

  const isActive = (path) => {
    return pathname === path || pathname.includes(path.split("/")[1])
      ? true
      : false;
  };

  const handelLogout = async () => {
    try {
      const response = await axiosFetch.get(`/users/logout`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        logout();
      }
    } catch (error) {
      alert("Failed to logout");
    }
  };

  async function handelSearch(query) {
    let url = `${pathname}/find?search=${query}&limit=8`;
    try {
      const res = await axiosFetch(url);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="flex flex-col shadow-custom bg-white">
      <div className="h-[4.5rem] flex flex-row justify-between items-center px-4 xl:px-8 gap-8 border-b">
        <Link to="/" className="">
          <img src="/images/pahadicollectionlogo.png" className="h-[2rem]" />
        </Link>
        <div className="border border-custom-border flex justify-between flex-1 items-center px-6 py-3 rounded-full">
          <input
            placeholder="Search"
            pattern="^\S+$"
            onChange={(e) => handelSearch(e.target.value)}
            className="flex-1 focus-within:outline-none bg-transparent"
          />
          <button type="button" className="text-2xl text-custom-border">
            <IoSearchSharp />
          </button>
        </div>
        <div className="flex items-center gap-5">
          <button type="button" className="text-custom-black text-2xl">
            <LuMessageSquareText />
          </button>
          <button type="button" className="text-custom-black text-2xl">
            <FaRegBell />
          </button>
          <div className="relative flex items-center group">
            <button type="button" className="text-custom-black text-2xl">
              <PiUserCircleFill />
            </button>
            <div className="absolute top-full right-0 w-[10vmax] bg-custom-violet hidden group-hover:flex p-2 rounded-md flex-col gap-4 z-50">
              {user && (
                <div className="flex flex-col gap-2">
                  <h1 className="text-white text-base font-bold lg:text-xl">
                    {user.name}
                  </h1>
                  <h3 className="text-white text-base lg:text-sm font-medium">
                    Role: {user.role}
                  </h3>
                </div>
              )}
              <div className="h-0.5 w-full bg-custom-border" />
              <button
                type="button"
                onClick={handelLogout}
                className="flex gap-2 items-center font-medium text-sm lg:text-lg text-white whitespace-nowrap"
              >
                <IoIosLogOut />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-[4.5rem] items-center flex justify-between px-4 xlg:px-6 xl:px-8 xl:gap-4 flex-wrap xlg:flex-nowrap">
        {NavLinkData.map((link, index) => (
          <div className="group" key={index}>
            {!link.dropdown ? (
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `inline-flex gap-2 items-center hover:text-custom-violet font-medium text-base lg:text-base xlg:text-base xl:text-xl ${
                    isActive ? "text-custom-violet" : "text-custom-black"
                  }`
                }
              >
                {<link.icon />}
                {link.label}
                {link.dropdown && <IoIosArrowDown />}
              </NavLink>
            ) : (
              <div className="relative" key={index}>
                <h3
                  className={`inline-flex gap-2 items-center hover:text-custom-violet font-medium lg:text-base xlg:text-base xl:text-xl ${
                    isActive(link.dropdown[0].path)
                      ? "text-custom-violet"
                      : "text-custom-black"
                  }`}
                >
                  {<link.icon />}
                  {link.label}
                  <IoIosArrowDown />
                </h3>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[12rem] bg-custom-violet/70 hidden group-hover:flex p-2 rounded-md flex-col gap-2 z-10">
                  {link.dropdown.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="flex gap-4 items-center font-medium text-sm lg:text-lg text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default TopHeader;
