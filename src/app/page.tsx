import SessionizeSessions from "@/components/organisms/SessionizeSessions";

export default function Home() {
  return (
    <main className="container mx-auto">
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
