"use client";
import useSessionizeGrids from "@/hooks/useSessionizeData";
import React, { Fragment, useEffect } from "react";
import { format, addMinutes, isBefore, isAfter } from "date-fns";
import { useRouter } from "next/navigation";
import { Room, SessionGrid, TimeSlot } from "@/sessionize/sessionizeApi";
import { convertHHMM, hhmmddToMinutes } from "@/libs/util";
import SessionCard from "../molecules/SessionCard";
import PlenumSessionCard from "../molecules/PlenumSessionCard";

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
  // get session by filtering room ID
  const findRoom = (rooms: Room[], roomId: number) => {
    return rooms.find((room) => {
      return room.id === roomId;
    });
  };
  // calculate grid template rows
  const calculateTemplateRows = (grid: SessionGrid) => {
    if (!grid) return "";
    // get event start time and end time
    const startTime = grid.timeSlots[0].rooms.reduce((acc, room) => {
      return isBefore(room.session!.startsAt, acc.session!.startsAt)
        ? room
        : acc;
    }).session!.startsAt;
    const endTime = grid.timeSlots[grid.timeSlots.length - 1].rooms.reduce(
      (acc, room) => {
        return isAfter(room.session!.endsAt, acc.session!.endsAt) ? room : acc;
      }
    ).session!.endsAt;
    let rowsStyle = `grid-template-rows: [tracks] auto \n`;
    for (let d = startTime; isBefore(d, endTime); d = addMinutes(d, 5)) {
      rowsStyle =
        rowsStyle + `[time-${format(d, "HHmm")}] var(--fraction-size) \n`;
    }
    rowsStyle = rowsStyle + ";";
    const colsStyle = `grid-template-columns: [times] 4em \n [${grid.rooms
      .map((room) => `track-${room.id}-start] 1fr \n [track-${room.id}-end`)
      .join(" ")}];`;
    return rowsStyle + colsStyle;
  };
  // calculate grid span
  const calcSpan = (timeSlot: TimeSlot, nextTimeSlot: TimeSlot) => {
    let endTime: string;
    if (nextTimeSlot == undefined) {
      endTime = format(
        timeSlot.rooms.reduce((acc, room) => {
          return isAfter(room.session!.endsAt, acc.session!.endsAt)
            ? room
            : acc;
        }).session!.endsAt,
        "HH:mm"
      );
    } else {
      endTime = nextTimeSlot.slotStart;
    }

    const diff = hhmmddToMinutes(endTime) - hhmmddToMinutes(timeSlot.slotStart);
    return Math.round(diff / 5);
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
                <Fragment key={`date-${index}`}>
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
                </Fragment>
              ))}
            </ul>
          </div>
          <style jsx>{`
            .grid-template {
              display: grid;
              --fraction-size: auto;
              ${calculateTemplateRows(grids[groupId])}
            }
          `}</style>
          <div className="grid-template">
            {grids[groupId].rooms.map((room, index) => (
              <h2
                className=""
                style={{ gridRow: "tracks", gridColumn: `track-${room.id}` }}
                key={`room-${index}`}
              >
                {room.name}
              </h2>
            ))}
            {grids[groupId].timeSlots.map((timeSlot, index) => (
              <Fragment key={`time-${index}`}>
                <h2
                  className=""
                  style={{
                    gridRow: `time-${convertHHMM(
                      timeSlot.slotStart
                    )} / span ${calcSpan(
                      timeSlot,
                      grids[groupId].timeSlots[index + 1]
                    )}`,
                  }}
                  key={`time-${index}`}
                >
                  {timeSlot.slotStart.split(":")[0]}:
                  {timeSlot.slotStart.split(":")[1]}
                </h2>
                {timeSlot.rooms.map((room, index2) => (
                  <Fragment key={`slot-${index}-room-${index2}`}>
                    {room.session && room.session.isPlenumSession ? (
                      <PlenumSessionCard
                        room={room}
                        rooms={grids[groupId].rooms}
                      />
                    ) : (
                      <SessionCard room={room} />
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
