import { Box, Container, Dialog, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { zubgback } from "../../Shared/color";
import ludotwo from "../../assets/images/lodu2.webp";
import ludothree from "../../assets/images/lodu3.webp";
import ludofour from "../../assets/images/lodu4.webp";
import ludofive from "../../assets/images/lodu5.webp";
import ludosix from "../../assets/images/lodu6.webp";
import ludo from "../../assets/images/ludo.webp";
import Layout from "../../component/Layout/Layout";
import toast from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
import sunlotteryhomebanner from "../../assets/sunlotteryhomebanner.jpg";
import { useState } from "react";

function Activity() {
  const navigate = useNavigate();
  const [openDialogBoxHomeBanner, setopenDialogBoxHomeBanner] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  const game_data = [
    {
      name: "Ludo Supreme",
      src: ludo,
    },
    {
      name: "Ludo Ninja",
      src: ludotwo,
    },
    {
      name: "Ludo Turbo",
      src: ludothree,
    },
    {
      name: "Snakes & Ladders Plus",
      src: ludofour,
    },
    {
      name: "Trump Cards Mania",
      src: ludofive,
    },
    {
      name: "Ludo Supreme League",
      src: ludosix,
    },
  ];

  return (
    <Layout>
      <Container
        sx={{
          background: zubgback,
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 7,
        }}
      >
        <Box sx={style.header}>
          <Box></Box>
          <Typography
            variant="body1"
            color="initial"
            sx={{ mt: 2, fontSize: "16px", fontWeight: "600" }}
          >
            Activity
          </Typography>
          <Box></Box>
        </Box>
        <Box className="bgcardbox">
          {game_data?.map((i, index) => {
            return (
              <Box
                onClick={() => toast("Comming Soon !")}
                key={index}
                className="bgcardboxda   !cursor-pointer hover:!scale-95 hover:!duration-1000"
              >
                <Box sx={{ width: "100%", height: "160px" }} >
                  <Box
                    sx={{
                      width: "60%",
                      height: "50%",
                      marginLeft: "20%",
                      marginTop: "10%",
                    }}
                  >
                    <Box
                      component="img"
                      src={i.src}
                      sx={{ width: "100%", height: "100%" }}
                    ></Box>
                  </Box>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{
                      textAlign: "center",
                      mt: "10px",
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "white",
                    }}
                  >
                    {i.name}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
        {openDialogBoxHomeBanner && (
          <Dialog PaperProps={{width:"500px",height:"500px"}} open={openDialogBoxHomeBanner}>
            <div>
              <p>
                <IconButton onClick={() => setopenDialogBoxHomeBanner(false)}>
                  <CloseIcon />
                </IconButton>
              </p>
              <p>
                <img  src={sunlotteryhomebanner} />
              </p>
            </div>
          </Dialog>
        )}
      </Container>
    </Layout>
  );
}

export default Activity;

const style = {
  header: {
    padding: "8px",
    background: zubgback,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&>p": { color: "white !important", ml: "-30px" },
    "&>a>svg": { color: "white", fontSize: "25px" },
  },
  dashboardTitle: {
    textAlign: "center",
    color: "white !important",
    fontSize: "21px",
    fontWeight: "500",
  },
};
