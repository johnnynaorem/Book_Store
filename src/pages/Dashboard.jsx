import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { userId, username } = useSelector((state) => state.user);

  useEffect(() => {}, []);
  return (
    <>
      <Navbar />
      <pre>
        {username}
        {userId}
      </pre>
      {username && <h2>Dashboard.... {username}</h2>}

      <button>
        <Link to={"profile"}> Profile</Link>
      </button>
      <button>
        <Link to={`book/${userId}`}> Books</Link>
      </button>
      <button>
        <Link to={"profile"}> Update Profile</Link>
      </button>
      <Outlet />
    </>
  );
};

export default Dashboard;
