import { convertHHMM } from "@/libs/util";
import { Room } from "@/sessionize/sessionizeApi";
import SessionTime from "../atoms/SessionTime";
import { SessionTitle } from "../atoms/SessionTitle";
import { Speakers } from "./Speakers";

type Props = {
  room: Room;
};

const SessionCard: React.FC<Props> = ({ room }) => {
  return (
    <>
      {room.session && (
        <div
          key={`session-${room.session.id}`}
          className={`text-left bg-secondary text-slate-200 m-1 p-2 ${
            room.session.isServiceSession ? "bg-gray-500" : ""
          }`}
          style={{
            gridColumn: `track-${room.id}`,
            gridRowStart: `time-${convertHHMM(room.session?.startsAt)}`,
            gridRowEnd: `time-${convertHHMM(room.session?.endsAt)}`,
            zIndex: 1,
          }}
        >
          <SessionTime session={room.session} />
          <SessionTitle session={room.session} />
          <Speakers speakers={room.session.speakers} />
        </div>
      )}
    </>
  );
};
export default SessionCard;
