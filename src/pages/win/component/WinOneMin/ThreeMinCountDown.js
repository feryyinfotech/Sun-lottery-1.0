import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import * as React from "react";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../../../Shared/SocketContext";
import countdownfirst from "../../../../assets/countdownfirst.mp3";
import countdownlast from "../../../../assets/countdownlast.mp3";
import pr0 from "../../../../assets/images/0.png";
import pr11 from "../../../../assets/images/11.png";
import pr22 from "../../../../assets/images/22.png";
import pr33 from "../../../../assets/images/33.png";
import pr4 from "../../../../assets/images/4.png";
import pr5 from "../../../../assets/images/5.png";
import pr6 from "../../../../assets/images/6.png";
import pr7 from "../../../../assets/images/7.png";
import pr8 from "../../../../assets/images/8.png";
import pr9 from "../../../../assets/images/9.png";
import circle from "../../../../assets/images/circle-arrow.png";
import howToPlay from "../../../../assets/images/user-guide.png";
import { dummycounterFun } from "../../../../redux/slices/counterSlice";
import { changeImages } from "../../../../services/schedular";
import Policy from "../policy/Policy";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ThreeMinCountDown = ({fk}) => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const client = useQueryClient();
  const audioRefMusic = React.useRef(null);
  const audioRefMusiclast = React.useRef(null);
  const [poicy, setpoicy] = React.useState(false);
  const [one_min_time, setOne_min_time] = useState("0_0");
  const [isImageChange, setIsImageChange] = useState("1_2_3_4_5");
  const img1 = Number(isImageChange?.split("_")[0]);
  const img2 = Number(isImageChange?.split("_")[1]);
  const img3 = Number(isImageChange?.split("_")[2]);
  const img4 = Number(isImageChange?.split("_")[3]);
  const img5 = Number(isImageChange?.split("_")[4]);
  const next_step = useSelector((state) => state.aviator.next_step)

  const image_array = [pr0, pr11, pr22, pr33, pr4, pr5, pr6, pr7, pr8, pr9];
  React.useEffect(() => {
    setIsImageChange(changeImages());
  }, []);

  const show_this_three_min_time_sec = React.useMemo(
    () => String(one_min_time?.split("_")?.[1]).padStart(2, "0"),
    [one_min_time]
  );
  const show_this_three_min_time_min = React.useMemo(
    () => String(one_min_time?.split("_")?.[0]).padStart(2, "0"),
    [one_min_time]
  );
  const handleClickOpenpoicy = () => {
    setpoicy(true);
  };
  const handleClosepolicy = () => {
    setpoicy(false);
  };
  React.useEffect(() => {
    const handleFiveMin = (fivemin) => {
      setOne_min_time(fivemin);
      fk.setFieldValue("show_this_one_min_time",fivemin)
      if (
        (fivemin?.split("_")?.[1] === "5" ||
          fivemin?.split("_")?.[1] === "4" ||
          fivemin?.split("_")?.[1] === "3" ||
          fivemin?.split("_")?.[1] === "2") &&
        fivemin?.split("_")?.[0] === "0"
      )
        handlePlaySound();
      if (fivemin?.split("_")?.[1] === "1" && fivemin?.split("_")?.[0] === "0")
        handlePlaySoundLast();

      if (
        Number(fivemin?.split("_")?.[1]) <= 10 && // this is for sec
        fivemin?.split("_")?.[0] === "0" // this is for minut
      ) {
        fk.setFieldValue("openTimerDialogBoxOneMin", true);
      }
      if (fivemin?.split("_")?.[1] === "59") {
        fk.setFieldValue("openTimerDialogBoxOneMin", false);
      }
      if (
        fivemin?.split("_")?.[1] === "40" && // this is for sec
        fivemin?.split("_")?.[0] === "0" // this is for minut
      ) {
        // oneMinCheckResult();
        // oneMinColorWinning();
      }
      if (
        fivemin?.split("_")?.[1] === "0" &&
        fivemin?.split("_")?.[0] === "0"
      ) {
        client.refetchQueries("gamehistory");
        client.refetchQueries("walletamount");
        client.refetchQueries("gamehistory_chart");
        client.refetchQueries("myhistory");
        client.refetchQueries("myAllhistory");
        dispatch(dummycounterFun());
      }
    };

    socket.on("fivemin", handleFiveMin);

    return () => {
      socket.off("fivemin", handleFiveMin);
    };
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
      }, [audioRefMusiclast, audioRefMusic])}
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
          <Stack direction="row">
            {React.useMemo(() => {
              return (
                <>
                  <Box className="timerBoxone">
                    {show_this_three_min_time_min?.substring(0, 1)}
                  </Box>
                  <Box className="timerBox">
                    {show_this_three_min_time_min?.substring(1, 2)}
                  </Box>
                </>
              );
            }, [show_this_three_min_time_min])}
            {React.useMemo(() => {
              return (
                <>
                  <Box className={"!text-white !font-bold !text-lg"}>:</Box>
                  <Box className="timerBox">
                    {show_this_three_min_time_sec?.substring(0, 1)}
                  </Box>
                  <Box className="timerBoxfour">
                    {show_this_three_min_time_sec?.substring(1, 2)}
                  </Box>
                </>
              );
            }, [show_this_three_min_time_sec])}
          </Stack>
          <Typography variant="h3" color="initial" className="winTexttwo">
          {(Number(next_step))?.toString()?.padStart(7,"0")}
          </Typography>
        </Box>
      </Box>
      {/* {fk.values.openTimerDialogBox && (
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
          <div className="flex gap-2 justify-cente !bg-black !bg-opacity-5">
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
              {show_this_three_min_time_sec?.substring(0, 1)}
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
              {show_this_three_min_time_sec?.substring(1, 2)}
            </div>
          </div>
        </Dialog>
      )} */}
    </Box>
  );
};

export default ThreeMinCountDown;
