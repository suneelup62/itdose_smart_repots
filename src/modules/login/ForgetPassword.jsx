import { useFormik } from "formik";
import React from "react";
import { notify } from "../../utils/utils";

const ForgetPassword = () => {
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: {
      emailID: "",
      PhoneNo: "",
      password: "",
      confirmpassword: "",
    },
    onSubmit: async (values) => {
      const errors = {};
      if (values.userName) {
        errors.userName = "User Name is required";
        notify(errors.userName, "error");
      } else if (values.userName.length < 3) {
        errors.userName = "At least 3 characters are required";
        notify(errors.userName, "error");
      }
      if (!values.PhoneNo) {
        errors.PhoneNo = "Phone Number is required";
        notify(errors.PhoneNo, "error");
      }
      if (!values.password) {
        errors.password = "Password is required";
        notify(errors.password, "error");
      }
      if (!values.confirmpassword) {
        errors.confirmpassword = "Confirm password is required";
        notify(errors.confirmpassword, "error");
      }
        console.log("values btn Password",values)
      // If there are validation errors, return early
      if (Object.keys(errors).length > 0) {
        return;
      }
      try {
        // let loginData = await dispatch(signInAction(values));
        // if (loginData?.payload?.data?.userDetails?.themeName) {
        //   useLocalStorage(
        //     "theme",
        //     "set",
        //     loginData?.payload?.data?.userDetails?.themeName
        //   );
        // } else {
        //   notify(loginData?.payload?.message, "error");
        // }
        // navigate("/dashboard");
      } catch (error) {
        console.error("Error occurred:", error);
      }
    },
  });
  return (
    <>
        <h1 className="Login-heading">Forget Password</h1>
        <p>Reset your Password</p>
      <form onSubmit={handleSubmit}>
        <div className="input-container py-2">
          <div className="input-wrapper">
            <input
              type="text"
              id="emailID"
              name="emailID"
              className="input-field"
              placeholder="Email"
              value={values.emailID}
              onChange={handleChange}
            />
            <span className="icon">
              <i class="fa fa-envelope  text-white" aria-hidden="true"></i>
            </span>
          </div>
        </div>
        <div className="input-container py-2">
          <div className="input-wrapper">
            <input
              type="text"
              id="PhoneNo"
              name="PhoneNo"
              className="input-field"
              placeholder="Phone No."
              value={values.PhoneNo}
              onChange={handleChange}
            />
            <span className="icon">
              <i class="fa fa-phone text-white" aria-hidden="true"></i>
            </span>
          </div>
        </div>
        <div className="input-container py-2">
          <div className="input-wrapper">
            <input
              type="password"
              id="password"
              name="password"
              className="input-field"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
            />
            <span className="icon">
              <i className="fa fa-key text-white" aria-hidden="true"></i>
            </span>
          </div>
        </div>
        <div className="input-container py-2">
          <div className="input-wrapper">
            <input
              type="text"
              id="confirmpassword"
              name="confirmpassword"
              className="input-field"
              placeholder="Confirm Password"
              value={values.confirmpassword}
              onChange={handleChange}
            />
            <span className="icon">
              <i className="fa fa-key text-white" aria-hidden="true"></i>
            </span>
          </div>
        </div>

        <div className="input-container pt-4 justify-content-center">
          <div
            type="submit"
            className="btn btn-primary"
            style={{
              border: "1px solid #fff",
              padding: "3px 17px",
              borderRadius: "3px",
              backgroundColor: "#fff",
              color: "#6f42c1",
            }}
            onClick={handleSubmit}
          >
            <a style={{ fontWeight: "bold" }}>Reset</a>
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgetPassword;
