import { FullSpeaker, Speaker } from "@/sessionize/sessionizeApi";
import { Speakers } from "./Speakers";
type Props = {
  speakerslist: FullSpeaker[];
  speakers: Speaker[];
  [key: string]: any; // This line allows any additional properties
};
export const SpeakersFilter: React.FC<Props> = ({
  speakerslist,
  speakers,
  ...rest
}) => {
  const selectedSpeakers = speakerslist.filter((speaker) =>
    speakers.find((s) => s.id === speaker.id)
  );
  if (speakerslist === undefined) return null;
  return (
    <Speakers
      speakers={selectedSpeakers}
      className={`${rest.className || ""}`}
    />
  );
};
