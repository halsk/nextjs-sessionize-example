"use client";
import {
  useSessionizeGrids,
  useSessionizeSpeakers,
} from "@/hooks/useSessionizeData";
import React, { Fragment, useEffect } from "react";
import { format, addMinutes, isBefore, isAfter } from "date-fns";
import { useRouter } from "next/navigation";
import { Session, SessionGrid, TimeSlot } from "@/sessionize/sessionizeApi";
import {
  convertHHMM,
  createHash,
  hhmmddToMinutes,
  parseWindowHash,
} from "@/libs/util";
import SessionCard from "../molecules/SessionCard";
import GridSelector from "../molecules/GridSelector";
import SessionDetail from "../molecules/SessionDetailBox";

// props of session ID
type Props = {
  id: string;
};

const SessionizeSessions: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const [groupId, setGroupId] = React.useState(1);
  const [selectedSession, setSelectedSession] = React.useState<
    Session | undefined
  >();
  const [sessionTypeCategoryId, setSessionTypeCategoryId] =
    React.useState<number>();
  // get hash from URL
  useEffect(() => {
    const { page, sessionId } = parseWindowHash();
    // if session ID is specified, set session ID to ignore category
    if (process.env.NEXT_PUBLIC_SESSIONTYPE_CATEGORY_ID) {
      setSessionTypeCategoryId(
        +process.env.NEXT_PUBLIC_SESSIONTYPE_CATEGORY_ID
      );
    }
    setGroupId(page);
  }, []);
  const selectSession = (session: Session) => {
    setSelectedSession(session);
    router.push(createHash({ sessionId: session.id }));
  };
  // change hash and URL
  const changeDate = (index: number) => () => {
    setGroupId(index);
    router.push(createHash({ page: index, sessionId: selectedSession?.id }));
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
  const {
    speakers,
    isLoading: isSpeakerLoading,
    error: errorSpeakerLoaging,
  } = useSessionizeSpeakers(id);
  useEffect(() => {
    if (grids.length == 0) return;
    const { sessionId } = parseWindowHash();
    if (sessionId) {
      const session = grids[groupId].timeSlots
        .map((timeSlot) => timeSlot.rooms.map((room) => room.session))
        .flat()
        .find((session) => session?.id === sessionId);
      if (session) {
        setSelectedSession(session);
      }
    }
  }, [grids, groupId]);
  return (
    <div className="schedule px-4 md:px-16">
      {error && <p>{error}</p>}
      {isLoading && <p className="text-center m-4">Loading...</p>}
      {!isLoading && (
        <>
          <GridSelector
            grids={grids}
            groupId={groupId}
            changeDate={changeDate}
          />
          <style jsx>{`
            @media (min-width: 768px) {
              .grid-template {
                display: grid;
                --fraction-size: auto;
                ${calculateTemplateRows(grids[groupId])}
              }
            }
          `}</style>
          <div className="grid-template mt-2 justify-center">
            {/* show room name */}
            {grids[groupId].rooms.map((room, index) => (
              <span
                className="hidden md:flex m-1 p-2 bg-gray-200 items-end sticky top-0 opacity-80 z-10 justify-center"
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
                  className="hidden md:inline border-t-2 border-gray-300"
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
                    <SessionCard
                      room={room}
                      rooms={grids[groupId].rooms}
                      speakers={speakers}
                      selectSession={selectSession}
                      sessionTypeCategoryId={sessionTypeCategoryId}
                    />
                  </Fragment>
                ))}
              </Fragment>
            ))}
            <SessionDetail
              session={selectedSession}
              speakerlist={speakers}
              showSpeakerDetail={true}
              closeWindow={() => {
                setSelectedSession(undefined);
                router.push(createHash({ sessionId: "" }));
              }}
              sessionTypeCategoryId={sessionTypeCategoryId}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SessionizeSessions;
