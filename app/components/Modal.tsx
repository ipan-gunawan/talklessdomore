interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  children,
  showCloseButton = true,
}) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box mx-auto items-center h-fit my-auto">
        {children}
        {showCloseButton && (
          <div className="modal-action flex justify-end">
            <form method="dialog">
              <button
                className="btn btn-error"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
