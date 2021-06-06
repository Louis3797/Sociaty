export interface CancelButtonProps {
  text: string;
  click: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CancelButton: React.FC<CancelButtonProps> = ({ text, click }) => {
  return (
    <button
      className="w-10 bg-transparent h-5 rounded-20 text-button text-sm font-bold font-comfortaa cursor-pointer hover:bg-error focus:outline-none"
      onClick={click}
    >
      {text}
    </button>
  );
};

export default CancelButton;
