import React from "react";
import { useDispatch } from "react-redux";
import { showMenuAction } from "../actions/uiActions";

const DashboardContent = ({ children }) => {
  const dispatch = useDispatch();

  const toggleBtn = (e) => {
    e.preventDefault();
    dispatch(showMenuAction());
  };
  return (
    <div className="md:ml-72 py-12 md:px-8 px-2 h-screen">
      <button onClick={toggleBtn} className={`fas fa-bars md:hidden`}></button>
      {children}
    </div>
  );
};

export default DashboardContent;
