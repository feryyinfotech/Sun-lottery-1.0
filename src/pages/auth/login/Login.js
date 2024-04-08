import {
  Box,
  Container,
  Stack,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import poster from "../../../assets/images/poster2.jpg";
import LoginWithEmail from "./LoginWithEmail";
import LoginWithMobile from "./LoginWithMobile";
import { get_user_data_fn } from "../../../services/apicalling";
import CryptoJS from 'crypto-js'
import { useDispatch,useSelector } from "react-redux";
function Login() {
  const navigate = useNavigate()
  const [Nav, setNav] = useState(1);

  const dispatch = useDispatch()
  const aviator_login_data = useSelector(
    (state) => state.aviator.aviator_login_data
  );


  const logindata = localStorage.getItem("logindataen") && CryptoJS.AES.decrypt(localStorage.getItem("logindataen"), "anand")?.toString(CryptoJS.enc.Utf8) || null
  // const aviator_data = localStorage.getItem("aviator_data")

  
  // useEffect(() => {
  //   !aviator_login_data && get_user_data_fn(dispatch);
  // }, []);


  useEffect(()=>{
    (logindata) && navigate('/dashboard')
  },[])
  
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
              Login{" "}
            </Typography>
            <Typography variant="body1" color="initial">
              Please log in with your phone number or email If you forget your
              password, please contact customer service
            </Typography>
            <Box>
              <Stack direction="row">
                <Box
                  component={NavLink}
                  onClick={() => setNav(1)}
                  className={Nav === 1 ? "activeNav nav" : "nav"}
                >
                  <Typography variant="h3">LOGIN WITH PHONE</Typography>
                </Box>
                <Box
                  component={NavLink}
                  onClick={() => setNav(2)}
                  className={Nav === 2 ? "activeNav nav" : " nav"}
                >
                  <Typography variant="h3">LOGIN WITH EMAIL</Typography>
                </Box>
              </Stack>
            </Box>
            {Nav === 1 ? <LoginWithMobile/>:<LoginWithEmail/>}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
