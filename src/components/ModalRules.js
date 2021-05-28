import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "rgb(15, 15, 15)",
    padding: "1rem",
    borderRadius: "5px",
    boxShadow: "0 3rem 5rem rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    maxHeight: "60vh !important",
    maxWidth: "80%",
  },
};

Modal.setAppElement("#root");

export default function ModalRules() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    
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
        <h2>🍅 Minidoro Clock</h2>
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
          Minidoro Clock - is a minimalistic timer tool inspired by the Pomodoro
          Technique invented by Francesco Cirillo. This tool's main aim is to
          help us organize our study schedule and divide sessions into short
          intervals called pomodoros (tomatoes), traditionally 25 minutes long.
          <br />
          In general our attention span lasts for about 20 minutes, so keeping
          each of our the sessions between 15 to 30 minutes should give us
          possibly the best results. After each session, it is good to have a
          short break (generally 5 to 15 minutes long), and then go back to work
          for another session.
          <br />
          <ul>
            <li>For each accomplished session, you get one pomodoro 🍅</li>
            <li>You can change study time and break time </li>
            <li>
              There is a White Noise option available for focusing even better
            </li>

            <li>Your pomodoros are reset daily </li>
            <li>Collect as many as you can</li>
          </ul>
          <br />
          Good luck!
        </div>
      </Modal>
    </>
  );
}
