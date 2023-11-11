import { calcSessionMinutes } from "@/libs/util";
import { Session } from "@/sessionize/sessionizeApi";
import { format } from "date-fns";

// need all attributes from parent component
type Props = {
  session: Session;
  [key: string]: any; // This line allows any additional properties
};
const SessionTime: React.FC<Props> = ({ session, ...rest }) => {
  return (
    <p className={`text-sm mx-2 my-1 ${rest.className || ""}`}>
      {format(session.startsAt, "HH:mm")}〜{calcSessionMinutes(session)}分
    </p>
  );
};
export default SessionTime;
