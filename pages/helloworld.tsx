import React from 'react'
import Modal from '../src/reactmodal'

const centeredModal = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    position: 'static'
  }
}

function HelloWorld() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open modal</button>
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={centeredModal}
      >
        This is the content of the modal
      </Modal>
    </>
  )
}

export default HelloWorld
