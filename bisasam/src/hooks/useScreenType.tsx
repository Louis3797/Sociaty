import { useMediaQuery } from "react-responsive";

export const useScreenType = () => {
  const is2Cols = useMediaQuery({ minWidth: 1336 });
  const is1Cols = useMediaQuery({ minWidth: 800 });

  if (is2Cols) {
    return "2-cols";
  }
  if (is1Cols) {
    return "1-cols";
  }
  return "fullscreen";
};
