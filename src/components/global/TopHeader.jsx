import React from "react";
import { FaRegBell } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { LuMessageSquareText } from "react-icons/lu";
import { PiUserCircleFill } from "react-icons/pi";
import { NavLinkData } from "../../lib/NavLink";
import { Link, NavLink } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const TopHeader = () => {
  return (
    <nav className="flex flex-col shadow-custom">
      <div className="h-[4.5rem] flex flex-row justify-between items-center px-8 gap-8 border-b">
        <Link to="/" className="">
          <img src="/images/pahadicollectionlogo.png" className="h-[2rem]" />
        </Link>
        <div className="border border-custom-border flex justify-between flex-1 items-center px-6 py-3 rounded-full">
          <input
            placeholder="Search"
            className="flex-1 focus-within:outline-none"
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
          <button type="button" className="text-custom-black text-2xl">
            <PiUserCircleFill />
          </button>
        </div>
      </div>
      <div className="h-[4.5rem] flex justify-between px-8 gap-8">
        {NavLinkData.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              `inline-flex gap-4 items-center hover:text-custom-violet font-medium text-base lg:text-xl ${
                isActive ? "text-custom-violet" : "text-custom-black"
              }`
            }
          >
            {<link.icon />}
            {link.label}
            <IoIosArrowDown />
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default TopHeader;
