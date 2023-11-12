import { Session } from "@/sessionize/sessionizeApi";
type Props = {
  session: Session;
  selectSession: (session: Session) => void;
  [key: string]: any; // This line allows any additional properties
};
export const SessionTitle: React.FC<Props> = ({
  session,
  selectSession,
  ...rest
}) => {
  return (
    <div
      className={`text-lg font-bold mx-2 my-1 ${
        session.isPlenumSession && "md:text-center"
      } ${rest.className || ""}`}
    >
      {session.isServiceSession ? (
        <p> {session.title}</p>
      ) : (
        <a onClick={() => selectSession(session)}>{session.title}</a>
      )}
    </div>
  );
};
