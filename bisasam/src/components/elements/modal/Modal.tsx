import { Modal as MaterialModal } from "@material-ui/core";

interface ModalProps {
  className?: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  className,
  isOpen,
  onRequestClose,
  children,
}) => {
  return (
    <MaterialModal
      open={isOpen}
      onClose={onRequestClose}
      onBackdropClick={() => {}}
      className={`flex justify-center items-start mt-15 focus:outline-none border-0 ${className}`}
    >
      <div className="flex flex-col w-auto rounded-8 md:w-42 sm:w-full  h-auto bg-primary-800">
        {children}
      </div>
    </MaterialModal>
  );
};

export default Modal;
