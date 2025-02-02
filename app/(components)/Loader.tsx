import React, { useContext } from "react";
import Image from "next/image";
import { AppContext } from "../page";
const Loader: React.FC = () => {
  const data = useContext(AppContext);
  return (
    <>
      {data?.loading && (
        <div className="flex justify-center items-center mt-10">
          <Image src="/loader.gif" alt="loader" width={100} height={100} />
        </div>
      )}
    </>
  );
};

export default Loader;
