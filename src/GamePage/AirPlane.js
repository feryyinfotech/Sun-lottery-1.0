import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useSocket } from "../Shared/SocketContext";
import loderImage from "../assets/loderimage.png";
import plane1 from "../assets/plan1.svg";
import plane2 from "../assets/plan2.svg";
import win from "../assets/win.png";
import {
  byTimeIsEnableMusic,
  byTimeIsEnableSound,
} from "../redux/slices/counterSlice";
import { endpoint } from "../services/urls";
import {
  demomobile,
  demomobilesec,
  demomolap,
  demomolaponesec
} from "./AnimationAirPlan";
import {
  ButtomDottedPoint,
  ButtomDottedPointMoveable,
  LeftDottedPoint,
  LeftDottedPointMoveable,
} from "./DottedPoint";
import SpentBetLeft from "./SpentBetLeft";
import SpentBetRight from "./SpentBetRight";
const AirPlane = ({ formik, fk }) => {
  const socket = useSocket();
  let timerInterval;
  const dispatch = useDispatch();
  const backgroundImage_url = useSelector(
    (state) => state.aviator.backgroundImage_url
  );
  const waiting_aviator = useSelector((state) => state.aviator.waiting_aviator);
  const isMediumScreen = useMediaQuery({ minWidth: 800 });
  const [bottomLeftCoordinate, setBottomLeftCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [crash, setcrashed] = useState(false);
  const [combineTime, setcombineTime] = useState("0_0");
  const [initialCordinate, setInitialCordinate] = useState(0);
  let milliseconds = combineTime?.split("_")?.[0].substring(0, 2);
  let seconds = Number(combineTime?.split("_")?.[1]);
  const client = useQueryClient();
  let bool = true;

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      startFly(newMessage);
    };

    const handleSeconds = (seconds) => {
      setcombineTime(seconds);
    };

    const handleSetColorOfDigit = (color_value) => {
      fk.setFieldValue("setcolorofdigit", color_value);
    };

    const handleSetLoader = (setloder) => {
      fk.setFieldValue("setloder", setloder);
      setcombineTime("0_0");
    };

    const handleIsFlying = (isFlying) => {
      fk.setFieldValue("isFlying", isFlying);
    };

    const handlecrash = (isFlying) => {
      setcrashed(isFlying);
      client.refetchQueries("allresult");
    };
    socket.on("message", handleNewMessage);
    socket.on("seconds", handleSeconds);
    socket.on("setcolorofdigit", handleSetColorOfDigit);
    socket.on("setloder", handleSetLoader);
    socket.on("isFlying", handleIsFlying);
    socket.on("crash", handlecrash);
    return () => {
      socket.off("message", handleNewMessage);
      socket.off("seconds", handleSeconds);
      socket.off("setcolorofdigit", handleSetColorOfDigit);
      socket.off("setloder", handleSetLoader);
      socket.off("isFlying", handleIsFlying);
      socket.off("crash", handlecrash);
    };
  }, []);

  function hii(randomFlyingTime) {
    const mainDiv = document.getElementsByClassName("maindiv")[0];
    const style = document.createElement("style");
    if (randomFlyingTime < 10) {
      if (!isMediumScreen) style.innerHTML = demomobilesec;
      else style.innerHTML = demomolaponesec;
    } else {
      if (!isMediumScreen) style.innerHTML = demomobile;
      else style.innerHTML = demomolap;
    }
    document.head.appendChild(style);

    mainDiv.style.animation = "";
    mainDiv.style.animation = "slidein 5s linear forwards running";

    mainDiv.addEventListener("animationend", () => {
      if (mainDiv.style.animationName === "slidein") {
        // After slidein animation ends, start slideafter animation
        mainDiv.style.animation = "slideafter 5s linear forwards running 50";
      } else if (mainDiv.style.animationName === "slideafter") {
        // If needed, you can add more conditions for other animations
      }
    });
  }

  useEffect(() => {
    const mainDiv = document.getElementsByClassName("maindiv")[0];
    if (crash === true) {
      clearInterval(timerInterval);
      // Remove any current animation and apply thirdAnimation
      mainDiv.style.animation = "";
      mainDiv.style.animation = "thirdAnimation .5s linear forwards running";

      dispatch(byTimeIsEnableSound(false));
      dispatch(byTimeIsEnableMusic(false));
      fk.setFieldValue("isShadowPath", false);
      localStorage.removeItem("spent_amount1");
      fk.setFieldValue("waitingForNextTime1", false);
      fk.setFieldValue("waitingForNextTime2", false);
      formik.setFieldValue("refetch", Number(formik.values.refetch) + 1);
    }
  }, [crash]);

  function startFly(randomFlyingTime) {
    bool = true;
    dispatch(byTimeIsEnableMusic(true));
    fk.setFieldValue("closeButtomDot", true);
    fk.setFieldValue("isEnablingWinner", true);
    const mainDiv = document.getElementsByClassName("maindiv")[0];
    hii(randomFlyingTime);

    timerInterval = setInterval(() => {
      const airplainimage = document.getElementsByClassName("maindiv")[0];
      const parentDiv = document.getElementsByClassName("parentdiv")[0]; // Assuming "maindiv" is the parent element
      const airplainRect = airplainimage.getBoundingClientRect();
      const parentRect = parentDiv.getBoundingClientRect();
      const newBottomLeftCoordinates = {
        x: airplainRect.x - parentRect.x,
        y: airplainRect.y - parentRect.y,
      };

      if (bool) {
        setInitialCordinate(newBottomLeftCoordinates);
        bool = false;
      }
      setBottomLeftCoordinates(newBottomLeftCoordinates);
    }, 10);

    return () => clearInterval(timerInterval);
  }

  const setResultFuncton = async () => {
    try {
      await axios.get(`${endpoint.aviator_result}`);
      client.refetchQueries("allresult");
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  useEffect(() => {
    Number(milliseconds) >= 3 && fk.setFieldValue("isShadowPath", true);
  }, [milliseconds]);

  setTimeout(() => {
    fk.setFieldValue("closeButtomDot", false);
  }, 10000);

  return (
    <>
      <div
        className={`${
          !waiting_aviator && "lg:py-8 py-9"
        } moved parentdiv relative lg:h-[60vh]  h-[35vh] w-[99.8%] overflow-hidden  rounded-3xl mt-1 border-[1px] border-white border-opacity-10`}
      >
        <>
          {useMemo(() => {
            return (
              <img
                src={backgroundImage_url}
                className={`${
                  backgroundImage_url ===
                  "https://res.cloudinary.com/do7kimovl/image/upload/v1709114502/circle_dafpdo.svg"
                    ? "absolute  -bottom-[400%] left-0 rotate_background_image !z-0 bg-gradient-to-l from-[#000000] via-[#5a125a] to-[#0a070e] bg-opacity-5 w-[900%] h-[900%]"
                    : "bgimagedynamic !z-0 absolute  top-0 left-0 h-full w-[99.8%]"
                }  object-cover `}
              />
            );
          })}
          {fk.values.isShadowPath &&
            (isMediumScreen ? (
              <svg
                width="100%"
                height="60vh"
                xmlns="http://www.w3.org/2000/svg"
                className="z-10 absolute"
              >
                <path
                  d={`M -10 ${initialCordinate.y + 24} C ${
                    bottomLeftCoordinate.x < 300
                      ? bottomLeftCoordinate.x - 40
                      : 300
                  } ${initialCordinate.y + 20}, ${
                    bottomLeftCoordinate.x < 500
                      ? bottomLeftCoordinate.x - 20
                      : 500
                  } ${initialCordinate.y + 20}, ${
                    bottomLeftCoordinate.x + 17
                  } ${bottomLeftCoordinate.y + 22} L ${
                    bottomLeftCoordinate.x + 10
                  } ${initialCordinate.y + 30} L 10 ${
                    initialCordinate.y + 30
                  } Z`}
                  fill="rgba(112,9,25, 0.6)"
                  // stroke="#BC0319"
                  stroke-width="3"
                  stroke-dasharray="1000 0"
                  stroke-linejoin="round"
                />
                <path
                  d={`M -10 ${initialCordinate.y + 25} C ${
                    bottomLeftCoordinate.x < 300
                      ? bottomLeftCoordinate.x - 40
                      : 300
                  } ${initialCordinate.y + 23}, ${
                    bottomLeftCoordinate.x < 500
                      ? bottomLeftCoordinate.x - 20
                      : 500
                  } ${initialCordinate.y + 23}, ${
                    bottomLeftCoordinate.x + 17
                  } ${bottomLeftCoordinate.y + 21}`}
                  stroke="#a10019"
                  stroke-width="4"
                  fill="none"
                />
              </svg>
            ) : (
              <svg
                width="100%"
                height="35vh"
                xmlns="http://www.w3.org/2000/svg"
                className="z-10 absolute"
              >
                <path
                  className="!absolute !bottom-0 !left-0"
                  d={`M -10 ${initialCordinate.y} C ${
                    bottomLeftCoordinate.x < 80
                      ? bottomLeftCoordinate.x - 10
                      : 80
                  } ${initialCordinate.y}, ${
                    bottomLeftCoordinate.x < 120
                      ? bottomLeftCoordinate.x - 5
                      : 120
                  } ${initialCordinate.y},${bottomLeftCoordinate.x + 12} ${
                    bottomLeftCoordinate.y - 1
                  } L ${bottomLeftCoordinate.x + 15} ${
                    initialCordinate.y + 3
                  } L ${bottomLeftCoordinate.y} ${initialCordinate.y + 3} Z`}
                  fill="rgba(112,9,25, 0.6)"
                  stroke-width="3"
                  stroke-dasharray="1000 0"
                  stroke-linejoin="round"
                />
                <path
                  className="!absolute !bottom-0 !left-0"
                  d={`M -10 ${initialCordinate.y} C ${
                    bottomLeftCoordinate.x < 80
                      ? bottomLeftCoordinate.x - 10
                      : 80
                  } ${initialCordinate.y}, ${
                    bottomLeftCoordinate.x < 120
                      ? bottomLeftCoordinate.x - 5
                      : 120
                  } ${initialCordinate.y},${bottomLeftCoordinate.x + 12} ${
                    bottomLeftCoordinate.y - 1
                  } `}
                  stroke="#a10019"
                  stroke-width="3"
                  fill="none"
                />
              </svg>
            ))}
          <div className="maindiv absolute bottom-[20px] left-[20px]  animate-slidein infinite ">
            {useMemo(() => {
              return (
                fk.values.isEnablingWinner && (
                  <p className="winslider z-20 rounded-full px-4 py-1">
                    {[...Array(3)].map((_, index) => (
                      <img
                        key={index}
                        src={win}
                        className="w-10 h-10 absolute"
                      />
                    ))}
                  </p>
                )
              );
            }, [fk.values.isEnablingWinner])}

            {useMemo(() => {
              return (
                <div className="relative lg:w-[120px] w-[80px] lg:h-[60px] !z-50 ">
                  <img
                    src={Number(milliseconds || 0) % 3 === 0 ? plane1 : plane2}
                    className="airplain  lg:w-[120px] w-[80px] lg:h-[60px]  h-[40px] text-[#a10019] "
                  />
                </div>
              );
            }, [milliseconds])}
          </div>
          {/* fk.values.isFlying */}
          {useMemo(() => {
            return (
              fk.values.isFlying && (
                <>
                  {/* !fk.values.closeButtomDot */}
                  {!fk.values.closeButtomDot ? (
                    <>
                      <LeftDottedPointMoveable />
                      <ButtomDottedPointMoveable />
                      {/* <TopDottedPointMoveable />
                  <RightDottedPointMoveable /> */}
                    </>
                  ) : (
                    <>
                      <LeftDottedPoint />
                      <ButtomDottedPoint />
                      {/* <TopDottedPoint />
                  <RightDottedPoint /> */}
                    </>
                  )}
                </>
              )
            );
          }, [fk.values.isFlying, fk.values.closeButtomDot])}
          <div className="absolute w-[100%] bottom-0 left-0"></div>
          {/* fk.values.setloder */}
          {fk.values.setloder ? (
            <div
              className={`
        absolute text-6xl lg:text-7xl   left-[13%] top-[25%] lg:left-[37%] lg:top-[20%] font-bold  text-white
        flex flex-col justify-center items-center
        `}
            >
              <div className="flex justify-center flex-col items-center gap-1 lg:gap-3">
                <img
                  src={
                    loderImage ||
                    "https://res.cloudinary.com/do7kimovl/image/upload/v1708426809/loderimage_pc4eyd.png"
                  }
                  className="lg:w-[46%] lg:h-[46%] w-[33%] h-[33%] rotate-animation"
                />
                {/* <img src="https://res.cloudinary.com/do7kimovl/image/upload/v1708426809/loderimage_pc4eyd.png" className="w-[46%] h-[46%] rotate-animation" /> */}
                <p className="lg:text-lg !text-2xl font-thin">
                  <span className="lg:!text-2xl text-[20px] !font-bold whitespace-nowrap">
                    WAITING FOR NEXT ROUND
                  </span>
                </p>
                <div className="lg:h-[5px] h-[4px] w-[110px] lg:w-[155px] rounded-r-full rounded-l-full relative  bg-[#BC0319] ">
                  <div className="loder-waiting-for-next-round !rounded-full"></div>
                </div>
              </div>
            </div>
          ) : (
            <p
              className={`
        absolute text-6xl lg:text-7xl   left-[30%] top-[35%] lg:left-[42%] lg:top-[38%]   text-white
        ${fk.values.setcolorofdigit && "!text-[#BC0319]"}
        flex flex-col
        `}
            >
              {fk.values.setcolorofdigit && (
                <p className="!text-2xl lg:pr-5 text-white text-center !font-bold w-full">
                  FLEW AWAY!
                </p>
              )}
              <div className="!font-semibold grid grid-cols-3 lg:w-[225px] w-[190px]">
                <span className="col-span-2">{`${seconds + 1}.${String(
                  milliseconds
                ).padStart(2, "0")}`}</span>
                <span style={{ marginLeft: "4px" }}>x</span>
              </div>
            </p>
          )}
        </>

        {/* <p className="absolute lg:text-8xl text-4xl left-[37%] top-[40%] font-bold text-purple-500">{`${seconds}.${milliseconds} x `}</p> */}
      </div>
      <div className="flex w-[100%] lg:gap-3 gap-0 flex-col lg:flex-row lg:mt-0 md:mt-[20%] sm:mt-[20%]">
        <SpentBetLeft
          milliseconds={milliseconds}
          seconds={seconds + 1}
          fk={fk}
          startFly={startFly}
          formik={formik}
        />
        <SpentBetRight
          milliseconds={milliseconds}
          seconds={seconds + 1}
          fk={fk}
          startFly={startFly}
        />
      </div>
    </>
  );
};

export default AirPlane;
