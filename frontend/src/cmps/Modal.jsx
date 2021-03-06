export const Modal = ({ children, center, onClose }) => {
  return (
    <>
      <div className={`modal-overlay`} onClick={onClose}></div>
      <div className={`modal-wrapper ${center && 'center'}`}>{children}</div>
    </>
  );
};
