import React, { useContext } from "react";
import Navbar from "./Navbar";
import SideMenu from "./Sidemenu";
import PopularTicker from "./PopularTicker";
import { UserContext } from "../../context/UserContext";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  console.log("DashboardLayout user:", user);
  const popularData = [
    { name: "NIFTY", change: 0.12 },
    { name: "BTC", change: 0.96 },
    { name: "INRUSD", change: 0.09 },
    { name: "ETH", change: 1.25 },
    { name: "BNB", change: 2.21 },
    { name: "HFCL", change: 0.22 },
    { name: "ITC", change: 0.6 },
    { name: "ADA", change: -0.01 },
    { name: "YESBANK", change: 0.09 },
    { name: "TTM", change: 0.0 },
    { name: "XRP", change: -1.47 },
    { name: "TATASTEEL", change: -1.35 },
    { name: "RELIANCE", change: 0.53 },
    { name: "TMPV", change: -1.7 },
    { name: "ADANIPOWER", change: 1.36 },
    { name: "SENSEX", change: 0.1 },
    { name: "DJI", change: -0.65 },
  ];
  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />
      <h2 className="text-lg font-semibold text-red-800 mb-1 pl-4">
        Global Markets
      </h2>
      <PopularTicker items={popularData} />
      {user && (
        <div className="flex ">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
