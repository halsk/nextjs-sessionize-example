import { FullSpeaker, Session } from "@/sessionize/sessionizeApi";
import { Dialog } from "@headlessui/react";
import { SpeakersFilter } from "../molecules/SpeakersFilter";
import { SessionCategories } from "./SessionCategories";

type Props = {
  session: Session;
  speakerlist: FullSpeaker[];
  showSpeakerDetail?: boolean;
  sessionCategory?: number;
};
export const SessionDetail: React.FC<Props> = ({
  session,
  speakerlist,
  showSpeakerDetail,
  sessionCategory,
}) => {
  const ignoreCategories = sessionCategory ? [sessionCategory] : [];
  return (
    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">
        <div className="mt-3 sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-lg font-semibold leading-6 text-gray-900 text-left"
          >
            {session?.title}
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500 text-left">
              {session?.description}
            </p>
            <SessionCategories
              categories={session.categories}
              ignoreCategories={ignoreCategories}
            />
            <h3 className="mt-4 text-base font-semibold text-gray-900 text-left">
              スピーカー
            </h3>
            <SpeakersFilter
              speakers={session.speakers}
              speakerslist={speakerlist}
              showSpeakerDetail={showSpeakerDetail}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
