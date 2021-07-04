import React from "react";
import ButtonIcon from "../button/ButtonIcon";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
interface GifPickerSearchBarProps {
  onChange: (e) => void;
  close: () => void;
}

const GifPickerSearchBar: React.FC<GifPickerSearchBarProps> = ({
  onChange,
  close,
}) => {
  return (
    <div className="flex flex-row w-full h-full items-center justify-between bg-primary-800 rounded-8">
      <ButtonIcon
        size="big"
        bgcolor="bg-secondary-600"
        onClick={close}
        className="mx-3 p-3"
      >
        <CloseRoundedIcon fontSize="default" className="text-secondary-600" />
      </ButtonIcon>
      <input
        type="text"
        className="w-full h-4/5 rounded-8 p-2 mx-3 bg-primary-600 outline-none"
        onChange={onChange}
        placeholder="Search for Gifs..."
      />
    </div>
  );
};

export default GifPickerSearchBar;
