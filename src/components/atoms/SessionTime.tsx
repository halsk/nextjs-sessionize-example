import { calcSessionMinutes } from "@/libs/util";
import { Room, Session } from "@/sessionize/sessionizeApi";
import { format } from "date-fns";

// need all attributes from parent component
type Props = {
  room: Room;
  [key: string]: any; // This line allows any additional properties
};
const SessionTime: React.FC<Props> = ({ room, ...rest }) => {
  const isPlenumSession = (session: Session) => {
    return room.session!.isPlenumSession;
  };
  const isServiceSession = (session: Session) => {
    return room.session!.isServiceSession;
  };
  if (room.session === undefined) return null;
  return (
    <div
      className={`flex mx-2 ${
        isPlenumSession(room.session) && "md:justify-center"
      }`}
    >
      {!isServiceSession(room.session) && (
        <div
          className={`block ${
            !isPlenumSession(room.session) ? "md:hidden" : ""
          }  p-1 bg-slate-200 text-black text-sm rounded-sm`}
        >
          {room.name}
        </div>
      )}

      <p
        className={`text-sm my-1 ${
          isPlenumSession(room.session!) ? "md:text-center" : ""
        } ${rest.className || ""}`}
      >
        {format(room.session!.startsAt, "HH:mm")}〜
        {calcSessionMinutes(room.session!)}分
      </p>
    </div>
  );
};
export default SessionTime;
