import CachedIcon from "@mui/icons-material/Cached";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  zubgcrickorange
} from "../../Shared/color";
import cip from "../../assets/cip.png";
import deposit from "../../assets/deposit.png";
import card from "../../assets/images/card-payment.png";
import withdrow from "../../assets/images/cash-withdrawal.png";
import rechargeIcon from "../../assets/images/deposit.png";
import gift from "../../assets/images/gift-box.png";
import graph from "../../assets/images/graph.png";
import wdhistory from "../../assets/images/history.png";
import notification from "../../assets/images/notification.png";
import deposite from "../../assets/images/payment.png";
import balance from "../../assets/images/send.png";
import trans from "../../assets/images/translation.png";
import Layout from "../../component/Layout/Layout";
import {
  MyProfileDataFn,
  get_user_data_fn,
  walletamount,
} from "../../services/apicalling";
import SplashScreen from "../SplashScreen";

function CricketUserprofile() {
  const [showSplashScreen, setShowSplashScreen] = useState(false);
  const dispatch = useDispatch();
  const aviator_login_data = useSelector(
    (state) => state.aviator.aviator_login_data
  );

  const isAvailableUser = sessionStorage.getItem("isAvailableCricketUser");
  const navigate = useNavigate();

  const { isLoading: walletLoding, data: wallet } = useQuery(
    ["userWalletAmount"],
    () => walletamount(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const amount = wallet?.data?.data;

  useEffect(() => {
    !aviator_login_data && get_user_data_fn(dispatch);
  }, []);

  const handleClosepolicy = () => {
    setShowSplashScreen(false);
    sessionStorage.removeItem("isAvailableCricketUser");
  };
  useEffect(() => {
    if (isAvailableUser) {
      setShowSplashScreen(true);
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      handleClosepolicy();
    }, 2000);
  }, []);
  // showSplashScreen

  const { isLoading, data } = useQuery(["myprofile"], () => MyProfileDataFn(), {
    refetchOnMount: false,
    refetchOnReconnect: true,
  });
  const result = data?.data?.data;

  if (showSplashScreen) return <SplashScreen />;
  return (
    <Layout footer={false}>
      <Container sx={style.container}>
        <Stack direction="row" sx={style.header}>
          <Box sx={style.profileBox}>
            <Box
              component="img"
              src={
                "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/IPLHeadshot2023/6.png"
              }
              // src={profile}
              sx={style.profileImage}
            />
          </Box>
          <Button component={NavLink} to='/cricket/registration' className="playnow !cursor-pointer !bg-[#FB8356]" role="Button" sx={style.button} >Play Now</Button>
          <Box
            sx={style.userInfo}
            // onClick={() => navigate('/cricket/registration')}
          >
            <Typography variant="" sx={{ color: "white !important" }}>
              {result?.full_name}
            </Typography>
            <Typography variant="body1" sx={{ color: "white !important" }}>
              UID | {result?.custid || 0}
            </Typography>
          </Box>
        </Stack>
        <Box sx={style.balanceContainer}>
          <Box
            sx={{
              color: "white !important",
              background: "#00ff5533",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Box component="img" src={balance} sx={style.cardImage} />
              <Typography variant="body1" sx={style.balanceText}>
                Wallet Amount
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ alignItems: "center", mt: "10px" }}>
              <Typography variant="body1" sx={style.totalBalance}>
                ₹ {Number(amount?.cricket_wallet || 0).toFixed(2)}
              </Typography>
              <CachedIcon sx={style.cachedIcon} />
            </Stack>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                mt: "10px",
                justifyContent: "space-between",
              }}
            >
              <Box component="img" src={cip} sx={style.cardImage} />
              <Typography variant="body1" sx={style.cardNumber}>
                *** *** *** ***
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box className="wallet-track-box" sx={{ background: zubgcrickorange }}>
          {/* nav: "/cricket/withdrawlCash", */}
          <Stack
            direction="row"
            className="!w-full !grid lg:!grid-cols-4 !grid-cols-2 !gap-[4px]"
          >
            {[
              {
                img: rechargeIcon,
                item: "Deposit",
                nav: "/cricket/fund-deposit-request-form",
              },
              {
                img: withdrow,
                item: "Withdraw",
                nav: "/Withdrawal",
              },
              {
                img: wdhistory,
                item: "Deposit history",
                nav: "/cricket/deposit-history",
              },
              {
                img: deposite,
                item: "Withdrawal history",
                nav: "/cricket/withdrawl-history",
              },
            ].map((i) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    "&>a>p": {
                      fontSize: "12px",
                      color: "white",
                      textAlign: "center",
                    },

                    "&>a>img": { margin: "auto" },
                  }}
                  className={"!bg-[#00ff5533]  !rounded-lg !py-2"}
                >
                  <div
                    className="!text-center !flex flex-col !justify-center !items-center"
                    onClick={() => {
                      if (i.item === "Withdraw") {
                        navigate(i?.nav, {
                          state: {
                            type: "cricket",
                          },
                        });
                      } else {
                        navigate(i?.nav);
                      }
                    }}
                  >
                    <Box component="img" src={i.img} width={50}></Box>
                    <Typography variant="body1" mt={1} className="!text-white">
                      {i.item}
                    </Typography>
                  </div>
                </Box>
              );
            })}
          </Stack>
        </Box>
        <Box
          className={"!w-[95%] !grid !grid-cols-2 !gap-2 !mt-3"}
          sx={style.balanceContainer}
        >
          <Box
            className={"!cursor-pointer"}
            onClick={() => navigate("/cricket/deposit-history")}
            sx={{
              background: "#00ff5533",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Box
                component="img"
                src={deposit}
                className="!textblue"
                sx={{ width: "40px", height: "40px", marginRight: "20px" }}
              ></Box>
              <Box
                sx={{
                  "&>:nth-child(1)": {
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "white",
                  },
                  "&>:nth-child(2)": {
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "white",
                  },
                }}
              >
                <Typography variant="body1" className="!text-sm">
                  Deposit
                </Typography>
                <Typography variant="body1">My Deposit history</Typography>
              </Box>
            </Stack>
          </Box>
          <Box
            className={"!cursor-pointer"}
            onClick={() => navigate("/cricket/withdrawl-history")}
            sx={{
              background: "#00ff5533",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Box
                component="img"
                src={card}
                sx={{ width: "40px", height: "40px", marginRight: "20px" }}
              ></Box>
              <Box
                sx={{
                  "&>:nth-child(1)": {
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "white",
                  },
                  "&>:nth-child(2)": {
                    fontSize: "10px",
                    fontWeight: "500",
                    color: "white",
                  },
                }}
              >
                <Typography variant="body1" className="!text-sm">
                  Withdrawl
                </Typography>
                <Typography variant="body1">My Withdrawl history</Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
        {/* // start bottom page */}
        <Box sx={style.actionContainertwo}>
          <Stack
            sx={{
              padding: "10px",
              background: zubgcrickorange,
              width: "100%",
              borderRadius: "10px",
              // backgroundImage:
              //   'url("https://media.istockphoto.com/id/936417006/vector/cricket-stadium-vector-wallpaper.jpg?s=612x612&w=0&k=20&c=uig_bpfwpVGd4dZl2VypwcfA1Lx7W4kLr-6A00NIw1M=")',
            }}
          >
            <Stack
              direction="row"
              sx={{
                borderBottom: "1px solid white",
                padding: "10px",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <Box
                  component="img"
                  src={notification}
                  sx={{ width: "20px", height: "20px", marginRight: "10px" }}
                ></Box>
                <Typography
                  variant="body1"
                  sx={{ color: "white", fontSize: "13px", fontWeight: "600" }}
                >
                  Notification
                </Typography>
              </Stack>
              <Box component={NavLink}>
                <KeyboardDoubleArrowRightIcon
                  sx={{ color: "white", fontSize: "23px", fontWeight: "600" }}
                />
              </Box>
            </Stack>
            <Stack
              direction="row"
              sx={{
                borderBottom: "1px solid white",
                padding: " 10px 10px 10px 5px",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <Box
                  component="img"
                  src={gift}
                  sx={{ width: "30px", height: "30px", marginRight: "10px" }}
                ></Box>
                <Typography
                  variant="body1"
                  sx={{ color: "white", fontSize: "13px", fontWeight: "600" }}
                >
                  Gifts
                </Typography>
              </Stack>
              <Box component={NavLink}>
                <KeyboardDoubleArrowRightIcon
                  sx={{ color: "white", fontSize: "23px", fontWeight: "600" }}
                />
              </Box>
            </Stack>
            <Stack
              direction="row"
              sx={{
                borderBottom: "1px solid white",
                padding: " 10px 10px 10px 5px",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <Box
                  component="img"
                  src={graph}
                  sx={{ width: "25px", height: "25px", marginRight: "10px" }}
                ></Box>
                <Typography
                  variant="body1"
                  sx={{ color: "white", fontSize: "13px", fontWeight: "600" }}
                >
                  Game statistics
                </Typography>
              </Stack>
              <Box component={NavLink}>
                <KeyboardDoubleArrowRightIcon
                  sx={{ color: "white", fontSize: "23px", fontWeight: "600" }}
                />
              </Box>
            </Stack>
            <Stack
              direction="row"
              sx={{
                borderBottom: "1px solid white",
                padding: " 10px 10px 10px 5px",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <Box
                  component="img"
                  src={trans}
                  sx={{ width: "25px", height: "25px", marginRight: "10px" }}
                ></Box>
                <Typography
                  variant="body1"
                  sx={{ color: "white", fontSize: "13px", fontWeight: "600" }}
                >
                  Language
                </Typography>
              </Stack>
              <Box component={NavLink}>
                <Typography
                  sx={{ color: "white", fontSize: "13px", fontWeight: "500" }}
                >
                  English
                </Typography>
              </Box>
            </Stack>
            <Stack
              direction="row"
              sx={{
                borderBottom: "1px solid white",
                padding: " 10px 10px 10px 5px",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <Box
                  component="img"
                  src={trans}
                  sx={{ width: "25px", height: "25px", marginRight: "10px" }}
                ></Box>
                <Typography
                  variant="body1"
                  sx={{ color: "white", fontSize: "13px", fontWeight: "600" }}
                >
                  Total Match
                </Typography>
              </Stack>
              <Box component={NavLink}>
                <Typography
                  sx={{ color: "white", fontSize: "13px", fontWeight: "500" }}
                >
                  21300
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Layout>
  );
}

export default CricketUserprofile;

const style = {
  container: { background: "#005543" },
  header: {
    width: "95%",
    marginLeft: "2.5%",
    px: "10px",
    alignItems: "center",
    justifyContent: "space-between",
    py: "20px",
  },
  profileBox: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    overflow: "hidden",
  },
  profileImage: { width: "100%", height: "100%" },
  userInfo: {
    "& > :nth-child(1)": {
      fontSize: "18px",
      fontWeight: "600",
      color: "black",
    },
    "& > :nth-child(2)": {
      fontSize: "14px",
      fontWeight: "400",
      color: "black",
    },
  },
  rankImage: { width: "100px", height: "100px" },
  balanceContainer: {
    background: zubgcrickorange,
    borderRadius: "10px",
    padding: "10px",
    width: "95%",
    marginLeft: "2.5%",
  },
  balanceText: {
    fontSize: "16px",
    fontWeight: "500",
    color: "white",
    marginLeft: "10px",
  },
  totalBalance: {
    fontSize: "30px",
    fontWeight: "600",
    color: "white",
    marginRight: "10px",
  },
  cachedIcon: { color: "white" },
  cardImage: { width: "50px" },
  cardNumber: { fontSize: "14px", color: "white", marginLeft: "10px" },
  actionContainer: {
    background: "#3883BF",
    borderRadius: "10px",
    padding: "20px",
    width: "95%",
    margin: "auto",
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionBox: { width: "20%" },
  actionImage: { width: "30px", height: "30px", margin: "auto" },
  actionText: {
    color: "white",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "500",
  },
  actionContainertwo: {
    background: zubgcrickorange,
    flexDirection: "column",
    borderRadius: "10px",
    padding: "10px",
    width: "95%",
    margin: "auto",
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};
