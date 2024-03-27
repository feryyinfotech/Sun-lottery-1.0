import { Edit } from "@mui/icons-material";
import { Switch } from "@mui/material";
import React from "react";
import { MdEditNote } from "react-icons/md";

const PersonalDetails = () => {
  return (
    <div className="">
      <p>PERSONAL DATA</p>
      <div className="bg-white bg-opacity-30 rounded-md p-3 py-5">
        <table>
          <thead>
            <td></td>
            <td></td>
          </thead>
          <tbody>
            <tr>
              <td className="">Name:</td>
              <td className="pl-4 ">Waseem Mohd</td>
            </tr>
            <tr>
              <td>Account number:</td>
              <td className="pl-4 ">34610389</td>
            </tr>
            <tr>
              <td>Currency:</td>
              <td className="pl-4 ">₹</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-5">CONTACTS</p>
      <div className="bg-white bg-opacity-30 rounded-md p-3 py-5">   
        <table>
          <thead>
            <td></td>
            <td></td>
          </thead>
          <tbody>
            <tr>
              <td className="">Phone:</td>
              <td className="pl-4 flex gap-4 items-center">
                <span>+917007150868</span>
                <MdEditNote className="!text-xl !cursor-pointer !text-blue-600" />
              </td>
            </tr>
            <tr>
              <td>Email:</td>
              <td className="pl-4 flex gap-4 items-center">
              <span>waseemgbolog@gmail.com</span>
                <MdEditNote className="!text-xl !cursor-pointer !text-blue-600" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>


      <p className="mt-5">MARKETING PREFERENCES</p>
      <div className="bg-white bg-opacity-30 rounded-md p-3 py-5">
      <p>Get notifications about promotions and news:</p>
        <table>
          <thead>
            <td></td>
            <td></td>
          </thead>
          <tbody>
            <tr>
              <td className="">Email:</td>
              <td className="pl-4 flex gap-4 items-center">
                <Switch />
              </td>
            </tr>
            <tr>
              <td>SMS:</td>
              <td className="pl-4 flex gap-4 items-center">
              <Switch />
              </td>
            </tr>
            <tr>
              <td>Push notifications:</td>
              <td className="pl-4 flex gap-4 items-center">
              <Switch />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonalDetails;
