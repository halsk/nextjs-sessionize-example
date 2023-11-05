"use client";
import useSessionizeGrids from "@/hooks/useSessionizeData";
import React, { useEffect } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

// props of session ID
type Props = {
  id: string;
};

const SessionizeSessions: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const [groupId, setGroupId] = React.useState(1);
  // get hash from URL
  useEffect(() => {
    const _hash = window.location.hash
      ? window.location.hash.replace("#", "")
      : "1";
    setGroupId(Number(_hash));
  }, []);
  // change hash and URL
  const changeDate = (index: number) => () => {
    setGroupId(index);
    router.push(`/#${index.toString()}`);
  };
  const { grids, isLoading, error } = useSessionizeGrids(id);
  return (
    <div className="schedule">
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <>
          <div className="grid grid-cols-2 gap-4">
            {grids.map((grid, index) => (
              <div key={index}>
                {index !== groupId ? (
                  <button
                    onClick={changeDate(index)}
                    className="text-white bg-primary hover:bg-secondary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    {format(grid.date, "M月d日")}
                  </button>
                ) : (
                  <div className="text-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    {format(grid.date, "M月d日")}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div
            className={`grid grid-cols-${grids[groupId].rooms.length}`}
          ></div>
        </>
      )}
    </div>
  );
};

export default SessionizeSessions;
