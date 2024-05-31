'use client'

import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Student} from "@/types/student";
import {getStudents} from "@/api/getStudents";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {deleteUserByUsername, getUserByUsername} from "@/api/Users";
import {getClasses} from "@/api/getClasses";
import {Class} from "@/types/class";
import {User} from "@/types/user";
import EditStudentForm from "@/components/editStudentForm";
import AddStudentForm from "@/components/addStudentForm";
import EditModal from "@/components/editModal";
import InfoModal from "@/components/infoModal";
import AddModal from "@/components/addModal";
import ChoseModal from "@/components/choseModal";


const StudentsPage = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [schoolClasses, setSchoolClasses] = useState<Class[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const [isLoading, setIsLoading] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [InfoModalShow, setInfoModalShow] = React.useState(false);
    const [EditModalShow, setEditModalShow] = React.useState(false);
    const [AddModalShow, setAddModalShow] = React.useState(false);
    const [infoText, setInfoText] = React.useState('');
    const [chosenStudent, setChosenStudent] = useState<Student>({
        account: {
            id: '',
            name: '',
            last_name: '',
            birthday: '',
            username: ''
        }, id: 0, school_class_id: 0
    });
    const [chosenUser, setChosenUser] = useState<User>({
        birthday: "",
        contacts: [],
        email: "",
        id: "",
        last_name: "",
        name: "",
        parent: {},
        password: "",
        student: {
            school_class_id: 0, id: 0, account: {
                id: '',
                name: '',
                last_name: '',
                birthday: '',
                username: ''
            }
        },
        teacher: undefined,
        username: ""
    });


    useEffect(() => {
        const getStudent = async () => {
            setIsLoading(true);
            const student: Student[] = await getStudents();
            setStudents(student);
            const classes: Class[] = await getClasses();
            setSchoolClasses(classes)
            setIsLoading(false);
        }
        getStudent();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = students.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(students.length / itemsPerPage);

    async function handleDelete() {
        setModalShow(false);
        const response = await deleteUserByUsername(chosenStudent!.account.username);
        if (response == 200) {
            setInfoText("Erfolgreich gelöscht")
        } else {
            setInfoText("Es gab ein Problem beim Löschen des Schülers")
        }
        const student: Student[] = await getStudents();
        setStudents(student);
        setInfoModalShow(true);
    }

    async function handleEdit() {
        setModalShow(false);
        const user: User = await getUserByUsername(chosenStudent!.account.username);
        setChosenUser(user)
        setEditModalShow(true);
    }

    async function closeEdit() {
        const student: Student[] = await getStudents();
        setStudents(student);
        setEditModalShow(false);
    }

    async function closeAdd() {
        const student: Student[] = await getStudents();
        setStudents(student);
        setAddModalShow(false);
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

    function handleClick(pStudent: Student) {
        setChosenStudent(pStudent);
        setModalShow(true)
    }

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

    function getClassName(school_class_id: number): string {
        let className = "";
        schoolClasses.forEach(oneClas => {
            if (oneClas.id == school_class_id) {
                className = oneClas.grade_id + oneClas.name;
            }
        })
        return className
    }

    return (
        <div>
            <h1 className={"text-center display-4"}>Schüler</h1><Button className="w-100 p-3"
                                                                        onClick={() => setAddModalShow(true)}>Hinzufügen</Button>
            {students.length > 0 ? (
                <>
                    <ChoseModal
                        body={
                            <Modal.Body className={"d-flex justify-content-center gap-5"}>
                                <Button onClick={handleDelete}>Delete</Button>
                                <Button onClick={handleEdit}>Edit</Button>
                            </Modal.Body>}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                    <InfoModal
                        infoText={infoText}
                        show={InfoModalShow}
                        onHide={() => setInfoModalShow(false)}
                    />
                    <AddModal
                        body={<AddStudentForm schoolClasses={schoolClasses}/>}
                        footerFunc={closeAdd}
                        show={AddModalShow}
                        onHide={() => setAddModalShow(false)}
                    />
                    <EditModal
                        body={<EditStudentForm email={chosenUser!.email} birthday={chosenUser!.birthday}
                                               school_class_id={chosenUser!.student!.school_class_id.toString()}
                                               last_name={chosenUser!.last_name} name={chosenUser!.name}
                                               username={chosenUser!.username} schoolClasses={schoolClasses}/>}
                        footerFunc={closeEdit}
                        show={EditModalShow}
                        onHide={() => setEditModalShow(false)}
                    />

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Nachname</th>
                            <th>Username</th>
                            <th>Geburtstag</th>
                            <th>Klasse</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map((student, index) => (
                            <tr key={index} onClick={() => handleClick(student)}>
                                <td>{student.id}</td>
                                <td>{student.account.name}</td>
                                <td>{student.account.last_name}</td>
                                <td>{student.account.username}</td>
                                <td>{student.account.birthday}</td>
                                <td>{getClassName(student.school_class_id)}</td>
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

export default StudentsPage;