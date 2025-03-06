import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div>Dashboard</div>
      <button>
        <Link to={"profile"}> Profile</Link>
      </button>
      <button>
        <Link to={"profile"}> Books</Link>
      </button>
      <button>
        <Link to={"profile"}> Update Profile</Link>
      </button>
      <Outlet />
    </>
  );
};

export default Dashboard;
