import { CircularProgress } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiMessageRounded } from 'react-icons/bi';
import { BsSignTurnRight } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { endpoint } from '../services/urls';
import { get_user_data_fn } from '../services/apicalling';
import { useDispatch,useSelector } from "react-redux";
const MyBets = () => {
  const dispatch = useDispatch()
  const aviator_login_data = useSelector(
    (state) => state.aviator.aviator_login_data
  );

  const [limit, setlimit] = useState(10);
  // const logindata = localStorage.getItem('aviator_data');
  const userId = aviator_login_data && JSON.parse(aviator_login_data)?.id;

  const { isLoading, data } = useQuery(
    ["mybets", limit],
    () => getHistory(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  useEffect(() => {
    !aviator_login_data && get_user_data_fn(dispatch);
  }, []);

  const getHistory = async () => {
    try {
      const response = await axios.get(
        `${endpoint.bet_history}?userid=${userId}&limit=${limit}`,
      );
     return response
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  const result = data?.data?.data || []
  if (isLoading) return <div className="flex justify-center items-center">
    <CircularProgress />
  </div>;
    return (
      <div className="max-h-[90%] overflow-auto hide relative">
        <div className=" grid grid-cols-3 place-items-start  w-full bg-black p-1">
          <p className="text-[10px] text-gray-500">Date</p>
          <p className="text-[10px] text-gray-500">Bet INT x</p>
          <p className="text-[10px] text-gray-500">Cash out, INR</p>
        </div>
        {result?.slice(0,11)?.map((i, index) => {
          return (
            <div
              className={`${
                i?.cashout_amount ?
                "bg-[#213519] bg-opacity-30 border-[2px] border-[#1e430ff6]":
                "bg-black bg-opacity-30"
              } rounded-md px-1 mt-1`}
            >
              <div className=" grid grid-cols-3 place-items-start">
                <div>
                <span className="text-[10px]">
                      {moment(i?.datetime || Date.now()).format("HH:mm")}
                    </span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-[10px]">
                    {Number(i?.amount || 0)?.toFixed(2)}
                  </span>
                  <span
                    className={`bg-black rounded-full px-3 py-1 text-[10px] ${
                      index % 2 === 0 ? "text-[#4e92ea]" : "text-red-500"
                    }`}
                  >
                    {Number(i?.multiplier || 0)?.toFixed(2)}x
                  </span>
                </div>
                <div className="w-full flex justify-end">
                  <div className="flex gap-2 items-center">
                    {i?.cashout_amount && (
                      <span className="text-[10px]">
                        {Number(i?.cashout_amount || 0)?.toFixed(2)}
                      </span>
                    )}
                    <span className="text-[15px]">
                      <BsSignTurnRight className="!text-green-800" />
                    </span>
                    <span className="bg-black rounded-full px-3 py-1 text-blue-800 text-[15px]">
                      <BiMessageRounded />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );

}

export default MyBets

