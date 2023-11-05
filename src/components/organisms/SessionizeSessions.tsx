"use client";
import useSessionizeGrids from "@/hooks/useSessionizeData";
import React from "react";
import { format } from "date-fns";
import Link from "next/link";
// props of session ID
type Props = {
  id: string;
};

const SessionizeSessions: React.FC<Props> = ({ id }) => {
  // get hash from URL
  const hash = window.location.hash
    ? window.location.hash.replace("#", "")
    : "1";
  console.log(hash);
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
                {index + 1 !== Number(hash) ? (
                  <Link
                    href={{ hash: (index + 1).toString() }}
                    className="text-white bg-primary hover:bg-secondary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    {format(grid.date, "M月d日")}
                  </Link>
                ) : (
                  <div>{format(grid.date, "M月d日")}</div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SessionizeSessions;
