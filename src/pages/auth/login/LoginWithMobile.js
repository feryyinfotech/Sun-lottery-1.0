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
import React, { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
// import * as uuid from "uuid";
import { LoginMobileSchemaValidaton } from "../../../Shared/Validation";
import { zubgmid } from "../../../Shared/color";
import { endpoint } from "../../../services/urls";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { storeCookies } from "../../../Shared/CookieStorage";
import poster from "../../../assets/images/poster2.jpg";
import CryptoJS from 'crypto-js'
function LoginWithMobile() {
  // const device_id = uuid.v4();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loding, setloding] = useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialValue = {
    mob: "",
    pass: "",
    isAllowCheckBox: false,
    // device_id: device_id || uuid.v4(),
  };

  const fk = useFormik({
    initialValues: initialValue,
    validationSchema: LoginMobileSchemaValidaton,
    onSubmit: () => {
      if (!fk.values.isAllowCheckBox) {
        toast("Plese Check Remember Password!");
        return;
      }

      const reqbody = {
        username: fk.values.mob,
        password: fk.values.pass,
        // device_id: device_id,
      };
      console.log(reqbody);
      loginFunction(reqbody);
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

  const get_user_data = async (id) => {
    try {
      const response = await axios.get(
        `${endpoint.get_data_by_user_id}?id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response?.data?.error === "200") {
        localStorage.setItem(
          "aviator_data",
          JSON.stringify(response?.data?.data)
        );
        sessionStorage.setItem("isAvailableUser", true);
      }
    } catch (e) {
      toast(e?.message);
      console.error(e);
    }
  };

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
      <Box mt={2}>
        <FormControl fullWidth>
          <Stack direction="row" className="loginlabel">
            <Typography variant="h3">Phone number</Typography>
          </Stack>
          <TextField
            id="mob"
            name="mob"
            type="number"
            value={fk.values.mob}
            onChange={fk.handleChange}
            onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
            placeholder="Enter phone number"
            className="loginfields"
          />
          {fk.touched.mob && fk.errors.mob ? (
            <div className="error">{fk.errors.mob}</div>
          ) : (
            String(fk.values.mob)?.includes(".") && (
              <div className="error">Dot not allowed in mob no</div>
            )
          )}
        </FormControl>
      </Box>
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
          <p className="!text-end col-span-1 ">
            <span
              className="!text-white !cursor-pointer"
              onClick={() => navigate("/forget-password")}
            >
              Forget Password?
            </span>
          </p>
        </FormControl>
      </Box>
      <Box mt={1}>
        <FormControl fullWidth>
          <FormControlLabel
            required
            onClick={() =>
              fk.setFieldValue("isAllowCheckBox", !fk.values.isAllowCheckBox)
            }
            control={
              <Checkbox
                checked={fk.values.isAllowCheckBox}
                sx={{ color: "black !important" }}
              />
            }
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

export default LoginWithMobile;
