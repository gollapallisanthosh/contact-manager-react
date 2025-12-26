import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Spinner = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center my-5">
        <DotLottieReact
          src="https://lottie.host/a7fbe7a8-0440-4cfc-a482-6a03509fca83/K3qwqRJ2mn.lottie"
          loop
          autoplay
        />
      </div>
    </>
  );
};

export default Spinner;
