import SessionizeSessions from "@/components/organisms/SessionizeSessions";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {process.env.NEXT_PUBLIC_SESSIONIZE_ID ? (
        <SessionizeSessions id={process.env.NEXT_PUBLIC_SESSIONIZE_ID!} />
      ) : (
        <div className="flex flex-col items-center justify-center">
          Please create .env.local and set NEXT_PUBLIC_SESSIONIZE_ID{" "}
        </div>
      )}
    </main>
  );
}
