import React from 'react'
import PropTypes from 'prop-types'

export const Modal = ({active = false, onClose}) => {
  return (
    
    <div class={`modal fade ${active ? "show" : null}`} style={{display: active ? "block" : null}} id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
   
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {}

export default Modal