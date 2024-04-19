import HistoryIcon from "@mui/icons-material/History";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Button,
  Container,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import CryptoJS from 'crypto-js';
import { useFormik } from "formik";
import * as React from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { withdrawAmountSchemaValidaton } from "../../../Shared/Validation";
import { zubgback, zubgbackgrad, zubgmid } from "../../../Shared/color";
import cip from "../../../assets/cip.png";
import payment from "../../../assets/images/payment (1).png";
import playgame from "../../../assets/images/playgame.jpg";
import Layout from "../../../component/Layout/Layout";
import { endpoint } from "../../../services/urls";
function AddBankDetails() {
  const login_data = localStorage.getItem("logindataen") && CryptoJS.AES.decrypt(localStorage.getItem("logindataen"), "anand")?.toString(CryptoJS.enc.Utf8) || null
  const user_id = login_data &&  JSON.parse(login_data)?.UserID;
 const client = useQueryClient()
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };



  const initialValues = {
    email: "",
    mobile: "",
    bank_name: "",
    name: "",
    ifsc: "",
    account_number: "",
  };

  const fk = useFormik({
    initialValues: initialValues,
    validationSchema: withdrawAmountSchemaValidaton,
    onSubmit: () => {
      console.log(fk.values);
      const fd = new FormData();
      fd.append("email", fk.values.email);
      fd.append("mobile", fk.values.mobile);
      fd.append("bank_name", fk.values.bank_name);
      fd.append("name", fk.values.name);
      fd.append("ifsc_code", fk.values.ifsc);
      fd.append("account_number", fk.values.account_number);
      fd.append("user_id", user_id);

      addbankDetailsFunction(fd);
      // paymentRequest(fd, fk.values.amount);
      // fk.setFieldValue("all_data", {
      //   t_id: fd.get("TransactionID") || "",
      //   amount: fk.values.amount,
      //   date: new Date(),
      // });
    },
  });

  const addbankDetailsFunction = async (fd) => {
    try {
      const response = await axios.post(`${endpoint.add_bank_details}`,fd);
      toast(response?.data?.msg)
      client.refetchQueries("bank_list_details");
      if(response?.data?.msg){
        navigate('/add-bank-details/pre-added-bank-details')
      }
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  return (
    <Layout>
      <Container
        className="no-scrollbar"
        sx={{
          background: zubgback,
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 4,
        }}
      >
        <Box sx={style.header}>
          <Box component={NavLink} onClick={goBack}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" color="initial">
            Add Bank Details
          </Typography>
          <Box component={NavLink} to="/add-bank-details/pre-added-bank-details">
            <HistoryIcon />
          </Box>
        </Box>
        <Box
          sx={{
            background: zubgmid,
            borderRadius: "10px",
            padding: "30px 20px",
            width: "95%",
            margin: "auto",
            position: "relative",
          }}
        >
          <Box
            component="img"
            src={playgame}
            sx={{
              opacity: "0.2",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          ></Box>

          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              mt: "20px",
            }}
          >
            <Box component="img" src={cip} width={50}></Box>
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "14px ", color: "white", ml: "10px" }}
            >
              **** **** **** ****
            </Typography>
          </Stack>
        </Box>
        <Box>
          <Box
            sx={{
              padding: "10px",
              width: "95%",
              margin: "auto",
              mt: "20px",
              background: zubgmid,
              borderRadius: "10px",
              mb: 5,
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
              <Box component="img" src={payment} width={30}></Box>
              <Typography
                variant="body1"
                color="initial"
                sx={{ fontSize: "15px ", color: "white", ml: "10px" }}
              >
                Withdrawal amount
              </Typography>
            </Stack>
            <Box mt={2} component="form"   onSubmit={fk.handleSubmit}>
              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3">
                    Account holder name <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="name"
                  name="name"
                  type="text"
                  value={fk.values.name}
                  onChange={fk.handleChange}
                  placeholder="Enter account holder name *"
                  className="withdrawalfield"
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
                {fk.touched.name && fk.errors.name && (
                  <div className="error">{fk.errors.name}</div>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3">
                    Enter Email <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  value={fk.values.email}
                  onChange={fk.handleChange}
                  placeholder="Enter email *"
                  className="withdrawalfield"
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
                {fk.touched.email && fk.errors.email && (
                  <div className="error">{fk.errors.email}</div>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3">
                    Enter Mobile <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="mobile"
                  name="mobile"
                  type="number"
                  value={fk.values.mobile}
                  onChange={fk.handleChange}
                  placeholder="Enter mobile *"
                  className="withdrawalfield"
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
                {fk.touched.mobile && fk.errors.mobile && (
                  <div className="error">{fk.errors.mobile}</div>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3">
                    Bank name <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="bank_name"
                  name="bank_name"
                  type="text"
                  value={fk.values.bank_name}
                  onChange={fk.handleChange}
                  placeholder="Enter bank name *"
                  className="withdrawalfield"
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
                {fk.touched.bank_name && fk.errors.bank_name && (
                  <div className="error">{fk.errors.bank_name}</div>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3">
                    IFSC code <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="ifsc"
                  name="ifsc"
                  type="text"
                  value={fk.values.ifsc}
                  onChange={fk.handleChange}
                  placeholder="Enter IFSC code *"
                  className="withdrawalfield"
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
                {fk.touched.ifsc && fk.errors.ifsc && (
                  <div className="error">{fk.errors.ifsc}</div>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3">
                    Account number <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="account_number"
                  name="account_number"
                  type="text"
                  value={fk.values.account_number}
                  onChange={fk.handleChange}
                  placeholder="Enter account number *"
                  className="withdrawalfield"
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
                {fk.touched.account_number && fk.errors.account_number && (
                  <div className="error">{fk.errors.account_number}</div>
                )}
              </FormControl>
           
              <Button
                sx={style.paytmbtntwo}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  fk.handleSubmit();
                }}
              >
                Submit{" "}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default AddBankDetails;

const style = {
  header: {
    padding: "15px 8px",
    background: zubgback,
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
  wthui: {
    textAlign: "center",
    width: "32%",
    minHeight: "15vh",
    background: zubgmid,
    borderRadius: "10px",
    mb: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&>div>p": { color: "white" },
  },
  paymentlink: {
    width: "32%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "15vh",
    background: zubgmid,
    borderRadius: "10px",
    mb: "10px",
    "&>p": {
      color: "white",
      fontSize: "12px",
      fontWeight: "500",
      textAlign: "center",
      mt: "5px",
    },
  },
  paymentBoxOuter: {
    width: "95%",
    margin: "auto",
    my: "10px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paytmbtn: {
    mb: 2,
    background: zubgback,
    color: "white !important",
    width: "31%",
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgbackgrad, border: "1px solid transparent" },
  },
  paytmbtntwo: {
    borderRadius: "5px",
    textTransform: "capitalize",
    mb: 2,
    background: zubgbackgrad,
    color: "white !important",
    width: "100%",
    mt: "20px",
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgbackgrad, border: "1px solid transparent" },
  },
  rechargeinstext: {
    mb: "10px",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { marginLeft: "10px", color: "white !important", fontSize: "14px" },
  },
};

