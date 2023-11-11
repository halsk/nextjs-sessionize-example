import { Session } from "@/sessionize/sessionizeApi";
type Props = {
  session: Session;
  [key: string]: any; // This line allows any additional properties
};
export const SessionTitle: React.FC<Props> = ({ session, ...rest }) => {
  return (
    <p className={`text-lg font-bold mx-2 my-1 ${rest.className || ""}`}>
      {session.title}
    </p>
  );
};
