'use client'

import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Class} from "@/types/class";
import {deleteClassById, getClasses} from "@/api/getClasses";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddClassForm from "@/components/addClassForm";
import EditClassForm from "@/components/editClassForm";

const ClassesPage = () => {
    const [classes, setClasses] = useState<Class[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const [isLoading, setIsLoading] = useState(false);
    const [AddModalShow, setAddModalShow] = React.useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [InfoModalShow, setInfoModalShow] = React.useState(false);
    const [EditModalShow, setEditModalShow] = React.useState(false);
    const [infoText, setInfoText] = React.useState('');
    const [chosenClass, setChosenClass] = useState<Class>({
        grade_id: 0,
        head_teacher_abbreviation: "",
        head_teacher_id: 0,
        head_teacher_name: "",
        id: 0,
        name: ""
    });

    useEffect(() => {
        const getSchoolClass = async () => {
            setIsLoading(true);
            const schoolClasses: Class[] = await getClasses();
            setClasses(schoolClasses);
            setIsLoading(false);
        }
        getSchoolClass();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = classes.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(classes.length / itemsPerPage);

    function handleClick(pClass: Class) {
        setChosenClass(pClass);
        setModalShow(true)
    }

    async function closeAdd() {
        const schoolClasses: Class[] = await getClasses();
        setClasses(schoolClasses);
        setAddModalShow(false);
    }

    async function handleDelete() {
        setModalShow(false);
        const response = await deleteClassById(chosenClass.id.toString());
        if (response == 200) {
            setInfoText("Successfully deleted")
        } else {
            setInfoText("There was a problem deleting this Class")
        }
        const schoolClasses: Class[] = await getClasses();
        setClasses(schoolClasses);
        setInfoModalShow(true);
    }

    async function handleEdit() {
        setModalShow(false);
        setEditModalShow(true);
    }

    async function closeEdit() {
        const schoolClasses: Class[] = await getClasses();
        setClasses(schoolClasses);
        setEditModalShow(false);
    }

    function AddModal(props: any) {
        return (
            <Modal
                {...props}
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
                    <AddClassForm/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeAdd}>Schließen</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    function MyVerticallyCenteredModal(props: any) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        What do you want to do?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button onClick={handleDelete}>Delete</Button>
                    <Button onClick={handleEdit}>Edit</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    function InfoModal(props: any) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <p>{infoText}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    function EditModal(props: any) {
        return (
            <Modal
                {...props}
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
                    <EditClassForm school_class_id={chosenClass.id.toString()}
                                   grade_id={chosenClass.grade_id.toString()}
                                   head_teacher_id={chosenClass.head_teacher_id.toString()} name={chosenClass.name}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeEdit}>Schließen</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentPage(1)
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(totalPages)
        }
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                <div style={{width: '3rem', height: '3rem'}}>
                    <Spinner animation="border" role="status" style={{width: '100%', height: '100%'}}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className={"text-center display-4"}>Klassen</h1><Button className="w-100 p-3"
                                                                        onClick={() => setAddModalShow(true)}>Hinzufügen</Button>
            {classes.length > 0 ? (
                <>
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                    <InfoModal
                        show={InfoModalShow}
                        onHide={() => setInfoModalShow(false)}
                    />

                    <AddModal
                        show={AddModalShow}
                        onHide={() => setAddModalShow(false)}
                    />

                    <EditModal
                        show={EditModalShow}
                        onHide={() => setEditModalShow(false)}
                    />

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Klassenlehrer ID</th>
                            <th>Klassenlehrer</th>
                            <th>Klassenlehrer Kürzel</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map((schoolClass, index) => (
                            <tr key={index} onClick={() => handleClick(schoolClass)}>
                                <td>{schoolClass.id}</td>
                                <td>{schoolClass.grade_id + schoolClass.name}</td>
                                <td>{schoolClass.head_teacher_id}</td>
                                <td>{schoolClass.head_teacher_name}</td>
                                <td>{schoolClass.head_teacher_abbreviation}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <div className={"d-flex justify-content-center"}>
                        <button onClick={handlePrevious}
                                className="btn btn-outline-secondary mx-2">
                            <i className="bi bi-arrow-left"></i>
                        </button>
                        <span className={"mx-3 align-self-center"}>Seite {currentPage} von {totalPages}</span>
                        <button onClick={handleNext}
                                className="btn btn-outline-secondary mx-2">
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </>
            ) : null}
        </div>
    );
}

export default ClassesPage;