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
          <div className="flex justify-center">
            {grids.map((grid, index) => (
              <div key={`date-${index}`}>
                {index !== groupId ? (
                  <button
                    onClick={changeDate(index)}
                    className="text-white bg-primary hover:bg-secondary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    {format(grid.date, "M月d日")}
                  </button>
                ) : (
                  <div className="text-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">
                    {format(grid.date, "M月d日")}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={`grid grid-cols-${grids[groupId].rooms.length + 1}`}>
            <div>開始時刻</div>
            {grids[groupId].rooms.map((room, index) => (
              <div key={`room-${index}`}>{room.name}</div>
            ))}
            {grids[groupId].timeSlots.map((timeSlot, index) => (
              <>
                <div key={`timeSlot-${index}`}>{timeSlot.slotStart}</div>
                {grids[groupId].rooms.map((_, index) => (
                  <>
                    {timeSlot.rooms[index] ? (
                      <>
                        {timeSlot.rooms[index].session?.isPlenumSession ? (
                          <div
                            key={`timeSlot-${index}-2`}
                            className={`col-span-${grids[groupId].rooms.length}`}
                          >
                            {timeSlot.rooms[0].session!.title}a
                          </div>
                        ) : (
                          <div key={`timeSlot-${index}-2`}>
                            {timeSlot.rooms[index].session!.title}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {!timeSlot.rooms[0].session?.isPlenumSession && (
                          <div key={`timeSlot-${index}-2`}></div>
                        )}
                      </>
                    )}
                  </>
                ))}
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SessionizeSessions;
