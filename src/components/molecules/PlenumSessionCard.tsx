import { convertHHMM } from "@/libs/util";
import { Room } from "@/sessionize/sessionizeApi";
import SessionTime from "../atoms/SessionTime";

type Props = {
  room: Room;
  rooms: Room[];
};

const PlenumSessionCard: React.FC<Props> = ({ room, rooms }) => {
  return (
    <>
      {room.session && (
        <div
          key={`session-${room.session.id}`}
          className={`bg-primary text-white m-1 p-2 ${
            room.session.isServiceSession ? "bg-gray-500" : ""
          }`}
          style={{
            gridColumnStart: `track-${room.id}`,
            gridColumnEnd: `trak-${rooms[rooms.length - 1].id}`,
            gridRowStart: `time-${convertHHMM(room.session?.startsAt)}`,
            gridRowEnd: `time-${convertHHMM(room.session?.endsAt)}}`,
          }}
        >
          <SessionTime session={room.session} className="text-center" />
          <p className="text-lg text-center mx-2 my-1">{room.session.title}</p>
        </div>
      )}
    </>
  );
};
export default PlenumSessionCard;
