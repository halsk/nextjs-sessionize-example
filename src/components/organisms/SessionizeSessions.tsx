"use client";
import useSessionizeGrids from "@/hooks/useSessionizeData";
import React, { Fragment, useEffect } from "react";
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
          <div className="text-md font-medium text-center text-primary border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px">
              {grids.map((grid, index) => (
                <li key={`date-${index}`}>
                  {index !== groupId ? (
                    <li className="mr-2">
                      <a
                        href={`#${index}`}
                        onClick={changeDate(index)}
                        className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-secondary hover:border-gray-300 dark:hover:text-gray-300"
                      >
                        {format(grid.date, "M月d日")}
                      </a>
                    </li>
                  ) : (
                    <li className="mr-2 inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500">
                      {format(grid.date, "M月d日")}
                    </li>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className={`grid grid-cols-${grids[groupId].rooms.length + 1}`}>
            <div className="bg-highlight px-5 py-2.5 flex mb-2 mr-2 justify-center items-center font-medium">
              開始時刻
            </div>
            {grids[groupId].rooms.map((room, index) => (
              <div
                key={`room-${index}`}
                className="bg-secondary px-5 py-2.5 mr-2 mb-2 text-white"
              >
                {room.name}
              </div>
            ))}
            {grids[groupId].timeSlots.map((timeSlot, index) => (
              <Fragment key={`time-${index}`}>
                <div key={`timeSlot-${index}`}>{timeSlot.slotStart}</div>
                {grids[groupId].rooms.map((_, index) => (
                  <Fragment key={`room-${index}`}>
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
                  </Fragment>
                ))}
              </Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SessionizeSessions;
