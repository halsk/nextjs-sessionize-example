import { BocchimeshiButton } from "@/components/atoms/BocchimeshiButton";
import SessionizeSessions from "@/components/organisms/SessionizeSessions";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto">
      <div className="flex p-5 justify-between">
        <Link href="https://dekaigi.org/">
          <Image
            src="/images/logo_dekkaigi_black.png"
            alt="デッカイギロゴ"
            width={170}
            height={35}
          />
        </Link>
        <BocchimeshiButton />
      </div>
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
