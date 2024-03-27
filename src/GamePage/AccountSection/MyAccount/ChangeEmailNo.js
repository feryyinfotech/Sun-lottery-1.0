import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { MdOutlineMail } from "react-icons/md";

const ChangeEmail = () => {
  const initialValue = {
    email: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    onSubmit: () => {
      console.log(fk.values);
    },
  });

  return (
    <div className="">
      <p>CHANGE EMAIL</p>
      <div className="bg-white bg-opacity-30 rounded-md p-3 py-5 flex items-center">
        <MdOutlineMail className="!text-9xl" />
        <form>
          <p>New email</p>
          <div className="flex justify-center">
          <TextField
            id="email"
            name="email"
            type="email"
            size="small"
            value={fk.values.email}
            onChange={fk.handleChange}
            className="w-[100%] !rounded-md  !outline-none placeholder:!text-gray-100 !capitalize !backdrop-blur-mk !bg-white !bg-opacity-20 !border-opacity-30 !border !border-white"
            placeholder="abc@gmail.com"
          />
          <Button variant="contained" href="#contained-buttons">
            Send
          </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeEmail;
