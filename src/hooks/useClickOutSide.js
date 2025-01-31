import { useEffect, useRef } from "react";

export default function useClickOutside(handleClose, showPopUp) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClose(); // Close popup if clicked outside
      }
    };

    if (showPopUp) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopUp, handleClose]);

  return ref;
}
