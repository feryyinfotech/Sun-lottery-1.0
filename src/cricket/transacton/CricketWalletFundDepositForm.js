import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Button,
  Container,
  FormControl,
  MenuItem,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as React from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import {
  zubgcrickblue,
  zubgcrickorange,
  zubgmid
} from "../../Shared/color";
import Layout from "../../component/Layout/Layout";

function CricketWalletFundDepositForm() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const initialValue = {
    amount: "",
    deposit_type: "Select Deposit Type",
    service_provider: "Select Service Provider",
  };

  const fk = useFormik({
    initialValues: initialValue,
    onSubmit: () => {
      if (
        !fk.values.amount ||
        fk.values.deposit_type === "Select Deposit Type" ||
        fk.values.service_provider === "Select Service Provider"
      ) return toast("Please Choose all Fields")
      localStorage.setItem("amount_set", fk.values.amount);
      localStorage.setItem("Deposit_type", fk.values.deposit_type);
      localStorage.setItem("server_provider", fk.values.service_provider);
      
      navigate("/wallet/Recharge");
    },
  });
  return (
    <Layout footer={false}>
      <Container className="no-scrollbar" sx={style.container}>
        <Box sx={style.header}>
          <Box component={NavLink} onClick={() => goBack()}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" color="initial">
            Cricket Wallet Fund Deposit Request
          </Typography>
          <Typography variant="body1" color="initial">
            {" "}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "95%",
            marginLeft: "2.5%",
            background: zubgcrickorange,
            borderRadius: "10px",
            padding: "10px",
            mt: "10px",
          }}
        >
          <Box mt={2} component="form">
            <Box mt={2}>
              <FormControl fullWidth>
                <Stack direction="row" className="loginlabel">
                  <p className={"!text-white"}>Enter Amount</p>
                </Stack>
                <OutlinedInput
                  placeholder="Enter Amount"
                  type="number"
                  name="amount"
                  id="amount"
                  value={fk.values.amount}
                  onChange={fk.handleChange}
                  className="loginfieldspass"
                />
              </FormControl>
            </Box>
            <Box mt={2}>
              <FormControl fullWidth>
                <Stack direction="row" className="loginlabel">
                  <p className={"!text-white"}>Select Deposit Type</p>
                </Stack>
                <TextField
                  placeholder="Select Deposit Type"
                  select
                  id="deposit_type"
                  name="deposit_type"
                  value={fk.values.deposit_type}
                  onChange={fk.handleChange}
                  InputProps={{
                    style: {
                      borderColor: "#4939c1",
                      borderWidth: "1px",
                      color: "white",
                    },
                  }}
                >
                  <MenuItem value="Select Deposit Type">
                    Select Deposit Type
                  </MenuItem>
                  <MenuItem value="New Id">New Id</MenuItem>
                  <MenuItem value="Recharge">Recharge</MenuItem>
                </TextField>
              </FormControl>
            </Box>
            <Box mt={2}>
              <FormControl fullWidth>
                <Stack direction="row" className="loginlabel">
                  <p className={"!text-white"}>Select Service Provider Type</p>
                </Stack>
                <TextField
                  placeholder="Select Deposit Type"
                  select
                  id="service_provider"
                  name="service_provider"
                  value={fk.values.service_provider}
                  onChange={fk.handleChange}
                  InputProps={{
                    style: {
                      borderColor: "#4939c1",
                      borderWidth: "1px",
                      color: "white", // Set text color to white
                    },
                  }}
                >
                  <MenuItem value="Select Service Provider">
                    Select Service Provider
                  </MenuItem>
                  <MenuItem value="silverexch">silverexch</MenuItem>
                  <MenuItem value="lordsexch">lordsexch</MenuItem>
                  <MenuItem value="tenexch">tenexch</MenuItem>
                  <MenuItem value="lotusbook247">lotusbook247</MenuItem>
                  <MenuItem value="diamondexch99">diamondexch99</MenuItem>
                </TextField>
              </FormControl>
              {/* <div className="!flex !justify-between !text-white !pt-5">
                <p>Status:</p>
                <p className="!text-green-500">Success</p>
              </div>
              <div className="!flex !justify-between !text-white">
                <p>Go For Login:</p>
                <p className="!text-blue-500 !cursor-pointer" onClick={()=>navigate('/cricket/registration')}>Click here for login</p>
              </div> */}
              <Button sx={style.paytmbtntwo} onClick={fk.handleSubmit}>
                Submit
              </Button>
            </Box>{" "}
          </Box>
        </Box>
        {/* {[1, 2, 3, 4, 5, 56, 6]?.map((i, index) => {
          return (
            <Box
              sx={{
                width: "95%",
                marginLeft: "2.5%",
                background: zubgcrickblue,
                borderRadius: "10px",
                padding: "10px",
                mt: "10px",
                color: "white",
              }}
            >
              <div className="!flex !justify-between">
                <span>Deposit</span>
                <span>Expired</span>
                <span>{rupees} 1000</span>
              </div>
              <div className="!flex !justify-between !text-[12px]">
                <span>Deposit Type</span>
                <span>{i % 2 === 0 ? "Recharge" : "New ID"}</span>
              </div>
              <div className="!flex !justify-between !text-[12px]">
                <span>Provider</span>
                <span>{i % 2 === 0 ? "A" : "B"}</span>
              </div>
              <div className="!text-[10px] !w-full !flex !justify-between">
                <span>
                  {moment(Date.now()).format("DD-MM-YYYY")}{" "}
                  {moment(Date.now()).format("HH:mm")}
                </span>
                <span className="!text-red-500">Pending</span>
              </div>
            </Box>
          );
        })} */}
      </Container>
    </Layout>
  );
}

export default CricketWalletFundDepositForm;

export const style = {
  container: {
    background: "#005543",
    width: "100%",
    height: "100vh",
    overflow: "auto",
  },
  header: {
    padding: "15px 8px",
    background: '#005543',
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
      color: "white",
    },
    "& > a > svg": {
      color: "white",
      fontSize: "35px",
    },
  },
  notificationBox: {
    width: "95%",
    marginLeft: "2.5%",
    borderRadius: "10px",
    background: zubgmid,
    padding: "10px",
    mt: "10px",
    "&>div>div>p": {
      color: "white",
      fontSize: "14px",
      marginLeft: "10px",
      fontWeight: "500",
    },
    "&>p": {
      color: "white",
      fontSize: "13px",
      marginLeft: "0px",
      fontWeight: "500",
      mt: "10px",
    },
    "&>div>div>svg": { color: "white", fontSize: "24px" },
    "&>div>svg": { color: "white", fontSize: "24px" },
  },
  notificationStack: { alignItems: "center", justifyContent: "space-between" },
  paytmbtntwo: {
    borderRadius: "5px",
    textTransform: "capitalize",
    mb: 2,
    background: '#00B55E',
    color: "white !important",
    width: "100%",
    mt: "20px",
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgcrickblue, border: "1px solid transparent" },
  },
};
