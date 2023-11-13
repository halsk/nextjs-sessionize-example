import { convertHHMM } from "@/libs/util";
import { Room, FullSpeaker, Session } from "@/sessionize/sessionizeApi";
import SessionTime from "../atoms/SessionTime";
import { SessionTitle } from "../atoms/SessionTitle";
import { SpeakersFilter } from "./SpeakersFilter";

type Props = {
  room: Room;
  rooms: Room[];
  speakers: FullSpeaker[];
  sessionTypeCategoryId?: number;
  selectSession: (session: Session) => void;
};

const SessionCard: React.FC<Props> = ({
  room,
  rooms,
  speakers,
  sessionTypeCategoryId,
  selectSession,
}) => {
  return (
    <>
      {room.session && (
        <div
          key={`session-${room.session.id}`}
          className={`text-slate-200 m-1 p-2 ${
            room.session.isServiceSession
              ? "bg-gray-500"
              : room.session.isPlenumSession
              ? "bg-primary"
              : "bg-secondary"
          }`}
          style={{
            gridColumnStart: `track-${room.id}`,
            gridColumnEnd: `track-${
              room.session.isPlenumSession
                ? rooms[rooms.length - 1].id
                : room.id
            }`,
            gridRowStart: `time-${convertHHMM(room.session?.startsAt)}`,
            gridRowEnd: `time-${convertHHMM(room.session?.endsAt)}`,
            zIndex: room.session.isPlenumSession ? 1 : 2,
          }}
        >
          {" "}
          <SessionTime
            room={room}
            sessionTypeCategoryId={sessionTypeCategoryId}
          />
          <SessionTitle session={room.session} selectSession={selectSession} />
          <SpeakersFilter
            speakerslist={speakers}
            speakers={room.session.speakers}
            className={`${room.session.isPlenumSession && "md:justify-center"}`}
          />
        </div>
      )}
    </>
  );
};
export default SessionCard;
