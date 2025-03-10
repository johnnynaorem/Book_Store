import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import { signIn } from "../api/user.controller";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/slices/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const { isLogin, loading, error } = useSelector((state) => state.user);
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
      const result = await dispatch(userLogin(loginCre));
      if (userLogin.fulfilled.match(result)) {
        console.log("Login successful:", result.payload);
        localStorage.setItem(
          "token",
          JSON.stringify(result.payload.access_token)
        );
        navigate("/");
      } else if (userLogin.rejected.match(result)) {
        console.log("Login failed:", result.error.message);
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
      <Navbar isLoginPage={true} />
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
