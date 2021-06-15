import { useMediaQuery } from "react-responsive";

export const useScreenType = () => {
  const is2Cols = useMediaQuery({ minWidth: 1260 });
  const is2ColsFull = useMediaQuery({ minWidth: 800 });

  if (is2Cols) {
    return "2-cols";
  }
  if (is2ColsFull) {
    return "2-cols-full";
  }
  return "fullscreen";
};
