import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  return (
    <div className="px-6 py-3 flex justify-between">
      <img src="/Logo.svg" />
      <ConnectButton />
    </div>
  );
};

export default Navbar;
