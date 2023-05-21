import React, { useState } from "react";
import Header from "./components/Header";
import FormRegister from "./components/FormRegister";
import Modal from "./hoc/Modal";
import FormAuth from "./components/FormAuth";
import useUser from "./hooks/useUser";

import Main from "./components/Main";

function App() {
  const [modalRegisterIsOpen, setModalRegisterIsOpen] = useState(false);
  const [modalAuthIsOpen, setModalAuthIsOpen] = useState(false);
  const { userAuth, userRegister, userState, isAuth } = useUser();

  return (
    <div className="App">
      <Header
        userName={userState.name}
        userIsAuth={isAuth}
        onAuthBtnClick={() => setModalAuthIsOpen(true)}
        onRegisterBtnClick={() => setModalRegisterIsOpen(true)}
      ></Header>

      <Main user={userState}></Main>

      <Modal
        title="Регистрация"
        onClose={() => setModalRegisterIsOpen(false)}
        isOpen={modalRegisterIsOpen}
      >
        <FormRegister onSumbitHandler={userRegister}></FormRegister>
      </Modal>

      <Modal
        title="Авторизация"
        onClose={() => setModalAuthIsOpen(false)}
        isOpen={modalAuthIsOpen}
      >
        <FormAuth onSumbitHandler={userAuth}></FormAuth>
      </Modal>
      
    </div>
  );
}

export default App;
