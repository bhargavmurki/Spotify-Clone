"use client";

import Box from "@/components/Box";
import { PacmanLoader } from "react-spinners";

const Loading = () => {
  return (
    <Box className="h-full flex items-center justify-center">
        <PacmanLoader color="#22c55e" size={20}/>
    </Box>
  )
};

export default Loading;
