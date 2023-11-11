import { convertHHMM } from "@/libs/util";
import { Room } from "@/sessionize/sessionizeApi";
import SessionTime from "../atoms/SessionTime";

type Props = {
  room: Room;
};

const SessionCard: React.FC<Props> = ({ room }) => {
  return (
    <>
      {room.session && (
        <div
          key={`session-${room.session.id}`}
          className={`bg-secondary text-white m-1 p-2 ${
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
          <p className="text-lg mx-2 my-1">{room.session.title}</p>
        </div>
      )}
    </>
  );
};
export default SessionCard;
