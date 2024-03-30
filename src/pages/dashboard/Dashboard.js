import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FitbitIcon from "@mui/icons-material/Fitbit";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import copy from "clipboard-copy";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { checkTokenValidity } from "../../Shared/CookieStorage";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import { gray, zubgback, zubgbackgrad, zubgmid } from "../../Shared/color";
import aviator_game_image from "../../assets/aviator_game_image.png";
import one from "../../assets/images/1.jpg";
import two from "../../assets/images/2.jpg";
import three from "../../assets/images/3.jpg";
import cash from "../../assets/images/cash-withdrawal.png";
import deposit from "../../assets/images/deposit (1).png";
import megaphone from "../../assets/images/megaphone.png";
import position2 from "../../assets/images/positio2.png";
import position3 from "../../assets/images/position3.png";
import position1 from "../../assets/images/positoin1.png";
import pro1 from "../../assets/images/pr1.jpg";
import pro2 from "../../assets/images/pr2.jpg";
import pro3 from "../../assets/images/pr3.jpg";
import stage from "../../assets/images/stage-podium1.jpeg";
import winp1 from "../../assets/images/winp1.jpg";
import winp2 from "../../assets/images/winp2.jpg";
import winp3 from "../../assets/images/winp3.jpg";
import winp4 from "../../assets/images/winp4.jpg";
import winp5 from "../../assets/images/winp5.jpg";
import winp6 from "../../assets/images/winp6.jpg";
import sajid from "../../assets/sajid.PNG";
import tanveer from "../../assets/tanveer.PNG";
import Layout from "../../component/Layout/Layout";
import {
  please_reconnect_the_serverFun,
  waitingAviatorFun,
} from "../../redux/slices/counterSlice";
import {
  MyProfileDataFn,
  get_user_data_fn,
  walletamount,
} from "../../services/apicalling";
import { fron_end_main_domain, support_mail, telegram_url } from "../../services/urls";
import Lottery from "./DashboadSubcomponent/Lottery";
import Original from "./DashboadSubcomponent/Original";
import Sports from "./DashboadSubcomponent/Sports";
import Notification from "./Notification";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Dashboard() {
  const dispatch = useDispatch();
  const isAvailableUser = sessionStorage.getItem("isAvailableUser");
  const aviator_data = localStorage.getItem("aviator_data");
  const navigate = useNavigate();
  const [data_array, setdata_array] = React.useState([1, 2, 3, 4]);
  const [poicy, setpoicy] = React.useState(false);
  const [type_of_game, settype_of_game] = React.useState("");
  const login_data = localStorage.getItem("logindata");
  const user_id = JSON.parse(login_data).UserID;
  const [referal_code, setReferral_code] = useState("");

  useEffect(() => {
    if (!checkTokenValidity()) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/"; // Redirect to login page
    }
  }, []);

  const functionTOCopy = (value) => {
    copy(value);
    toast.success("Copied to clipboard!");
  };
  const { isLoading, data } = useQuery(["walletamount"], () => walletamount(), {
    refetchOnMount: false,
    refetchOnReconnect: true,
  });

  const newdata = data?.data?.data || 0;

  const { isLoading: profile_loding, data: profile } = useQuery(
    ["myprofile"],
    () => MyProfileDataFn(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const result = profile?.data?.data;

  // useEffect(() => {
  //   console.log(result?.referral_code, "nandn");
  //   setReferral_code(
  //     CryptoJS.AES.encrypt(
  //       JSON.stringify(result?.referral_code),
  //       "anand"
  //     ).toString()
  //   );
  //   console.log(referal_code, "converted value");
  // }, [result]);

  const initialValues = {
    //  referrel_code: `https://play.ferryinfotech.in/register?ref=${referal_code}`,
    referrel_code: `${fron_end_main_domain}/register?ref=${result?.referral_code}`,
    // referrel_code: `https://play.ferryinfotech.in/register?ref=${referal_code}`,
  };

  const fk = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      console.log("This is handle submit");
    },
  });

  const handleClosepolicy = () => {
    setpoicy(false);
    sessionStorage.removeItem("isAvailableUser");
  };
  useEffect(() => {
    if (isAvailableUser) {
      setpoicy(true);
    }
  }, []);

  useEffect(() => {
    dispatch(waitingAviatorFun(true));
    dispatch(please_reconnect_the_serverFun(false));
  }, []);

  useEffect(() => {
    setInterval(() => {
      setdata_array([...data_array, 100]);
      setTimeout(() => {
        setdata_array(data_array.slice(0, data_array.length));
      }, 1000);
    }, 3000);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    !aviator_data && get_user_data_fn();
  }, [aviator_data]);

  const game_data = [
    {
      name: "Lottery",
      img: "https://ossimg.bdgadminbdg.com/IndiaBDG/gamecategory/gamecategory_202401100619315n2k.png",
    },
    {
      name: "Aviator",
      img: aviator_game_image,
    },
    {
      name: "Sports",
      img: "https://ossimg.bdgadminbdg.com/IndiaBDG/gamecategory/gamecategory_20240110061915xrqy.png",
    },
    {
      name: "Slots",
      img: "https://ossimg.bdgadminbdg.com/IndiaBDG/gamecategory/gamecategory_20240110061937gbid.png",
    },
    {
      name: "Popular",
      img: "https://ossimg.bdgadminbdg.com/IndiaBDG/gamecategory/gamecategory_202401100619464x51.png",
    },
    {
      name: "Casino",
      img: "https://ossimg.bdgadminbdg.com/IndiaBDG/gamecategory/gamecategory_20240110061909hwqs.png",
    },
  ];
  return (
    <Layout>
      <Box sx={styles.root}>
        <Container
          className="!h-[100%] !overflow-auto no-scrollbar"
          sx={{ background: zubgback }}
        >
          <div
            style={{
              background: zubgback,
            }}
            className=" rounded-b-md"
          >
            <div className="px-2 py-2 flex justify-between">
              <div
                className="flex items-center gap-2"
                style={{ color: "white" }}
              >
                <FitbitIcon />
                <span className="text-[14px]">Welcome To Sun Lottery</span>
              </div>
              <div className="flex gap-1 items-center cursor-pointer">
                <CloudDownloadIcon sx={{ color: "white" }} />
                <span className="text-[12px]" style={{ color: "white" }}>
                  Download App
                </span>
              </div>
            </div>
          </div>
          <Box className="!px-2">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={false}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper !rounded-lg !mt-2"
            >
              <SwiperSlide>
                <Box
                  component="img"
                  src={one}
                  alt="Slide 1"
                  sx={styles.swiperImage}
                  className="!rounded-lg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Box
                  component="img"
                  src={two}
                  alt="Slide 2"
                  sx={styles.swiperImage}
                />
              </SwiperSlide>
              <SwiperSlide>
                <Box
                  component="img"
                  src={three}
                  alt="Slide 3"
                  sx={styles.swiperImage}
                />
              </SwiperSlide>
            </Swiper>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "space-between",
              width: "95%",
              marginLeft: "2.5%",
              background: zubgmid,
              borderRadius: "10px",
              mt: "20px",
              padding: "10px 10px",
            }}
          >
            <Box sx={{ width: "10%" }}>
              <Box component="img" src={megaphone} width={30}></Box>
            </Box>
            <Box
              sx={{ width: "90%", "&>p": { fontSize: "13px", color: "white" } }}
            >
              <Typography variant="body1" color="initial">
                See the Installation page for additional docs about how to make
                sure everything is set up correctly.
              </Typography>
            </Box>
          </Box>

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
                  // onClick={() => navigate("/wallet/Recharge")}
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
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body1" color="initial" className="b-val">
                ₹{" "}
                {Number(
                  Number(newdata?.wallet || 0) + Number(newdata?.winning || 0)
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
                  // onClick={() => navigate("/Withdrawal")}
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
          <Box sx={styles.referralLinkContainer}>
            <Typography variant="body1" sx={styles.referralLinkTitle}>
              Referral Link
            </Typography>
            <Stack direction="row" sx={styles.referralLinkInputContainer}>
              <TextField
                className="dbinput"
                fullWidth
                id="referrel_code"
                name="referrel_code"
                value={fk.values.referrel_code}
                // onChange={fk.handleChange}
                sx={styles.referralLinkInput}
              />
              <Button
                variant="contained"
                className="whitebtn"
                sx={styles.referralLinkButton}
                onClick={() => functionTOCopy(fk.values.referrel_code)}
              >
                Copy
              </Button>
            </Stack>
            <Stack direction="row" sx={styles.socialButtonsContainer}>
              <Button
                className="telegrambtn"
                sx={styles.telegramButton}
                onClick={() => window.open(`${telegram_url}`, "_blank")}
              >
                <Stack>
                  <Box sx={styles.socialButtonIcon}>
                    <TelegramIcon sx={styles.socialIcon} />
                  </Box>
                  <Box sx={styles.socialButtonText}>Telegram</Box>
                </Stack>
              </Button>
              <Button className="supportbtn" sx={styles.supportButton}>
                <a href={`mailto:${support_mail}`}>
                  <Stack>
                    <HelpOutlineIcon sx={styles.socialIconinfo} />
                    <Box sx={styles.socialButtonText}>Support</Box>
                  </Stack>
                </a>
              </Button>
            </Stack>
          </Box>
          <div
            className="mt-2 w-full grid grid-cols-3 gap-[2%] o"
            style={{
              width: "95%",
              marginLeft: "2.5%",
              marginTop: "20px",
              mb: "20px",
            }}
          >
            {game_data?.map((i) => {
              return (
                <a
                  onClick={() => {
                    if (
                      i.name === "Slots" ||
                      i.name === "Popular" ||
                      i.name === "Casino"
                    )
                      return toast("Comming Soon !");
                    scrollToSection("games");
                    settype_of_game(i?.name);
                  }}
                  href={`#${i?.name}`}
                  style={{
                    // background:
                    //   zubgmid,
                    background: zubgbackgrad,
                    padding: "10px",
                    marginBottom: "10px",
                    width: "95%",
                  }}
                  className="cursor-pointer rounded-lg  flex flex-col items-center justify-center"
                >
                  <img className="w-[90px] h-[90px] " src={i?.img} />
                  <p className="!text-sm font-bold" style={{ color: "white" }}>
                    {i?.name}
                  </p>
                </a>
              );
            })}
          </div>
          <Box id="games">
            <div id="game_lottery">
              {type_of_game === "Lottery" && <Lottery />}
            </div>
            <div id="game_original">
              {type_of_game === "Aviator" && <Original />}
            </div>
            <div id="game_sports">
              {type_of_game === "Sports" && <Sports />}
            </div>
          </Box>
          <Box sx={styles.wininfoouter}>
            <Typography
              variant="body1"
              color="initial"
              sx={{
                color: "white",
                fontWeight: "600",
                fontSize: "16px",
                mb: 2,
              }}
            >
              Winning information
            </Typography>
            <Stack direction="row" sx={{ ...styles.wininfoinner, mb: "10px" }}>
              <Stack direction="row" sx={styles.wininfoouterone}>
                <Avatar alt="Cindy Baker" src={pro1} width={50} />
                <Typography variant="body1">Myh***pol</Typography>
              </Stack>
              <Stack direction="row" sx={styles.wininfooutertwo}>
                <Box component="img" src={winp4}></Box>
                <Box>
                  <Typography variant="body1" color="initial">
                    Receive ₹1,960.00
                  </Typography>
                  <Typography variant="body1" color="initial">
                    Winning amount
                  </Typography>
                </Box>
              </Stack>
            </Stack>
            <Stack direction="row" sx={{ ...styles.wininfoinner, mb: "10px" }}>
              <Stack direction="row" sx={styles.wininfoouterone}>
                <Avatar alt="Cindy Baker" src={pro2} width={50} />
                <Typography variant="body1">Myh***pol</Typography>
              </Stack>
              <Stack direction="row" sx={styles.wininfooutertwo}>
                <Box component="img" src={winp5}></Box>
                <Box>
                  <Typography variant="body1" color="initial">
                    Receive ₹1,960.00
                  </Typography>
                  <Typography variant="body1" color="initial">
                    Winning amount
                  </Typography>
                </Box>
              </Stack>
            </Stack>
            <Stack direction="row" sx={{ ...styles.wininfoinner, mb: "10px" }}>
              <Stack direction="row" sx={styles.wininfoouterone}>
                <Avatar alt="Cindy Baker" src={pro1} width={50} />
                <Typography variant="body1">Myh***pol</Typography>
              </Stack>
              <Stack direction="row" sx={styles.wininfooutertwo}>
                <Box component="img" src={winp1}></Box>
                <Box>
                  <Typography variant="body1" color="initial">
                    Receive ₹1,960.00
                  </Typography>
                  <Typography variant="body1" color="initial">
                    Winning amount
                  </Typography>
                </Box>
              </Stack>
            </Stack>
            <Stack direction="row" sx={{ ...styles.wininfoinner, mb: "10px" }}>
              <Stack direction="row" sx={styles.wininfoouterone}>
                <Avatar alt="Cindy Baker" src={pro2} width={50} />
                <Typography variant="body1">Myh***pol</Typography>
              </Stack>
              <Stack direction="row" sx={styles.wininfooutertwo}>
                <Box component="img" src={winp2}></Box>
                <Box>
                  <Typography variant="body1" color="initial">
                    Receive ₹1,960.00
                  </Typography>
                  <Typography variant="body1" color="initial">
                    Winning amount
                  </Typography>
                </Box>
              </Stack>
            </Stack>
            <Stack direction="row" sx={{ ...styles.wininfoinner, mb: "10px" }}>
              <Stack direction="row" sx={styles.wininfoouterone}>
                <Avatar alt="Cindy Baker" src={pro3} width={50} />
                <Typography variant="body1">Myh***pol</Typography>
              </Stack>
              <Stack direction="row" sx={styles.wininfooutertwo}>
                <Box component="img" src={winp3}></Box>
                <Box>
                  <Typography variant="body1" color="initial">
                    Receive ₹1,960.00
                  </Typography>
                  <Typography variant="body1" color="initial">
                    Winning amount
                  </Typography>
                </Box>
              </Stack>
            </Stack>
            <Stack direction="row" sx={{ ...styles.wininfoinner, mb: "0px" }}>
              <Stack direction="row" sx={styles.wininfoouterone}>
                <Avatar alt="Cindy Baker" src={pro3} width={50} />
                <Typography variant="body1">Myh***pol</Typography>
              </Stack>
              <Stack direction="row" sx={styles.wininfooutertwo}>
                <Box component="img" src={winp6}></Box>
                <Box>
                  <Typography variant="body1" color="initial">
                    Receive ₹1,960.00
                  </Typography>
                  <Typography variant="body1" color="initial">
                    Winning amount
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>

          {/* stage Podium */}
          <Box
            sx={{
              width: "95%",
              marginLeft: "2.5%",
              borderRadius: "10px",
              mt: "20px",
              mb: "20px",
              height: "40vh",
              backgroundImage: `url(${stage})`,
              backgroundSize: "100% 100%",
              position: "relative",
            }}
          >
            <Box sx={styles.winner1}>
              <Box
                component="img"
                // src={pro1c}
                src={sajid}
                sx={{
                  width: "60px",
                  borderRadius: "50%",
                  border: `3px solid ${zubgmid}`,
                  height: "60px",
                  objectPosition: "top",
                }}
              ></Box>
              <Box
                component="img"
                src={position1}
                sx={{ width: "70px", height: "20px" }}
              ></Box>
            </Box>
            <Box sx={styles.winner2}>
              <Box
                component="img"
                // src={pro1c}
                src={tanveer}
                sx={{
                  width: "50px",
                  borderRadius: "50%",
                  border: `3px solid ${zubgmid}`,
                  height: "50px",
                  objectPosition: "top",
                }}
              ></Box>
              <Box
                component="img"
                src={position2}
                sx={{ width: "60px", height: "15px" }}
              ></Box>
            </Box>
            <Box sx={styles.winner3}>
              <Box
                component="img"
                // src={pro1c}
                src={
                  "https://lh3.googleusercontent.com/a/ACg8ocJ_lQQ7XjcLthKctAe1u5A6Fv8JJUQ0ugECmc7RkiZmKfI=s360-c-no"
                }
                sx={{
                  width: "50px",
                  borderRadius: "50%",
                  border: `3px solid ${zubgmid}`,
                  height: "50px",
                  objectPosition: "top",
                }}
              ></Box>
              <Box
                component="img"
                src={position3}
                sx={{ width: "60px", height: "15px" }}
              ></Box>
            </Box>
          </Box>
          {/* stage Podium end */}
          <Box sx={{ ...styles.wininfoouter, mb: "40px" }}>
            <Stack direction="row" sx={{ ...styles.wininfoinner, mb: "10px" }}>
              <Stack direction="row" sx={styles.wininfoouterone}>
                <Avatar alt="Cindy Baker" src={pro1} width={50} />
                <Typography variant="body1">Myh***pol</Typography>
              </Stack>
              <Stack direction="row" sx={styles.wininfooutertwo}>
                <Box component="img" src={winp4}></Box>
                <Box>
                  <Typography variant="body1" color="initial">
                    Receive ₹1,960.00
                  </Typography>
                  <Typography variant="body1" color="initial">
                    Winning amount
                  </Typography>
                </Box>
              </Stack>
            </Stack>
            <Stack direction="row" sx={{ ...styles.wininfoinner, mb: "10px" }}>
              <Stack direction="row" sx={styles.wininfoouterone}>
                <Avatar alt="Cindy Baker" src={pro2} width={50} />
                <Typography variant="body1">Myh***pol</Typography>
              </Stack>
              <Stack direction="row" sx={styles.wininfooutertwo}>
                <Box component="img" src={winp5}></Box>
                <Box>
                  <Typography variant="body1" color="initial">
                    Receive ₹1,960.00
                  </Typography>
                  <Typography variant="body1" color="initial">
                    Winning amount
                  </Typography>
                </Box>
              </Stack>
            </Stack>
            <Stack direction="row" sx={{ ...styles.wininfoinner, mb: "0px" }}>
              <Stack direction="row" sx={styles.wininfoouterone}>
                <Avatar alt="Cindy Baker" src={pro3} width={50} />
                <Typography variant="body1">Myh***pol</Typography>
              </Stack>
              <Stack direction="row" sx={styles.wininfooutertwo}>
                <Box component="img" src={winp6}></Box>
                <Box>
                  <Typography variant="body1" color="initial">
                    Receive ₹1,960.00
                  </Typography>
                  <Typography variant="body1" color="initial">
                    Winning amount
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>
          {poicy && (
            <Dialog
              open={poicy}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClosepolicy}
              aria-describedby="alert-dialog-slide-description"
              PaperProps={{ className: `!max-w-[1000px] ${gray}` }}
            >
              <div
                style={{
                  background: zubgmid,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px",
                }}
              >
                <p style={{ color: "white", fontSize: "14px" }}>Notification</p>
                <RxCross2
                  style={{ color: "white" }}
                  onClick={handleClosepolicy}
                />
              </div>
              <DialogContent style={{ background: zubgback }}>
                <Notification handleClosepolicy={handleClosepolicy} />
              </DialogContent>
            </Dialog>
          )}
        </Container>
      </Box>
      <CustomCircularProgress isLoading={isLoading} />
    </Layout>
  );
}

