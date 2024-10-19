import { Link } from "react-router-dom";

import logo from "@/assets/logo.png";

export default function Logo() {
  return (
    <Link className=" flex items-center justify-center space-x-4" to={"/dashboard"}>
      <img
        src={logo}
        alt="logo"
        width={50}
        height={50}
        className=""
      />
      <h2 className="lg:text-4xl sm:text-xl text-lg text-orange-600 font-bold">Car-F</h2>
    </Link>
  );
}
