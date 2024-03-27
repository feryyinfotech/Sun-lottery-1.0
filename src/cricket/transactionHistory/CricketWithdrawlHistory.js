import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  zubgback,
  zubgbackgrad,
  zubgback_cricket,
  zubgcricklight,
  zubgcrickorange,
  zubgcrickgred,
} from "../../Shared/color";
import deposit from "../../assets/images/history.png";
import Layout from "../../component/Layout/Layout";
import { useQuery } from "react-query";
import { withdrawlHistoryFunction } from "../../services/apicalling";
import moment from "moment";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";

function CricketWithdrawlHistory() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const { isLoading, data } = useQuery(
    ["deposit_cricket_history"],
    () => withdrawlHistoryFunction(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );
  const res = data?.data?.data?.filter((i)=>i?.tr15_depo_type === "Cricket")
  return (
    <Layout footer={false}>
      <Container
        className="no-scrollbar"
        sx={{
          background: zubgcrickgred,
          width: "100%",
          height: "100vh",
          overflow: "auto",
        }}
      >
      <CustomCircularProgress isLoading={isLoading}/>
        <Box sx={style.header}>
          <Box component={NavLink} onClick={goBack}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" color="initial">
            Withdrawal history
          </Typography>
          <Box></Box>
        </Box>

        <Box>
          <Box
            sx={{
              padding: "10px",
              width: "95%",
              margin: "auto",
              mt: 2,
              background: zubgcrickorange,
              borderRadius: "10px",
              mb: 5,
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
              <Box component="img" src={deposit} width={30}></Box>
              <Typography
                variant="body1"
                color="initial"
                sx={{ fontSize: "15px ", color: "white", ml: "10px" }}
              >
                Withdrawal history
              </Typography>
            </Stack>
            {res?.map((i, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    padding: "15px",
                    borderRadius: "10px",
                    border: "1px solid white",
                    background: zubgcricklight,
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      paddingBottom: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: "1px solid white",
                    }}
                  >
                    <Box>
                      <Button
                        sx={{
                          background: zubgcrickgred,
                          color: "white",
                          textTransform: "capitalize",
                        }}
                      >
                        Withdrawal
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        sx={{ color: "white", textTransform: "capitalize" }}
                      >
                        {i?.tr15_status}
                      </Button>
                      <IconButton>
                        <ArrowForwardIcon sx={{ color: "white" }} />
                      </IconButton>
                    </Box>
                  </Stack>
                  .
                  <Stack
                    direction="row"
                    sx={{
                      mb: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: "white" },
                    }}
                  >
                    <Typography variant="body1" color="initial">
                      Balance
                    </Typography>
                    <Typography variant="body1" color="initial">
                      ₹ {i?.tr15_amt}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{
                      mb: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: "white" },
                    }}
                  >
                    <Typography variant="body1" color="initial">
                      Date/Time
                    </Typography>
                    <Typography variant="body1" color="initial">
                      {moment(i?.tr15_date)?.format("DD-MM-YYYY")}{" "}
                      {moment(i?.tr15_date)?.format("HH:mm:ss")}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{
                      mb: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: "white" },
                    }}
                  >
                    <Typography variant="body1" color="initial">
                      Status
                    </Typography>
                    <Typography variant="body1" color="initial">
                      {i?.tr15_status}{" "}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{
                      mb: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: "white" },
                    }}
                  >
                    <Typography variant="body1" color="initial">
                      Success Date/Time
                    </Typography>
                    <Typography variant="body1" color="initial">
                      {moment(i?.success_date)?.format("DD-MM-YYYY")}{" "}
                      {moment(i?.success_date)?.format("HH:mm:ss")}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{
                      mb: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: "white" },
                    }}
                  >
                    <Typography variant="body1" color="initial">
                      Trans number
                    </Typography>
                    <Stack
                      direction="row"
                      sx={{
                        mb: "10px",
                        alignItems: "center",
                        justifyContent: "space-between",
                        "&>p": { color: "white" },
                      }}
                    >
                      <Typography variant="body1" color="initial">
                        {i?.tr15_trans}
                      </Typography>
                      <IconButton>
                        <ContentCopyIcon sx={{ color: "white" }} />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Box>
              );
            })}

            {/* <Button sx={style.paytmbtntwo}>All history</Button> */}
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default CricketWithdrawlHistory;

const style = {
  header: {
    padding: "8px",
    background: zubgcrickgred,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&>p": { color: "white !important", ml: "-30px" },
    "&>a>svg": { color: "white", fontSize: "25px" },
  },
  wthui: {
    textAlign: "center",
    width: "32%",
    minHeight: "15vh",
    background: zubgback_cricket,
    borderRadius: "10px",
    mb: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&>div>p": { color: "white" },
  },
  paymentlink: {
    width: "32%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "15vh",
    background: zubgback_cricket,
    borderRadius: "10px",
    mb: "10px",
    "&>p": {
      color: "white",
      fontSize: "12px",
      fontWeight: "500",
      textAlign: "center",
      mt: "5px",
    },
  },
  paymentBoxOuter: {
    width: "95%",
    margin: "auto",
    my: "10px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paytmbtn: {
    mb: 2,
    background: zubgback,
    color: "white !important",
    width: "31%",
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgbackgrad, border: "1px solid transparent" },
  },
  paytmbtntwo: {
    borderRadius: "5px",
    textTransform: "capitalize",
    mb: 2,
    background: zubgcricklight,
    color: "white !important",
    width: "100%",
    mt: "20px",
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgcricklight, border: "1px solid transparent" },
  },
  rechargeinstext: {
    mb: "10px",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { marginLeft: "10px", color: "white !important", fontSize: "14px" },
  },
};
