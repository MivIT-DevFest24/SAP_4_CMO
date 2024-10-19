import { Link } from "react-router-dom";

import logo from "@/assets/logo.png";

export default function Logo() {
  return (
    <Link className=" flex items-center space-x-2" to={"/"}>
      <img
        src={logo}
        alt="logo"
        width={50}
        height={50}
        className=""
      />
      <h2 className="lg:text-2xl sm:text-xl text-lg font-bruno">CG Vortex</h2>
    </Link>
  );
}
