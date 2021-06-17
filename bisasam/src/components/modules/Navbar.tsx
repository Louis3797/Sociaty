import React, { useEffect } from "react";
import { useSession } from "next-auth/client";
import Link from "next/link";
import SingleUserAvatar from "../elements/UserAvatar/SingleUserAvatar";
import { useRouter } from "next/router";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import AddIcon from "@material-ui/icons/Add";
import { useSetSessionID } from "../../hooks/useSetSessionID";

const Navbar: React.FC = () => {
  const [session] = useSession();
  const router = useRouter();

  if (session) {
    useSetSessionID();
  }

  return (
    <div className="flex flex-row min-w-full h-8 items-center justify-center bg-primary-900 top-0 sticky">
      <div className="flex flex-row 2xl:p-0 p-4 2xl:w-3/5 xl:w-full lg:w-full md:w-full sm:w-full w-full h-8 items-center justify-between bg-primary-900 top-0 relative ">
        <Link href={"/"}>
          <p className="text-2xl font-bold font-comfortaa text-accent">
            Sociaty
          </p>
        </Link>
        <div className="flex flex-row w-15 h-8 items-center justify-between bg-primary-900 top-0 relative">
          <Link href={"/chats"}>
            <ForumRoundedIcon fontSize="small" />
          </Link>
          <Link href={"/submit"}>
            <AddIcon fontSize="default" />
          </Link>
          <SingleUserAvatar
            size="small"
            src={session.user?.image}
            className=""
            alt="UserImg"
            click={() => router.push(`/u/${sessionStorage.getItem("UID")}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
