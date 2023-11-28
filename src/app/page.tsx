import SessionizeSessions from "@/components/organisms/SessionizeSessions";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto">
      <Link href="https://dekaigi.org/">
        <div className="flex p-5">
          <Image
            src="/images/logo_dekkaigi_black.png"
            alt="デッカイギロゴ"
            width={170}
            height={35}
          />
        </div>
      </Link>
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
