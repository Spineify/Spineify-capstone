import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

const SideBarData = [
  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text-",
  },
  {
    title: "Data",
    path: "/data",
    icon: <AiIcons.GoGraph />,
    cName: "nav-text-",
  },
  {
    title: "My Stretches",
    path: "/favorites",
    icon: <AiIcons.RiPlantLine />,
    cName: "nav-text-",
  },
  {
    title: "Logout",
    path: "/login",
    icon: <AiIcons.FiLogOut />,
    cName: "nav-text-",
  },
];

export default SideBarData;
