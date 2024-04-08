import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Box, Container, Typography } from "@mui/material";
import * as React from "react";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { zubgback, zubgmid } from "../../../Shared/color";
import Layout from "../../../component/Layout/Layout";
import { MypromotionDataFn } from "../../../services/apicalling";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
function TeamData() {
  const { isLoading, data } = useQuery(
    ["promotion_data"],
    () => MypromotionDataFn(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const result = data?.data?.data?.teamMembersByLevel;

  return (
    <Layout>
      <Container
        sx={{
          background: zubgback,
          width: "100%",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <CustomCircularProgress isLoading={isLoading} />
        <Box sx={style.header}>
          <Box component={NavLink} to="/promotion/">
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" color="initial">
            Team data
          </Typography>
          <Typography variant="body1" color="initial">
            {" "}
          </Typography>
        </Box>
        {
          <Accordion className="!rounded-lg">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#4737BD", color: "white" }}
            >
              Level 1
            </AccordionSummary>
            <AccordionDetails sx={{ background: zubgback, color: "white" }}>
              <Box sx={{ paddingTop: 2 }}>
                <Box sx={style.accordian}>
                  <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                    <span>S.No.</span>
                    <span>User Id</span>
                    <span className="">Name</span>
                  </div>
                  <div className="h-[2px] w-full !bg-[#281970]"></div>
                  {result?.level_1?.map((i, index) => {
                    return (
                      <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                        <span>{index + 1}</span>
                        <span className="!text-center ">
                          {i?.id || "No data found"}
                        </span>
                        <span className="!text-center ">
                          {i?.full_name || "No data found"}
                        </span>
                      </div>
                    );
                  })}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        }
        {
          <Accordion className="!rounded-lg">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#4737BD", color: "white" }}
            >
              Level 2
            </AccordionSummary>
            <AccordionDetails sx={{ background: zubgback, color: "white" }}>
              <Box sx={{ paddingTop: 2 }}>
                <Box sx={style.accordian}>
                  <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                    <span>S.No.</span>
                    <span>User Id</span>
                    <span className="">Name</span>
                  </div>
                  <div className="h-[2px] w-full !bg-[#281970]"></div>
                  {result?.level_2?.map((i, index) => {
                    return (
                      <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                        <span>{index + 1}</span>
                        <span>{i?.id}</span>
                        <span className="!text-center ">
                          {i?.full_name || "No data found"}
                        </span>
                      </div>
                    );
                  })}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        }
        {
          <Accordion className="!rounded-lg">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#4737BD", color: "white" }}
            >
              Level 3
            </AccordionSummary>
            <AccordionDetails sx={{ background: zubgback, color: "white" }}>
              <Box sx={{ paddingTop: 2 }}>
                <Box sx={style.accordian}>
                  <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                    <span>S.No.</span>
                    <span>User Id</span>
                    <span className="">Name</span>
                  </div>
                  <div className="h-[2px] w-full !bg-[#281970]"></div>
                  {result?.level_3?.map((i, index) => {
                    return (
                      <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                        <span>{index + 1}</span>
                        <span>{i?.id}</span>
                        <span className="!text-center ">
                          {i?.full_name || "No data found"}
                        </span>
                      </div>
                    );
                  })}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        }
        {
          <Accordion className="!rounded-lg">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#4737BD", color: "white" }}
            >
              Level 4
            </AccordionSummary>
            <AccordionDetails sx={{ background: zubgback, color: "white" }}>
              <Box sx={{ paddingTop: 2 }}>
                <Box sx={style.accordian}>
                  <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                    <span>S.No.</span>
                    <span>User Id</span>
                    <span className="">Name</span>
                  </div>
                  <div className="h-[2px] w-full !bg-[#281970]"></div>
                  {result?.level_4?.map((i, index) => {
                    return (
                      <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                        <span>{index + 1}</span>
                        <span>{i?.id}</span>
                        <span className="!text-center ">
                          {i?.full_name || "No data found"}
                        </span>
                      </div>
                    );
                  })}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        }
        {
          <Accordion className="!rounded-lg">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#4737BD", color: "white" }}
            >
              Level 5
            </AccordionSummary>
            <AccordionDetails sx={{ background: zubgback, color: "white" }}>
              <Box sx={{ paddingTop: 2 }}>
                <Box sx={style.accordian}>
                  <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                    <span>S.No.</span>
                    <span>User Id</span>
                    <span className="">Name</span>
                  </div>
                  <div className="h-[2px] w-full !bg-[#281970]"></div>
                  {result?.level_5?.map((i, index) => {
                    return (
                      <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                        <span>{index + 1}</span>
                        <span>{i?.id}</span>
                        <span className="!text-center ">
                          {i?.full_name || "No data found"}
                        </span>
                      </div>
                    );
                  })}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        }
        {
          <Accordion className="!rounded-lg">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#4737BD", color: "white" }}
            >
              Level 6
            </AccordionSummary>
            <AccordionDetails sx={{ background: zubgback, color: "white" }}>
              <Box sx={{ paddingTop: 2 }}>
                <Box sx={style.accordian}>
                  <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                    <span>S.No.</span>
                    <span>User Id</span>
                    <span className="">Name</span>
                  </div>
                  <div className="h-[2px] w-full !bg-[#281970]"></div>
                  {result?.level_6?.map((i, index) => {
                    return (
                      <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                        <span>{index + 1}</span>
                        <span>{i?.id}</span>
                        <span className="!text-center ">
                          {i?.full_name || "No data found"}
                        </span>
                      </div>
                    );
                  })}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        }
        {
          <Accordion className="!rounded-lg">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#4737BD", color: "white" }}
            >
              Level 7
            </AccordionSummary>
            <AccordionDetails sx={{ background: zubgback, color: "white" }}>
              <Box sx={{ paddingTop: 2 }}>
                <Box sx={style.accordian}>
                  <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                    <span>S.No.</span>
                    <span>User Id</span>
                    <span className="">Name</span>
                  </div>
                  <div className="h-[2px] w-full !bg-[#281970]"></div>
                  {result?.level_7?.map((i, index) => {
                    return (
                      <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                        <span>{index + 1}</span>
                        <span>{i?.id}</span>
                        <span className="!text-center ">
                          {i?.full_name || "No data found"}
                        </span>
                      </div>
                    );
                  })}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        }
        {
          <Accordion className="!rounded-lg">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#4737BD", color: "white" }}
            >
              Level 8
            </AccordionSummary>
            <AccordionDetails sx={{ background: zubgback, color: "white" }}>
              <Box sx={{ paddingTop: 2 }}>
                <Box sx={style.accordian}>
                  <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                    <span>S.No.</span>
                    <span>User Id</span>
                    <span className="">Name</span>
                  </div>
                  <div className="h-[2px] w-full !bg-[#281970]"></div>
                  {result?.level_8?.map((i, index) => {
                    return (
                      <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                        <span>{index + 1}</span>
                        <span>{i?.id}</span>
                        <span className="!text-center ">
                          {i?.full_name || "No data found"}
                        </span>
                      </div>
                    );
                  })}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        }
        {
          <Accordion className="!rounded-lg">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#4737BD", color: "white" }}
            >
              Level 9
            </AccordionSummary>
            <AccordionDetails sx={{ background: zubgback, color: "white" }}>
              <Box sx={{ paddingTop: 2 }}>
                <Box sx={style.accordian}>
                  <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                    <span>S.No.</span>
                    <span>User Id</span>
                    <span className="">Name</span>
                  </div>
                  <div className="h-[2px] w-full !bg-[#281970]"></div>
                  {result?.level_9?.map((i, index) => {
                    return (
                      <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                        <span>{index + 1}</span>
                        <span>{i?.id}</span>
                        <span className="!text-center ">
                          {i?.full_name || "No data found"}
                        </span>
                      </div>
                    );
                  })}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        }
        {
          <Accordion className="!rounded-lg">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#4737BD", color: "white" }}
            >
              Level 10
            </AccordionSummary>
            <AccordionDetails sx={{ background: zubgback, color: "white" }}>
              <Box sx={{ paddingTop: 2 }}>
                <Box sx={style.accordian}>
                  <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                    <span>S.No.</span>
                    <span>User Id</span>
                    <span className="">Name</span>
                  </div>
                  <div className="h-[2px] w-full !bg-[#281970]"></div>
                  {result?.level_10?.map((i, index) => {
                    return (
                      <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                        <span>{index + 1}</span>
                        <span>{i?.id}</span>
                        <span className="!text-center ">
                          {i?.full_name || "No data found"}
                        </span>
                      </div>
                    );
                  })}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        }
        {
          <Accordion className="!rounded-lg">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#4737BD", color: "white" }}
            >
              Level 11
            </AccordionSummary>
            <AccordionDetails sx={{ background: zubgback, color: "white" }}>
              <Box sx={{ paddingTop: 2 }}>
                <Box sx={style.accordian}>
                  <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                    <span>S.No.</span>
                    <span>User Id</span>
                    <span className="">Name</span>
                  </div>
                  <div className="h-[2px] w-full !bg-[#281970]"></div>
                  {result?.level_11?.map((i, index) => {
                    return (
                      <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                        <span>{index + 1}</span>
                        <span>{i?.id}</span>
                        <span className="!text-center ">
                          {i?.full_name || "No data found"}
                        </span>
                      </div>
                    );
                  })}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        }
        {
          <Accordion className="!rounded-lg">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#4737BD", color: "white" }}
            >
              Level 12
            </AccordionSummary>
            <AccordionDetails sx={{ background: zubgback, color: "white" }}>
              <Box sx={{ paddingTop: 2 }}>
                <Box sx={style.accordian}>
                  <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                    <span>S.No.</span>
                    <span>User Id</span>
                    <span className="">Name</span>
                  </div>
                  <div className="h-[2px] w-full !bg-[#281970]"></div>
                  {result?.level_12?.map((i, index) => {
                    return (
                      <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                        <span>{index + 1}</span>
                        <span>{i?.id}</span>
                        <span className="!text-center ">
                          {i?.full_name || "No data found"}
                        </span>
                      </div>
                    );
                  })}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        }
        {
          <Accordion className="!rounded-lg">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#4737BD", color: "white" }}
            >
              Level 13
            </AccordionSummary>
            <AccordionDetails sx={{ background: zubgback, color: "white" }}>
              <Box sx={{ paddingTop: 2 }}>
                <Box sx={style.accordian}>
                  <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                    <span>S.No.</span>
                    <span>User Id</span>
                    <span className="">Name</span>
                  </div>
                  <div className="h-[2px] w-full !bg-[#281970]"></div>
                  {result?.level_13?.map((i, index) => {
                    return (
                      <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                        <span>{index + 1}</span>
                        <span>{i?.id}</span>
                        <span className="!text-center ">
                          {i?.full_name || "No data found"}
                        </span>
                      </div>
                    );
                  })}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        }
        {
          <Accordion className="!rounded-lg">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#4737BD", color: "white" }}
            >
              Level 14
            </AccordionSummary>
            <AccordionDetails sx={{ background: zubgback, color: "white" }}>
              <Box sx={{ paddingTop: 2 }}>
                <Box sx={style.accordian}>
                  <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                    <span>S.No.</span>
                    <span>User Id</span>
                    <span className="">Name</span>
                  </div>
                  <div className="h-[2px] w-full !bg-[#281970]"></div>
                  {result?.level_14?.map((i, index) => {
                    return (
                      <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                        <span>{index + 1}</span>
                        <span>{i?.id}</span>
                        <span className="!text-center ">
                          {i?.full_name || "No data found"}
                        </span>
                      </div>
                    );
                  })}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        }
        {
          <Accordion className="!rounded-lg">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#4737BD", color: "white" }}
            >
              Level 15
            </AccordionSummary>
            <AccordionDetails sx={{ background: zubgback, color: "white" }}>
              <Box sx={{ paddingTop: 2 }}>
                <Box sx={style.accordian}>
                  <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                    <span>S.No.</span>
                    <span>User Id</span>
                    <span className="">Name</span>
                  </div>
                  <div className="h-[2px] w-full !bg-[#281970]"></div>
                  {result?.level_15?.map((i, index) => {
                    return (
                      <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                        <span>{index + 1}</span>
                        <span>{i?.id}</span>
                        <span className="!text-center ">
                          {i?.full_name || "No data found"}
                        </span>
                      </div>
                    );
                  })}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        }
        {
          <Accordion className="!rounded-lg">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#4737BD", color: "white" }}
            >
              Level 16
            </AccordionSummary>
            <AccordionDetails sx={{ background: zubgback, color: "white" }}>
              <Box sx={{ paddingTop: 2 }}>
                <Box sx={style.accordian}>
                  <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                    <span>S.No.</span>
                    <span>User Id</span>
                    <span className="">Name</span>
                  </div>
                  <div className="h-[2px] w-full !bg-[#281970]"></div>
                  {result?.level_16?.map((i, index) => {
                    return (
                      <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                        <span>{index + 1}</span>
                        <span>{i?.id}</span>
                        <span className="!text-center ">
                          {i?.full_name || "No data found"}
                        </span>
                      </div>
                    );
                  })}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        }
        {
          <Accordion className="!rounded-lg">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#4737BD", color: "white" }}
            >
              Level 17
            </AccordionSummary>
            <AccordionDetails sx={{ background: zubgback, color: "white" }}>
              <Box sx={{ paddingTop: 2 }}>
                <Box sx={style.accordian}>
                  <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                    <span>S.No.</span>
                    <span>User Id</span>
                    <span className="">Name</span>
                  </div>
                  <div className="h-[2px] w-full !bg-[#281970]"></div>
                  {result?.level_17?.map((i, index) => {
                    return (
                      <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                        <span>{index + 1}</span>
                        <span>{i?.id}</span>
                        <span className="!text-center ">
                          {i?.full_name || "No data found"}
                        </span>
                      </div>
                    );
                  })}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        }
        {
          <Accordion className="!rounded-lg">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#4737BD", color: "white" }}
            >
              Level 18
            </AccordionSummary>
            <AccordionDetails sx={{ background: zubgback, color: "white" }}>
              <Box sx={{ paddingTop: 2 }}>
                <Box sx={style.accordian}>
                  <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                    <span>S.No.</span>
                    <span>User Id</span>
                    <span className="">Name</span>
                  </div>
                  <div className="h-[2px] w-full !bg-[#281970]"></div>
                  {result?.level_18?.map((i, index) => {
                    return (
                      <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                        <span>{index + 1}</span>
                        <span>{i?.id}</span>
                        <span className="!text-center ">
                          {i?.full_name || "No data found"}
                        </span>
                      </div>
                    );
                  })}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        }
        {
          <Accordion className="!rounded-lg">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#4737BD", color: "white" }}
            >
              Level 19
            </AccordionSummary>
            <AccordionDetails sx={{ background: zubgback, color: "white" }}>
              <Box sx={{ paddingTop: 2 }}>
                <Box sx={style.accordian}>
                  <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                    <span>S.No.</span>
                    <span>User Id</span>
                    <span className="">Name</span>
                  </div>
                  <div className="h-[2px] w-full !bg-[#281970]"></div>
                  {result?.level_19?.map((i, index) => {
                    return (
                      <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                        <span>{index + 1}</span>
                        <span>{i?.id}</span>
                        <span className="!text-center ">
                          {i?.full_name || "No data found"}
                        </span>
                      </div>
                    );
                  })}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        }
        {
          <Accordion className="!rounded-lg !mb-20">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="!text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ background: "#4737BD", color: "white" }}
            >
              Level 20
            </AccordionSummary>
            <AccordionDetails sx={{ background: zubgback, color: "white" }}>
              <Box sx={{ paddingTop: 2 }}>
                <Box sx={style.accordian}>
                  <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                    <span>S.No.</span>
                    <span>User Id</span>
                    <span className="">Name</span>
                  </div>
                  <div className="h-[2px] w-full !bg-[#281970]"></div>
                  {result?.level_20?.map((i, index) => {
                    return (
                      <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                        <span>{index + 1}</span>
                        <span>{i?.id}</span>
                        <span className="!text-center ">
                          {i?.full_name || "No data found"}
                        </span>
                      </div>
                    );
                  })}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        }
      </Container>
    </Layout>
  );
}

export default TeamData;

const style = {
  header: {
    padding: "15px 8px",
    background: zubgmid,
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
  accordian: {
    backgroundColor: zubgmid,
    borderRadius: "10px",
    padding: "30px 20px",
    "&>div": { mb: 2 },
    "&>div>div:nth-child(1)": {
      borderRight: "1px solid black",
      width: "50%",
      textAlign: "center",
    },
    "&>div>div:nth-child(2)": {
      width: "50%",
      textAlign: "center",
    },
    "&>div>div>p": {
      color: "white",
      fontSize: "14px",
      fontWeight: 500,
    },
  },
};
