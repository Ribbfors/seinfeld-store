"use client";

import { Spinner } from "flowbite-react";

const Loading = () => {
  const seinfeldQuotes = [
    "I'm out there, Jerry, and I'm loving every minute of it!",
    "I don't want to be a pirate!",
    "I'm disturbed, I'm depressed, I'm inadequate. I've got it all!",
  ];

  const randomQuoteGeneratedOnClientSide =
    seinfeldQuotes[Math.floor(Math.random() * seinfeldQuotes.length)];

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Spinner size="xl" color={"warning"} />
      <h3>I'm out there, Jerry, and I'm loving every minute of it!</h3>
    </div>
  );
};

export default Loading;
