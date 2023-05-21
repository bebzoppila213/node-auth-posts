type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode
  title: string
};

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const getModalStyle = () => {
    return isOpen
      ? { display: "block", backgroundColor: "rgba(0, 0,0,0.5)" }
      : {};
  };

  return (
    <div onClick={() => onClose()} className="modal fade show" style={getModalStyle()} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              onClick={() => onClose()}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div onClick={(event) => event.stopPropagation()} className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
          </div>
        </div>
      </div>
    </div>
  );
}
