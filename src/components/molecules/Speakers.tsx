import { FullSpeaker } from "@/sessionize/sessionizeApi";

type Props = {
  speakers: FullSpeaker[];
  showSpeakerDetail?: boolean;
  [key: string]: any; // This line allows any additional properties
};
export const Speakers: React.FC<Props> = ({
  speakers,
  showSpeakerDetail,
  ...rest
}) => {
  return (
    <div
      className={`flex flex-wrap text-gray-500 my-2 ${
        !showSpeakerDetail && "mx-2"
      } text-sm ${rest.className || ""}`}
    >
      {speakers.map((speaker, index) => (
        <div key={speaker.id}>
          {(index ? "," : "") + speaker.lastName + " " + speaker.firstName}
        </div>
      ))}
    </div>
  );
};
