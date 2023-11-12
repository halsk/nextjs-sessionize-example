import { FullSpeaker } from "@/sessionize/sessionizeApi";
import { SpeakerCard } from "../atoms/SpeakerCard";

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
  if (!showSpeakerDetail) {
    return (
      <div
        className={`flex flex-wrap text-gray-500 my-2 mx-2 text-sm ${
          rest.className || ""
        }`}
      >
        {speakers.map((speaker, index) => (
          <div key={speaker.id}>
            {(index ? "," : "") + speaker.lastName + " " + speaker.firstName}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className={`md:grid my-2 w-full ${rest.className || ""}`}>
        {speakers.map((speaker, index) => (
          <SpeakerCard key={speaker.id} speaker={speaker} />
        ))}
      </div>
    );
  }
};
