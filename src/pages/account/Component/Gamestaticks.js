import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Box, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { zubgback, zubgbackgrad, zubgmid } from "../../../Shared/color";
import Layout from "../../../component/Layout/Layout";
import { rupees } from "../../../services/urls";
import { MyHistoryFn, getAllBetsAviator } from "../../../services/apicalling";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { useQuery } from "react-query";
import moment from "moment";

function Gamestaticks() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { isLoading: myhistory_loding, data: my_history } = useQuery(
    ["my_all_history", value],
    () =>
      (value === "1" && MyHistoryFn()) ||
      (value === "3" && getAllBetsAviator()),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const data = my_history?.data?.data;
  console.log(data);
  return (
    <Layout>
      <Container sx={style.container}>
        <CustomCircularProgress isLoading={myhistory_loding} />
        <Box sx={style.header}>
          <Box component={NavLink} onClick={() => goBack()}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" color="initial">
            Game statistics
          </Typography>
          <Typography variant="body1" color="initial">
            {" "}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "95%",
            marginLeft: "2.5%",
            background: zubgmid,
            borderRadius: "10px",
            padding: "10px",
            mt: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab
              value="1"
              label="Wing Go"
              sx={{
                background: value == 1 && zubgbackgrad,
                color: "white !important",
                borderRadius: "5px",
              }}
            />
            <Tab
              value="2"
              label="Trx"
              sx={{
                background: value == 2 && zubgbackgrad,
                color: "white !important",
                borderRadius: "5px",
              }}
            />
            <Tab
              value="3"
              label="Aviator"
              sx={{
                background: value == 3 && zubgbackgrad,
                color: "white !important",
                borderRadius: "5px",
              }}
            />
            <Tab
              value="4"
              label="Cricket"
              sx={{
                background: value == 4 && zubgbackgrad,
                color: "white !important",
                borderRadius: "5px",
              }}
            />
          </Tabs>
        </Box>
        <Box>
          <Box
            sx={{
              width: "95%",
              marginLeft: "2.5%",
              background: zubgmid,
              borderRadius: "10px",
              padding: "10px",
              mt: "10px",
              padding: "40px",
            }}
          >
            <Typography
              variant="body1"
              color="initial"
              sx={{
                textAlign: "center",
                color: "white",
                fontSize: "26px",
                fontWeight: "600",
              }}
            >
              {rupees}{" "}
              {data
                ?.reduce((a, b) => a + Number(b?.amount || 0), 0)
                ?.toFixed(2) || 0}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "95%",
              marginLeft: "2.5%",
              background: zubgmid,
              borderRadius: "10px",
              padding: "10px",
              mt: "10px",
              padding: "10px",
            }}
          >
            <Typography
              variant="body1"
              color="initial"
              sx={{
                color: "white",
                fontSize: "25px",
                fontWeight: "800",
                background: zubgbackgrad,
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
              }}
            >
              {value === "1"
                ? "Win Go"
                : value === "2"
                ? "Trx"
                : value === "3"
                ? "Aviator"
                : "Cricket"}
            </Typography>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                "&>p": {
                  color: "white",
                  fontWeight: "500",
                  fontSize: "13px",
                  mt: "10px",
                },
              }}
            >
              <Typography variant="body1" color="initial">
                Total bet
              </Typography>
              <Typography variant="body1" color="initial">
                {data?.length || 0}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                "&>p": {
                  color: "white",
                  fontWeight: "500",
                  fontSize: "13px",
                  mt: "10px",
                },
              }}
            >
              <Typography variant="body1" color="initial">
                Winning amount
              </Typography>
              <Typography variant="body1" color="initial">
                ₹
                {value === "3"
                  ? data
                      ?.reduce(
                        (a, b) =>
                          a +
                          Number(
                            Number(b?.cashout_amount || 0) -
                              Number(b?.amount || 0)
                          ),
                        0
                      )
                      ?.toFixed(2) || 0
                  : data
                      ?.reduce((a, b) => a + Number(b?.win || 0), 0)
                      ?.toFixed(2) || 0}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                "&>p": {
                  color: "white",
                  fontWeight: "500",
                  fontSize: "13px",
                  mt: "10px",
                },
              }}
            >
              <Typography variant="body1" color="initial">
                Last Date
              </Typography>
              <Typography variant="body1" color="initial">
                {moment(data?.[0]?.datetime)?.format("DD-MM-YYYY")}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                "&>p": {
                  color: "white",
                  fontWeight: "500",
                  fontSize: "13px",
                  mt: "10px",
                },
              }}
            >
              <Typography variant="body1" color="initial">
                Time
              </Typography>
              <Typography variant="body1" color="initial">
                {moment(data?.[0]?.datetime)?.format("HH:mm:ss")}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default Gamestaticks;

export const style = {
  container: {
    background: zubgback,
    width: "100%",
    height: "100vh",
    overflow: "auto",
  },
  header: {
    padding: "15px 8px",
    background: zubgback,
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
  notificationBox: {
    width: "95%",
    marginLeft: "2.5%",
    borderRadius: "10px",
    background: zubgmid,
    padding: "10px",
    mt: "10px",
    "&>div>div>p": {
      color: "white",
      fontSize: "14px",
      marginLeft: "10px",
      fontWeight: "500",
    },
    "&>p": {
      color: "white",
      fontSize: "13px",
      marginLeft: "0px",
      fontWeight: "500",
      mt: "10px",
    },
    "&>div>div>svg": { color: "white", fontSize: "24px" },
    "&>div>svg": { color: "white", fontSize: "24px" },
  },
  notificationStack: { alignItems: "center", justifyContent: "space-between" },
  paytmbtntwo: {
    borderRadius: "5px",
    textTransform: "capitalize",
    mb: 2,
    background: zubgbackgrad,
    color: "white !important",
    width: "100%",
    mt: "20px",
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgbackgrad, border: "1px solid transparent" },
  },
};
