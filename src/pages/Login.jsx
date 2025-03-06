import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import { signIn } from "../api/user.controller";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [loginCre, setLoginCre] = useState({ username: "", email: "" });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setLoginCre({
      ...loginCre,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn(loginCre.username, loginCre.email);
      if (res?.status === 200) {
        localStorage.setItem("token", JSON.stringify(res.data.access_token));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <Form
        title="Login"
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        loginCre={loginCre}
      />
      <Link to={"/registration"}>Create Account</Link>
    </>
  );
}
