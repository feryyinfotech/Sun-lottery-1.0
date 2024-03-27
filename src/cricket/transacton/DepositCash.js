import CachedIcon from "@mui/icons-material/Cached";
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
import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { zubgback, zubgbackgrad, zubgback_cricket } from "../../Shared/color";
import cip from "../../assets/cip.png";
import CloseIcon from "@mui/icons-material/Close";
import balance from "../../assets/images/send.png";
import dot from "../../assets/images/circle-arrow.png";
import quickpay from "../../assets/images/deposit.png";
import payment from "../../assets/images/payment (1).png";
import user from "../../assets/images/user-guide.png";
import payNameIcon2 from "../../assets/payNameIcon2.png";
import Layout from "../../component/Layout/Layout";

function DepositCash() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Layout footer={false}>
      <Container
        className="no-scrollbar"
        sx={{
          background: zubgback,
          width: "100%",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Box sx={style.header}>
          <Box component={NavLink} onClick={goBack}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" color="initial">
            Deposit
          </Typography>
          <Box component={NavLink} to="/cricket/deposit-history">
            <HistoryIcon />
          </Box>
        </Box>
        <Box
          sx={{
            background: zubgback_cricket,
            borderRadius: "10px",
            padding: "20px",
            width: "95%",
            margin: "auto",
            mt: 2,
          }}
        >
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
              ₹3,069.32
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
              sx={{ width: "50px" }}
            ></Box>
            <Typography variant="body1" color="initial">
              UPI
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              padding: "10px",
              width: "95%",
              margin: "auto",
              mt: 2,
              background: zubgback_cricket,
              borderRadius: "10px",
              mb: 2,
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
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

          <Box
            sx={{
              padding: "10px",
              width: "95%",
              margin: "auto",
              mt: 2,
              background: zubgback_cricket,
              borderRadius: "10px",
              mb: 2,
            }}
          >
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
              <Button sx={style.paytmbtn}> ₹ 500</Button>
              <Button sx={style.paytmbtn}> ₹ 1K</Button>
              <Button sx={style.paytmbtn}> ₹ 5K</Button>
              <Button sx={style.paytmbtn}> ₹ 10K</Button>
              <Button sx={style.paytmbtn}> ₹ 15K</Button>
              <Button sx={style.paytmbtn}> ₹ 20K</Button>
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
              <OutlinedInput
                fullWidth
                placeholder="Enter amount"
                className="wallet-textfield"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
              <Button sx={style.paytmbtntwo}>Deposit</Button>
            </Stack>
          </Box>
          <Box
            sx={{
              padding: "10px",
              width: "95%",
              margin: "auto",
              mt: 2,
              background: zubgback_cricket,
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
                  The transfer amount must match the order you created,
                  otherwise the money cannot be credited successfully.
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
        </Box>
      </Container>
    </Layout>
  );
}

export default DepositCash;

const style = {
  header: {
    padding: "8px",
    background: zubgback,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&>p": { color: "white !important", ml: "-30px" },
    "&>a>svg": { color: "white", fontSize: "25px" },
  },
  wthui: {
    textAlign: "center",
    width: "32%",
    minHeight: "15vh",
    background: zubgback_cricket,
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
    background: zubgback_cricket,
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
    borderRadius: "30px",
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
