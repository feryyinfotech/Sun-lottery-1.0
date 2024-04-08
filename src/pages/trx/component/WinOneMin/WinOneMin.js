import { Box, Button, Stack, Typography } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { zubgback, zubgmid } from "../../../../Shared/color";
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
import ApplyBetDialogBox from "../ApplyBetDialogBox";
import Chart from "./Chart";
import GameHistory from "./GameHistory";
import MyHistory from "./MyHistory";
import OneMinCountDown from "./OneMinCountDown";
import ThreeMinCountDown from "./ThreeMinCountDown";
import TwoMinCountDown from "./TwoMinCountDown";
import { useFormik } from "formik";

function WinOneMin({ gid }) {
  const [TabTwo, setTabTwo] = useState(1);
  const [apply_bit_dialog_box, setapply_bit_dialog_box] = React.useState(false);
  const [dialog_type, setdialog_type] = React.useState(0);
  // const [show_this_one_min_time,setshow_this_one_min_time] = useState()

  const initialValues = {
    openTimerDialogBoxOneMin: false,
    show_this_one_min_time: 0,
  };

  const fk = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      console.log(fk.values);
    },
  });

  return (
    <Box className="mainBox">
      {React.useMemo(() => {
        return <OneMinCountDown fk={fk} />
      }, [])}
      {React.useMemo(() => {
        return (
          <Box
            sx={{
              width: "95%",
              marginLeft: "2.5%",
              my: "20px",
              background: zubgmid,
              padding: "10px",
              borderRadius: "10px",
              position: "relative",
            }}
          >
            {fk.values.openTimerDialogBoxOneMin && (
              <div className="!w-full !z-50 !h-full  !absolute px-5 flex justify-center items-center">
                <div
                  className="flex gap-2 justify-cente !bg-opacity-5"
                  sx={{ width: "100%" }}
                >
                  <div
                    style={{
                      fontSize: 200,
                      borderRadius: 20,
                      // background: "rgb(73, 57, 193)",
                      fontWeight: 700,
                      width: 150,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      // color: "white",
                    }}
                    className="!bg-white !bg-opacity-50 !text-[#1610D0]"
                  >
                    {String(fk?.values?.show_this_one_min_time)
                      ?.padStart(2, "0")
                      ?.substring(0, 1)}
                  </div>
                  <div
                    style={{
                      fontSize: 200,
                      borderRadius: 20,
                      // background: "rgb(73, 57, 193)",
                      fontWeight: 700,
                      width: 150,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      // color: "white",
                    }}
                    className="!bg-white !bg-opacity-50 !text-[#1610D0]"
                  >
                    {String(fk?.values?.show_this_one_min_time)
                      ?.padStart(2, "0")
                      ?.substring(1, 2)}
                  </div>
                </div>
              </div>
            )}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: "20px",
                "&>button": { width: "32%", padding: "10px 10px " },
              }}
            >
              <Button
                className="greembtn"
                onClick={() => {
                  setapply_bit_dialog_box(true);
                  setdialog_type("green");
                }}
              >
                Join Green
              </Button>
              <Button
                className="greemviolet"
                onClick={() => {
                  setapply_bit_dialog_box(true);
                  setdialog_type("voilet");
                }}
              >
                Join Violet
              </Button>
              <Button
                className="greemred"
                onClick={() => {
                  setapply_bit_dialog_box(true);
                  setdialog_type("red");
                }}
              >
                Join Red
              </Button>
            </Box>
            {/* pridictcolor */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: "20px",

                "&>img": { width: "15%" },
              }}
            >
              {[
                { no: 0, img: pr0 },
                { no: 1, img: pr11 },
                { no: 2, img: pr22 },
                { no: 3, img: pr33 },
                { no: 4, img: pr4 },
              ]?.map((i) => {
                return (
                  <img
                    className="!cursor-pointer "
                    src={i?.img}
                    onClick={() => {
                      setapply_bit_dialog_box(true);
                      setdialog_type(i.no);
                    }}
                    alt="button"
                  />
                );
              })}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: "20px",

                "&>img": { width: "15%" },
              }}
            >
              {[
                { no: 5, img: pr5 },
                { no: 6, img: pr6 },
                { no: 7, img: pr7 },
                { no: 8, img: pr8 },
                { no: 9, img: pr9 },
              ]?.map((i) => {
                return (
                  <img
                    className="!cursor-pointer"
                    src={i?.img}
                    onClick={() => {
                      setapply_bit_dialog_box(true);
                      setdialog_type(i.no);
                    }}
                    alt="button"
                  />
                );
              })}
            </Box>
            <div className="!w-full !grid grid-cols-2 gap-2 !mt-2">
              <Button
                sx={{ py: "10px" }}
                className="!bg-[#FBB13B] !text-white"
                onClick={() => {
                  setapply_bit_dialog_box(true);
                  setdialog_type("big");
                }}
              >
                Big
              </Button>
              <Button
                className="!bg-[#EE1285] !text-white"
                onClick={() => {
                  setapply_bit_dialog_box(true);
                  setdialog_type("small");
                }}
              >
                small
              </Button>

              {/* small */}

              {/* small close */}
            </div>
          </Box>
        );
      }, [fk])}

      <Box className="tableBox_wingo">
        {React.useMemo(() => {
          return (
            <>
              <Box sx={{ background: zubgback, borderRadius: "10px" }}>
                <Stack direction="row">
                  <Box
                    component={NavLink}
                    onClick={() => setTabTwo(1)}
                    className={
                      TabTwo === 1 ? "activewinNavtwo Winnavtow" : "Winnavtow"
                    }
                  >
                    <Typography variant="h3" color="initial">
                      Game History
                    </Typography>
                  </Box>
                  <Box
                    component={NavLink}
                    onClick={() => setTabTwo(2)}
                    className={
                      TabTwo === 2 ? "activewinNavtwo Winnavtow" : "Winnavtow"
                    }
                  >
                    <Typography variant="h3" color="initial">
                      Chart
                    </Typography>
                  </Box>
                  <Box
                    component={NavLink}
                    onClick={() => setTabTwo(3)}
                    className={
                      TabTwo === 3 ? "activewinNavtwo Winnavtow" : "Winnavtow"
                    }
                  >
                    <Typography variant="h3" color="initial">
                      My History
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </>
          );
        }, [TabTwo])}
        {TabTwo === 1 && <GameHistory gid={gid} />}
        {TabTwo === 2 && <Chart gid={gid} />}
        {TabTwo === 3 && <MyHistory gid={gid} />}
      </Box>
      {apply_bit_dialog_box && (
        <ApplyBetDialogBox
          apply_bit_dialog_box={apply_bit_dialog_box}
          setapply_bit_dialog_box={setapply_bit_dialog_box}
          type={dialog_type}
          gid={gid}
        />
      )}
    </Box>
  );
}

export default WinOneMin;
