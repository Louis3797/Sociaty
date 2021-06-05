import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { POST_CONTENT } from "../../../graphql/mutations";

const SubmitPage: React.FC = () => {
  const router = useRouter();
  const [session] = useSession();
  const [text, settext] = useState("");

  const [addTodo] = useMutation(POST_CONTENT);

  function handleSubmit(text: String) {
    if (text.length <= 255) {
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
    <div className="flex flex-col w-full h-full bg-bg items-center">
      <div className="block bg-primary w-2/5 h-64 rounded-3xl mt-60">
        <div className="flex w-full h-1/6 items-start">
          <h1 className="text-2xl font-semibold font-comfortaa text-text ml-5 mt-3">
            Create a Post
          </h1>
        </div>
        <div className="w-full h-5/6 bg-transparent flex flex-col">
          <div className="w-full h-2/5 flex flex-row items-center">
            <img
              src={session.user.image}
              className="h-2/4 w-auto rounded-full object-cover mr-4 ml-5"
            />
            <textarea
              placeholder="Was gibt es zu erzählen?"
              className="w-full h-3/5 border-0 flex flex-col justify-center resize-none outline-none bg-transparent text-text text-base"
              onChange={(event) => settext(event.target.value)}
            />
          </div>
          <div className="w-full h-full flex flex-row justify-end items-end">
            <p className="text-base font-normal mb-4">{text.length}/255</p>
            <button
              className="w-20 bg-transparent h-7 rounded-3xl text-text text-sm font-comfortaa cursor-pointer mb-3 ml-3 mr-3"
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button
              className="w-20 bg-secondary h-7 rounded-3xl text-text text-sm font-comfortaa cursor-pointer mb-3 mr-5"
              onClick={() => handleSubmit(text)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;
