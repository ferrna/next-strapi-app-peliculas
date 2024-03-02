import React from 'react'
import ReactDOM from 'react-dom'
import styles from '@/styles/Modal.module.css'

interface ModalProps {
  onClose: () => void
  children?: React.ReactNode
  title?: string
}

const Modal = ({ onClose, children, title }: ModalProps) => {
  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onClose()
  }

  const modalContent = (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_wrapper}>
        <div className={styles.modal}>
          <div className={styles.modal_header}>
            <button onClick={handleCloseClick}>x</button>
          </div>
          {title && <h1>{title}</h1>}
          <div className={styles.modal_body}>{children}</div>
        </div>
      </div>
    </div>
  )
  //@ts-ignore
  return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'))
}

export default Modal
