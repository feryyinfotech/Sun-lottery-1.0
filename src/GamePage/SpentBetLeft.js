import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box, Button, CircularProgress, Stack, Switch } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { get_user_data_fn, walletamount } from "../services/apicalling";
import { dummy_aviator, endpoint, rupees } from "../services/urls";
import { gray } from "./color";

const SpentBetLeft = ({ milliseconds, seconds, fk, formik }) => {
  const dispatch = useDispatch();
  const aviator_login_data = useSelector(
    (state) => state.aviator.aviator_login_data
  );
  const user = JSON.parse(localStorage.getItem("user"));
  const first_rechange =
    aviator_login_data && JSON.parse(aviator_login_data)?.first_recharge;
  const client = useQueryClient();
  const spent_amount1 = localStorage.getItem("spent_amount1");
  const amount_total =
    client.getQueriesData("walletamount_aviator")?.[0]?.[1]?.data?.data || 0;
  const pre_amount = Number(
    Number(amount_total?.wallet || 0) + Number(amount_total?.winning || 0)
  ).toFixed(2);

  const [loding, setloding] = useState(false);
  // const logindata = localStorage.getItem("aviator_data");
  const [selectedValue, setSelectedValue] = useState("Bet");
  const [betValue, setBetValue] = useState(10);
  // const [openCustomDialogBox, setOpenCustomDialogBox] = useState(false);
  const [gameno, setgameno] = useState({});
  const initialValues = {
    custombetValue_auto_cash_out: (1.1).toFixed(2) || 0,
    isbetActive: false,
  };

  const { isLoading: walletloding, data: walletdata } = useQuery(
    ["walletamount_aviator"],
    () => walletamount(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );
  const wallet_amount = walletdata?.data?.data || 0;

  const leftbitfk = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      console.log(leftbitfk.values);
    },
  });

  useEffect(() => {
    !aviator_login_data && get_user_data_fn(dispatch);
  }, []);

  const spentBit = async () => {
    // if(Number(first_rechange) !== 1){
    //   return toast("You must be sure that , your first deposit is done.");
    // }

    // setloding(true);
    // const reqbody = {
    //   userid: (aviator_login_data && JSON.parse(aviator_login_data)?.id) || 2,
    //   amount: betValue || 0,
    // };
    // try {
    //   const response = await axios.get(
    //     `${endpoint.bet_now}?userid=${reqbody?.userid}&amount=${reqbody?.amount}`
    //   );
    setloding(true);
    const reqbody = {
      userid: user?._id,
      amount: betValue || 0,
    };
    if (Number(wallet_amount?.wallet) < Number(reqbody?.amount))
      toast("Your wallet amount is low");
    else {
      try {
        const response = await axios.post(
          `${dummy_aviator}/api/v1/apply-bet`,
          reqbody
        );
       
        if (response?.data?.msg === "Data save successfully") {
          localStorage.setItem("spent_amount1", reqbody?.amount);
          client.refetchQueries("historydata");
          client.refetchQueries("walletamount_aviator");
          // startFly("left");

          fk.setFieldValue("isStart1", true);
          getHistory();
        }
        toast.success(response?.data?.msg, {
          position: "top-center",
          topOffset: "20%",
        });
      } catch (e) {
        toast(e?.response?.data?.message, {
          position: "top-center",
          topOffset: "20%",
        });
        console.log(e);
      }
      leftbitfk.setFieldValue("isbetActive", false);
    }
    setloding(false);
  };

  useEffect(() => {
    if (fk.values.isFlying && leftbitfk?.values?.isbetActive) {
      spentBit();
    } else {
      !leftbitfk?.values?.isbetActive && fk.setFieldValue("isStart1", false);
    }
  }, [fk.values.isFlying]);

  const getHistory = async () => {
    const userid =
      (aviator_login_data && JSON.parse(aviator_login_data)?.id) || 2;

    try {
      const response = await axios.get(
        `${endpoint.bet_history}?userid=${userid}&limit=${10}`
      );
      setgameno(response?.data?.data[0]?.gamesno);
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  const cashOut = async (sec, mili) => {
    // const reqbody = {
    //   userid: (aviator_login_data && JSON.parse(aviator_login_data)?.id) || 2,
    //   amount: betValue || 0,
    //   gameno: gameno,
    //   multiplier: Number(`${sec}.${mili}`),
    // };
    // try {
    //   const response = await axios.get(
    //     `${endpoint.cash_out}?userid=${reqbody.userid}&amount=${reqbody.amount}&multiplier=${reqbody.multiplier}&gamesno=${reqbody?.gameno}`
    //   );
    const reqbody = {
      userid: user?._id,
      amount: betValue * Number(`${seconds}.${milliseconds}`),
      multiplier: Number(`${sec}.${mili}`),
    };

   
    try {
      const response = await axios.post(
        `${dummy_aviator}/api/v1/cash-out`,
        reqbody
      );

      // toast(response?.data?.message);
      toast.success(
        <div class="flex lg:gap-10 gap-5 !bg-[rgb(60, 179, 113,.5)]">
          <p className="flex flex-col items-center">
            <span className="text-[10px] text-gray-400">
              You have cashed out
            </span>
            <span className="">{`${sec || 0}.${mili || 0} x`}</span>
          </p>

          <Button
            sx={{
              padding: 0,
              overflow: "hidden",
              position: "relative",
              width: "130px",
              background: "#4EAF11",
              borderRadius: "40px",
              color: "white",
              textTransform: "capitalize",
            }}
          >
            <Box sx={{ position: "absolute", left: 0, top: "3px" }}>
              <StarBorderIcon sx={{ color: "#469D0F", fontSize: "30px" }} />
            </Box>
            <Box sx={{ position: "absolute", left: "20px", top: "25px" }}>
              <StarBorderIcon sx={{ color: "#469D0F", fontSize: "18px" }} />
            </Box>
            <Box sx={{ position: "absolute", left: "-9px", top: "25px" }}>
              <StarBorderIcon sx={{ color: "#469D0F", fontSize: "18px" }} />
            </Box>
            <Stack>
              <Box>Win, USD</Box>{" "}
              <Box>
                <span className="">
                  {`${
                    betValue * seconds +
                      Number(milliseconds?.toString()?.substring(0, 1)) || 0
                  }.${
                    Number(milliseconds?.toString()?.substring(1, 2) || 1) * 10
                  } x`}
                </span>
              </Box>
            </Stack>
            <Box sx={{ position: "absolute", right: 0, top: "3px" }}>
              <StarBorderIcon sx={{ color: "#469D0F", fontSize: "30px" }} />
            </Box>
            <Box sx={{ position: "absolute", right: "20px", top: "25px" }}>
              <StarBorderIcon sx={{ color: "#469D0F", fontSize: "18px" }} />
            </Box>
            <Box sx={{ position: "absolute", right: "-9px", top: "25px" }}>
              <StarBorderIcon sx={{ color: "#469D0F", fontSize: "18px" }} />
            </Box>
          </Button>
        </div>
      );
    } catch (e) {
      toast(e?.response?.data?.message);
      console.log(e);
    }
    client.refetchQueries("walletamount_aviator");
    localStorage.removeItem("spent_amount1");
  };

  useEffect(() => {
    if (
      fk.values.isStart1 &&
      fk.values.isFlying &&
      pre_amount &&
      fk.values.autocashout1 &&
      Number(leftbitfk.values.custombetValue_auto_cash_out) ===
        Number(`${seconds}.${milliseconds}`)
    ) {
      fk.setFieldValue("isStart1", false);
      cashOut(seconds, milliseconds);
    }
  }, [milliseconds]);

  return (
    <div
      className={`w-[100%]  lg:w-[50%] mt-2  flex justify-between lg:flex-row sm:flex-col md:flex-col`}
    >
      <div
        className={` h-full ${gray}  rounded-lg w-full p-2  
        ${
          fk.values.waitingForNextTime1
            ? "border-2  border-[#BC0319]"
            : fk.values.isStart1 && !fk.values.isFlying
            ? "border-2  border-[#BC0319]"
            : fk.values.isStart1 &&
              fk.values.isFlying &&
              "border-2  border-[#d47e3c]"
        }

        `}
      >
        <div className="flex justify-center">
          <div className="flex justify-center gap-3 w-[40%] lg:w-[30%] bg-black rounded-full">
            <p
              className={`text-[10px] bg-black px-10 py-1 rounded-full cursor-pointer ${
                selectedValue === "Bet" && `!bg-[#2C2D30]`
              }`}
              onClick={() => setSelectedValue("Bet")}
            >
              Bet
            </p>
            <p
              className={`text-[10px] bg-black px-10 py-1 rounded-full cursor-pointer ${
                selectedValue === "Auto" && `!bg-[#2C2D30]`
              }`}
              onClick={() => setSelectedValue("Auto")}
            >
              Auto
            </p>
          </div>
        </div>
        <div
          className={`w-full flex justify-center  pt-3 gap-2 ${
            selectedValue === "Bet" && "lg:mt-5 mt:2"
          }`}
        >
          <div className=" lg:w-[20%] w-[45%]">
            <div
              className={`flex gap-2 items-center bg-black justify-evenly rounded-full  py-1  lg:py-0 lg:px-0`}
            >
              <CiCircleMinus
                className="cursor-pointer lg:text-xl text-2xl text-gray-400"
                onClick={() =>
                  setBetValue(betValue - 1 > 1 ? betValue - 1 : betValue)
                }
              />
              <p className="text-[15px] font-bold lg:py-0">
                {betValue?.toFixed(2)}
              </p>
              <CiCirclePlus
                className="cursor-pointer text-2xl text-gray-400"
                onClick={() => setBetValue(betValue + 1)}
              />
            </div>
            <div className="grid grid-cols-2 text-center text-[12px] lg:pt-2 pt-[2px] gap-1">
              {[100, 200, 500, 1000]?.map((i) => {
                return (
                  <p
                    className={`bg-black rounded-full cursor-pointer lg:py-1 py-[4px] lg:text-[8px]`}
                    onClick={() => {
                      if (!spent_amount1) setBetValue(i);
                    }}
                  >
                    {i}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="w-[50%]">
            {fk.values.waitingForNextTime1 && (
              <p className="text-[10px] !text-[#BC0319]">
                Waiting for next round.
              </p>
            )}{" "}
            <div
              onClick={() => {
                // cancel
                if (fk.values.waitingForNextTime1) {
                  fk.setFieldValue("isStart1", false);
                  fk.setFieldValue("waitingForNextTime1", false);
                  localStorage.removeItem("spent_amount1");
                  leftbitfk.setFieldValue("isbetActive", false);
                  return;
                }
                // cancel
                if (fk.values.isStart1 && !fk.values.isFlying) {
                  fk.setFieldValue("isStart1", false);
                  localStorage.removeItem("spent_amount1");
                  leftbitfk.setFieldValue("isbetActive", false);
                  return;
                }
                // cash out
                if (fk.values.isStart1 && fk.values.isFlying) {
                  fk.setFieldValue("isStart1", false);
                  if (pre_amount && spent_amount1) {
                    cashOut(seconds, milliseconds);
                  }
                }
                // spent bet
                else {
                  if (fk.values.isFlying) {
                    fk.setFieldValue("waitingForNextTime1", true);
                  }
                  if (pre_amount) {
                    leftbitfk.setFieldValue("isbetActive", true);
                    fk.setFieldValue("isStart1", true);
                  } else {
                    toast("Amount is low!");
                  }
                }
              }}
              className={`
            flex flex-col justify-center px-[20%]  rounded-2xl border-2 border-white border-opacity-30 shadow-lg z-20 cursor-pointer
            ${
              fk.values.waitingForNextTime1
                ? "bg-[#BC0319]"
                : fk.values.isStart1 && fk.values.isFlying && spent_amount1
                ? "bg-gradient-to-t from-[#d47e3c] to-[#e59c6f]"
                : fk.values.isStart1 && !fk.values.isFlying
                ? "bg-[#BC0319]"
                : "bg-[#28A909]"
            }
          
            `}
            >
              {loding ? (
                <div className="w-full flex justify-center py-6 lg:py-4 ">
                  <CircularProgress />
                </div>
              ) : !fk.values.waitingForNextTime1 ? (
                <div className="flex flex-col w-full py-3 lg:py-3 !font-semibold">
                  <span
                    className={`text-lg text-center ${
                      fk.values.isStart1 && !fk.values.isFlying && "py-4"
                    }`}
                  >
                    {fk.values.isStart1 &&
                    fk.values.isFlying &&
                    pre_amount &&
                    spent_amount1
                      ? "Cash Out"
                      : fk.values.isStart1 && !fk.values.isFlying
                      ? "Cancel"
                      : "BET"}
                  </span>
                  <span
                    className={`text-lg text-center`}
                    style={{ margin: "-8px 0 0" }}
                  >
                    {fk.values.isStart1 && !fk.values.isFlying
                      ? ""
                      : fk.values.isStart1 && spent_amount1
                      ? `${Number(
                          betValue * Number(`${seconds}.${milliseconds}`)
                        )?.toFixed(2)} x`
                      : `${betValue?.toFixed(2) || 0} ${rupees}`}
                  </span>
                </div>
              ) : (
                <>
                  <p className="text-lg font-extrabold text-center py-3">
                    {"Cancel"}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        {selectedValue === "Auto" && (
          <div className="w-full  flex justify-center !pl-4 items-center  gap-4 mt-2">
            <p
              // onClick={() => setOpenCustomDialogBox(true)}
              className="bg-[#1D7ACA] lg:text-[10px]  text-[8px] whitespace-nowrap  rounded-full px-3 py-1 cursor-pointer text-center"
            >
              AUTO PLAY
            </p>
            <p className="text-[10px] whitespace-nowrap">
              Auto Cash Out{" "}
              <span>
                {" "}
                <Switch
                  checked={fk.values.autocashout1}
                  color="secondary"
                  onClick={() => {
                    fk.setFieldValue("autocashout1", !fk.values.autocashout1);
                  }}
                />
              </span>
            </p>
            <p>
              <input
                readOnly={!fk.values.autocashout1 === true}
                placeholder="Enter Value"
                className={`!bg-black px-2 text-[12px] rounded-full py-1 w-[60%] outline-none ${
                  fk.values.autocashout1
                    ? "text-white"
                    : "!text-gray-400 bg-opacity-30"
                } `}
                value={leftbitfk?.values?.custombetValue_auto_cash_out}
                onChange={(e) =>
                  leftbitfk.setFieldValue(
                    "custombetValue_auto_cash_out",
                    e.target.value
                  )
                }
              />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpentBetLeft;

// {openCustomDialogBox && (
//   <Dialog
//     open={openCustomDialogBox}
//     TransitionComponent={Transition}
//     keepMounted
//     onClose={setOpenCustomDialogBox}
//     aria-describedby="alert-dialog-slide-description"
//     PaperProps={{ className: `!max-w-[1000px] !bg-black ` }}
//   >
//     <div className="flex justify-between p-2 items-center bg-black gap-5">
//       <p className="text-white text-[12px]">Auto Play Options</p>
//       <RxCross2
//         className="!text-white cursor-pointer"
//         onClick={() => setOpenCustomDialogBox(false)}
//       />
//     </div>
//     <DialogContent className="!text-white">
//       <AutoPlayBtn1 />
//     </DialogContent>
//   </Dialog>
// )}
