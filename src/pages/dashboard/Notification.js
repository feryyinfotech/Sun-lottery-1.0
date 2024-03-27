import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import React from "react";
import { zubgbackgrad } from '../../Shared/color';

const Notification = ({ handleClosepolicy }) => {
  return (
    <Box sx={{ '&>p': { textAlign: 'center', color: 'white', } }}>
      <p >
        ⭐️ Welcome Dear Member ⭐️
      </p>
      <Box className="mt-2" sx={{ '&>p': { color: 'white', fontSize: '12px' } }}>
        <p className=" pl-10 !text-white">⭐️ Sun Lottery Operating 5 Years+</p>
        <p className=" pl-10 !text-white">⭐️ High Quality Agent Benefits</p>
        <p className=" pl-10 !text-white">⭐️ No.1 Game Platform</p>
      </Box>
      <Box className="mt-2" sx={{ '&>p': { color: 'white', fontSize: '12px' } }}>
        <p className=" pl-10 !text-white">🔥 Local Bank Deposit 2% Bonus 🔥</p>
        <p className=" pl-10 !text-white">🔥USDT 3% Bonus & TRX 2% Bonus 🔥</p>
      </Box>
      <Box className="mt-2" sx={{ '&>p': { color: 'white', fontSize: '15px', textAlign: 'center', } }}>
        <p className="mt-3 ">
          🎁 More Bonus - Click EVENT 🎁
        </p>
      </Box>
      <Box className="mt-2" sx={{ '&>p': { color: 'white', fontSize: '15px', textAlign: 'center', } }}>
        <p className="!text-white  text-center">
          💎Click Promote - Become Agent💎
        </p>
      </Box>
      <p className="mt-2 !text-white font-bold text-center">
        Get income every day
      </p>
      <div className="w-full mt-5 ">
        <Button onClick={() => handleClosepolicy()} style={{ width: '100%', background: zubgbackgrad }} variant="contained">Confirm</Button>
      </div>
    </Box>
  );
};

export default Notification;
