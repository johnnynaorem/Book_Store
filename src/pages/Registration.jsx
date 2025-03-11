import React, { useState } from "react";
import Form from "../components/Form";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../api/user.controller";

export default function Registration() {
  const navigate = useNavigate();
  const [registrationCred, setRegistrationCred] = useState({
    username: "",
    email: "",
  });
  const handleOnChange = (e) => {
    setRegistrationCred({
      ...registrationCred,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signUp(registrationCred);
      if (res?.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar isRegistatrationPage={true} />
      <Form
        title="Registration"
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        loginCre={registrationCred}
      />
    </>
  );
}
