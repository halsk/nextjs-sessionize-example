import { calcSessionMinutes, convertHHMM } from "@/libs/util";
import { Room } from "@/sessionize/sessionizeApi";
import { format } from "date-fns";

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
          <p className="text-sm">
            {format(room.session.startsAt, "HH:mm")}〜
            {calcSessionMinutes(room.session)}分
          </p>
          <p className="text-lg">{room.session.title}</p>
        </div>
      )}
    </>
  );
};
export default PlenumSessionCard;
