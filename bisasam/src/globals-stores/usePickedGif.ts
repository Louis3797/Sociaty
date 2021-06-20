import create from "zustand";
import { combine } from "zustand/middleware";

export const usePickedGif = create(
  combine(
    {
      gifUrl: "",
    },
    (set) => ({
      setGifUrl: (gifUrl: string) => set({ gifUrl }),
    })
  )
);
