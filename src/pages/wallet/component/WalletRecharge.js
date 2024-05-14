import CachedIcon from "@mui/icons-material/Cached";
import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from "@mui/icons-material/History";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import * as React from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { cashDepositRequestValidationSchema } from "../../../Shared/Validation";
import { zubgback, zubgbackgrad, zubgmid } from "../../../Shared/color";
import audiovoice from "../../../assets/bankvoice.mp3";
import cip from "../../../assets/cip.png";
import dot from "../../../assets/images/circle-arrow.png";
import payment from "../../../assets/images/payment (1).png";
import playgame from "../../../assets/images/playgame.jpg";
import balance from "../../../assets/images/send.png";
import user from "../../../assets/images/user-guide.png";
import payNameIcon2 from "../../../assets/payNameIcon2.png";
import Layout from "../../../component/Layout/Layout";
import { endpoint, rupees } from "../../../services/urls";
import QRScreen from "./QRScreen";
import { useDispatch, useSelector } from "react-redux";
import { get_user_data_fn } from "../../../services/apicalling";
import CryptoJS from "crypto-js";
function WalletRecharge() {
  const [t_id, setT_id] = React.useState();
  const [callBackResponse, setCallBackResponse] = React.useState({
    payment_status: "NO",
  });
  let intervalId;
  const dispatch = useDispatch();
  const aviator_login_data = useSelector(
    (state) => state.aviator.aviator_login_data
  );

  const deposit_amount = localStorage.getItem("amount_set");
  const Deposit_type = localStorage.getItem("Deposit_type");
  const server_provider = localStorage.getItem("server_provider");

  const audioRefMusic = React.useRef(null);
  const login_data =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;
  // const aviator_data = localStorage.getItem("aviator_data");
  const user_name =
    aviator_login_data && JSON.parse(aviator_login_data)?.username;
  const user_id = login_data && JSON.parse(login_data)?.UserID;
  const [deposit_req_data, setDeposit_req_data] = React.useState();
  const [loding, setloding] = React.useState(false);
  const [show_time, set_show_time] = React.useState("0_0");
  const [amount, setAmount] = React.useState({
    wallet: 0,
    winning: 0,
    cricket_wallet: 0,
  });

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    handlePlaySound();
  }, []);

  React.useEffect(() => {
    !aviator_login_data && get_user_data_fn(dispatch);
  }, []);

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

  const initialValues = {
    amount: deposit_amount || 100,
    all_data: { t_id: "", amount: "", date: "" },
  };

  const fk = useFormik({
    initialValues: initialValues,
    validationSchema: cashDepositRequestValidationSchema,
    onSubmit: () => {
      const transaction_id = `${Date.now()}${user_id}`;
      setT_id(transaction_id);
      const fd = new FormData();
      fd.append("UserID", "7704002732");
      fd.append("Email", "mailto:sunlottery@gmail.com");
      fd.append("txtamt", fk.values.amount);
      fd.append("Name", user_name);
      fd.append("TransactionID", transaction_id);

      return toast("We are upgrading for smooth and fast payin please wait...");

      paymentRequest(fd, fk.values.amount);
      fk.setFieldValue("all_data", {
        t_id: fd.get("TransactionID") || "",
        amount: fk.values.amount,
        date: new Date(),
      });
      localStorage.removeItem("amount_set");
    },
  });

  // sajid api
  async function paymentRequest(fd, amnt) {
    setloding(true);
    if (!amnt) {
      toast("Please Enter the amount");
      return;
    }
    const reqbody = {
      user_id: user_id,
      amount: amnt || 1000,
      transection_id: fd.get("TransactionID"),
    };
    const fdata = new FormData();
    fdata.append("user_id", reqbody.user_id);
    fdata.append("amount", reqbody.amount);
    fdata.append("transection_id", reqbody.transection_id);
    fdata.append("Deposit_type", deposit_amount ? Deposit_type : "Null");
    fdata.append("server_provider", deposit_amount ? server_provider : "Null");

    if (deposit_amount) {
      fdata.append("game_type", "1");
    } else {
      fdata.append("game_type", "2");
    }
    try {
      const res = await axios.post(`${endpoint.payment_request}`, fdata);
      const qr_url = JSON.parse(res?.data?.data)?.payment_link || "";
      // const qr_url = JSON.parse(res?.data?.data) || "";
      if (qr_url) {
        setDeposit_req_data(qr_url);
      } else {
        toast("Something went wrong");
      }
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  }

  React.useEffect(() => {
    let x = true;
    if (deposit_req_data) {
      let min = 1;
      let sec = 59;
      const interval = setInterval(() => {
        set_show_time(`${min}_${sec}`);
        if (x) {
          startGetTimeForCallBack();
          x = false;
        }
        sec--;

        if (sec < 0) {
          sec = 59;
          min--;

          if (min < 0) {
            sec = 59;
            min = 1;
            stopPrintingHello();
            clearInterval(interval);
            setDeposit_req_data();
            set_show_time("0_0");
            setloding(false);
          }
        }
      }, 1000);
    }
  }, [deposit_req_data]);

  async function printHello() {
    try {
      const res = await axios.get(
        `${endpoint.recharge_call_bakc}?userid=${user_id}&transectionid=${t_id}`
      );
      console.log(res, "Api response");
      if (res?.data?.payment_status !== "Pending") {
        setTimeout(() => {
          setDeposit_req_data();
          set_show_time("0_0");
          setloding(false);
          stopPrintingHello();
        }, 2000);
      }
      if (res?.data?.msg === "Successfully Data Found") {
        setCallBackResponse(res?.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function startGetTimeForCallBack() {
    intervalId = setInterval(printHello, 20000);
  }

  // Function to stop the interval
  function stopPrintingHello() {
    clearInterval(intervalId); // Clear the interval using its ID
  }

  const audio = React.useMemo(() => {
    return (
      <audio ref={audioRefMusic} hidden>
        <source src={`${audiovoice}`} type="audio/mp3" />
      </audio>
    );
  }, []);

  const rechargeInstruction = React.useMemo(() => {
    return (
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
          <Box component="img" src={user} width={30}></Box>
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontSize: "15px ", color: "white", ml: "10px" }}
          >
            {" "}
            Recharge instructions
          </Typography>
        </Stack>
        <Box
          sx={{
            border: "1px solid white",
            padding: 2,
            borderRadius: "10px",
          }}
        >
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box component="img" src={dot} width={15}></Box>
            <Typography variant="body1" color="initial">
              If the transfer time is up, please fill out the deposit form
              again.
            </Typography>
          </Stack>
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box component="img" src={dot} width={15}></Box>
            <Typography variant="body1" color="initial">
              The transfer amount must match the order you created, otherwise
              the money cannot be credited successfully.
            </Typography>
          </Stack>
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box component="img" src={dot} width={15}></Box>
            <Typography variant="body1" color="initial">
              If you transfer the wrong amount, our company will not be
              responsible for the lost amount!
            </Typography>
          </Stack>
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box component="img" src={dot} width={15}></Box>
            <Typography variant="body1" color="initial">
              Note: do not cancel the deposit order after the money has been
              transferred.
            </Typography>
          </Stack>
        </Box>
      </Box>
    );
  }, []);

  const payment_button = React.useMemo(() => {
    return (
      <>
        <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
          <Box component="img" src={payment} width={30}></Box>
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontSize: "15px ", color: "white", ml: "10px" }}
          >
            Deposit amount
          </Typography>
        </Stack>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            mt: "10px",
          }}
        >
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("amount", 500)}
          >
            {" "}
            ₹ 500
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("amount", 1000)}
          >
            {" "}
            ₹ 1K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("amount", 5000)}
          >
            {" "}
            ₹ 5K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("amount", 10000)}
          >
            {" "}
            ₹ 10K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("amount", 15000)}
          >
            {" "}
            ₹ 15K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("amount", 20000)}
          >
            {" "}
            ₹ 20K
          </Button>
        </Stack>
      </>
    );
  }, []);

  // deposit_req_data
  if (deposit_req_data) {
    window.open(deposit_req_data);
    // return (
    //   <QRScreen
    //     callBackResponse={callBackResponse}
    //     deposit_req_data={deposit_req_data}
    //     show_time={show_time}
    //   />
    // );
  }
  return (
    <Layout>
      {audio}
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
            Deposit
          </Typography>
          <Box component={NavLink} to="/depositHistory">
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
              {" "}
              ₹{" "}
              {deposit_amount
                ? Number(amount?.cricket_wallet || 0)?.toFixed(2)
                : Number(
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
        <Box sx={style.paymentBoxOuter}>
          <Box sx={style.paymentlink} component={NavLink}>
            <Box
              component="img"
              src={payNameIcon2}
              sx={{ width: "100px", height: "80px", borderRadius: "10px" }}
            ></Box>
            <Typography variant="body1" color="initial">
              UPI
            </Typography>
          </Box>
        </Box>
        <Box>
          {/* {React.useMemo(() => {
            return (
              <>
                <Box
                  sx={{
                    padding: "10px",
                    width: "95%",
                    margin: "auto",
                    mt: "20px",
                    background: zubgmid,
                    borderRadius: "10px",
                    mb: 2,
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{ alignItems: "center", mb: "20px" }}
                  >
                    <Box component="img" src={quickpay} width={30}></Box>
                    <Typography
                      variant="body1"
                      color="initial"
                      sx={{ fontSize: "15px ", color: "white", ml: "10px" }}
                    >
                      {" "}
                      Select channel
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      mt: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "48%",
                        background: zubgbackgrad,
                        padding: "15px 20px",
                        borderRadius: "10px",
                        mb: "10px",
                        "&>p": { fontSize: "14px", color: "white" },
                      }}
                    >
                      <Typography variant="body1" color="initial">
                        IMpay-QR
                      </Typography>
                      <Typography variant="body1" color="initial">
                        Balance:100 - 50K
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "48%",
                        background: zubgback,
                        padding: "15px 20px",
                        borderRadius: "10px",
                        mb: "10px",
                        "&>p": { fontSize: "14px", color: "white" },
                      }}
                    >
                      <Typography variant="body1" color="initial">
                        TYpay-QR
                      </Typography>
                      <Typography variant="body1" color="initial">
                        Balance:500 - 50K
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "48%",
                        background: zubgback,
                        padding: "15px 20px",
                        borderRadius: "10px",
                        mb: "10px",
                        "&>p": { fontSize: "14px", color: "white" },
                      }}
                    >
                      <Typography variant="body1" color="initial">
                        HeyPay-APP
                      </Typography>
                      <Typography variant="body1" color="initial">
                        Balance:100 - 50K
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "48%",
                        background: zubgback,
                        padding: "15px 20px",
                        borderRadius: "10px",
                        mb: "10px",
                        "&>p": { fontSize: "14px", color: "white" },
                      }}
                    >
                      <Typography variant="body1" color="initial">
                        UPIpay-APP
                      </Typography>
                      <Typography variant="body1" color="initial">
                        Balance:100 - 50K
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "48%",
                        background: zubgback,
                        padding: "15px 20px",
                        borderRadius: "10px",
                        mb: "10px",
                        "&>p": { fontSize: "14px", color: "white" },
                      }}
                    >
                      <Typography variant="body1" color="initial">
                        BYpay-APP
                      </Typography>
                      <Typography variant="body1" color="initial">
                        Balance:100 - 50K
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "48%",
                        background: zubgback,
                        padding: "15px 20px",
                        borderRadius: "10px",
                        mb: "10px",
                        "&>p": { fontSize: "14px", color: "white" },
                      }}
                    >
                      <Typography variant="body1" color="initial">
                        OKpay-QR
                      </Typography>
                      <Typography variant="body1" color="initial">
                        Balance:500 - 50K
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "48%",
                        background: zubgback,
                        padding: "15px 20px",
                        borderRadius: "10px",
                        mb: "10px",
                        "&>p": { fontSize: "14px", color: "white" },
                      }}
                    >
                      <Typography variant="body1" color="initial">
                        MGpay-QR
                      </Typography>
                      <Typography variant="body1" color="initial">
                        Balance:500 - 100K
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </>
            );
          }, [])} */}
          <Box
            sx={{
              padding: "10px",
              width: "95%",
              margin: "auto",
              mt: "20px",
              background: zubgmid,
              borderRadius: "10px",
              mb: 2,
            }}
          >
            {payment_button}
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                mt: "10px",
              }}
            >
              <OutlinedInput
                fullWidth
                placeholder="Enter amount"
                className="wallet-textfield"
                type="number"
                id="amount"
                name="amount"
                value={fk.values.amount}
                onChange={fk.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
              {fk.touched.amount && fk.errors.amount && (
                <div className="error">{fk.errors.amount}</div>
              )}
              {!deposit_req_data ? (
                <Button sx={style.paytmbtntwo} onClick={fk.handleSubmit}>
                  Deposit
                </Button>
              ) : (
                <div style={style.paytmbtntwo} className="mt-5">
                  <div className="flex w-full justify-between items-center">
                    <span>{fk.values.all_data?.t_id}</span>
                    <div>
                      <Button
                        variant="contained"
                        onClick={() =>
                          window.open(deposit_req_data?.upi_deep_link, "_blank")
                        }
                      >
                        Pay Now
                      </Button>
                      <span>
                        {" "}
                        {show_time.split("_")?.[0]}:
                        {show_time.split("_")?.[1]?.padEnd(2, "0")}
                      </span>
                    </div>
                    <span>
                      {" "}
                      {rupees} {fk.values.all_data?.amount}
                    </span>
                  </div>
                  <div className="!h-[1px] w-full !bg-red-500 !mt-2"></div>
                  <div className="flex w-full justify-between !text-[15px]">
                    <span>Status</span>
                    <span className="!text-red-600 ">Pending</span>
                  </div>
                  <div className="flex w-full justify-between !text-[12px]">
                    <span>Date</span>
                    <span>
                      {moment(fk.values.all_data?.date).format("DD-MM-YYYY")}
                    </span>
                  </div>
                  <div className="flex w-full justify-between !text-[12px]">
                    <span>Time</span>
                    <span>
                      {moment(fk.values.all_data?.date).format("HH:mm:ss")}
                    </span>
                  </div>
                </div>
              )}
            </Stack>
          </Box>
          {rechargeInstruction}
        </Box>
        <CustomCircularProgress isLoading={loding} />
        {/* deposit_req_data */}
        {/* {true && (
          <Dialog
            open={true}
            className=" !flex !items-center !justify-center lg:!bg-transparent !bg-white"
          >
            <div className="!bg-white">
              <QRCode value={deposit_req_data?.upi_qr_code} />
              <p className="!text-blue-600  !mt-2 !text-center !font-bold !text-lg">
                {" "}
                {show_time.split("_")?.[0]}:
                {show_time.split("_")?.[1]?.padEnd(2, "0")}
              </p>
            </div>
          </Dialog>
        )} */}
      </Container>
    </Layout>
  );
}

export default WalletRecharge;

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
    height: "auto",
    background: zubgmid,
    padding: "10px 0px",
    borderRadius: "10px",
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
    my: "20px",
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
