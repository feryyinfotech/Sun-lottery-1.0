import { Box, Stack, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import * as React from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { zubgback, zubgbackgrad } from "../../../../Shared/color";
import history from "../../../../assets/images/rules.png";
import { endpoint } from "../../../../services/urls";
const Chart = ({ gid }) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [cor, setcor] = React.useState([]);
  const [visibleRows, setVisibleRows] = React.useState([]);

  const { isLoading, data: game_history } = useQuery(
    ["trx_gamehistory_chart", gid],
    () => GameHistoryFn(gid),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const GameHistoryFn = async (gid) => {
    try {
      const response = await axios.get(`${endpoint.trx_game_history}?gameid=${gid}&limit=500`);
      return response;
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const game_history_data = React.useMemo(
    () => game_history?.data?.result,
    [game_history?.data?.result]
  );

  React.useEffect(() => {
    setVisibleRows(
      game_history_data?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    );
  }, [page, rowsPerPage, game_history?.data?.result]);

  React.useEffect(() => {
    if (visibleRows && !isLoading) {
      const parent = document.getElementById("parent");
      const parentRect = parent.getBoundingClientRect();
      const newCor =
        visibleRows?.length > 0 &&
        visibleRows?.map((element, index) => {
          const childId =
            String(Number(element?.tr41_slot_id)) === "0"
              ? `zero${index}`
              : String(Number(element?.tr41_slot_id)) === "1"
              ? `one${index}`
              : String(Number(element?.tr41_slot_id)) === "2"
              ? `two${index}`
              : String(Number(element?.tr41_slot_id)) === "3"
              ? `three${index}`
              : String(Number(element?.tr41_slot_id)) === "4"
              ? `four${index}`
              : String(Number(element?.tr41_slot_id)) === "5"
              ? `five${index}`
              : String(Number(element?.tr41_slot_id)) === "6"
              ? `six${index}`
              : String(Number(element?.tr41_slot_id)) === "7"
              ? `seven${index}`
              : String(Number(element?.tr41_slot_id)) === "8"
              ? `eight${index}`
              : `nine${index}`;
          const childRect = document
            .getElementById(childId)
            .getBoundingClientRect();
          const centerX =
            childRect.left + childRect.width / 2 - parentRect.left;
          const centerY = childRect.top + childRect.height / 2 - parentRect.top;

          return { x: centerX, y: centerY };
        });
      setcor(newCor || []);
    }
  }, [visibleRows]);

  if (isLoading)
    return (
      <div className="!w-full  flex justify-center">
        <CircularProgress className={"!text-white"} />
      </div>
    );
  return (
    <Box className="chartTable">
      <Stack direction="row" className="onegotextbox">
        <Typography variant="body1" color="initial">
          <Box
            component="img"
            src={history}
            width={25}
            sx={{ marginRight: "10px" }}
          ></Box>{" "}
          Statistic(last 100 Periods)
        </Typography>
      </Stack>
      <div className="relative !h-[68vh] overflow-auto !w-[100%] no-scrollbar !overflow-x-hidden">
        <div className="absolute !w-[100%] !bg-red-800">
          {visibleRows?.length > 0 &&
            visibleRows?.map((element, indexi) => {
              return (
                <Box
                  sx={{
                    background: zubgback,
                    padding: "10px",
                    borderBottom: "1px solid white",
                  }}
                >
                  <div className="flex justify-between">
                    <span
                      className={`
                 !bg-gradient-to-t from-[#FE63FF] to-[#007AFF]
                  transparentColor font-bold text-lg
                 `}
                    >
                      {element?.tr_transaction_id}
                    </span>
                    {/* // main box of chart form 0 to 9 */}
                    <Box className="flex items-center justify-between !w-[80%]  lg:!w-[70%]">
                      {/* /// 0   //// */}
                      <div id={`zero${indexi}`} className="z-20">
                        <Typography
                          className={`circleNumberbody  !font-bold ${
                            String(Number(element?.tr41_slot_id)) === "0"
                              ? "!bg-gradient-to-b from-[#e85053] to-[#8c06f2] !text-white"
                              : "!bg-white !text-black"
                          }`}
                        >
                          {" "}
                          0
                        </Typography>
                      </div>
                      {/* /// 1   //// */}
                      <div id={`one${indexi}`} className="z-20">
                        <Typography
                          className={`circleNumberbody   !font-bold ${
                            String(Number(element?.tr41_slot_id) ) === "1"
                              ? "!bg-[#4bef98] !text-white"
                              : "!bg-white !text-black"
                          }`}
                        >
                          {" "}
                          1
                        </Typography>
                      </div>
                      {/* /// 2   //// */}
                      <div id={`two${indexi}`} className="z-20">
                        <Typography
                          className={`circleNumberbody   !font-bold ${
                            String(Number(element?.tr41_slot_id)) === "2"
                              ? "!bg-[#f1494c] !text-white"
                              : "!bg-white !text-black"
                          }`}
                        >
                          {" "}
                          2
                        </Typography>
                      </div>
                      {/* /// 3   //// */}
                      <div id={`three${indexi}`} className="z-20">
                        <Typography
                          className={`circleNumberbody   !font-bold ${
                            String(Number(element?.tr41_slot_id)) === "3"
                              ? "!bg-[#46eb93] !text-white"
                              : "!bg-white !text-black"
                          }`}
                        >
                          {" "}
                          3
                        </Typography>
                      </div>
                      {/* /// 4   //// */}
                      <div id={`four${indexi}`} className="z-20">
                        <Typography
                          className={`circleNumberbody   !font-bold ${
                            String(Number(element?.tr41_slot_id)) === "4"
                              ? "!bg-[#ed4b4e] !text-white"
                              : "!bg-white !text-black"
                          }`}
                        >
                          {" "}
                          4
                        </Typography>
                      </div>
                      {/* /// 5   //// */}
                      <div id={`five${indexi}`} className="z-20">
                        <Typography
                          className={`circleNumberbody  !font-bold ${
                            String(Number(element?.tr41_slot_id)) === "5"
                              ? "!bg-gradient-to-b from-[#55f8a1] to-[#8c06f2] !text-white"
                              : "!bg-white !text-black"
                          }`}
                        >
                          {" "}
                          5
                        </Typography>
                      </div>
                      {/* /// 6   //// */}
                      <div id={`six${indexi}`} className="z-20">
                        <Typography
                          className={`circleNumberbody  !font-bold ${
                            String(Number(element?.tr41_slot_id)) === "6"
                              ? "!bg-[#f54b4e] !text-white"
                              : "!bg-white !text-black"
                          }`}
                        >
                          {" "}
                          6
                        </Typography>
                      </div>
                      {/* /// 7   //// */}
                      <div id={`seven${indexi}`} className="z-20">
                        <Typography
                          className={`circleNumberbody  !font-bold ${
                            String(Number(element?.tr41_slot_id)) === "7"
                              ? "!bg-[#4af499] !text-white"
                              : "!bg-white !text-black"
                          }`}
                        >
                          {" "}
                          7
                        </Typography>
                      </div>
                      {/* /// 8   //// */}
                      <div id={`eight${indexi}`} className="z-20">
                        <Typography
                          className={`circleNumberbody   !font-bold ${
                            String(Number(element?.tr41_slot_id)) === "8"
                              ? "!bg-[#eb494c] !text-white"
                              : "!bg-white !text-black"
                          }`}
                        >
                          {" "}
                          8
                        </Typography>
                      </div>
                      {/* /// 9   //// */}
                      <div id={`nine${indexi}`} className="z-20">
                        <Typography
                          className={`circleNumberbody   !font-bold ${
                            String(Number(element?.tr41_slot_id) ) === "9"
                              ? "!bg-[#4cf199] !text-white"
                              : "!bg-white !text-black"
                          }`}
                        >
                          {" "}
                          9
                        </Typography>
                      </div>
                      <Typography
                        className={`circleNumberbody ${
                          Number(element?.tr41_slot_id) <= 4
                            ? "!bg-[#468ce8] "
                            : "!bg-[#df4be1]"
                        }  !h-[20px] !w-[20px] !rounded-full !text-center !text-white `}
                      >
                        {Number(element?.tr41_slot_id)  <= 4 ? "S" : "B"}
                      </Typography>
                    </Box>
                  </div>
                </Box>
              );
            })}
        </div>
        <div className=" h-[100%] w-[100%] absolute flex justify-end">
          <div className="!w-[80%] lg:!w-[70%]" id="parent">
            <svg
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              className="z-10 absolute"
            >
              {cor?.map((i, index) => {
                return (
                  index > 0 && (
                    <line
                      x1={cor?.[index]?.x}
                      y1={cor?.[index]?.y}
                      x2={cor?.[index - 1]?.x}
                      y2={cor?.[index - 1]?.y}
                      stroke="#FBAC3D"
                      stroke-width="2"
                      fill="none"
                    />
                  )
                );
              })}
            </svg>
          </div>
        </div>
      </div>
      <Box className="paginationTable">
        <TablePagination
          sx={{
            background: zubgbackgrad,
            color: "white",
            borderRadius: "0px 0px 10px 10px",
          }}
          rowsPerPageOptions={[10]}
          component="div"
          count={game_history_data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      {/* <CustomCircularProgress isLoading={isLoading} /> */}
    </Box>
  );
};

export default Chart;
