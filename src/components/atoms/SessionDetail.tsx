import { FullSpeaker, Session } from "@/sessionize/sessionizeApi";
import { Dialog } from "@headlessui/react";
import { SpeakersFilter } from "../molecules/SpeakersFilter";
import { ShareButtons } from "../molecules/ShareButtons";
import { SessionCategories } from "./SessionCategories";
import { createHash } from "@/libs/util";

type Props = {
  session: Session;
  speakerlist: FullSpeaker[];
  showSpeakerDetail?: boolean;
  sessionTypeCategoryId?: number;
};
export const SessionDetail: React.FC<Props> = ({
  session,
  speakerlist,
  showSpeakerDetail,
  sessionTypeCategoryId,
}) => {
  const ignoreCategories = sessionTypeCategoryId ? [sessionTypeCategoryId] : [];
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
            <p className="text-sm text-gray-500 text-left whitespace-pre-line">
              {session?.description}
            </p>
            <div className="flex flex-wrap text-gray-100 my-2 space-x-2 text-sm">
            {session?.liveUrl && (
              <div className="bg-green-600 px-1 rounded-md mt-1">
                <a
                  href={session?.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Slido</span> 
                </a>
              </div>
            )}
            </div>
            <SessionCategories
              categories={session.categories}
              ignoreCategories={ignoreCategories}
            />
            <ShareButtons
              title={session.title}
              url={`${window.location.protocol}//${window.location.hostname}${
                window.location.port !== "" ? `:${window.location.port}` : ""
              }${createHash({
                sessionId: session.id,
              })}`}
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
