import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default function FormModal({ open, setOpen, children }) {
  const onCloseModal = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center
      showCloseIcon={false}
      classNames={{
        modal: "!p-0 !rounded-2xl !bg-transparent !mx-2",
        modalContainer: // center the modal vertically and horizontally
          "flex items-center justify-center",
      }}
    >
      {children}
    </Modal>
  );
}
