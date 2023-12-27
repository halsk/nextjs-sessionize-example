import Link from "next/link";

export const BocchimeshiButton: React.FC = () => {
  return (
    <>
      <Link
        href="https://docs.google.com/spreadsheets/d/1uNThUmu58ZgzBUdQ8o5I4Stpb2z3-tWP-AWQL8tSgDE/edit#gid=11113144"
        className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
        target="_blank"
      >
        ぼっち飯対策企画🙌
      </Link>
    </>
  );
};
