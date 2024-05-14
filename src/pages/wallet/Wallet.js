import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Container,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useMediaQuery } from "react-responsive";
import { NavLink, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import { zubgback, zubgbackgrad, zubgmid } from "../../Shared/color";
import withdrow from "../../assets/images/cash-withdrawal.png";
import rechargeIcon from "../../assets/images/deposit.png";
import wdhistory from "../../assets/images/history.png";
import deposite from "../../assets/images/payment.png";
import wallet from "../../assets/images/wallet.png";
import Layout from "../../component/Layout/Layout";
import { MyProfileDataFn } from "../../services/apicalling";
import CloseIcon from "@mui/icons-material/Close";
import sunlotteryhomebanner from "../../assets/sunlotteryhomebanner.jpg";

function Wallet() {
  const isMediumScreen = useMediaQuery({ minWidth: 800 });
  const navigate = useNavigate();
  const [openDialogBoxHomeBanner, setopenDialogBoxHomeBanner] =
    React.useState(false);
  const { isLoading, data } = useQuery(["myprofile"], () => MyProfileDataFn(), {
    refetchOnMount: false,
    refetchOnReconnect: true,
  });
  const result = data?.data?.data;

  const main_wallet = {
    series: [Number(result?.bonus || 0)?.toFixed(0) || 0],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: zubgmid,
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "white",
              fontSize: "17px",
            },
            value: {
              formatter: function (val) {
                return parseInt(val);
              },
              color: "white",
              fontSize: "36px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Bonus"],
    },
  };
  const third_party_wallet = {
    series: [(Number(Number(result?.winning_wallet || 0)) || 0)?.toFixed(0)],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: zubgmid,
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "white",
              fontSize: "17px",
            },
            value: {
              formatter: function (val) {
                return parseInt(val);
              },
              color: "white",
              fontSize: "36px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          type: "horizontal",
          background: zubgbackgrad,
          inverseColors: true,

          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Amount"],
    },
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
        }}
      >
        <Box sx={style.header}>
          <Box component={NavLink} onClick={() => navigate(-1)}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" color="initial">
            Wallet
          </Typography>
          <Box component={NavLink} onClick={() => navigate(-1)}></Box>
        </Box>

        {/*  */}
        <Box
          sx={{
            pt: 2,
            pb: 4,
            width: "100%",
            background: zubgmid,
            width: "95%",
            marginLeft: "2.5%",
            marginTop: "20px",
            borderRadius: "10px ",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="walletBox"
            >
              <Box component="img" src={wallet} width={50}></Box>
              <Typography variant="h2" color="initial">
                ₹{" "}
                {(
                  Number(
                    Number(result?.winning_wallet || 0) +
                      Number(result?.wallet || 0)
                  ) || 0
                )?.toFixed(0)}
              </Typography>
              <Typography variant="body1" color="initial">
                Total balance
              </Typography>
            </Box>
          </Box>
        </Box>
        {/*  */}

        <Box className="wallet-track-box">
          <Stack
            direction="row"
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <ReactApexChart
                options={main_wallet.options}
                series={main_wallet.series}
                type="radialBar"
                height={!isMediumScreen ? 200 : 250}
              />
              <Box
                sx={{
                  textAlign: "center",
                  "&>p": { color: "white", fontSize: "12px" },
                }}
              >
                <Typography variant="body1" color="initial">
                  ₹ {Number(result?.bonus || 0)}
                </Typography>
                <Typography variant="body1" color="initial">
                  Bonus Amount
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: "50%" }}>
              <ReactApexChart
                options={third_party_wallet.options}
                series={third_party_wallet.series}
                type="radialBar"
                height={!isMediumScreen ? 200 : 250}
              />
              <Box
                sx={{
                  textAlign: "center",
                  "&>p": { color: "white", fontSize: "12px" },
                }}
              >
                <Typography variant="body1" color="initial">
                  ₹{" "}
                  {(Number(Number(result?.winning_wallet || 0)) || 0)?.toFixed(
                    0
                  )}
                </Typography>
                <Typography variant="body1" color="initial">
                  Winning Amount
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Stack
            direction="row"
            sx={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Box
              sx={{
                width: "24%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                "&>a>p": {
                  fontSize: "12px",
                  color: "white",
                  textAlign: "center",
                },
                mt: "30px",
                "&>a>img": { margin: "auto" },
                mt: "30px",
              }}
            >
              <NavLink to="/wallet/Recharge">
                <Box component="img" src={rechargeIcon} width={50}></Box>
                <Typography variant="body1" color="initial" mt={1}>
                  Deposit
                </Typography>
              </NavLink>
            </Box>
            <Box
              sx={{
                width: "24%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                "&>a>p": {
                  fontSize: "12px",
                  color: "white",
                  textAlign: "center",
                },
                mt: "30px",
                "&>a>img": { margin: "auto" },
              }}
            >
              <NavLink to="/Withdrawal">
                <Box component="img" src={withdrow} width={50}></Box>
                <Typography variant="body1" color="initial" mt={1}>
                  Withdraw
                </Typography>
              </NavLink>
            </Box>
            <Box
              sx={{
                width: "24%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                "&>a>p": {
                  fontSize: "12px",
                  color: "white",
                  textAlign: "center",
                },
                mt: "30px",
                "&>a>img": { margin: "auto" },
              }}
            >
              <NavLink to="/depositHistory">
                <Box component="img" src={wdhistory} width={50}></Box>
                <Typography variant="body1" color="initial" mt={1}>
                  Deposit <br />
                  history
                </Typography>
              </NavLink>
            </Box>
            <Box
              sx={{
                width: "24%",
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
            >
              <NavLink to="/withdravalHistory">
                <Box component="img" src={deposite} width={50}></Box>
                <Typography variant="body1" color="initial" mt={1}>
                  Withdrawal history
                </Typography>
              </NavLink>
            </Box>
          </Stack>
        </Box>
        <Box
          sx={{
            width: "100%",
            borderRadius: "10px ",
            padding: "20px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            mb: "50px",
          }}
        >
          <Box sx={style.wthui}>
            <Box>
              <Typography variant="body1" color="initial">
                0.000
              </Typography>
              <Typography variant="body1" color="initial">
                SNL
              </Typography>
            </Box>
          </Box>
          <Box sx={style.wthui}>
            <Box>
              <Typography variant="body1" color="initial">
                0.000
              </Typography>
              <Typography variant="body1" color="initial">
                SNL
              </Typography>
            </Box>
          </Box>
          <Box sx={style.wthui}>
            <Box>
              <Typography variant="body1" color="initial">
                0.000
              </Typography>
              <Typography variant="body1" color="initial">
                SNL
              </Typography>
            </Box>
          </Box>
          <Box sx={style.wthui}>
            <Box>
              <Typography variant="body1" color="initial">
                0.000
              </Typography>
              <Typography variant="body1" color="initial">
                SNL
              </Typography>
            </Box>
          </Box>
          <Box sx={style.wthui}>
            <Box>
              <Typography variant="body1" color="initial">
                0.000
              </Typography>
              <Typography variant="body1" color="initial">
                SNL
              </Typography>
            </Box>
          </Box>
          <Box sx={style.wthui}>
            <Box>
              <Typography variant="body1" color="initial">
                0.000
              </Typography>
              <Typography variant="body1" color="initial">
                SNL
              </Typography>
            </Box>
          </Box>
        </Box>
        {openDialogBoxHomeBanner && (
          <Dialog
            PaperProps={{ width: "500px", height: "500px" }}
            open={openDialogBoxHomeBanner}
          >
            <div>
              <p>
                <IconButton onClick={() => setopenDialogBoxHomeBanner(false)}>
                  <CloseIcon />
                </IconButton>
              </p>
              <p>
                <img src={sunlotteryhomebanner} />
              </p>
            </div>
          </Dialog>
        )}
        <CustomCircularProgress isLoading={isLoading} />
      </Container>
    </Layout>
  );
}

export default Wallet;

const style = {
  header: {
    padding: "15px 8px",
    background: zubgmid,
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
    width: "31%",
    minHeight: "15vh",
    background: zubgmid,
    borderRadius: "10px",
    mb: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&>div>p": { color: "white" },
  },
};
