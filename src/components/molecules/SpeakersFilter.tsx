import { FullSpeaker, Speaker } from "@/sessionize/sessionizeApi";
import { Speakers } from "./Speakers";
type Props = {
  speakerslist: FullSpeaker[];
  speakers: Speaker[];
  showSpeakerDetail?: boolean;
  [key: string]: any; // This line allows any additional properties
};
export const SpeakersFilter: React.FC<Props> = ({
  speakerslist,
  speakers,
  showSpeakerDetail,
  ...rest
}) => {
  const selectedSpeakers = speakers.map((speaker) => {
    return speakerslist.find((s) => s.id === speaker.id);
  });
  if (speakerslist === undefined) return null;
  return (
    <Speakers
      speakers={selectedSpeakers}
      className={`${rest.className || ""}`}
      showSpeakerDetail={showSpeakerDetail}
    />
  );
};
