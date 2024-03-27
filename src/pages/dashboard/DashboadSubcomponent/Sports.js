import { Box, Typography } from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { zubgback, zubgbackgrad, zubgmid } from "../../../Shared/color";
import kind from "../../../assets/images/crick2.png";
import Crickback from "../../../assets/images/crickback.png";
import go from "../../../assets/images/go.png";


const Original = () => {
  const navigate = useNavigate();


  return (
    <Box>
      <Box sx={style.root}>
        <Box sx={style.roottwo} component={NavLink} to={"/cricket"}>
          <Box sx={{ width: "70%", height: "100%", position: 'relative' }}>
            <Box sx={{
              position: 'absolute', top: 0, left: '0', width: '100%', height: '100%', borderRadius: '10px 0px 0px 10px',
            }}>
              <Box component='img' src={Crickback} sx={{ width: '100%', height: '100%', borderRadius: '10px 0px 0px 10px', opacity: '0.4' }}></Box>
            </Box>
            <Box sx={style.titleBox}>
              <Box>
                <Typography variant="body1" color="initial" sx={style.title} className="!text-4xl">
                  Cricket
                </Typography>
              </Box>
              <Box>
                <Box component="img" width={65} src={go}></Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "30%", height: "100%" }}>
            <Box component="img" sx={style.imgtwo} src={kind}></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Original;

const style = {
  root: {
    width: "95%",
    marginLeft: "2.5%",
    background: zubgmid,
    marginTop: "20px",
    padding: "1px 10px 10px 10px",
    borderRadius: "10px",
  },
  roottwo: {
    mt: "10px",
    width: "100%",
    height: "12vh",
    background: zubgback,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  titleBox: {
    width: "100%",
    padding: "10px 0px 0px 10px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: 'relative',
  },

  title: {
    lineHeight: "1.5",
    textAlign: "start",
    color: "white",
    fontSize: "45px",
    fontWeight: "900 !important",
    fontFamily: "Trade Winds !important",
    background: zubgbackgrad,
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },
  imgtwo: { width: "100%", height: "100%", borderRadius: "0px 10px 10px 0px" },
  imgone: { width: "100%", height: "100%", borderRadius: "0px 0px 0px 10px" },
  textone: { color: "white", fontSize: "13px" },
  texttow: { color: "white", fontSize: "10px", mr: "5px" },
  btmbox: {
    width: "100%",
    height: "45%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
  },
};
