import { Session } from "@/sessionize/sessionizeApi";

export const SessionType: React.FC<{
  sessionTypeCategoryId: number;
  session: Session;
}> = ({ sessionTypeCategoryId, session }) => {
  return (
    <>
      {!session.isServiceSession && (
        <span
          className={`text-sm text-primary bg-sky-200 rounded-sm p-1 mr-1 ${
            !session.isPlenumSession && ""
          }`}
        >
          {session.categories
            .filter((category) => category.id === sessionTypeCategoryId)
            .map((category) => category.categoryItems[0].name)}
        </span>
      )}
    </>
  );
};
