import { convertHHMM } from "@/libs/util";
import { Room, FullSpeaker } from "@/sessionize/sessionizeApi";
import SessionTime from "../atoms/SessionTime";
import { SessionTitle } from "../atoms/SessionTitle";
import { SpeakersFilter } from "./SpeakersFilter";

type Props = {
  room: Room;
  rooms: Room[];
  speakers: FullSpeaker[];
};

const PlenumSessionCard: React.FC<Props> = ({ room, rooms, speakers }) => {
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
          <SessionTime room={room} />
          <SessionTitle session={room.session} className="md:text-center" />
          <SpeakersFilter
            speakerslist={speakers}
            speakers={room.session.speakers}
            className="md:justify-center"
          />
        </div>
      )}
    </>
  );
};
export default PlenumSessionCard;
