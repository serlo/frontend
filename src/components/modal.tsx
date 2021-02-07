import Modal from 'react-modal'

try {
  Modal.defaultStyles.overlay!.zIndex = 101
} catch (e) {
  console.log(e)
  //
}

Modal.setAppElement('#__next')

export { Modal }
