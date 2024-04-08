import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomCircularProgress from "../../../../Shared/CustomCircularProgress";
import Loss from "../../../../assets/images/loss.png";
import win from "../../../../assets/images/winnner.png";
import { endpoint } from "../../../../services/urls";
import CryptoJS from 'crypto-js'
const WinLossPopup = ({ gid }) => {
  const login_data = localStorage.getItem("logindataen") && CryptoJS.AES.decrypt(localStorage.getItem("logindataen"), "anand")?.toString(CryptoJS.enc.Utf8) || null;
  const user_id = login_data && JSON.parse(login_data).UserID;
  const [loding, setloding] = useState(false);
  const [status, setstatus] = useState("");
  const [newstatus, setstatusNew] = useState("");


  const MyHistoryFn = async () => {
    setloding(true);
    try {
      const response = await axios.get(
        `${endpoint.my_history_all}?userid=${user_id}&limit=0&gameid=${gid}`
      );
    const firstId =  response?.data?.data?.[0]?.gamesno
    const winAmnt =  response?.data?.data?.filter((i)=>i?.gamesno === firstId)?.reduce((a,b)=>a+Number(b?.win || 0),0) || 0
    const amntAmnt =  response?.data?.data?.filter((i)=>i?.gamesno === firstId)?.reduce((a,b)=>a+Number(b?.amount || 0),0) || 0

    
     if(winAmnt){
      setstatus({
        status: "1",
        amount:winAmnt
      });
    }else{
      setstatus({
        status: "2",
        amount:amntAmnt
      }); 
    }
      // setstatus(response?.data?.data?.[0]);
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
    setloding(false);
  };

  useEffect(() => {
    MyHistoryFn();
  }, []);

  useEffect(() => {
    setstatusNew(status);
  }, [status]);

  console.log(status,"This is status");

  if (loding) return <CustomCircularProgress isLoading={loding} />;
  return (
    <Box
      sx={{
        width: "300px",
        height: "400px",
        margin: "auto",
        backgroundImage: `url(${
          (status?.status === "1" && win) || (status?.status === "2" && Loss)
        })`,
        // backgroundImage: `url(${win})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {!loding && newstatus && (
        <>
          <Typography
            variant="body1"
            color="initial"
            className="crlg !text-center"
          >
            {(status?.status === "1" && "Win") ||
              (status?.status === "2" && "Loss")}
          </Typography>

          {/* <Box className="winerpoint">
        <Typography variant="body1" color="initial">
          Game Results{" "}
        </Typography>
        <Typography variant="body1" color="initial">
          green
        </Typography>
        <Box component="img" src={pr0} width={30} sx={{ mr: "5px" }}></Box>
        <Typography variant="body1" color="initial">
          small
        </Typography>
      </Box> */}
          <Typography
            variant="body1"
            color="initial"
            className={`bonustext ${
              status?.status === "1" ? "!text-white" : "!text-white"
            }`}
          >
            {(status?.status === "1" && "Bonus") ||
              (status?.status === "2" && "Loss Amount")}
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            className={`bonusamt  ${
              status?.status === "1" ? "!text-white" : "!text-white"
            }`}
          >
            ₹ {Number(status?.amount || 0)?.toFixed(2) || 0}
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            className={`bonuspr ${
              status?.status === "1" ? "!text-pink-500" : "!text-white"
            }`}
          >
            Period{" "}
            {(status?.gameid === "1" && "One") ||
              (status?.gameid === "3" && "Three") ||
              (status?.gameid === "5" && "Five")}{" "}
            minute
          </Typography>
          <Typography variant="body1" color="initial" className="bonuscl">
            Auto Close in 5 sec{" "}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default WinLossPopup;
