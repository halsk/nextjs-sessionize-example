"use client";
import useSessionizeGrids from "@/hooks/useSessionizeData";
import React, { Fragment, useEffect } from "react";
import { format, addMinutes, isBefore, isAfter } from "date-fns";
import { useRouter } from "next/navigation";
import { Room, SessionGrid, TimeSlot } from "@/sessionize/sessionizeApi";
import { convertHHMM, hhmmddToMinutes } from "@/libs/util";
import SessionCard from "../molecules/SessionCard";
import PlenumSessionCard from "../molecules/PlenumSessionCard";
import GridSelector from "../molecules/GridSelector";

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
          <GridSelector
            grids={grids}
            groupId={groupId}
            changeDate={changeDate}
          />
          <style jsx>{`
            .grid-template {
              display: grid;
              --fraction-size: auto;
              ${calculateTemplateRows(grids[groupId])}
            }
          `}</style>
          <div className="grid-template">
            {/* show room name */}
            {grids[groupId].rooms.map((room, index) => (
              <span
                className="m-1 p-2 bg-gray-100 flex items-end"
                style={{ gridRow: "tracks", gridColumn: `track-${room.id}` }}
                key={`room-${index}`}
              >
                {room.name}
              </span>
            ))}
            {grids[groupId].timeSlots.map((timeSlot, index) => (
              // show time slot
              <Fragment key={`time-${index}`}>
                <h2
                  style={{
                    gridColumn: "times",
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
                {/* show border */}
                <span
                  className="border-t-2 border-gray-300"
                  style={{
                    gridRow: `time-${convertHHMM(timeSlot.slotStart)}`,
                    gridColumn: `times/track-${
                      grids[groupId].rooms[grids[groupId].rooms.length - 1].id
                    }-end`,
                  }}
                ></span>
                {/* show session card */}
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
