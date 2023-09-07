"use client";

import { ReactNode, useEffect, useState } from "react";
import Loading from "@/components/Loading";
const ZustandHydrate = ({ children }: { children: ReactNode }) => {
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    setIsSynced(true);
  }, []);

  return <>{isSynced ? children : <Loading />}</>;
};

export default ZustandHydrate;
