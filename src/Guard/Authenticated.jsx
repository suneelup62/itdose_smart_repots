// import { Navigate } from "react-router-dom";

// const Authenticated = ({ children }) => {
//   const token = localStorage.getItem("userData");

//   return token ? children : <Navigate to="/login" replace />;
// };
// export default Authenticated;


import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Authenticated = ({ children }) => {
  // const token = Cookies.get("authToken");
  const token = localStorage.getItem('authToken');

  return token ? children : <Navigate to="/login" replace />;
};

export default Authenticated;
