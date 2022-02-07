import { GifsResult, GiphyFetch } from "@giphy/js-fetch-api";
import { IGif } from "@giphy/js-types";
import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { usePickedGif } from "../../../globals-stores/usePickedGif";

interface GifResultsProps {
  gifText: string;
  close: () => void;
}

export const GifLoadingState: React.FC = () => {
  return (
    <div className="flex w-full h-full items-center justify-center bg-transparent">
      <CircularProgress />
    </div>
  );
};

const GifResults: React.FC<GifResultsProps> = ({ gifText, close }) => {
  const API_KEY: string = process.env.GIPHY_API_KEY
    ? process.env.GIPHY_API_KEY
    : "";
  const [gifObj, setGifObj] = useState<IGif[] | null>(null);
  const setGifUrl = usePickedGif((state) => state.setGifUrl);
  const gf = new GiphyFetch(API_KEY);

  async function searchForGif() {
    let gifs;
    if (gifText.length === 0) {
      gifs = await gf.trending({
        limit: 30,
        type: "gifs",
        rating: "pg",
      });
    } else {
      gifs = await gf.search(gifText, {
        sort: "relevant",
        lang: "en",
        limit: 30,
        type: "gifs",
        rating: "pg",
      });
    }

    setGifObj(gifs.data);
  }

  useEffect(() => {
    searchForGif();
  }, []);

  const add = (url: string) => {
    setGifUrl(url);
    close();
  };

  const gifResults = gifObj?.map(
    (
      gif: {
        images: {
          fixed_height_downsampled: { webp: string | undefined };
          original: { webp: string };
        };
      },
      i: React.Key | null | undefined
    ) => {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={gif.images.fixed_height_downsampled.webp}
          className="w-2/6 h-15"
          alt="gif"
          key={i}
          onClick={() => add(gif.images.original.webp)}
        />
      );
    }
  );
  return (
    <div className="flex flex-row flex-wrap w-full bg-transparent h-full">
      {gifResults?.length === 0 ? <GifLoadingState /> : gifResults}
    </div>
  );
};

export default GifResults;

function useAsync(arg0: () => Promise<void>, arg1: never[]) {
  throw new Error("Function not implemented.");
}
