import { calcSessionMinutes, convertHHMM } from "@/libs/util";
import { Room } from "@/sessionize/sessionizeApi";
import { format } from "date-fns";

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
export default SessionCard;
