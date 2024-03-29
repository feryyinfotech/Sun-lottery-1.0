export const rupees = "₹"

//  export const baseUrl = "https://task.sabrikhidmat.org"
//  export const baseUrl = "https://bike.vpayout.com"
 export const baseUrl = "https://admin.sunlottery.fun"
//  export const baseUrl = "https://admin.gameszone.life"


// export const domain = "http://192.168.18.183:9000"
// export const domain = "https://app.ferryinfotech.in/"
export const domain = "https://aviator-backend-p1xp.onrender.com/"
// export const domain = "https://app.sunlottery.fun/"
export const support_mail = `support@sunlottrey.fun`
export const telegram_url = `https://t.me/SunLottaryOfficial`

export const endpoint ={
  login:`${baseUrl}/api/user_login`,
  signup:`${baseUrl}/api/user_register`,
  userwallet:`${baseUrl}/api/userwallet`,
  profiledata:`${baseUrl}/api/profileapi`,
  applybet:`${baseUrl}/api/bet`,
  game_history:`${baseUrl}/api/colour_result`,
  my_history:`${baseUrl}/api/getbet`,
  check_result:`${baseUrl}/api/checkresult`,
  color_winning:`${baseUrl}/api/colour_winning`,
  cash_deposit:`${baseUrl}/api/deposit`,
  payment_url:"https://vpayout.com/Upi_controller/insert_fund_request_online",
  withdraw_payment:`${baseUrl}/api/payout-request`,
  get_name_by_referral_code:`${baseUrl}/api/get-user-reffral-name`,
  payment_request:`${baseUrl}/api/deposit-request`,
  registration_bonus:`${baseUrl}/api/welcom-bonus`,
  deposit_history:`${baseUrl}/api/deposit-history`,
  withdrawl_history:`${baseUrl}/api/withdrawl-history`,
  deposit_bonus:`${baseUrl}/api/deposit-bonus`,
  referral_bonus:`${baseUrl}/api/refral-bonus`,
  daily_self_bet_income:`${baseUrl}/api/daily-self-bet-income`,
  daily_wallet_income:`${baseUrl}/api/daily-wallet-income`,
  add_bank_details:`${baseUrl}/api/bank-add`,
  get_bank_list:`${baseUrl}/api/user-bank-details`,
  promotion_data:`https://game-zone-sql.onrender.com/api/v1/promotiondata`,

  // aviator api's
  aviator_login:`${baseUrl}/api/aviator/login`,
  get_data_by_user_id:`${baseUrl}/api/userProfile`,
  aviator_result:`${baseUrl}/api/aviator/result_cron`,
  total_bet_history:`${baseUrl}/api/aviator/total-bet-histroy`,
  bet_history:`${baseUrl}/api/aviator/bet_histroy`,
  result:`${baseUrl}/api/aviator/result`,
  wallet_data:`${baseUrl}/api/aviator/userwallet`,
  bet_now:`${baseUrl}/api/aviator/bet_now`,
  cash_out:`${baseUrl}/api/aviator/cash_out`,
}