import React, { Component } from "react";
import "./login/style.css"
class Modal extends Component {
    render () { 
        const {isOpen, title, body, buttons, onclose} = this.props
        console.dir(this.props)
            if(!isOpen) return null;
        
            return(
                <div className="modal-overlay">
                    <div className="modal-box">
                        <div className="modal-header">
                            <h2>{title}</h2>
                            <button onClick={onclose} className="close-btn">X</button>
                      </div>
                      <div className="modal-body">
                        {body}
        
                      </div>
                      <div className="modal-footer">
                         {buttons}
                      </div>
        
                    </div>
                </div>
            )
        
    }

}
export default Modal;