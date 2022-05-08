import { useState } from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  display: flex;
  background: rgb(0, 0, 0, 0.7);
  backdrop-filter: blur(2px);
`;

const ModalBox = styled.div`
  background: whitesmoke;
  padding: 1em;
  border-radius: 1em;
`

export type ModalProps = { children: string };
export const Modal = ({children,}: ModalProps) => {
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false)
  }
  const modal : JSX.Element | null = showModal ? 
                  <ModalBackground>
                    <ModalBox onClick={closeModal}> You win!</ModalBox> 
                  </ModalBackground>
                : null
  
  return <>{modal}</>
}
