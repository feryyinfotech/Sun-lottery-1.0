import {
  Box,
  Button,
  Container,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { storeCookies } from "../../../Shared/CookieStorage";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { ForgetPasswordSchemaValidation } from "../../../Shared/Validation";
import logo from "../../../assets/images/logo.png";
import poster from "../../../assets/images/poster2.jpg";
import { endpoint } from "../../../services/urls";
import CryptoJS from 'crypto-js'
function ForgetPassword() {
  const [loding, setloding] = useState(false);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const initialValue = {
    mobile: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    validationSchema: ForgetPasswordSchemaValidation,
    onSubmit: () => {
      loginFunction(fk.values);
    },
  });

  const loginFunction = async (reqbody) => {
    setloding(true);
    try {
      const response = await axios.post(endpoint.login, reqbody, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      toast.success(response?.data?.msg);
      console.log(response);
      if (response?.data?.error === "200") {
        const value = CryptoJS.AES.encrypt(JSON.stringify(response?.data), "anand")?.toString();
        localStorage.setItem("logindataen", value);
        sessionStorage.setItem("isAvailableUser", true);
        sessionStorage.setItem("isAvailableCricketUser", true);
        // get_user_data(response?.data?.UserID);
        setloding(false);
        storeCookies();
        navigate("/dashboard");
        window.location.reload();
      }
    } catch (e) {
      toast.error(e?.message);
      console.error(e);
    }
    setloding(false);
  };

  return (
    <Container
      sx={{
        backgroundImage: `url(${poster})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        minHeight: "100vh",
      }}
    >
      <Box sx={{}}>
        <Box
          sx={{
            width: "95%",
            marginLeft: "2.5%",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ width: "100%", pt: "5vh" }}>
            <Box
              component="img"
              src={logo}
              sx={{ width: "150px", margin: "auto" }}
            ></Box>
          </Box>
          <Box
            sx={{
              mt: "6vh",
              background: "white",
              borderRadius: "10px",
              padding: "20px 10px",
              "& > p:nth-child(1)": {
                fontSize: "20px",
                fontWeight: "500",
                color: "white",
              },
              "& > p:nth-child(2)": {
                fontSize: "12px",
                fontWeight: "400",
                color: "white",
              },
              background: "rgba(255, 255, 255, 0.15)",
              WebkitBackdropFilter: "blur(17px)",
              backdropFilter: "blur(17px)",
              border: "1px solid rgba(255, 255, 255, 0.075)",
            }}
          >
            <Typography variant="body1" color="initial">
              Forget Password{" "}
            </Typography>
            <Typography variant="body1" color="initial">
              Please Enter mobile no for otp, and verify OTP for reset password.
            </Typography>
            <Box
              component="form"
              sx={{
                width: "95%",
                marginLeft: "2.5%",
                transition: "0.3s",
              }}
              onSubmit={fk.handleSubmit}
            >
              <FormControl fullWidth sx={{ mt: 2 }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3">Enter Mobile No</Typography>
                </Stack>
                <>
                  <TextField
                    id="mobile"
                    type="number"
                    name="mobile"
                    placeholder="Enter mobile no"
                    className="loginfields"
                    value={fk.values.email}
                    onChange={fk.handleChange}
                    onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                  />
                  <p className="!text-sm text-right">
                    <span
                      className="!cursor-pointer"
                      onClick={() => navigate("/")}
                    >
                      Return to Login
                    </span>
                  </p>
                  {fk.touched.mobile && fk.errors.mobile && (
                    <div className="error">{fk.errors.mobile}</div>
                  )}
                </>
                <div className="!flex !justify-center">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span style={{ width: "10px" }}> </span>}
                    renderInput={(props) => (
                      <input
                        {...props}
                        style={{
                          width: "50px",
                          height: "50px",
                          background: "transparent", // Set background to transparent
                          color: "blue", // Set text color to blue
                          border: "2px solid white",
                          textAlign: "center",
                        }}
                      />
                    )}
                  />
                </div>
              </FormControl>
              <div className="flex justify-center !mt-5">
                <Button
                  type="submit"
                  value="Submit"
                  component={NavLink}
                  className="btnLogin"
                  onClick={fk.handleSubmit}
                >
                  Send OTP
                </Button>
              </div>
              <Stack direction="row" className="loginbtnbox" mt={2}></Stack>
              <CustomCircularProgress isLoading={loding} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default ForgetPassword;
