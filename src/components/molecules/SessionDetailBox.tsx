import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Session, FullSpeaker } from "@/sessionize/sessionizeApi";
import { SessionDetail } from "../atoms/SessionDetail";
type Props = {
  session?: Session;
  speakerlist: FullSpeaker[];
  showSpeakerDetail?: boolean;
  closeWindow: () => void;
  sessionCategory?: number;
};
const SessionDetailBox: React.FC<Props> = ({
  session,
  closeWindow,
  speakerlist,
  showSpeakerDetail,
  sessionCategory,
}) => {
  useEffect(() => {
    if (session) {
      setOpen(true);
    }
  }, [session]);

  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  const onClose = () => {
    setOpen(false);
    closeWindow();
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="top-0 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
                {session && (
                  <SessionDetail
                    session={session}
                    speakerlist={speakerlist}
                    showSpeakerDetail={showSpeakerDetail}
                    sessionCategory={sessionCategory}
                  />
                )}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={onClose}
                  >
                    閉じる
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default SessionDetailBox;
