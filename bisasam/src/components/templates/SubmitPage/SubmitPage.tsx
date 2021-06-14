import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { POST_CONTENT } from "../../../graphql/mutations";
import Button from "../../elements/button/Button";
import ButtonLink from "../../elements/button/ButtonLink";

const SubmitPage: React.FC = () => {
  const router = useRouter();
  const [session] = useSession();
  const [text, settext] = useState("");

  const [createSubmit] = useMutation(POST_CONTENT);

  function handleSubmit(text: String): void {
    if (text.length <= 255 && text.length !== 0) {
      createSubmit({
        variables: {
          content_text: text.toString(),
          userId: parseInt(sessionStorage.getItem("UID")),
        },
      });

      router.back();
      settext("");
    }
  }

  return (
    <div className="flex flex-col w-full h-full bg-transparent items-center">
      <div className="block bg-primary-800 2xl:w-2/5 lg:w-3/5 md:w-2/5 h-64 rounded-8 mt-24">
        <div className="flex w-full h-1/6 items-start">
          <h1 className="text-2xl font-semibold font-comfortaa text-primary-100 ml-5 mt-3">
            Create a Post
          </h1>
        </div>
        <div className="w-full h-5/6 bg-transparent flex flex-col">
          <div className="w-full h-2/5 flex flex-row items-center mt-3">
            <img
              src={session.user.image}
              className="h-6 w-auto rounded-full object-cover mr-4 ml-5"
            />
            <textarea
              placeholder="Was gibt es zu erzählen?"
              className="w-full h-3/5 border-0 resize-none outline-none bg-transparent text-primary-100 text-base mr-1"
              onChange={(event) => settext(event.target.value)}
            />
          </div>
          <div className="w-full h-full flex flex-row justify-end items-end mt-5">
            <p className="text-base font-normal  text-secondary-600 mb-4">
              {text.length}/255
            </p>
            <div className="ml-5 mb-4 mr-5 w-auto h-auto">
              <ButtonLink
                disabled={false}
                text="Cancel"
                click={() => {
                  router.back();
                  settext("");
                }}
              />
            </div>
            <div className="mb-3 mr-5 w-auto h-auto">
              <Button
                text="Submit"
                disabled={text.length > 255 || text.length === 0}
                click={() => {
                  handleSubmit(text);
                }}
                variant="primary"
                size="big"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;
