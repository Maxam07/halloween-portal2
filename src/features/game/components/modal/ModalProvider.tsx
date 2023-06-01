import React, { FC, useState } from "react";

import { createContext } from "react";
import { Modal } from "react-bootstrap";
import { BlockBucksModal } from "./components/BlockBucksModal";
import { StoreOnChainModal } from "./components/StoreOnChainModal";

type GlobalModal = "BUY_BLOCK_BUCKS" | "STORE_ON_CHAIN";

export const ModalContext = createContext<{
  openModal: (type: GlobalModal) => void;
}>({ openModal: console.log });

export const ModalProvider: FC = ({ children }) => {
  const [opened, setOpened] = useState<GlobalModal>();
  const [closeable, setCloseable] = useState(true);

  const openModal = (type: GlobalModal) => {
    console.log({ override: type });
    setOpened(type);
  };

  const handleClose = () => {
    if (!closeable) return;
    setOpened(undefined);
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      <Modal centered show={opened === "BUY_BLOCK_BUCKS"} onHide={handleClose}>
        <BlockBucksModal
          onClose={handleClose}
          closeable={closeable}
          setCloseable={setCloseable}
        />
      </Modal>

      <Modal centered show={opened === "STORE_ON_CHAIN"} onHide={handleClose}>
        <StoreOnChainModal onClose={handleClose} />
      </Modal>
    </ModalContext.Provider>
  );
};
