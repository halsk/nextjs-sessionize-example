"use client";
import useSessionizeGrids from "@/hooks/useSessionizeData";
import React from "react";

// props of session ID
type Props = {
  id: string;
};

const SessionizeSessions: React.FC<Props> = ({ id }) => {
  const { grids, isLoading, error } = useSessionizeGrids(id);
  return (
    <div className="schedule">
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <div className="grid grid-cols-2 gap-4">
          {grids.map((grid, index) => (
            <div key={index}>{grid.date.toLocaleDateString()}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionizeSessions;
