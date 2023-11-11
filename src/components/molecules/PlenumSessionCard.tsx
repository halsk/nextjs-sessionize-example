import { convertHHMM } from "@/libs/util";
import { Room } from "@/sessionize/sessionizeApi";
import SessionTime from "../atoms/SessionTime";
import { SessionTitle } from "../atoms/SessionTitle";

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
          className={`bg-primary text-slate-200 m-1 p-2 ${
            room.session.isServiceSession ? "bg-gray-500" : ""
          }`}
          style={{
            gridColumnStart: `track-${room.id}`,
            gridColumnEnd: `trak-${rooms[rooms.length - 1].id}`,
            gridRowStart: `time-${convertHHMM(room.session?.startsAt)}`,
            gridRowEnd: `time-${convertHHMM(room.session?.endsAt)}}`,
          }}
        >
          {" "}
          <div className="flex justify-center">
            {!room.session.isServiceSession && (
              <div className="p-1 bg-slate-200 text-black text-sm rounded-sm">
                {room.name}
              </div>
            )}
            <SessionTime session={room.session} className="text-center" />
          </div>
          <SessionTitle session={room.session} className="text-center" />
        </div>
      )}
    </>
  );
};
export default PlenumSessionCard;
