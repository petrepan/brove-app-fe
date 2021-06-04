import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { showMenuAction } from "../actions/uiActions";

const DashboardMenu = () => {
  const dispatch = useDispatch();

  const toggleMenu = useSelector((state) => state.toggleMenu);

  const { showMenu } = toggleMenu;

  const clickHandle = (e) => {
    e.preventDefault();
    dispatch(logout());
    window.location.href = "/login";
  };

  const reverseMenu = (e) => {
    dispatch(showMenuAction());
  };

  return (
    <div className={`${showMenu ? "block" : "hidden md:block"}`}>
      <nav className="bg-blue-900 text-white h-full fixed w-52 md:w-72 z-50">
        <div className="py-12 md:px-8 px-5">
          <ul>
            <li onClick={reverseMenu} className="mb-6">
              <NavLink
                activeClassName="font-bold text-2xl"
                to="/dashboard/overview">
                <i className="fas fa-th-large mr-2"></i> Overview
              </NavLink>
            </li>
            <li onClick={reverseMenu} className="mb-6">
              <NavLink
                activeClassName="font-bold text-2xl"
                to="/dashboard/portfolio">
                <i className="fas fa-coins mr-2"></i> Portfolio
              </NavLink>
            </li>
            <li onClick={reverseMenu} className="mb-6">
              <NavLink
                activeClassName="font-bold text-2xl"
                to="/dashboard/loan">
                <i className="far fa-bookmark mr-2"></i> Your loans
              </NavLink>
            </li>
            <li onClick={reverseMenu} className="mb-6">
              <NavLink
                activeClassName="font-bold text-2xl"
                to="/dashboard/profile">
                <i className="far fa-user mr-2"></i> Profile
              </NavLink>
            </li>
            <li className="mb-6 mt-48">
              <button onClick={clickHandle}>
                <i className="fas fa-sign-out-alt mr-2"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div
        onClick={reverseMenu}
        className="h-full fixed w-full bg-gray-100 opacity-70 md:hidden cursor-pointer"></div>
    </div>
  );
};

export default DashboardMenu;
