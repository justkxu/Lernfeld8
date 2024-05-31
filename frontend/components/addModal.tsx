'use client'

import React, { ReactElement, JSXElementConstructor} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface props {
    body: ReactElement<any, string | JSXElementConstructor<any>> ,
    footerFunc: React.MouseEventHandler<HTMLButtonElement> | undefined,
    show:boolean,
    onHide: (() => void) | undefined
}

const AddModal = (props: props) => {
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
                    Hinzufügen
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.body}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.footerFunc}>Schließen</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddModal;