import React, { useContext } from "react";
import Loader from "react-loader-spinner";
import { LoadingContext } from "./contexts/LoadingContext";

const Spinner = () => {
  const { loading } = useContext(LoadingContext);
  const display = loading ? "block" : "none";

  return (
    <Loader
      style={{
        display: display,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, 0)",
      }}
      type="Oval"
    />
  );
};

export default Spinner;
