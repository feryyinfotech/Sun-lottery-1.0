import React, { useEffect } from "react";
import livecricketmatchsplashscreenimage from "../assets/livecricketmatchsplashscreenimage.PNG";
import Layout from "../component/Layout/Layout";
import { Container } from "@mui/material";
import { zubgback } from "../Shared/color";
import { useNavigate } from "react-router-dom";
const SplashScreen = () => {

  // useEffect(()=>{
  //    const navigate = useNavigate();
  //   setTimeout(()=>{
  //     navigate('/cricket/user-profile')
  //   },2000);
  // },[])

  return (
    <Layout footer={false}>
      <Container className="!bg-gradient-to-b !h-screen from-[#301E8C] to-[#3A9822]">
        <div className="h-[100%] w-full flex justify-center items-center py-[25%] no-scrollbar">
          <img
            src={livecricketmatchsplashscreenimage}
            className="!rounded-full lg:!h-full !h-[50%]"
          />
        </div>
      </Container>
    </Layout>
  );
};

export default SplashScreen;
