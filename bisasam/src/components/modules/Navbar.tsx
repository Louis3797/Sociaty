import React from "react";
import { useSession } from "next-auth/client";
import Link from "next/link";
import { SolidChatBubble, SolidPlus } from "../../icons";

const Navbar: React.FC = () => {
  const [session] = useSession();
  return (
    <div className="flex flex-row p-1 min-w-full h-18 items-center justify-center bg-bg top-0 fixed">
      <div className="flex flex-row p-1 w-4/5 h-18 items-center justify-between bg-bg top-0 relative ">
        <Link href={"/"}>
          <p className="text-2xl font-bold font-comfortaa text-secondary">
            Sociaty
          </p>
        </Link>
        <div className="flex flex-row p-1 w-36 h-18 items-center justify-between bg-bg top-0 relative">
          <Link href={"/chats"}>
            <SolidChatBubble />
          </Link>
          <Link href={"/submit"}>
            <SolidPlus />
          </Link>
          <Link href={`/u/${sessionStorage.getItem("UID")}`}>
            <img
              src={session?.user.image}
              className="w-10 h-10 rounded-full object-cover"
              alt="UserImg"
            ></img>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
