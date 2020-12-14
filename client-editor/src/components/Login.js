import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../App";
import { Button, Message } from "./Utils";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(values);

      const res = await axios.post("/api/auth", body, config);

      dispatch({
        type: "login",
        payload: res.data,
      });
    } catch (err) {
      const errorArray = err.response.data.errors.map((err) => {
        return { text: err.msg, type: "danger" };
      });
      setMessages(errorArray);
      setTimeout(() => setMessages([]), 5000);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {messages &&
        messages.map((msg) => <Message variant={msg.type}>{msg.text}</Message>)}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="email">
          Email:
          <input
            type="text"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </label>
        <Button>Login</Button>
      </form>
    </div>
  );
};

export default Login;
