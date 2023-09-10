"use client";

import { Spinner } from "flowbite-react";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Spinner size="xl" color={"warning"} />
    </div>
  );
};

export default Loading;
