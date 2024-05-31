'use client'

import React, { ReactElement, JSXElementConstructor} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface props {
    body: ReactElement<any, string | JSXElementConstructor<any>> ,
    show:boolean,
    onHide: (() => void) | undefined
}

const ChoseModal = (props: props) => {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    What do you want to do?
                </Modal.Title>
            </Modal.Header>
            {props.body}
            <Modal.Footer>
                <Button onClick={props.onHide}>Schließen</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChoseModal;