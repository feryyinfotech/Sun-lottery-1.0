import { Divider, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { IoMdPerson } from "react-icons/io";
import PersonalDetails from "./PersonalDetails";
import ChangePhoneNo from "./ChangePhoneNo";
import ChangeEmail from "./ChangeEmailNo";
import ChangePassword from "./ChangePassword";

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
const MyAccount = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <div>
      <p className="flex items-center gap-5">
        <IoMdPerson className="!text-4xl" />
        <span className="text-2xl">My Profile</span>
      </p>
      <Divider className="!bg-gray-400 !my-2" />
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Personal Details" className="!text-white" {...a11yProps(0)} />
        <Tab label="Change Phone Number" className="!text-white" {...a11yProps(1)} />
        <Tab label="Change Email" className="!text-white" {...a11yProps(2)} />
        <Tab label="Change Password" className="!text-white" {...a11yProps(3)} />
      </Tabs>
      <div className="!text-[12px] mt-8"> 
        {value===0&&<PersonalDetails/>}
        {value===1&&<ChangePhoneNo/>}
        {value===2&&<ChangeEmail/>}
        {value===3&&<ChangePassword/>}
      </div>
    </div>
  );
};

export default MyAccount;
