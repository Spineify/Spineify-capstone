import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

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
  return (
    <>
      {/* <h5>Spineify</h5> */}
      <nav className="nav-menu active">
        <ul className="nav-menu-items">
          <li className="spineify-title">Spineify</li>
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
