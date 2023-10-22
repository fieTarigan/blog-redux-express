import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { childLogin, childRegister } from '../features/newSlice';
import LoginLogin from "./login/LoginLogin";
import LoginRegister from "./login/LoginRegister";

const LoginPage = () => {
  const childNav = useSelector((state) => state.navigation.childNavBar);
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex items-center justify-center gap-8 mt-12">
        <button
          onClick={() => dispatch(childLogin())}
          className={`border-b-4 border-transparent ${childNav === "login" ? "border-white" : ""}`}
        >
          Login
        </button>
        <button
          onClick={() => dispatch(childRegister())}
          className={`border-b-4 border-transparent ${childNav === "register" ? "border-white" : ""}`}
        >
          Register
        </button>
      </div>

      <div>
        {childNav === "login" ? (
          <LoginLogin />
        ) : (
          <LoginRegister />
        )}
      </div>
    </>
  );
};

export default LoginPage;
