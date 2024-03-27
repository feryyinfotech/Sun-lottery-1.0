import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { MdOutlineMail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";

const ChangePassword = () => {
  const initialValue = {
    pass: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    onSubmit: () => {
      console.log(fk.values);
    },
  });

  return (
    <div className="">
      <p>CHANGE Password</p>
      <div className="bg-white bg-opacity-30 rounded-md p-3 py-5 flex items-center">
        <IoMdLock className="!text-9xl" />
        <form>
          <p>Enter current password</p>
          <div className="flex justify-center">
          <TextField
            id="pass"
            name="pass"
            type="password"
            size="small"
            value={fk.values.pass}
            onChange={fk.handleChange}
            className="w-[100%] !rounded-md  !outline-none placeholder:!text-gray-100 !capitalize !backdrop-blur-mk !bg-white !bg-opacity-20 !border-opacity-30 !border !border-white"
            placeholder="****************"
          />
          <Button variant="contained" href="#contained-buttons">
            NEXT
          </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
