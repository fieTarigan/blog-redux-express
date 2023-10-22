import React, { useState } from "react";
import axios from "axios";

const LoginRegister = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    foto: "https://via.placeholder.com/300",
    alamat: "",
  });
  const [loginError, setLoginError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:3000/api/users/register",
        data: form,
      });

      if (response.data) {
        window.location.reload();
      }
    } catch (error) {
      setLoginError("Register fails.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="mb-1">Register</div>
      <form onSubmit={handleSubmit} className="border-2 p-6 px-16 flex flex-col items-center w-1/3">
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
        
        <div className="w-full">
          <label htmlFor="image">Profile Picture</label><br/>
          <input
            type="text"
            name="image"
            value={form.foto}
            onChange={handleChange}
            className="text-blue-600 px-2 w-full"
          />
        </div>
        
        <div className="w-full">
          <label htmlFor="alamat">Address</label><br/>
          <input
            type="text"
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            className="text-blue-600 px-2 w-full"
          />
        </div>

        <div>
          <button type="submit" className="mt-2 bg-slate-300 text-blue-800 px-4 py-1 rounded">
            Create
          </button>
        </div>
      </form>

      {loginError && <div>{loginError}</div>}
    </div>
  );
};

export default LoginRegister;
