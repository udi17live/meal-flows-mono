import Image from "next/image";
import Logo from "@/app/components/logo/logo";

export default function AuthScreenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full md:w-[45%]">
        <div className="flex flex-col h-full max-w-2xl mx-auto justify-center items-center md:items-start p-16 space-y-6 ">
          <Logo />
          {children}
        </div>
      </div>
      <div className="hidden md:block md:w-[55%] relative">
        <Image
          fill
          alt="auth background"
          src="/login-bg.jpg"
          className="object-cover w-full h-full"
        />
        <div className="fixed bottom-2 right-4 p-3 rounded bg-white/10 text-white">
          Photo by
          <a href="https://unsplash.com/@enmanuelaq?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            {" "}
            Enmanuel Abreu Quezada{" "}
          </a>
          on
          <a href="https://unsplash.com/photos/someone-is-garnishing-a-plate-of-appetizers-1XIB9Ffp8D4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            {" "}
            Unsplash
          </a>
        </div>
      </div>
    </div>
  );
}

// Photo by <a href="https://unsplash.com/@enmanuelaq?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Enmanuel Abreu Quezada</a> on <a href="https://unsplash.com/photos/someone-is-garnishing-a-plate-of-appetizers-1XIB9Ffp8D4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
