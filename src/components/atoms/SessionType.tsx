import { Session } from "@/sessionize/sessionizeApi";

export const SessionType: React.FC<{
  sessionTypeCategoryId: number;
  session: Session;
}> = ({ sessionTypeCategoryId, session }) => {
  // Sessionize returns an empty categoryItems array when no value is selected
  const sessionType = session.categories.find(
    (category) => category.id === sessionTypeCategoryId
  )?.categoryItems[0]?.name;
  if (session.isServiceSession || !sessionType) return null;
  return (
    <span className="text-sm text-primary bg-sky-200 rounded-xs p-1 mr-1">
      {sessionType}
    </span>
  );
};
