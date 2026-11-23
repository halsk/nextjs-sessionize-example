import { useRef } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Session, FullSpeaker } from "@/sessionize/sessionizeApi";
import { SessionDetail } from "../atoms/SessionDetail";

type Props = {
  session?: Session;
  speakerlist: FullSpeaker[];
  showSpeakerDetail?: boolean;
  closeWindow: () => void;
  sessionTypeCategoryId?: number;
};
const SessionDetailBox: React.FC<Props> = ({
  session,
  closeWindow,
  speakerlist,
  showSpeakerDetail,
  sessionTypeCategoryId: sessionTypeCategoryId,
}) => {
  const cancelButtonRef = useRef(null);
  const onClose = () => {
    closeWindow();
  };
  return (
    <Dialog
      open={session !== undefined}
      className="relative z-10"
      initialFocus={cancelButtonRef}
      onClose={onClose}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="top-0 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-2xl sm:data-closed:translate-y-0 sm:data-closed:scale-95"
          >
            {session && (
              <SessionDetail
                session={session}
                speakerlist={speakerlist}
                showSpeakerDetail={showSpeakerDetail}
                sessionTypeCategoryId={sessionTypeCategoryId}
              />
            )}
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                ref={cancelButtonRef}
                className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-secondary sm:ml-3 sm:w-auto"
                onClick={onClose}
              >
                閉じる
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
export default SessionDetailBox;
