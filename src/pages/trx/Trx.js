import { Box, Container, Dialog, Stack, Typography } from "@mui/material";
import axios from "axios";
import CryptoJS from "crypto-js";
import * as React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import { zubgback, zubgbackgrad } from "../../Shared/color";
import cash from "../../assets/images/cash-withdrawal.png";
import deposit from "../../assets/images/deposit (1).png";
import Timeactive from "../../assets/images/fast-time (1).png";
import Timeinactive from "../../assets/images/fast-time.png";
import Layout from "../../component/Layout/Layout";
import { endpoint } from "../../services/urls";
import WinFiveMin from "./component/WinOneMin/WinFiveMin";
import WinLossPopup from "./component/WinOneMin/WinLossPopup";
import WinOneMin from "./component/WinOneMin/WinOneMin";
import WinThreeMin from "./component/WinOneMin/WinThreeMin";
function Win() {
  const navigate = useNavigate();
  const login_data =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;
  const user_id = login_data && JSON.parse(login_data)?.UserID;
  const [Tab, setTab] = useState(1);
  const [opendialogbox, setOpenDialogBox] = useState(false);
  const isAppliedbet = localStorage.getItem("betApplied");
  const dummycounter = useSelector((state) => state.aviator.dummycounter);

  const walletamount = async () => {
    try {
      const response = await axios.get(
        `${endpoint.userwallet}?userid=${user_id}`
      );
      return response;
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  const { isLoading, data } = useQuery(["walletamount"], () => walletamount(), {
    refetchOnMount: false,
    refetchOnReconnect: true,
  });

  const amount = data?.data?.data || 0;

  React.useEffect(() => {
    setTimeout(() => {
      if (isAppliedbet?.split("_")?.[1] === String(true)) {
        setOpenDialogBox(true);
        setTimeout(() => {
          setOpenDialogBox(false);
          localStorage.setItem("betApplied", false);
        }, 5000);
      }
    }, 1000);
  }, [dummycounter]);

  return (
    <Layout footer={false}>
      <Container sx={styles.root}>
        <Box sx={{ padding: 2 }}>
          <Stack direction="row" sx={styles.depositWithdrawContainer}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box className="serv-item cursor-pointer">
                <Box
                  component="img"
                  src={deposit}
                  alt="Deposit"
                  sx={styles.depositWithdrawIcon}
                  onClick={() => navigate("/wallet/Recharge")}
                />
              </Box>
              <Typography
                variant="body1"
                color="initial"
                className="db-header"
                sx={{ xolor: "white", textAlign: "center" }}
              >
                Deposit
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" color="initial" className="b-val">
                ₹{" "}
                {Number(
                  Number(amount?.wallet || 0) + Number(amount?.winning || 0) ||
                    0
                )?.toFixed(2)}
              </Typography>
              <Typography variant="body1" color="initial" className="b-valp">
                Available Balance
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box className="serv-item">
                <Box
                  onClick={() => navigate("/Withdrawal")}
                  component="img"
                  src={cash}
                  alt="Withdraw"
                  sx={styles.depositWithdrawIcon}
                  className="!cursor-pointer"
                />
              </Box>
              <Typography variant="body1" color="initial" className="db-header">
                Withdraw
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box
          sx={{
            background: zubgbackgrad,
            width: "95%",
            marginLeft: "2.5%",
            borderRadius: "10px",
            padding: "5px",
          }}
        >
          <Stack direction="row">
            <Box
              component={NavLink}
              onClick={() => setTab(1)}
              className={Tab === 1 ? "activewinNav Winnav" : "Winnav"}
            >
              {Tab === 1 ? (
                <Box component="img" src={Timeinactive} width={50}></Box>
              ) : (
                <Box component="img" src={Timeactive} width={50}></Box>
              )}
              <Typography variant="h3" color="initial">
                TRX 1Min
              </Typography>
            </Box>
            <Box
              component={NavLink}
              onClick={() => setTab(2)}
              className={Tab === 2 ? "activewinNav Winnav" : " Winnav"}
            >
              {Tab === 2 ? (
                <Box component="img" src={Timeinactive} width={50}></Box>
              ) : (
                <Box component="img" src={Timeactive} width={50}></Box>
              )}
              <Typography variant="h3" color="initial">
                TRX 3Min
              </Typography>
            </Box>
            <Box
              component={NavLink}
              onClick={() => setTab(3)}
              className={Tab === 3 ? "activewinNav Winnav" : " Winnav"}
            >
              {Tab === 3 ? (
                <Box component="img" src={Timeinactive} width={50}></Box>
              ) : (
                <Box component="img" src={Timeactive} width={50}></Box>
              )}
              <Typography variant="h3" color="initial">
                TRX 5Min
              </Typography>
            </Box>
          </Stack>
        </Box>
        {Tab === 1 && <WinOneMin gid="1" />}
        {Tab === 2 && <WinThreeMin gid="2" />}
        {Tab === 3 && <WinFiveMin gid="3" />}
        {/* opendialogbox */}
        {opendialogbox && (
          <Dialog
            open={opendialogbox}
            PaperProps={{
              style: {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }}
          >
            <WinLossPopup gid={isAppliedbet?.split("_")?.[0]} />
          </Dialog>
        )}
        <CustomCircularProgress isLoading={isLoading} />
      </Container>
    </Layout>
  );
}

export default Win;

const styles = {
  root: { background: zubgback },
  dashboardTitle: {
    textAlign: "center",
    color: "white !important",
    fontSize: "21px",
    fontWeight: "500",
  },
  swiperImage: { width: "100%", height: "auto" },
  depositWithdrawContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    mt: 2,
  },
  depositWithdrawIcon: { width: "30px", height: "30px" },
  referralLinkContainer: {
    background: "#3A3A3A",
    padding: "15px 15px",
    borderRadius: "5px",
    mt: 4,
  },
  referralLinkTitle: {
    color: "white !important",
    fontSize: "14px",
    fontWeight: "500 !important",
  },
  referralLinkInputContainer: { alignItems: "center" },
  referralLinkInput: { width: "100%" },
  referralLinkButton: { marginLeft: 2 },
  socialButtonsContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    mt: 4,
  },
  telegramButton: {
    fontSize: "14px",
    color: "white !important",
    textTransform: "capitalize",
    fontWeight: "400",
  },
  supportButton: {
    fontSize: "14px",
    color: "white !important",
    textTransform: "capitalize",
    fontWeight: "400",
  },
  socialButtonIcon: {
    margin: "auto",
    background: "white",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: { fontSize: "20px", "&>path": { color: "#6da7f4 !important" } },
  socialIconinfo: {
    fontSize: "20px",
    margin: "auto",
    "&>path": { color: "white !important" },
  },
  socialButtonText: {
    color: "white !important",
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: "14px",
  },
  gameImage: {
    width: "90px",
    height: "80px",
    position: "absolute",
    top: "-20px",
    right: "0px",
  },
  gameTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "white !important",
    transition: "all 0.3s",
  },
  gameDescription: {
    fontSize: "15px",
    fontWeight: "400",
    color: "white !important",
    mt: 2,
    transition: "all 0.3s",
  },
  userImage: { width: "50px", height: "50px" },
};
