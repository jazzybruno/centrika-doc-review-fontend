import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Input, InputWrapper } from "@mantine/core";
import React from "react";

const ReferenceIndex = () => {
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const referenceNumber = 45; // Set your desired reference number here
  const interval = 3000; // Update every 3 seconds

  useEffect(() => {
    let currentCount = 0;
    const steps = Math.ceil(referenceNumber / (interval / 500));
    const stepValue = Math.ceil(referenceNumber / steps);

    const updateCount = () => {
      if (currentCount < referenceNumber) {
        setCount(currentCount);
        currentCount += stepValue;
        setTimeout(updateCount, interval / steps);
      } else {
        setCount(referenceNumber);
      }
    };

    updateCount();

    // Clear the timeout on component unmount
    return () => clearTimeout(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="w-full h-full flex p-4 flex-co justify-center items-center">
        {/* <div className="font-mulish font-normal text-5xl">The Current Reference Number is : </div> */}
        <div className="font-montserrat font-extrabold text-[10em]">#{count}</div>
      </div>
    </DashboardLayout>
  );
};

export default ReferenceIndex;
