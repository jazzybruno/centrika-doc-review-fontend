import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Input, InputWrapper } from "@mantine/core";
import React from "react";
import axios from "axios";
import { AuthAPi } from "@/utils/fetcher";

const ReferenceIndex = () => {
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const referenceNumber = 45; // Set your initial reference number here
  const interval = 3000; // Update every 3 seconds

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthAPi.get('/document/reference-number');
        const apiReferenceNumber = response.data.data; // Adjust this based on your API response structure
        setCount(apiReferenceNumber);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reference number:", error);
      }
    };

    fetchData();

    // Set up interval to fetch data every 3 seconds
    const intervalId = setInterval(fetchData, interval);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <DashboardLayout>
      <div className="w-full h-full flex p-4 flex-co justify-center items-center">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="font-montserrat font-extrabold text-[10em]">#{count}</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ReferenceIndex;
