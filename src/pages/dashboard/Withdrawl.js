import CachedIcon from "@mui/icons-material/Cached";
import HistoryIcon from "@mui/icons-material/History";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Button,
  Container,
  FormControl,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as React from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import {
  withdraw_amount_validation_schema
} from "../../Shared/Validation";
import { zubgback, zubgbackgrad, zubgmid } from "../../Shared/color";
import cip from "../../assets/cip.png";
import payment from "../../assets/images/payment (1).png";
import playgame from "../../assets/images/playgame.jpg";
import balance from "../../assets/images/send.png";
import audiovoice from "../../assets/images/withdrawol_voice.mp3";
import Layout from "../../component/Layout/Layout";
import { BankListDetails } from "../../services/apicalling";
import { endpoint } from "../../services/urls";

function Withdrawl() {
  const login_data = localStorage.getItem("logindata");
  const user_id = JSON.parse(login_data)?.UserID;
  const [amount, setAmount] = React.useState({ wallet: 0, winning: 0 });
  const [lodint, setloding] = React.useState(false);
  const audioRefMusic = React.useRef(null);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const walletamountFn = async () => {
    try {
      const response = await axios.get(
        `${endpoint.userwallet}?userid=${user_id}`
      );

      setAmount(response?.data?.data);
      // console.log(response,"response")
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  React.useEffect(() => {
    walletamountFn();
  }, []);

  const { isLoading, data } = useQuery(
    ["bank_list_details"],
    () => BankListDetails(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );
  const result = React.useMemo(() => data?.data?.data, [data]);

  console.log(result, "msg added");

  const initialValues = {
    amount: "",
    // email: "",
    // mobile: "",
    description: "",
    // bank_name: "",
    // name: "",
    // ifsc: "",
    // account_number: "",
    // transaction_id: "",
    bank_id: "Select Bank",
  };

  const fk = useFormik({
    initialValues: initialValues,
    validationSchema: withdraw_amount_validation_schema,
    onSubmit: () => {
      if (amount?.winning < fk.values.amount)
        return toast("Your winning amount is low.");
      if (fk.values.bank_id === "Select Bank")
        return toast("Select Bank Account");
      const data = result?.find((i) => i?.id === fk.values.bank_id);
      console.log(data, "This is bank data");
      if (!data) return toast("Data not found");

      const fd = new FormData();
      fd.append("Amount", fk.values.amount);
      fd.append("Email", data?.email);
      fd.append("Mobile", data?.mobile);
      fd.append("Description", fk.values.description);
      fd.append("BankName", data?.bank_name);
      fd.append("Name", data?.holder_name);
      fd.append("Ifsc", data?.ifsc);
      fd.append("Account", data?.account);
      fd.append("TransactionID", `${Date.now()}${user_id}`);
      fd.append("user_id", user_id);

      withdraw_payment_Function(fd);
      // paymentRequest(fd, fk.values.amount);
      // fk.setFieldValue("all_data", {
      //   t_id: fd.get("TransactionID") || "",
      //   amount: fk.values.amount,
      //   date: new Date(),
      // });
    },
  });

  const withdraw_payment_Function = async (fd) => {
    setloding(true);
    try {
      const response = await axios.post(`${endpoint.withdraw_payment}`, fd);

      // setAmount(response?.data?.data);
      console.log(response, "response");
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
    setloding(false);
  };

  const handlePlaySound = async () => {
    try {
      if (audioRefMusic?.current?.pause) {
        await audioRefMusic?.current?.play();
      } else {
        await audioRefMusic?.current?.pause();
      }
    } catch (error) {
      // Handle any errors during play
      console.error("Error during play:", error);
    }
  };
  


  React.useEffect(() => {
    handlePlaySound();
  }, []);



  return (
    <Layout>
     {React.useMemo(() => {
        return (
          <audio ref={audioRefMusic} hidden>
            <source src={`${audiovoice}`} type="audio/mp3" />
          </audio>
        );
      }, [])}

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
        <CustomCircularProgress isLoading={isLoading || lodint} />
        <Box sx={style.header}>
          <Box component={NavLink} onClick={goBack}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" color="initial">
            Withdrawal
          </Typography>
          <Box component={NavLink} to="/withdravalHistory">
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
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Box component="img" src={balance} width={50}></Box>
            <Typography
              variant="body1"
              color="initial"
              sx={{
                fontSize: "16px ",
                fontWeight: 500,
                color: "white",
                ml: "10px",
              }}
            >
              {" "}
              Balance
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ alignItems: "center", mt: "10px" }}>
            <Typography
              variant="body1"
              color="initial"
              sx={{
                fontSize: "30px ",
                fontWeight: "600",
                color: "white",
                mr: "10px",
              }}
            >
              ₹{" "}
              {Number(
                Number(amount?.wallet || 0) + Number(amount?.winning || 0)
              )?.toFixed(2)}
            </Typography>
            <CachedIcon sx={{ color: "white" }} />
          </Stack>
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
            <Box mt={2} component="form" onSubmit={fk.handleSubmit}>
              {/* <FormControl fullWidth sx={{ mt: "10px" }}>
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
              </FormControl> */}
              {/* amount */}
              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3">
                    Enter amount <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="amount"
                  name="amount"
                  type="number"
                  value={fk.values.amount}
                  onChange={fk.handleChange}
                  placeholder="Enter amount *"
                  className="withdrawalfield"
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
                {fk.touched.amount && fk.errors.amount && (
                  <div className="error">{fk.errors.amount}</div>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3">
                    Bank name <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  select
                  id="bank_id"
                  name="bank_id"
                  value={fk.values.bank_id}
                  onChange={fk.handleChange}
                  className="withdrawalfield"
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                  InputProps={{
                    style: {
                      borderColor: "#4939c1",
                      borderWidth: "1px",
                      color: "white",
                      background: "#281970",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <MenuItem value={"Select Bank"}>Select Bank</MenuItem>
                  {result?.map((i, index) => {
                    return (
                      <MenuItem value={i?.id}>
                        {i?.bank_name} ({i?.account})
                      </MenuItem>
                    );
                  })}
                </TextField>
                {fk.touched.bank_id && fk.errors.bank_id && (
                  <div className="error">{fk.errors.bank_id}</div>
                )}
              </FormControl>

              {/* <FormControl fullWidth sx={{ mt: "10px" }}>
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
              </FormControl> */}
              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3">
                    Description <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="description"
                  name="description"
                  type="text"
                  rows={3}
                  multiline={true}
                  value={fk.values.description}
                  onChange={fk.handleChange}
                  placeholder="Enter description *"
                  className="withdrawalfield !border-[2px] !border-[#ff82823d] !bg-[#281970] !rounded-[10px] no-scrollbar !text-white"
                  InputProps={{
                    style: {
                      color: "white", // Text color
                      "::placeholder": {
                        color: "white", // Placeholder color
                      },
                    },
                  }}
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
                {fk.touched.description && fk.errors.description && (
                  <div className="error">{fk.errors.description}</div>
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
                Withdrawal{" "}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default Withdrawl;

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
