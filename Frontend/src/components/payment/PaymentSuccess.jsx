import React from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Card } from "@mui/material";

function PaymentSuccess() {
  return (
    <div className="min-h-screen px-5 bg-gray-700">
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <Card className="w-full lg:w-1/4 flex flex-col items-center rounded-md p-5 bg-gray-700 shadow-lg">
          <TaskAltIcon style={{ fontSize: "5rem", background: "lightgreen" }} />
          <h1 className="py-5 text-2xl font-semibold text-black">
            Booking Successful!
          </h1>
          <p className="py-3 text-center text-black-300">
            You can check your Booking Confirmation Code in the MyProfile
            section.
          </p>
          <p className="py-2 text-center text-black-400 text-lg">
            Have A Great Day!
          </p>
        </Card>
      </div>
    </div>
  );
}

export default PaymentSuccess;
