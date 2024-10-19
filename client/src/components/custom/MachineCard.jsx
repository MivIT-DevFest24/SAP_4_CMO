import { useNavigate } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import { motion } from "framer-motion";

export default function MachineCard({ machine, className }) {
  const navigate = useNavigate();
  return (
    <motion.div
      className={
        "bg-gray-50 relative w-[17rem] h-auto rounded-2xl border dark:bg-black cursor-pointer " +
        className
      }
      onClick={() =>
        navigate(
          `/machines/${machine.id}`,
          // send the data to the edit page
          { state: { machine } }
        )
      }
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="max-w-full">
        <LazyLoad height={151}>
          <img
            src={machine.image}
            className="h-full w-full rounded-t-lg group-hover/card:shadow-xl"
            alt="thumbnail machine"
          />
        </LazyLoad>
      </div>
      <div className="flex justify-between items-center mt-1 px-4">
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
      </div>
      <div className="flex justify-between items-center my-4 px-4">
        <div className="px-2 py-2 text-xs font-semibold">{machine.sector}</div>
        <div className="px-2 py-2 text-xs  dark:text-white">
          is {machine.status}
        </div>
      </div>
    </motion.div>
  );
}
