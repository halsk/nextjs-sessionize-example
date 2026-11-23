import { calcSessionMinutes } from "@/libs/util";
import { Room } from "@/sessionize/sessionizeApi";
import { format } from "date-fns";
import { SessionType } from "./SessionType";

// need all attributes from parent component
type Props = {
  room: Room;
  sessionTypeCategoryId?: number;
  className?: string;
};
const SessionTime: React.FC<Props> = ({
  room,
  sessionTypeCategoryId,
  className,
}) => {
  const session = room.session;
  if (session === undefined) return null;
  return (
    <div
      className={`flex flex-wrap mx-2 ${
        session.isPlenumSession && "md:justify-center"
      }`}
    >
      {sessionTypeCategoryId && (
        <SessionType
          sessionTypeCategoryId={sessionTypeCategoryId}
          session={session}
        />
      )}
      {!session.isServiceSession && (
        <div
          className={`block ${
            !session.isPlenumSession ? "md:hidden" : ""
          }  p-1 bg-slate-200 text-black text-sm rounded-xs`}
        >
          {room.name}
        </div>
      )}

      <p
        className={`text-sm my-1 ${
          session.isPlenumSession ? "md:text-center" : ""
        } ${className || ""}`}
      >
        {format(session.startsAt, "HH:mm")}〜
        {calcSessionMinutes(session)}分
      </p>
    </div>
  );
};
export default SessionTime;
