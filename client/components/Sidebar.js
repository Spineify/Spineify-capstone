import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
// import SideBarData from "./SidebarData";

const sideBarData = [
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

const Sidebar = (props) => {
  const [sidebar, setSideBar] = useState(false);
  // console.log("DATA", sideBarData);
  const showSideBar = () => setSideBar(!sidebar);

  return (
    <>
      <div className="sidebar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSideBar} />
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {sideBarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {/* {item.icon} */}
                  <span className="sidebar-span">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
