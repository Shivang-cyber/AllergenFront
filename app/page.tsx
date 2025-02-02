"use client";
import Header from "./(components)/Header";
import Upload from "./(components)/Upload";
import DataStream from "./(components)/DataStream";
import IncomingData from "./(components)/IncomingData";
import { createContext } from "react";
import Loader from "./(components)/Loader";
export const AppContext = createContext<null | ReturnType<typeof DataStream>>(
  null
);
export default function Home() {
  return (
    <>
      <AppContext.Provider value={DataStream()}>
        <Header />
        <Upload />
        <Loader />
        <IncomingData />
      </AppContext.Provider>
    </>
  );
}
