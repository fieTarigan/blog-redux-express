import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { mainPosting, changeStatusLogin } from '../../features/newSlice';

const LoginLogin = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:3000/api/users/login",
        data: form,
      });

      if ( response.data.token ) {
        localStorage.setItem("token_login", response.data.token);

        dispatch(changeStatusLogin());
        dispatch(mainPosting());

        navigate("/user/posting");
      } else {
        setLoginError("Username or password is incorrect");
      }
    } catch (error) {
      setLoginError("Something wrong");
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="mb-1">Login</div>
      <form onSubmit={handleSubmit} className="border-2 py-6 px-16 flex flex-col items-center w-1/3">
        <div className="w-full">
          <label htmlFor="username">Username</label><br/>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="text-blue-600 px-2 w-full"
          />
        </div>

        <div className="w-full">
          <label htmlFor="password">Password</label><br/>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="text-blue-600 px-2 w-full"
          />
        </div>

        <div>
          <button type="submit" className="mt-2 bg-slate-300 text-blue-800 px-4 py-1 rounded">
            Login
          </button>
        </div>
      </form>

      {loginError && <div>{loginError}</div>}
    </div>
  );
};

export default LoginLogin;
