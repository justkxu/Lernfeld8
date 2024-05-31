'use client'

import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {getTeachers} from "@/api/getTeacher";
import {Teacher} from "@/types/teacher";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddTeacherForm from "@/components/addTeacherForm";
import {deleteUserByUsername, getUserByUsername} from "@/api/Users";
import {User} from "@/types/user";
import EditStudentForm from "@/components/editStudentForm";
import EditTeacherForm from "@/components/editTeacherForm";

const TeachersPage = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const [isLoading, setIsLoading] = useState(false);
    const [AddModalShow, setAddModalShow] = React.useState(false);
    const [chosenTeacher, setChosenTeacher] = useState<Teacher>({account: undefined, id: 0});
    const [modalShow, setModalShow] = React.useState(false);
    const [infoText, setInfoText] = React.useState('');
    const [InfoModalShow, setInfoModalShow] = React.useState(false);
    const [EditModalShow, setEditModalShow] = React.useState(false);
    const [chosenUser, setChosenUser] = useState<User>({
        birthday: "",
        contacts: [],
        email: "",
        id: "",
        last_name: "",
        name: "",
        parent: {},
        password: "",
        student: {school_class_id: 0},
        teacher: undefined,
        username: ""
    });


    useEffect(() => {
        const getTeacher = async () => {
            setIsLoading(true);
            const teacher: Teacher[] = await getTeachers();
            setTeachers(teacher);
            setIsLoading(false);
        }
        getTeacher();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = teachers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(teachers.length / itemsPerPage);

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
                    <AddTeacherForm/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeAdd}>Schließen</Button>
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
                    <EditTeacherForm email={chosenUser!.email} birthday={chosenUser!.birthday}
                                     last_name={chosenUser!.last_name} name={chosenUser!.name}
                                     username={chosenUser!.username} abbreviation={chosenTeacher.abbreviation}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeEdit}>Schließen</Button>
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

    async function closeAdd() {
        const teacher: Teacher[] = await getTeachers();
        setTeachers(teacher);
        setAddModalShow(false);
    }

    async function closeEdit() {
        const teacher: Teacher[] = await getTeachers();
        setTeachers(teacher);
        setEditModalShow(false);
    }

    function handleClick(pTeacher: Teacher) {
        setChosenTeacher(pTeacher);
        setModalShow(true)
    }

    async function handleDelete() {
        setModalShow(false);
        const response = await deleteUserByUsername(chosenTeacher.account.username);
        if (response == 200) {
            setInfoText("Erfolgreich gelöscht")
        } else {
            setInfoText("Es gab ein Problem beim Löschen des Lehrers")
        }
        const teacher: Teacher[] = await getTeachers();
        setTeachers(teacher);
        setInfoModalShow(true);
    }

    async function handleEdit() {
        setModalShow(false);
        const user: User = await getUserByUsername(chosenTeacher.account.username);
        setChosenUser(user)
        setEditModalShow(true);
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
            <h1 className={"text-center display-4"}>Lehrer</h1><Button className="w-100 p-3"
                                                                       onClick={() => setAddModalShow(true)}>Hinzufügen</Button>
            {teachers.length > 0 ? (
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
                            <th>Nachname</th>
                            <th>Nutzername</th>
                            <th>Abkürzung</th>
                            <th>Geburtstag</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map((teacher, index) => (
                            <tr key={index} onClick={() => handleClick(teacher)}>
                                <td>{teacher.id}</td>
                                <td>{teacher.account.name}</td>
                                <td>{teacher.account.last_name}</td>
                                <td>{teacher.account.username}</td>
                                <td>{teacher.abbreviation}</td>
                                <td>{teacher.account.birthday}</td>
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

export default TeachersPage;