import { Session } from "@/sessionize/sessionizeApi";
type Props = {
  session: Session;
  selectSession: (session: Session) => void;
  className?: string;
};
export const SessionTitle: React.FC<Props> = ({
  session,
  selectSession,
  className,
}) => {
  return (
    <div
      className={`text-lg font-bold mx-2 my-1 ${
        session.isPlenumSession && "md:text-center"
      } ${className || ""}`}
    >
      {session.isServiceSession ? (
        <p> {session.title}</p>
      ) : (
        <a onClick={() => selectSession(session)}>{session.title}</a>
      )}
    </div>
  );
};
