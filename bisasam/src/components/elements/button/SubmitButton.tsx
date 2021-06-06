export interface SubmitButtonProps {
  text: string;
  disabled: boolean;
  click: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  disabled,
  click,
}) => {
  if (disabled) {
    return (
      <button className="w-10 bg-accent-disabled h-5 rounded-20 text-button text-sm font-bold font-comfortaa cursor-default focus:outline-none">
        {text}
      </button>
    );
  } else {
    return (
      <button
        className="w-10 bg-accent h-5 rounded-20 text-button text-sm font-bold font-comfortaa cursor-pointer hover:bg-accent-hover focus:outline-none"
        onClick={click}
      >
        {text}
      </button>
    );
  }
};

export default SubmitButton;
