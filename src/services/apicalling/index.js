import axios from "axios";
import { endpoint } from "../urls";
import toast from "react-hot-toast";
const login_data = localStorage.getItem("logindata");
const user_id = login_data && JSON.parse(login_data)?.UserID;
export const MyProfileDataFn = async () => {
  try {
    const response = await axios.get(`${endpoint.profiledata}?id=${user_id}`);
    return response;
  } catch (e) {
    toast(e?.message);
    console.log(e);
  }
};
export const MypromotionDataFn = async () => {
  try {
    const response = await axios.get(`${endpoint.promotion_data}?id=${Number(user_id)}`);
    return response;
  } catch (e) {
    toast(e?.message);
    console.log(e);
  }
};
export const get_user_data_fn = async () => {
  try {
    const response = await axios.get(
      `${endpoint.get_data_by_user_id}?id=${user_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    console.log(response, "This is response");
    if (response?.data?.error === "200") {
      localStorage.setItem(
        "aviator_data",
        JSON.stringify(response?.data?.data)
      );
    }
    sessionStorage.setItem("isAvailableUser", true);
  } catch (e) {
    toast(e?.message);
    console.error(e);
  }
};
export const CandidateNameFn = async (reqbody) => {
  try {
    const response = await axios.get(`${endpoint.get_name_by_referral_code}`,{
      params:reqbody
    });
    return response;
  } catch (e) {
    toast(e?.message);
    console.log(e);
  }
};
export const MyHistoryFn = async () => {
  try {
    const response = await axios.get(
      `${endpoint.my_history}?userid=${user_id}&limit=0`
    );
    return response;
  } catch (e) {
    toast(e?.message);
    console.log(e);
  }
};
export const cashDepositFn = async(reqbody)=>{
  try{
      const res = axios.get(`${endpoint.cash_deposit}`,{
        params:reqbody
      })
      if(res){
        toast("Deposit Amount Successfully")
      }
      return res
  }catch(e){
    console.log(e)
  }
}
export const getAllBetsAviator = async () => {
  try {
    const response = await axios.get(
      `${endpoint.total_bet_history}`
    );
   return response
  } catch (e) {
    toast(e?.message);
    console.log(e);
  }
};
export const walletamount = async () => {
  try {
    const response = await axios.get(
      `${endpoint.userwallet}?userid=${user_id}`
    );
    return response;
  } catch (e) {
    toast(e?.message);
    console.log(e);
  }
};
export const depositHistoryFunction = async () => {
  try {
    const response = await axios.get(
      `${endpoint.deposit_history}?user_id=${user_id}`
    );
    return response;
  } catch (e) {
    toast(e?.message);
    console.log(e);
  }
};
export const withdrawlHistoryFunction = async () => {
  try {
    const response = await axios.get(
      `${endpoint.withdrawl_history}?user_id=${user_id}`
    );
    return response;
  } catch (e) {
    toast(e?.message);
    console.log(e);
  }
};
export const registrationBonusFn = async () => {
  try {
    const response = await axios.get(
      `${endpoint.registration_bonus}?user_id=${user_id}`
    );
    return response;
  } catch (e) {
    toast(e?.message);
    console.log(e);
  }
};
export const depositBonusFn = async () => {
  try {
    const response = await axios.get(
      `${endpoint.deposit_bonus}?user_id=${user_id}`
    );
    return response;
  } catch (e) {
    toast(e?.message);
    console.log(e);
  }
};
export const referralBonusFn = async () => {
  try {
    const response = await axios.get(
      `${endpoint.referral_bonus}?user_id=${user_id}`
    );
    return response;
  } catch (e) {
    toast(e?.message);
    console.log(e);
  }
};
export const dailySelfBetIncomeFn = async () => {
  try {
    const response = await axios.get(
      `${endpoint.daily_self_bet_income}?user_id=${user_id}`
    );
    return response;
  } catch (e) {
    toast(e?.message);
    console.log(e);
  }
};
export const dailyWalletIncomeFn = async () => {
  try {
    const response = await axios.get(
      `${endpoint.daily_wallet_income}?user_id=${user_id}`
    );
    return response;
  } catch (e) {
    toast(e?.message);
    console.log(e);
  }
};

export const BankListDetails = async () => {
  try {
    const response = await axios.get(`${endpoint.get_bank_list}?user_id=${user_id}`);
    return response;
  } catch (e) {
    toast(e?.message);
    console.log(e);
  }
};