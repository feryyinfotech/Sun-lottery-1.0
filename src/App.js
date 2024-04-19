import { Route, Routes } from "react-router-dom";
import "../src/index.css";
import "./App.css";
import "./assets/styles/main.css";
import { routes } from "./routes";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import ForgetPassword from "./pages/auth/login/ForgetPassword";
import CryptoJS from "crypto-js";

const App = () => {
  const isAuthenticated =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null; // Check if the user is authenticated

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/register" element={<Register />} />
      {isAuthenticated ? (
        routes?.map((route, index) => {
          return (
            <Route key={index} path={route?.path} element={route?.component} />
          );
        })
      ) : (
        <Route path="/" element=<Login /> />
      )}
    </Routes>
  );
};

export default App;
