import { Button, Checkbox, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { TiArrowRightThick } from "react-icons/ti";
import Login from "./DialogComponent/Login";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
// import toast from "react-hot-toast";
// import { endpoint } from "../services/urls";
import CustomDialogBox from "../Shared/CustomDialogBox";
import { dummy_aviator } from "../services/urls";
// import { useDispatch, useSelector } from "react-redux";
// import { get_user_data_fn } from "../services/apicalling";
const MainPage = () => {
  const isMediumScreen = useMediaQuery({ minWidth: 800 });

  const logindata = localStorage.getItem("user");
  const navigate = useNavigate();
  const [openCustomDialogBox, setOpenCustomDialogBox] = useState(false);
  const initialValue = {
    country: "India",
    currency: "INR",
    mob: "",
    pass: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    onSubmit: () => {
      const reqBody = {
        email: fk.values.mob,
        password: fk.values.pass,
      };
      userLogin(reqBody);
    },
  });

  async function userLogin(reqBody) {
    try {
      const res = await axios.post(`${dummy_aviator}/api/v1/login`, reqBody);
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res?.data?.data));
      navigate("/playgame");
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    logindata && navigate("/playgame");
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(https://static-direct.ibbf55-resources.com/webStaticIB/promo/aviator_reg/img/bg/bg.svg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}
      className="flex  overflow-hidden"
    >
      {isMediumScreen && (
        <div className="w-[70%] h-[100%]  lg:block sm:hidden md:hidden">
          <p className="text-white h-[100%] flex flex-col  justify-end pb-[5%] pl-[10%]">
            <Button
              variant="contained"
              className="!rounded-full !mt-5 w-[15%] !text-xl !font-bold !bg-white !bg-opacity-30"
            >
              25.00x
            </Button>
            <span className="text-[50px] fontsize">PLAY WITHOUT RISK</span>
            <span className="text-[50px] fontsize">
              GET <sapn className="text-yellow-500"> 150%</sapn> BONUS
            </span>
            <span className="text-[50px] fontsize">
              AND <sapn className="text-yellow-500"> 50</sapn> FREESPINS
            </span>
            <div className="flex items-center">
              <div className="bg-white bg-opacity-30 py-3 px-8 rounded-full">
                1. Sign up
              </div>
              <p className="text-xl">
                <TiArrowRightThick className="text-4xl  !text-opacity-30" />
              </p>
              <div className="bg-white bg-opacity-30 py-3 px-8 rounded-full">
                2. Make your first deposit
              </div>
              <p className="text-xl">
                <TiArrowRightThick className="text-4xl  !text-opacity-30" />
              </p>
              <div className="bg-white bg-opacity-30 py-3 px-8 rounded-full">
                3. Get a 150% bonus
              </div>
            </div>
          </p>
        </div>
      )}
      <div className="lg:w-[30%] md:w-[100%] sm:w-[100%] lg:mr-[5%] sm:m-2 md:m-2 h-[100%]  flex flex-col  justify-center text-white">
        <div className="bg-[#93002e] p-8 rounded-lg">
          <p className="text-2xl">Registration</p>
          <p className="text-[10px] mt-2">CHOOSE COUNTRY*</p>
          <TextField
            select
            size="small"
            id="country"
            name="country"
            value={fk.values.country}
            onChange={fk.handleChange}
            className="w-[100%] !outline-none placeholder:!text-gray-100 !capitalize !backdrop-blur-mk !bg-white !bg-opacity-20 !border-opacity-30 !border !border-white"
            placeholder="Select Country"
          >
            <MenuItem value="India" selected>
              India
            </MenuItem>
            <MenuItem value="Bangladesh">Bangladesh</MenuItem>
          </TextField>
          <p className="text-[10px] pt-3">CHOOSE CURRENCY*</p>
          <TextField
            select
            size="small"
            id="currency"
            name="currency"
            value={fk.values.currency}
            onChange={fk.handleChange}
            className="w-[100%] !outline-none placeholder:!text-gray-100 !capitalize !backdrop-blur-mk !bg-white !bg-opacity-20 !border-opacity-30 !border !border-white"
            placeholder="Select Country"
          >
            <MenuItem value={"INR"}>INR</MenuItem>
            <MenuItem value={"BDT"}>BDT</MenuItem>
            <MenuItem value={"PKR"}>PKR</MenuItem>
          </TextField>
          <p className="text-[10px] pt-3">PHONE NO*</p>
          <TextField
            id="mob"
            name="mob"
            size="small"
            value={fk.values.mob}
            onChange={fk.handleChange}
            className="w-[100%] !outline-none placeholder:!text-gray-100 !capitalize !backdrop-blur-mk !bg-white !bg-opacity-20 !border-opacity-30 !border !border-white"
            placeholder="+91 987 654 3210"
          />
          <p className="text-[10px] pt-3">Password*</p>
          <TextField
            id="pass"
            name="pass"
            type="password"
            size="small"
            value={fk.values.pass}
            onChange={fk.handleChange}
            className="w-[100%]  !outline-none placeholder:!text-gray-100 !capitalize !backdrop-blur-mk !bg-white !bg-opacity-20 !border-opacity-30 !border !border-white"
            placeholder="Create a new Password"
          />
          <p className="text-[10px] pt-1">All Least 8 Character</p>
          <p className="text-[10px]">
            You Must use latin Character and number when filling in the form
          </p>
          <div className="flex items-center gap-2">
            <Checkbox size="small !p-0" />
            <span className="text-[10px] underline cursor-pointer ">
              Terms & Condition{" "}
              <sapn>and Confirm that you are more than 18 years of age.</sapn>
            </span>
          </div>
          <Button
            onClick={fk.handleSubmit}
            variant="contained"
            className="!w-[100%] !rounded-full !mt-5"
          >
            REGISTRATION
          </Button>
          <p className="text-white-800 text-[10px] text-center pt-1  cursor-pointer underline">
            <span onClick={() => setOpenCustomDialogBox(true)}>
              Already with Batery?
            </span>
          </p>
        </div>
      </div>

      {openCustomDialogBox && (
        <CustomDialogBox
          openCustomDialogBox={openCustomDialogBox}
          setOpenCustomDialogBox={setOpenCustomDialogBox}
          component={<Login />}
          title="Log in to My Account"
        />
      )}
    </div>
  );
};

export default MainPage;
