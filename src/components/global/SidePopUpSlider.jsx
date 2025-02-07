import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useClickOutside from "../../hooks/useClickOutSide";

const SidePopUpSlider = ({ children, handleClose, showPopUp }) => {
  const popUpRef = useClickOutside(handleClose, showPopUp);

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-[60%] overflow-hidden overflow-y-scroll no-scrollbar bg-[#EDF4F7] shadow-lg transform transition-transform duration-300 ease-in-out ${
        showPopUp ? "translate-x-0" : "translate-x-full"
      }`}
      ref={popUpRef}
    >
      <div className="flex justify-end p-4 text-custom-violet">
        <button onClick={handleClose}>
          <AiOutlineCloseCircle size={24} className="text-xl font-bold" />
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default SidePopUpSlider;
