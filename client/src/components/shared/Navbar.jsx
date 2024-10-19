import { useState, useEffect } from "react";
import Logo from "@/components/custom/Logo.jsx";
import { useScrollDetector } from "@/hooks/ScrollDetector.js";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    useScrollDetector(setIsScrolled);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg dark:bg-darky" : ""
      }`}
    >
      <div className="mx-auto 2xl:px-56 xl:px-10 lg:px-8 px-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Logo />
          </div>
        </div>
      </div>
    </div>
  );
}
