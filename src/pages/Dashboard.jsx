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

      <button className="btn btn-primary">
        <Link to={"profile"} style={{ color: "white", textDecoration: "none" }}>
          {" "}
          Profile
        </Link>
      </button>
      <button className="btn btn-primary">
        <Link
          to={`book/${userId}`}
          style={{ color: "white", textDecoration: "none" }}
        >
          {" "}
          Books
        </Link>
      </button>
      <Outlet />
    </>
  );
};

export default Dashboard;
