import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
// import * as uuid from "uuid";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { LoginEmailSchemaValidaton } from "../../../Shared/Validation";
import { zubgmid } from "../../../Shared/color";
import { endpoint } from "../../../services/urls";
import { storeCookies } from "../../../Shared/CookieStorage";

function LoginWithEmail() {
  // const device_id = uuid.v4();
  const [loding, setloding] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialValue = {
    email: "",
    pass: "",
    isAllowCheckBox:false
    // device_id: device_id || uuid.v4(),
  };

  const fk = useFormik({
    initialValues: initialValue,
    validationSchema: LoginEmailSchemaValidaton,
    onSubmit: () => {
      if(!fk.values.isAllowCheckBox) {
        toast("Plese Check Remember Password!")
        return
      }
      console.log(fk.values);
      if (fk.values.pass && (fk.values.mob || fk.values.email)) {
        const reqbody = {
          username: fk.values.email || fk.values.mob,
          password: fk.values.pass,
          // device_id: device_id,
        };
        console.log(reqbody);
        loginFunction(reqbody);
      } else return toast("Please fill all details");
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
        localStorage.setItem("logindata", JSON.stringify(response?.data));
        sessionStorage.setItem("isAvailableUser", true);
        sessionStorage.setItem("isAvailableCricketUser", true);
        // get_user_data(response?.data?.UserID);
        setloding(false);
        storeCookies()
        navigate("/dashboard");
        window.location.reload();

      }
    } catch (e) {
      toast.error(e?.message);
      console.error(e);
    }
    setloding(false);
  };

  // const get_user_data = async (id) => {
  //   console.log(id);
  //   try {
  //     const response = await axios.get(
  //       `${endpoint.get_data_by_user_id}?id=${id}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Origin": "*",
  //         },
  //       }
  //     );
  //     console.log(response, "This is response");
  //     if (response?.data?.error === "200") {
  //       localStorage.setItem(
  //         "aviator_data",
  //         JSON.stringify(response?.data?.data)
  //       );
  //     }
  //     sessionStorage.setItem("isAvailableUser", true);
  //     window.location.reload();
  //   } catch (e) {
  //     toast(e?.message);
  //     console.error(e);
  //   }
  // };

  useEffect(() => {
    try {
      const res = axios.get(
        "https://vpayout.com/Upi_controllercallback/check_transaction_status"
      );
      console.log(res, "response of new API");
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
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
          <Typography variant="h3">Email</Typography>
        </Stack>
        <>
          <TextField
            id="email"
            type="email"
            name="email"
            placeholder="Enter email"
            className="loginfields"
            value={fk.values.email}
            onChange={fk.handleChange}
            onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
          />
          {fk.touched.email && fk.errors.email && (
            <div className="error">{fk.errors.email}</div>
          )}
        </>
      </FormControl>
      <Box mt={3}>
        <FormControl fullWidth>
          <Stack direction="row" className="loginlabel">
            <Typography variant="h3">Password</Typography>
          </Stack>
          <OutlinedInput
            id="pass"
            name="pass"
            value={fk.values.pass}
            onChange={fk.handleChange}
            placeholder="Enter password"
            onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
            className="loginfieldspass"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: zubgmid }} />
                  ) : (
                    <Visibility sx={{ color: zubgmid }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          {fk.touched.pass && fk.errors.pass && (
            <div className="error">{fk.errors.pass}</div>
          )}
        </FormControl>
      </Box>
      <Box mt={1}>
        <FormControl fullWidth>
          <FormControlLabel
            required
            onClick={()=>fk.setFieldValue("isAllowCheckBox",!fk.values.isAllowCheckBox)}
            control={<Checkbox checked={fk.values.isAllowCheckBox} sx={{ color: "black !important" }} />}
            label="Remember password"
            sx={{ color: "white" }}
          />
        </FormControl>
      </Box>
      <Stack direction="row" className="loginbtnbox" mt={2}>
        <Button
          type="submit"
          value="Submit"
          component={NavLink}
          className="btnLogin"
          onClick={fk.handleSubmit}
        >
          Let's go
        </Button>

        <Button
          component={NavLink}
          className="btnregister"
          mt={2}
          to="/register"
        >
          Register
        </Button>
      </Stack>
      <CustomCircularProgress isLoading={loding} />
    </Box>
  );
}

export default LoginWithEmail;
