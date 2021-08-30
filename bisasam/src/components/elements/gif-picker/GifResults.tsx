import { GiphyFetch } from "@giphy/js-fetch-api";
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
  const [gifObj, setgifObj] = useState([]);
  const setGifUrl = usePickedGif((state) => state.setGifUrl);
  const gf = new GiphyFetch(process.env.GIPHY_API_KEY);

  async function searchForGif() {
    let gifs;
    try {
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

      setgifObj(gifs.data);
    } catch (error) {
      console.error(`search`, error);
    }
  }
  useEffect(() => {
    searchForGif();
  }, [gifText]);

  const add = (url: string) => {
    setGifUrl(url);
    close();
  };

  const gifResults = gifObj.map((gif, i) => {
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
  });
  return (
    <div className="flex flex-row flex-wrap w-full bg-transparent h-full">
      {gifResults.length === 0 ? <GifLoadingState /> : gifResults}
    </div>
  );
};

export default GifResults;
