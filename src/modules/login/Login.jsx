import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useCookiesStorage,
  useLocalStorage,
} from "../../utils/hooks/useLocalStorage";
import { signInAction } from "../../store/reducers/loginSlice/loginSlice";
import { apiUrls } from "../../networkServices/apiEndpoints";
import { useTranslation } from "react-i18next";
import logo from "@app/assets/image/logo.png";
import ForgetPassword from "./ForgetPassword";
import { notify } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();

  const ip = useLocalStorage("ip", "get");
  const [isforget, setIsforget] = useState(false);
  const navigate = useNavigate();
  const [ipAddress, setIpAddress] = useState("");

  const { handleChange, values, handleSubmit, touched, errors, setErrors } =
    useFormik({
      initialValues: {
        userName: "",
        password: "",
      },

      onSubmit: async (values) => {
        const validationErrors = {};

        if (!values.userName) {
          validationErrors.userName = "User Name is required";
          notify(validationErrors.userName, "error");
        } else if (values.userName.length < 3) {
          validationErrors.userName = "At least 3 characters are required";
          notify(validationErrors.userName, "error");
        }

        // Validate password
        if (!values.password) {
          validationErrors.password = "Password is required";
          notify(validationErrors.password, "error");
        }

        // If there are validation errors, set them and stop form submission
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }

        const requestbody = {
          password: values?.password,
          userName: values?.userName,
          ipaddress: ipAddress,
        };

        try {
          axios
            .post(apiUrls?.login, requestbody)
            .then((response) => {
              navigate("/dashboard");
              Cookies.set("", response?.data?.token?.split(";")[0]);
              Cookies.set("user", JSON.stringify(response?.data?.user));
              useLocalStorage("theme", "set", "sky_blue_theme");
              // useLocalStorage("theme", "set", "purple_theme");
              useLocalStorage(
                "authToken",
                "set",
                response?.data?.token?.split(";")[0]
              );
            })
            .catch((error) => {
              notify(error.response.data.message || "Error during login.", "error");
              console.error("Error during login:", error);
            });
        } catch (error) {
          console.error("Error occurred:", error);
        }
      },
    });

  useEffect(() => {
    axios
      .get(`https://api.ipify.org/?format=json`)
      .then((res) => {
        setIpAddress(res?.data?.ip);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="background-login-containers">
      <div
        className="contentss"
        style={{ textAlign: "center", justifyContent: "center" }}
      >
        <Link to="/">
          <img className="logoStyle" src={logo} alt="Logo" />
        </Link>
        {!isforget ? (
          <>
            <h1 className="Login-heading">Login</h1>
            <p>Sign In to start your session</p>

            <form onSubmit={handleSubmit}>
              <div className="input-container py-2">
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    className="input-field"
                    placeholder="User Name"
                    value={values?.userName}
                    onChange={handleChange}
                  />
                  <span className="icon">
                    <i
                      className="fa fa-user-circle text-white"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
                {/* {touched.userName && errors.userName && (
                  <div className="error">{errors.userName}</div>
                )} */}
              </div>

              <div className="input-container py-2">
                <div className="input-wrapper">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="input-field"
                    placeholder="Password"
                    value={values?.password}
                    onChange={handleChange}
                  />
                  <span className="icon">
                    <i className="fa fa-key text-white" aria-hidden="true"></i>
                  </span>
                </div>
                {/* {touched.password && errors.password && (
                  <div className="error">{errors.password}</div>
                )} */}
              </div>

              <div className="input-container pt-4 justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    border: "1px solid #fff",
                    padding: "3px 17px",
                    borderRadius: "3px",
                    backgroundColor: "#fff",
                    color: "#6f42c1",
                  }}
                >
                  <a style={{ fontWeight: "bold" }}>Login</a>
                </button>
              </div>
            </form>
          </>
        ) : (<ForgetPassword />) }

        {/* <div className="input-container pt-4 justify-content-center">
          <span
            className="text-light forget"
            onClick={() => setIsforget(!isforget)} // Toggle state for forget password
          >
            {!isforget ? "Forget Password" : "Back to Login"}
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default Login;