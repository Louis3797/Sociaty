import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { POST_CONTENT } from "../../../graphql/mutations";
import CancelButton from "../../elements/button/CancelButton";
import SubmitButton from "../../elements/button/SubmitButton";

const SubmitPage: React.FC = () => {
  const router = useRouter();
  const [session] = useSession();
  const [text, settext] = useState("");

  const [addTodo] = useMutation(POST_CONTENT);

  function handleSubmit(text: String) {
    if (text.length <= 255 && text.length !== 0) {
      addTodo({
        variables: {
          content_text: text.toString(),
          user_id: parseInt(sessionStorage.getItem("UID")),
        },
      });

      router.back();
      settext("");
    }
  }

  return (
    <div className="flex flex-col w-full h-full bg-transparent items-center">
      <div className="block bg-primary-800 2xl:w-2/5 lg:w-3/5 md:w-2/5 h-64 rounded-20 mt-24">
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
            <div className="ml-3 mb-3 mr-3 w-auto h-auto">
              <CancelButton
                text="Cancel"
                click={() => {
                  handleSubmit(text);
                  settext("");
                }}
              />
            </div>
            <div className="mb-3 mr-3 w-auto h-auto">
              <SubmitButton
                text="Submit"
                disabled={text.length > 255 || text.length === 0}
                click={() => {
                  handleSubmit(text);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;
