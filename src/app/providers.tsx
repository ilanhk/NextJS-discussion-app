'use client';

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react"; // need this for client components


interface ProvidersProps {
  children: React.ReactNode
};

export default function Providers({ children }: ProvidersProps){
  return (
    <SessionProvider>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </SessionProvider>
  );
};
//this provider shares all nextui state to other nextui components
