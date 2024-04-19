import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import * as React from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { zubgback, zubgbackgrad } from "../../../../Shared/color";
import history from "../../../../assets/images/rules.png";
import {
  trx_game_image_index_function,
  updateNextCounter,
} from "../../../../redux/slices/counterSlice";
import { endpoint } from "../../../../services/urls";

const GameHistory = ({ gid }) => {
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const dispatch = useDispatch();
  const { isLoading, data: game_history } = useQuery(
    ["trx_gamehistory", gid],
    () => GameHistoryFn(gid),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const GameHistoryFn = async (gid) => {
    try {
      const response = await axios.get(
        `${endpoint.trx_game_history}?gameid=${gid}&limit=500`
      );
      return response;
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  const game_history_data = React.useMemo(
    () => game_history?.data?.result,
    [game_history?.data?.result]
  );

  React.useEffect(() => {
    dispatch(
      updateNextCounter(
        game_history?.data?.result
          ? Number(game_history?.data?.result?.[0]?.tr_transaction_id) + 1
          : 1
      )
    );
    const tr_digit =
      game_history?.data?.result && game_history?.data?.result?.[0]?.tr_digits;
    let array = [];
    for (let i = 0; i < tr_digit?.length; i++) {
      if (/[a-zA-Z]/.test(tr_digit[i])) {
        array.push(tr_digit[i].toUpperCase());
      } else {
        array.push(tr_digit[i]);
      }
    }
    dispatch(trx_game_image_index_function(array));
  }, [game_history?.data?.result]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      game_history_data?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [page, rowsPerPage, game_history_data]
  );

  if (isLoading)
    return (
      <div className="!w-full  flex justify-center">
        <CircularProgress className={"!text-white"} />
      </div>
    );
  return (
    <Box>
      <Stack direction="row" className="onegotextbox">
        <Typography variant="body1" color="initial">
          <Box
            component="img"
            src={history}
            width={25}
            sx={{ marginRight: "10px" }}
          ></Box>
          {gid === "1"
            ? "One GO Record"
            : gid === "2"
            ? "Three Go Record"
            : "Five Go Record"}
        </Typography>
      </Stack>
      <TableContainer>
        <Table
          sx={{ background: zubgback, color: "white" }}
          className="wintable"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell className="!text-sm !text-center !pl-[2px] !pr-0">
                Period
              </TableCell>
              <TableCell className="!text-sm !text-center !pr-0 !pl-1">
                Block
              </TableCell>
              <TableCell className="!text-sm !text-center !pr-0 !pl-1">
                Block Time
              </TableCell>
              <TableCell className="!text-sm !text-center !pr-0 !pl-1">
                Hash
              </TableCell>
              <TableCell className="!text-sm !text-center !pr-0 !pl-1">
                Result
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows?.map((i) => {
              return (
                <TableRow className="!w-[95%]">
                  <TableCell className="!text-white !pl-[2px] !pr-0 !text-center">
                    <p
                      className={`
                 !bg-gradient-to-t from-[#FE63FF] to-[#007AFF]
                  transparentColor font-bold !text-center
                  `}
                    >
                      {i?.tr_transaction_id}
                    </p>
                  </TableCell>
                  <TableCell className="!text-white !pr-0 !pl-1 !text-center">
                    <span>
                      <LiveHelpIcon
                        className="!text-[#FBA343] cursor-pointer"
                        onClick={() =>
                          navigate("/trx/tron-scan", {
                            state: {
                              tron_id: i?.tr_number,
                            },
                          })
                        }
                      />
                    </span>
                    <span>{i?.tr_number}</span>
                  </TableCell>
                  <TableCell className="!text-white !pr-0 !pl-1 !text-center">
                    <span>{i?.tr_block_time}</span>
                  </TableCell>
                  <TableCell className="!text-white !pr-0 !pl-1 !text-center">
                    <span>{i?.tr_hashno}</span>
                  </TableCell>

                  <TableCell className="!text-white !pr-0 !pl-1 !text-center">
                    <span
                      className={`
                ${
                  (String(Number(i?.tr41_slot_id)) === "0" &&
                    "!bg-gradient-to-t from-red-400 to-violet-400") ||
                  (String(Number(i?.tr41_slot_id)) === "5" &&
                    "!bg-gradient-to-t from-violet-400 to-green-400") ||
                  ((String(Number(i?.tr41_slot_id)) === "1" ||
                    String(Number(i?.tr41_slot_id)) === "3" ||
                    String(Number(i?.tr41_slot_id)) === "7" ||
                    String(Number(i?.tr41_slot_id)) === "9" ||
                    String(Number(i?.tr41_slot_id)) === "10") &&
                    "bg-gradient-to-t from-green-400 to-green-900") ||
                  ((String(Number(i?.tr41_slot_id)) === "2" ||
                    String(Number(i?.tr41_slot_id)) === "4" ||
                    String(Number(i?.tr41_slot_id)) === "6" ||
                    String(Number(i?.tr41_slot_id)) === "8" ||
                    String(Number(i?.tr41_slot_id)) === "30") &&
                    "bg-gradient-to-tl from-red-400 to-red-900") ||
                  (String(Number(i?.tr41_slot_id)) === "50" &&
                    "bg-[#3183ee]") ||
                  (String(Number(i?.tr41_slot_id)) === "40" &&
                    "bg-[#f1be24]") ||
                  (String(Number(i?.tr41_slot_id)) === "20" && "bg-[#eb2feb]")
                }
                transparentColor font-bold  text-lg
                `}
                    >
                      {Number(i?.tr41_slot_id)}
                    </span>
                    <span> {Number(i?.tr41_slot_id) <= 4 ? "S" : "B"}</span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Box className="paginationTable !w-full">
          <TablePagination
            sx={{ background: zubgbackgrad, color: "white", width: "100%" }}
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={game_history_data?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Rows"
          />
        </Box>
      </TableContainer>
      {/* <CustomCircularProgress isLoading={isLoading}/> */}
    </Box>
  );
};

export default GameHistory;
