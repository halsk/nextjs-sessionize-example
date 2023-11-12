import { Session } from "@/sessionize/sessionizeApi";
import { Dialog } from "@headlessui/react";

type Props = {
  session: Session;
};
export const SessionDetail: React.FC<Props> = ({ session }) => {
  return (
    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900 text-left"
          >
            {session?.title}
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500 text-left">
              {session?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
