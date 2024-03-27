import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LogoutIcon from "@mui/icons-material/Logout";
import MyAccount from "./MyAccount/MyAccount";
import { useParams } from "react-router-dom";
const Account = () => {
  const { id } = useParams();
  const [selectedIndex, setSelectedIndex] = React.useState(3);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const list = [
    {
      id: 3,
      icon: <StarIcon className="!text-white !pr-2" />,
      item: "Profile",
    },
    {
      id: 4,
      icon: <AccountBalanceWalletIcon className="!text-white !pr-2" />,
      item: "Deposit and withdrawals",
    },
    {
      id: 5,
      icon: <DashboardIcon className="!text-white !pr-2" />,
      item: "Bet and Transaction History",
    },
    {
      id: 6,
      icon: <RequestQuoteIcon className="!text-white !pr-2" />,
      item: "Request",
    },
    {
      id: 7,
      icon: <LogoutIcon className="!text-white !pr-2" />,
      item: "Logout",
    },
  ];

  return (
    <div className="text-white flex gap-2 w-full h-[100%] ">
      <div className=" w-[20%] h-full   text-[12px] bg-[#1A2532]">
        <List component="nav" aria-label="secondary mailbox folder">
          <ListItemButton
            selected={selectedIndex === 1}
            // onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemText primary="Waseem Mohd" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <p className="flex flex-col">
              <span>Balance</span>
              <span className="font-bold text-[15px] !text-red-400">
                88.23 ₹
              </span>
            </p>
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <p className="flex flex-col">
              <span>Bonus account</span>
              <span className="font-bold text-[15px] !text-green-500">
                600 ₹
              </span>
            </p>
          </ListItemButton>
          {list?.map((i) => {
            return (
              <ListItemButton
                selected={selectedIndex === i?.id}
                onClick={(event) => handleListItemClick(event, i?.id)}
              >
                {i?.icon}
                <ListItemText
                  primary=<sapn className="!text-[15px]">{i.item}</sapn>
                />
              </ListItemButton>
            );
          })}
        </List>
      </div>
      <div className=" p-5 w-[80%] bg-[#1A2532] h-full">
        {selectedIndex === 3 && <MyAccount />}
      </div>
    </div>
  );
};

export default Account;
