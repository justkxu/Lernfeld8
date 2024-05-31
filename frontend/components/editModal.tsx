'use client'

import React, { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface props {
    body: ReactElement<any, string | JSXElementConstructor<any>> ,
    footerFunc: React.MouseEventHandler<HTMLButtonElement> | undefined,
    show:boolean,
    onHide: (() => void) | undefined
}

const EditModal = (props: props) => {
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
                    Bearbeiten
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

export default EditModal;