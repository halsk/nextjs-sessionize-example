import { FullSpeaker } from "@/sessionize/sessionizeApi";

type Props = {
  speaker: FullSpeaker;
};
import Image from "next/image";

export const SpeakerCard: React.FC<Props> = ({ speaker }) => {
  return (
    <div className="flex w-full">
      <Image
        className="w-24 h-24 rounded-full"
        src={
          speaker.profilePicture
            ? speaker.profilePicture
            : "/images/noimage.png"
        }
        alt={speaker.fullName}
        width={96}
        height={96}
      />
      <div className="ml-4 mt-2">
        <h3 className="text-xl leading-6 font-bold text-gray-900">
          {speaker.lastName} {speaker.firstName}
        </h3>
        <p className="text-gray-700">{speaker.tagLine}</p>
      </div>
    </div>
  );
};
