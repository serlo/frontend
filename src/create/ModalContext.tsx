import React from 'react'
import Modal from '../components/Modal'

const ModalContext = React.createContext<any>({})

export default ModalContext

export function ModalProvider({ children }) {
  const [modal, setModal] = React.useState(null)

  // prevent rerendering context on every change
  const modalContext = React.useRef({ setModal })

  return (
    <ModalContext.Provider value={modalContext.current}>
      {children}
      <Modal
        isOpen={modal !== null}
        style={{ overlay: { zIndex: 1000 } }}
        onRequestClose={() => setModal(null)}
      >
        {modal}
      </Modal>
    </ModalContext.Provider>
  )
}
