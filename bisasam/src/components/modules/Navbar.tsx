import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SingleUserAvatar from "../elements/UserAvatar/SingleUserAvatar";
import { useRouter } from "next/router";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import AddIcon from "@material-ui/icons/Add";
import { SubmitModal } from "./modal/SubmitModal";
import SearchBar from "../elements/searchbar/SearchBar";

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [showSubmitModal, setshowSubmitModal] = useState(false);
  return (
    <div className="flex flex-row min-w-full h-8 items-center justify-center bg-primary-900 top-0 sticky z-50">
      <SubmitModal
        isOpen={showSubmitModal}
        onRequestClose={() => setshowSubmitModal(false)}
      />
      <div className="flex flex-row 2xl:p-0 p-4 2xl:w-3/5 xl:w-full lg:w-full md:w-full sm:w-full w-full h-8 items-center justify-between bg-primary-900 top-0 relative ">
        <Link href={"/"} passHref>
          <p className="text-2xl font-bold font-comfortaa text-accent">
            sociaty
          </p>
        </Link>
        <div className="w-2/5">
          <SearchBar className="" placeholder="# to search for Hashtags" />
        </div>
        <div className="flex flex-row w-15 h-8 items-center justify-between bg-primary-900 top-0 relative">
          <Link href={"/chats"} passHref>
            <ForumRoundedIcon fontSize="small" />
          </Link>

          <AddIcon
            fontSize="default"
            onClick={() => setshowSubmitModal(true)}
          />

          <SingleUserAvatar
            size="small"
            src={
              session && typeof session.user?.image === "string"
                ? session.user?.image
                : ""
            }
            className=""
            alt="UserImg"
            click={() =>
              router.push(
                `/u/${encodeURIComponent(
                  decodeURIComponent(
                    // @ts-ignore
                    window.sessionStorage.getItem("UNAME")
                  ).replace(/\s+/g, "")
                )}`
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
