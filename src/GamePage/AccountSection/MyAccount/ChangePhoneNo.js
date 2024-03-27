import { Edit } from "@mui/icons-material";
import { Button, Switch, TextField } from "@mui/material";
import React from "react";
import { MdEditNote } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { useFormik } from "formik";

const ChangePhoneNo = () => {
  const initialValue = {
    mob: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    onSubmit: () => {
      console.log(fk.values);
    },
  });

  return (
    <div className="">
      <p>CHANGE PHONE NO</p>
      <div className="bg-white bg-opacity-30 rounded-md p-3 py-5 flex items-center">
        <FaMobileAlt className="!text-9xl" />
        <form>
          <p>New phone number</p>
          <div className="flex justify-center">
          <TextField
            id="mob"
            name="mob"
            type="number"
            size="small"
            value={fk.values.mob}
            onChange={fk.handleChange}
            className="w-[100%] !rounded-md  !outline-none placeholder:!text-gray-100 !capitalize !backdrop-blur-mk !bg-white !bg-opacity-20 !border-opacity-30 !border !border-white"
            placeholder="000-000-0000"
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

export default ChangePhoneNo;
