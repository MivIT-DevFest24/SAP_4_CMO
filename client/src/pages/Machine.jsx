import React from "react";
import { useLocation } from "react-router-dom";
import LazyLoad from "react-lazy-load";

export default function Machine() {
  const location = useLocation();
  const machine = location.state && location.state.machine;
  return (
    <div>
      <div className="max-w-full">
        <LazyLoad height={260}>
          <img
            src={machine.image}
            className="h-full  rounded-2xl group-hover/card:shadow-xl"
            alt="thumbnail machine"
          />
        </LazyLoad>
      </div>
      <div className="flex flex-col justify-start items-start my-4 px-4">
        <div
          className="py-2 lg:text-lg md:text-base sm:text-sm  text-neutral-600 dark:text-white"
          style={{
            width: "280px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {machine.name}
        </div>
        <div className="px-2 py-2 text-xs font-semibold">
          sector : {machine.sector}
        </div>
        <div className="px-2 py-2 text-xs">is {machine.status}</div>
        <div></div>
      </div>
    </div>
  );
}
