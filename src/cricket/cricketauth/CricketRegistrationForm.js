import CopyAllIcon from "@mui/icons-material/CopyAll";
import { Box, Button, Container, Dialog, Typography } from "@mui/material";
import copy from "clipboard-copy";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import { signupSchemaValidataon } from "../../Shared/Validation";
import logo from "../../assets/images/club-8-copyright.png";
import { Cricket_id_passFunction } from "../../services/apicalling";
function CricketRegistrationForm() {
  const navigate = useNavigate();
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [id_pass, set_id_pass] = useState(" _ ");
  const [loding, setloding] = useState(false);
  const [id_pass_data, setId_pass_data] = useState({
    id: "",
    pass: "",
    url: "",
  });
  const functionTOCopy = (value) => {
    copy(value);
    toast.success("Copied to clipboard!");
  };
  const initialValue = {
    email: "",
    mobile: "",
    password: "",
    confirmed_password: "",
    referral_code: "",
    service_provider: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    validationSchema: signupSchemaValidataon,
    onSubmit: () => {
      if (fk.values.password !== fk.values.confirmed_password)
        return toast("Password and confirm password should be same.");
      if (!fk.values.privacy_policy)
        return toast("Please confirm the privacy policy.");
      const reqbody = {
        email: fk.values.email,
        mobile: String(fk.values.mobile) || "",
        password: fk.values.password,
        confirmed_password: fk.values.confirmed_password,
        referral_code: fk.values.referral_code,
        privacy_policy: false,
      };

      //   signupFunction(reqbody);
    },
  });

  useEffect(() => {
    Cricket_id_passFunction({ setId_pass_data });
  }, []);

  return (
    <Container
      sx={{
        backgroundRepeat: "no-repeat",
        // backgroundImage: `url(${poster})`,
        backgroundImage: `url('https://www.mordeo.org/download/25792/')`,
        backgroundSize: "100% 100%",
        minHeight: "100vh",
      }}
    >
      <Box>
        <Box
          sx={{
            width: "95%",
            marginLeft: "2.5%",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box
              component="img"
              src={logo}
              sx={{ width: "150px", margin: "auto" }}
            ></Box>
          </Box>
          <Box
            sx={{
              background: "white",
              borderRadius: "10px",
              padding: "20px 10px",
              "& > p:nth-child(1)": {
                fontSize: "20px",
                fontWeight: "500",
                color: "white",
              },
              "& > p:nth-child(2)": {
                fontSize: "12px",
                fontWeight: "400",
                color: "white",
              },
              background: "rgba(255, 255, 255, 0.15)",
              WebkitBackdropFilter: "blur(17px)",
              backdropFilter: "blur(17px)",
              border: "1px solid rgba(255, 255, 255, 0.075)",
            }}
          >
            <Typography variant="body1" color="initial">
              Login{" "}
            </Typography>
            <Typography variant="body1" color="initial">
              {" "}
              Please ensure that all field is correct Thank You!
            </Typography>

            <Box
              component="form"
              sx={{
                width: "95%",
                marginLeft: "2.5%",
                transition: "0.3s",
              }}
              onSubmit={fk.handleSubmit}
            >
              <Box mt={3} className="">
                <p className="!text-white">Service Provider:</p>
                <div className="grid grid-cols-2 !border-2 !border-blue-100 !p-1">
                  <p
                    className="!text-white  !border-r !border-b !border-white !cursor-pointer"
                    onClick={() => {
                      set_id_pass("Tpl3535_Abcd5656");
                      setOpenDialogBox(true);
                    }}
                  >
                    silverexch
                  </p>
                  <a
                    href="https://www.silverexch.com/"
                    className="!text-blue-900 !cursor-pointer !border-b !border-white !text-center"
                  >
                    Details
                  </a>
                  <p
                    className="!text-white  !border-r !border-b !border-white !cursor-pointer"
                    onClick={() => {
                      set_id_pass("Dk3070_Abcd5656");
                      setOpenDialogBox(true);
                    }}
                  >
                    lordsexch
                  </p>
                  <a
                    href="https://lordsexch.com/"
                    className="!text-blue-900 !cursor-pointer !border-b !border-white !text-center"
                  >
                    Details
                  </a>
                  <p
                    className="!text-white  !border-r !border-b !border-white !cursor-pointer"
                    onClick={() => {
                      set_id_pass("Mah3030_Abcd5656");
                      setOpenDialogBox(true);
                    }}
                  >
                    tenexch
                  </p>
                  <a
                    href="https://tenexch.com/"
                    className="!text-blue-900 !cursor-pointer !border-b !border-white !text-center"
                  >
                    Details
                  </a>
                  <p
                    className="!text-white  !border-r !border-b !border-white !cursor-pointer"
                    onClick={() => {
                      set_id_pass("Rrakesh20_Abcd5656");
                      setOpenDialogBox(true);
                    }}
                  >
                    lotusbook247
                  </p>
                  <a
                    href="https://www.lotusbook247.com/"
                    className="!text-blue-900 !cursor-pointer !border-b !border-white !text-center"
                  >
                    Details
                  </a>
                  <p
                    className="!text-white  !border-r !border-b !border-white !cursor-pointer"
                    onClick={() => {
                      set_id_pass("Droo_Abcd1234");
                      setOpenDialogBox(true);
                    }}
                  >
                    diamondexch99
                  </p>
                  <a
                    href="https://www.diamondexch99.com/"
                    className="!text-blue-900 !cursor-pointer !border-b !border-white !text-center"
                  >
                    Details
                  </a>
                </div>
              </Box>
              <div className="!flex !justify-center !mt-5">
                <Button
                  to="/cricket/registration"
                  className="playnow !cursor-pointer !bg-[#00B55E]"
                  role="Button"
                  onClick={() => {
                    if (!id_pass_data?.id || !id_pass_data?.pass)
                      return toast("Data not found");
                    else {
                      set_id_pass(`${id_pass_data?.id}_${id_pass_data?.pass}`);
                      setOpenDialogBox(true);
                    }
                  }}
                >
                  Open Now
                </Button>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
      {openDialogBox && (
        <Dialog open={openDialogBox} onClose={() => setOpenDialogBox(false)}>
          <Box mt={3} className="!text-black !p-5 lg:!w-[20vw] !w-[100%]">
            <p className="!text-black">Service Provider:</p>
            <div className="grid grid-cols-2 !border-2 !border-black !p-1">
              {/* show id */}
              <p className="!text-black  !border-r !border-b !border-black">
                ID
              </p>
              <p className="!text-black !cursor-pointer !border-b !border-black !text-center flex w-full justify-between px-1">
                <span>{id_pass?.split("_")?.[0]}</span>{" "}
                <CopyAllIcon
                  onClick={() => functionTOCopy(id_pass?.split("_")?.[0])}
                />
              </p>
              {/* password */}
              <p className="!text-black  !border-r !border-b !border-black">
                Password
              </p>
              <p className="!text-blue-900 !cursor-pointer !border-b !border-black !text-center flex w-full justify-between px-1">
                <span>{id_pass?.split("_")?.[1]}</span>{" "}
                <CopyAllIcon
                  onClick={() => functionTOCopy(id_pass?.split("_")?.[1])}
                />
              </p>
              {/* url */}
              {id_pass_data?.id && id_pass_data?.pass && (
                <>
                  <p className="!text-black  !border-r !border-b !border-black">
                    URL
                  </p>
                  <a
                    href={id_pass_data?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="!text-blue-900 !cursor-pointer !border-b !border-black !text-center flex w-full justify-between px-1"
                  >
                    <span>Click here to open link</span>{" "}
                  </a>
                </>
              )}
            </div>
          </Box>
        </Dialog>
      )}
      <CustomCircularProgress isLoading={loding} />
    </Container>
  );
}

export default CricketRegistrationForm;
