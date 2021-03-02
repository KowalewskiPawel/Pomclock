import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    color: "rgb(15, 15, 15)",
    padding: "3rem",
    borderRadius: "5px",
    boxShadow: "0 3rem 5rem rgba(0, 0, 0, 0.3)",
    textAlign: "center",
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export default function ModalRules() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div onClick={openModal}>Info</div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>PomoClock</h2>
        <div
          style={{
            position: "absolute",
            top: "1.2rem",
            right: "2rem",
            color: "#333",
            cursor: "pointer",
            border: "none",
            background: "rgb(41, 40, 40)",
            padding: "0.5rem",
            fontSize: "20px",
            color: "white",
          }}
          onClick={closeModal}
        >
          X
        </div>
        <div>
          The Pomodoro Technique is a time management method developed by
          Francesco Cirillo in the late 1980s.[1] The technique uses a timer to
          break down work into intervals, traditionally 25 minutes in length,
          separated by short breaks. Each interval is known as a pomodoro, from
          the Italian word for 'tomato', after the tomato-shaped kitchen timer
          that Cirillo used as a university student.
        </div>
      </Modal>
    </>
  );
}
