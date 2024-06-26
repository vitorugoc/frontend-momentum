import React, { useState } from "react";

import Card from "../components/Card";
import Button from "../components/Button";
import Modal from "../components/Modal";
import ValidatedInput from "../components/ValidatedInput";
import ValidatedDateInput from "../components/ValidatedDateInput";

import logo from "../assets/logo.png";

import { isNotEmpty, isPastDate } from "../utils/validators";
import ValidatedPasswordInput from "../components/ValidatedPasswordInput";

const inputClassName =
  "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50";
const passwordInputClassName =
  "focus:border-blue-500 focus:ring focus:ring-blue-200";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title}>
    <form className="space-y-4">
      {children}
      <div className="flex justify-end">
        <Button
          backgroundColor="bg-red-500"
          textColor="text-white"
          className="rounded-lg px-4 py-2"
          size="large"
        >
          {title === "Entrar" ? "Entrar" : "Cadastrar"}
        </Button>
      </div>
    </form>
  </Modal>
);

type ModalType = "signUp" | "login";

const InitialPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState({ signUp: false, login: false });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const openModal = (type: ModalType) =>
    setModalOpen({ ...isModalOpen, [type]: true });
  const closeModal = (type: ModalType) =>
    setModalOpen({ ...isModalOpen, [type]: false });

  const textValidators = [
    {
      validate: isNotEmpty,
      errorMessage: "O campo não pode estar vazio",
    },
  ];

  const dateValidators = [
    {
      validate: isPastDate,
      errorMessage: "A data informada deve ser uma data passada",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-2 h-screen bg-red-400">
        <Card
          width="w-full"
          height="h-5/6"
          backgroundColor="bg-gray-200"
          borderRadius="rounded-xl"
          className="m-4"
        >
          <div className="flex flex-col justify-center h-full p-4">
            <h1 className="text-4xl font-bold text-start mb-8">
              Seja bem-vindo ao Momentum
            </h1>
            <h2 className="text-start mb-4 text-xl">Cadastre-se</h2>
            <Button
              backgroundColor="bg-gray-300"
              textColor="text-black"
              className="rounded-3xl w-1/2 mb-4"
              size="large"
            >
              Google
            </Button>
            <div className="flex items-center w-1/2">
              <div className="flex-grow border-t border-gray-400 mr-2"></div>
              <h3 className="text-center">ou</h3>
              <div className="flex-grow border-t border-gray-400 ml-2"></div>
            </div>
            <Button
              backgroundColor="bg-red-500"
              textColor="text-white"
              className="rounded-3xl w-1/2 mt-4"
              size="large"
              onClick={() => openModal("signUp")}
            >
              Criar Conta
            </Button>
            <h2 className="text-start mt-20 text-xl">Já possui cadastro?</h2>
            <Button
              backgroundColor="bg-gray-500"
              textColor="text-white"
              className="rounded-3xl w-1/2 mt-4"
              size="large"
              onClick={() => openModal("login")}
            >
              Entrar
            </Button>
          </div>
        </Card>
        <div className="flex items-center justify-center p-4">
          <img src={logo} alt="Logo" className="max-w-full max-h-full pb-48" />
        </div>
      </div>
      <AuthModal
        isOpen={isModalOpen.signUp}
        onClose={() => closeModal("signUp")}
        title="Cadastre-se"
      >
        <ValidatedInput
          label="Nome"
          validators={textValidators}
          inputClassName={inputClassName}
        />
        <ValidatedInput
          label="Email"
          validators={textValidators}
          inputClassName={inputClassName}
        />
        <ValidatedDateInput
          label="Data de Nascimento"
          validators={dateValidators}
          inputClassName={inputClassName}
        />
        <ValidatedPasswordInput
          label="Senha"
          validators={textValidators}
          type={isPasswordVisible ? "text" : "password"}
          inputClassName={passwordInputClassName}
          isVisible={isPasswordVisible}
          setIsVisible={setIsPasswordVisible}
        />
      </AuthModal>
      <AuthModal
        isOpen={isModalOpen.login}
        onClose={() => closeModal("login")}
        title="Entrar"
      >
        <ValidatedInput
          label="Email"
          validators={textValidators}
          inputClassName={inputClassName}
        />
        <ValidatedPasswordInput
          label="Senha"
          validators={textValidators}
          type={isPasswordVisible ? "text" : "password"}
          inputClassName={passwordInputClassName}
          isVisible={isPasswordVisible}
          setIsVisible={setIsPasswordVisible}
        />
      </AuthModal>
    </>
  );
};

export default InitialPage;
