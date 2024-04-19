import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import axios from "axios";
import * as React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../../../Shared/SocketContext";
import countdownfirst from "../../../../assets/countdownfirst.mp3";
import countdownlast from "../../../../assets/countdownlast.mp3";
import circle from "../../../../assets/images/circle-arrow.png";
import howToPlay from "../../../../assets/images/user-guide.png";
import trxtimerbackground from "../../../../assets/trxtimerbackground.png";
import { dummycounterFun, trx_game_image_index_function, updateNextCounter } from "../../../../redux/slices/counterSlice";
import { endpoint } from "../../../../services/urls";
import Policy from "../policy/Policy";
import ShowImages from "./ShowImages";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const OneMinCountDown = ({ fk }) => {
  const socket = useSocket();
  const client = useQueryClient();
  const [one_min_time, setOne_min_time] = useState(0);
  const show_this_one_min_time = String(one_min_time).padStart(2, "0");
  const audioRefMusic = React.useRef(null);
  const audioRefMusiclast = React.useRef(null);
  const next_step = useSelector((state) => state.aviator.next_step);
  const dispatch = useDispatch();

  const [poicy, setpoicy] = React.useState(false);
  const handleClickOpenpoicy = () => {
    setpoicy(true);
  };
  const handleClosepolicy = () => {
    setpoicy(false);
  };

  React.useEffect(() => {
    const handleOneMin = (onemin) => {
      setOne_min_time(onemin);
      fk.setFieldValue("show_this_one_min_time", onemin);
      if (onemin === 5 || onemin === 4 || onemin === 3 || onemin === 2) {
        handlePlaySound();
      }
      if (onemin === 1) handlePlaySoundLast();

      if (onemin <= 10) {
        fk.setFieldValue("openTimerDialogBoxOneMin", true);
      }
      if (onemin === 0) {
        client.refetchQueries("trx_gamehistory");
        client.refetchQueries("trx_gamehistory_chart");
        client.refetchQueries("my_trx_Allhistory");
        client.refetchQueries("my_trx_history");
        client.refetchQueries("walletamount");
        dispatch(dummycounterFun());
        fk.setFieldValue("openTimerDialogBoxOneMin", false);
      }
    };
    socket.on("onemintrx", handleOneMin);
    return () => {
      socket.off("onemintrx", handleOneMin);
    };
  }, []);

  const { isLoading, data: game_history } = useQuery(
    ["trx_gamehistory"],
    () => GameHistoryFn(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const GameHistoryFn = async () => {
    try {
      const response = await axios.get(`${endpoint.trx_game_history}?gameid=1&limit=500`);
      return response;
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  React.useEffect(() => {
    dispatch(
      updateNextCounter(
        game_history?.data?.result
          ? Number(game_history?.data?.result?.[0]?.tr_transaction_id) + 1
          : 1
      )
    );
    const tr_digit =
      game_history?.data?.result && game_history?.data?.result?.[0]?.tr_digits;
    let array = [];
    for (let i = 0; i < tr_digit?.length; i++) {
      if (/[a-zA-Z]/.test(tr_digit[i])) {
        array.push(tr_digit[i].toUpperCase());
      } else {
        array.push(tr_digit[i]);
      }
    }
    dispatch(trx_game_image_index_function(array));
  }, [game_history?.data?.result]);




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

  const handlePlaySoundLast = async () => {
    try {
      if (audioRefMusiclast?.current?.pause) {
        await audioRefMusiclast?.current?.play();
      } else {
        await audioRefMusiclast?.current?.pause();
      }
    } catch (error) {
      // Handle any errors during play
      console.error("Error during play:", error);
    }
  };

  return (
    <Box
      className="countdownbgtrx"
      sx={{ backgroundImage: `url(${trxtimerbackground})` }}
    >
      {React.useMemo(() => {
        return (
          <>
            <audio ref={audioRefMusic} hidden>
              <source src={`${countdownfirst}`} type="audio/mp3" />
            </audio>
            <audio ref={audioRefMusiclast} hidden>
              <source src={`${countdownlast}`} type="audio/mp3" />
            </audio>
          </>
        );
      }, [audioRefMusic, audioRefMusiclast])}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "50%",
            borderRight: "1px dashed white",
            paddingRight: "2%",
          }}
          className="win-banner"
        >
          {React.useMemo(() => {
            return (
              <>
                <Box onClick={() => handleClickOpenpoicy()}>
                  <Box
                    component="img"
                    src={howToPlay}
                    sx={{ width: "25px !important", height: "25px !important" }}
                  ></Box>
                  <Typography variant="body1" color="initial">
                    How to play
                  </Typography>
                  <Box
                    component="img"
                    src={circle}
                    sx={{ width: "15px !important", height: "15px !important" }}
                  ></Box>
                </Box>
                <Typography
                  variant="body1"
                  color="initial"
                  className="!ml-2 !text-lg"
                >
                  TRX 1 Min
                </Typography>
              </>
            );
          }, [])}
          {poicy && (
            <Dialog
              open={poicy}
              TransitionComponent={Transition}
              onClose={handleClosepolicy}
              className="dialogsmall"
            >
              <Box>
                <Stack className="dialog-header-policy">
                  <Box>
                    <Typography variant="body1" color="initial">
                      Policy
                    </Typography>
                  </Box>
                  <IconButton onClick={handleClosepolicy}>
                    <CloseIcon />
                  </IconButton>
                </Stack>
              </Box>
              <Policy />
            </Dialog>
          )}
        </Box>
        <Box>
          <Typography variant="h3" color="initial" className="winTextone">
            Time remaining
          </Typography>
          {React.useMemo(() => {
            return (
              <Stack direction="row">
                <Box className="timerBoxone">0</Box>
                <Box className="timerBox">0</Box>
                <Box className={"!text-white !font-bold !text-lg"}>:</Box>
                <Box className="timerBox">
                  {show_this_one_min_time?.substring(0, 1)}
                </Box>
                <Box className="timerBoxfour">
                  {show_this_one_min_time?.substring(1, 2)}
                </Box>
              </Stack>
            );
          }, [show_this_one_min_time])}
          <Typography variant="h3" color="initial" className="winTexttwo">
            {Number(next_step)?.toString()?.padStart(7, "0")}
          </Typography>
        </Box>
      </Box>
      {React.useMemo(() => {
        return <ShowImages/>
      }, [])}
    </Box>
  );
};

export default OneMinCountDown;
