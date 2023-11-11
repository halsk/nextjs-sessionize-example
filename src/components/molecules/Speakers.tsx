import { FullSpeaker } from "@/sessionize/sessionizeApi";

type Props = {
  speakers: FullSpeaker[];
  [key: string]: any; // This line allows any additional properties
};
export const Speakers: React.FC<Props> = ({ speakers, ...rest }) => {
  return (
    <div className={`flex flex-wrap mx-2 my-2 text-sm ${rest.className || ""}`}>
      {speakers.map((speaker, index) => (
        <div key={speaker.id}>
          {(index ? "," : "") + speaker.lastName + " " + speaker.firstName}
        </div>
      ))}
    </div>
  );
};
