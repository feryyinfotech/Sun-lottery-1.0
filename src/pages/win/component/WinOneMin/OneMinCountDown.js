import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import axios from "axios";
import { useFormik } from "formik";
import * as React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useSocket } from "../../../../Shared/SocketContext";
import countdownfirst from "../../../../assets/countdownfirst.mp3";
import countdownlast from "../../../../assets/countdownlast.mp3";
import pr0 from "../../../../assets/images/0.png";
import pr11 from "../../../../assets/images/11.png";
import pr22 from "../../../../assets/images/22.png";
import pr33 from "../../../../assets/images/33.png";
import pr4 from "../../../../assets/images/4.png";
import circle from "../../../../assets/images/circle-arrow.png";
import howToPlay from "../../../../assets/images/user-guide.png";
import { endpoint } from "../../../../services/urls";
import Policy from "../policy/Policy";
import pr5 from "../../../../assets/images/5.png";
import pr6 from "../../../../assets/images/6.png";
import pr7 from "../../../../assets/images/7.png";
import pr8 from "../../../../assets/images/8.png";
import pr9 from "../../../../assets/images/9.png";
import { useDispatch } from "react-redux";
import { dummycounterFun } from "../../../../redux/slices/counterSlice";
import { changeImages } from "../../../../services/schedular";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const OneMinCountDown = () => {
  const socket = useSocket();
  const client = useQueryClient();
  const [one_min_time, setOne_min_time] = useState(0);
  const show_this_one_min_time = String(one_min_time).padStart(2, "0");
  const [isImageChange, setIsImageChange] = useState("1_2_3_4_5");
  const img1 = Number(isImageChange?.split("_")[0]);
  const img2 = Number(isImageChange?.split("_")[1]);
  const img3 = Number(isImageChange?.split("_")[2]);
  const img4 = Number(isImageChange?.split("_")[3]);
  const img5 = Number(isImageChange?.split("_")[4]);
  const dispatch = useDispatch();
  const audioRefMusic = React.useRef(null);
  const audioRefMusiclast = React.useRef(null);

  const nextStpe =
    client.getQueriesData("gamehistory")?.[0]?.[1]?.data?.data?.[0]?.gamesno ||
    0;

  const image_array = [pr0, pr11, pr22, pr33, pr4, pr5, pr6, pr7, pr8, pr9];
  React.useEffect(() => {
    setIsImageChange(changeImages());
  }, []);

  React.useEffect(() => {
    if (show_this_one_min_time === "01") {
      oneMinCheckResult();
      oneMinColorWinning();
    }
  }, [show_this_one_min_time]);

  const [poicy, setpoicy] = React.useState(false);
  const handleClickOpenpoicy = () => {
    setpoicy(true);
  };
  const handleClosepolicy = () => {
    setpoicy(false);
  };

  const initialValues = {
    openTimerDialogBox: false,
  };

  const fk = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      console.log(fk.values);
    },
  });

  React.useEffect(() => {
    const handleOneMin = (onemin) => {
      setOne_min_time(onemin);
      if (onemin === 5 || onemin === 4 || onemin === 3 || onemin === 2) {
        handlePlaySound();
      }
      if (onemin === 1) handlePlaySoundLast();

      if (onemin === 5) {
        fk.setFieldValue("openTimerDialogBox", true);
      }
      if (onemin === 0) fk.setFieldValue("openTimerDialogBox", false);
    };
    socket.on("onemin", handleOneMin);
    return () => {
      socket.off("onemin", handleOneMin);
    };
  }, []);

  const oneMinCheckResult = async () => {
    try {
      await axios.get(`${endpoint.check_result}`);
      client.refetchQueries("myhistory");
      client.refetchQueries("gamehistory");
      client.refetchQueries("gamehistory_chart");
      dispatch(dummycounterFun());
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };
  const oneMinColorWinning = async () => {
    try {
      await axios.get(`${endpoint.color_winning}?id=1&gid=1`);
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
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
    <Box className="countdownbg">
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
          {React.useMemo(() => {
            return (
              <>
                <Typography variant="body1" color="initial">
                  Win Go 1Min
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box component="img" src={image_array[Number(img1)]}></Box>
                  <Box component="img" src={image_array[Number(img2)]}></Box>
                  <Box component="img" src={image_array[Number(img3)]}></Box>
                  <Box component="img" src={image_array[Number(img4)]}></Box>
                  <Box component="img" src={image_array[Number(img5)]}></Box>
                </Stack>
              </>
            );
          }, [img1, img2, img3, img4, img5])}
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
            {(Number(nextStpe) + 1)?.toString()?.padStart(7,"0")}
          </Typography>
        </Box>
      </Box>
      {fk.values.openTimerDialogBox && (
        <Dialog
          open={fk.values.openTimerDialogBox}
          TransitionComponent={Transition}
          PaperProps={{
            style: {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
        >
          <div
            className="flex gap-2 justify-cente !bg-black !bg-opacity-5"
            sx={{ width: "100%" }}
          >
            <div
              style={{
                fontSize: 200,
                borderRadius: 20,
                background: "rgb(73, 57, 193)",
                fontWeight: 700,
                width: 150,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              {show_this_one_min_time?.substring(0, 1)}
            </div>
            <div
              style={{
                fontSize: 200,
                borderRadius: 20,
                background: "rgb(73, 57, 193)",
                fontWeight: 700,
                width: 150,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              {show_this_one_min_time?.substring(1, 2)}
            </div>
          </div>
        </Dialog>
      )}
    </Box>
  );
};

export default OneMinCountDown;
