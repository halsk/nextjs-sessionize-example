import { FullSpeaker } from "@/sessionize/sessionizeApi";
import { SpeakerCard } from "../atoms/SpeakerCard";
import { Fragment } from "react";

type Props = {
  speakers: (FullSpeaker | undefined)[];
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
        className={`flex flex-wrap text-gray-300 my-2 mx-2 text-sm ${
          rest.className || ""
        }`}
      >
        {speakers.map((speaker, index) => (
          <Fragment key={`speaker-${index}`}>
            {speaker && (
              <div key={speaker.id}>
                {(index ? "," : "") +
                  speaker.lastName || "" +
                  " " +
                  speaker.firstName || ""}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    );
  } else {
    return (
      <div className={`md:grid my-2 w-full ${rest.className || ""}`}>
        {speakers.map((speaker, index) => (
          <Fragment key={`speaker-${index}`}>
            {speaker && <SpeakerCard key={speaker.id} speaker={speaker} />}
          </Fragment>
        ))}
      </div>
    );
  }
};
