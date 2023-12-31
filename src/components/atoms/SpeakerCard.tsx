import { FullSpeaker } from "@/sessionize/sessionizeApi";

type Props = {
  speaker: FullSpeaker;
};
import Image from "next/image";
import { SocialLink } from "./SocialLink";

export const SpeakerCard: React.FC<Props> = ({ speaker }) => {
  return (
    <div className="flex w-full my-2">
      <Image
        className="w-24 h-24 rounded-full  border-gray-300 border-solid border-[1px]"
        src={
          speaker.profilePicture
            ? speaker.profilePicture
            : "/images/noimage.png"
        }
        alt={speaker.lastName + " " + speaker.firstName}
        placeholder="blur"
        blurDataURL="/images/noimage.png"
        width={96}
        height={96}
      />
      <div className="ml-4">
        <h3 className="text-base leading-6 font-bold text-gray-900">
          {speaker.lastName} {speaker.firstName}{" "}
          {speaker.questionAnswers[0] &&
            speaker.questionAnswers[0].answer != null &&
            `(${speaker.questionAnswers[0].answer})`}
        </h3>
        {speaker.links &&
          speaker.links.length > 0 &&
          speaker.links.find((link) => link.linkType === "Twitter") && (
            <SocialLink
              link={speaker.links.find((link) => link.linkType === "Twitter")!}
            />
          )}
        {speaker.tagLine && (
          <p className="text-gray-700 text-sm bg-highlight p-1 inline">
            {speaker.tagLine}
          </p>
        )}
        <p className="text-gray-500 text-sm mt-2 whitespace-pre-line">
          {speaker.bio}
        </p>
      </div>
    </div>
  );
};
