import { IoIosCloseCircleOutline } from "react-icons/io";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation(), onClose;
        }}
      >
        <button className="modal-close" onClick={onClose}>
          <IoIosCloseCircleOutline size={30} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