export default Dashboard;

const styles = {
  root: { background: "#202020", pb: 6 },
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
    mt: 4,
    width: "95%",
    marginLeft: "2.5%",
  },
  depositWithdrawIcon: { width: "30px", height: "30px" },
  referralLinkContainer: {
    background: zubgmid,
    padding: "15px 15px",
    borderRadius: "5px",
    mt: 4,
    width: "95%",
    marginLeft: "2.5%",
  },
  referralLinkTitle: {
    color: "white !important",
    fontSize: "14px",
    fontWeight: "500 !important",
    mb: 1,
  },
  referralLinkInputContainer: { alignItems: "center" },
  referralLinkInput: { width: "100%" },
  referralLinkButton: { marginLeft: 2 },
  socialButtonsContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    mt: 2,
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
    fontSize: "27px",
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
  profileBox: {
    "&>.profile": { width: "80px", height: "80px", borderRadius: "50%" },
    position: "relative",
    mb: "15px",
  },
  stageBox: { width: "100%" },
  stageinner: {
    width: "32%",
    position: "absolute",
    top: "0%",
    left: "0%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  stageinnerTwo: {
    width: "32%",
    position: "absolute",
    top: "-18%",
    left: "34%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  stageinnerThree: {
    width: "32%",
    position: "absolute",
    top: "-4%",
    right: "0%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  imgBox: {
    width: "50px",
    height: "50px",
    position: "absolute",
    top: "-23px",
    left: "-15px",
  },
  thirdimg: {
    width: "70px",
    height: "18px",
    position: "absolute",
    bottom: "0",
    left: "7px",
  },
  name: { color: "#8f5206", fontSize: "13px", fontWeight: 500 },
  rupee: {
    color: "#8f5206",
    fontSize: "13px",
    fontWeight: 500,
    background: "linear-gradient(180deg, #FAE59F 0%, #C4933F 100%)",
    padding: "6px 5px",
    borderRadius: "20px",
  },
  wininfoouter: {
    width: "95%",
    marginLeft: "2.5%",
    background: zubgmid,
    padding: "10px 10px",
    mt: "20px",
    borderRadius: "10px",
  },
  wininfooutertwo: {
    alignItems: "center",
    justifyContent: "space-between",
    "&>img": {
      width: "100px",
      height: "50px",
      borderRadius: "10px",
      border: "1px solid white",
      marginRight: "10px",
    },
    "&>div>p:nth-child(1)": {
      color: "white",
      fontSize: "14px",
      fontWeight: "600",
      textAlign: "center",
    },
    "&>div>p:nth-child(2)": {
      color: "white",
      fontSize: "12px",
      fontWeight: "400",
      textAlign: "center",
    },
  },
  wininfoouterone: {
    width: "45%",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { color: "white", ml: "10px", fontSize: "13px", fontWeight: "500" },
  },
  wininfoinner: {
    alignItems: "center",
    justifyContent: "space-between",
    background: zubgback,
    padding: "10px ",
    borderRadius: "10px",
  },
  winner1: {
    position: "absolute",
    left: "42.5%",
    top: "35%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  winner2: {
    position: "absolute",
    left: "14.5%",
    top: "44%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  winner3: {
    position: "absolute",
    right: "13%",
    bottom: "25%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
};
