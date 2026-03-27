import React, { useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./Sidemenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [goldRate, setGoldRate] = useState(null);
  const [silverRate, setSilverRate] = useState(null);

  useEffect(() => {
    fetchGoldSilverRates();
  }, []);

  const fetchGoldSilverRates = async () => {
    try {
      const goldRes = await fetch("https://www.goldapi.io/api/XAU/INR", {
        headers: { "x-access-token": "goldapi-1y6fsmi0dywee-io" },
      });

      const silverRes = await fetch("https://www.goldapi.io/api/XAG/INR", {
        headers: { "x-access-token": "goldapi-1y6fsmi0dywee-io" },
      });

      const goldData = await goldRes.json();
      const silverData = await silverRes.json();

      setGoldRate(goldData.price);
      setSilverRate(silverData.price);
    } catch (error) {
      console.error("Error fetching rates:", error);
    }
  };

  return (
    <div
      className="relative flex items-center justify-between bg-white py-4 px-7 sticky top-0 z-30 
      after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-0px] after:h-[1px] after:bg-gray-200/50"
    >
      {/* LEFT: MENU */}
      <div className="flex items-center gap-5">
        <button
          className="block lg:hidden text-black"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-4xl" />
          )}
        </button>

        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text">
          LedgerFlow
        </h2>
      </div>

      {/* RIGHT: GOLD & SILVER */}
      <div className="hidden lg:flex flex-col text-right">
        <span className="text-sm font-semibold text-yellow-600">
          Gold: ₹{goldRate || "—"}
        </span>
        <span className="text-sm font-semibold text-gray-600">
          Silver: ₹{silverRate || "—"}
        </span>
      </div>

      {/* MOBILE SIDE MENU */}
      {openSideMenu && (
        <div className="fixed top-[61px] left-0 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
