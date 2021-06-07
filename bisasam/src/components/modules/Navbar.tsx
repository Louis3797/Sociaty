import React from "react";
import { useSession } from "next-auth/client";
import Link from "next/link";
import { SolidChatBubble, SolidPlus } from "../../icons";

const Navbar: React.FC = () => {
  const [session] = useSession();
  return (
    <div className="flex flex-row min-w-full h-8 items-center justify-center bg-primary-900 top-0 fixed">
      <div className="flex flex-row 2xl:p-0 p-4 2xl:w-3/5 xl:w-full lg:w-full md:w-full sm:w-full w-full h-8 items-center justify-between bg-primary-900 top-0 relative ">
        <Link href={"/"}>
          <p className="text-2xl font-bold font-comfortaa text-accent">
            Sociaty
          </p>
        </Link>
        <div className="flex flex-row w-15 h-8 items-center justify-between bg-primary-900 top-0 relative">
          <Link href={"/chats"}>
            <SolidChatBubble />
          </Link>
          <Link href={"/submit"}>
            <SolidPlus />
          </Link>
          <Link href={`/u/${sessionStorage.getItem("UID")}`}>
            <img
              src={session?.user.image}
              className="w-6 h-6 rounded-full object-cover"
              alt="UserImg"
            ></img>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
