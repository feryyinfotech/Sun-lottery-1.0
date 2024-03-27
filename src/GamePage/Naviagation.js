import Button from "@mui/material/Button";
import * as React from "react";
import { CiSettings } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import logo from "../assets/batterylogo.PNG";
import CustomDialogBox from "../Shared/CustomDialogBox";
import Login from "./DialogComponent/Login";
import { Avatar, Divider, Menu, MenuItem } from "@mui/material";
import { CiLogout } from "react-icons/ci";

const pages = [
  {
    name: "CRICKET",
    link: "/playgame",
  },
  {
    name: "SPORT",
    link: "/playgame",
  },
  {
    name: "LIVE EVENTS",
    link: "/playgame",
  },
  {
    name: "CASINO",
    link: "/playgame",
  },
  {
    name: "LIVE CASINO",
    link: "/playgame",
  },
  {
    name: "STATISTICS",
    link: "/playgame",
  },
  {
    name: "RESULTS",
    link: "/playgame",
  },
  {
    name: "APPS",
    link: "/playgame",
  },
];

function Navigation() {
  const logindata = localStorage.getItem("aviator_data");

  const navigate = useNavigate();
  const [openCustomDialogBox, setOpenCustomDialogBox] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (id) => {
    setAnchorEl(null);
    id && navigate(`/account/${id}`);
  };

  function logoutFunction() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="w-full h-full flex justify-between items-center bg-black px-4">
      <div className="flex items-center">
        <img src={logo} className="w-[10%]" />
        {pages.map((page) => (
          <div
            className="text-[12px] text-white px-3 cursor-pointer "
            onClick={() => navigate(page?.link)}
          >
            {page.name}
          </div>
        ))}
      </div>
      <div className="flex items-center h-full  gap-3">
        <p
          className="flex gap-2 items-center text-white text-[12px] cursor-pointer"
          onClick={(e) => handleClick(e)}
        >
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 24, height: 24, fontSize: 10 }}
          />{" "}
          <span>324.23 ₹</span>
        </p>
        <CiSettings className="!text-white text-lg" />
        <Button
          variant="contained"
          className="!bg-[#EA3354] !p-1 !text-[10px]"
          onClick={() => {
            logindata ? logoutFunction() : setOpenCustomDialogBox(true);
          }}
        >
          {logindata ? "Logout" : "Login"}
        </Button>
      </div>

      {openCustomDialogBox && (
        <CustomDialogBox
          openCustomDialogBox={openCustomDialogBox}
          setOpenCustomDialogBox={setOpenCustomDialogBox}
          component={<Login />}
          title="Log in to My Account"
        />
      )}

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose("")}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            bgcolor: "#1A1E25",
          },
        }}
      >
        <MenuItem
          onClick={() => handleClose(1)}
          className="!text-white !text-[12px]"
        >
          My account
        </MenuItem>
        <MenuItem
          onClick={() => handleClose(2)}
          className="!text-white !text-[12px]"
        >
          Make a deposit
        </MenuItem>
        <MenuItem
          onClick={() => handleClose(2)}
          className="!text-white !text-[12px]"
        >
          Requests
        </MenuItem>
        <Divider className="!text-gray-400 !bg-gray-400" />
        <MenuItem
          onClick={() => {
            logoutFunction()
          }}
          className="!text-white !text-[12px]"
        >
          <p className="flex items-center gap-2">
            <CiLogout className="!h-[25px]" /> <span>Logout</span>
          </p>
        </MenuItem>
      </Menu>
    </div>
  );
}
export default Navigation;
