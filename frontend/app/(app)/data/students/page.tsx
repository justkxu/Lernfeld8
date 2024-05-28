'use client'

import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Student} from "@/types/student";
import {getStudents} from "@/api/getStudents";

const StudentsPage = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getStudent = async () => {
            setIsLoading(true);
            const student: Student[] = await getStudents();
            setStudents(student);
            setIsLoading(false);
        }
        getStudent();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = students.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(students.length / itemsPerPage);

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
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div style={{ width: '3rem', height: '3rem' }}>
                    <Spinner animation="border" role="status" style={{ width: '100%', height: '100%' }}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className={"text-center display-4"}>Schüler</h1>
            {students.length > 0 ? (
                <>
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
                            <tr key={index}>
                                <td>{student.id}</td>
                                <td>{student.account.name}</td>
                                <td>{student.account.last_name}</td>
                                <td>{student.account.username}</td>
                                <td>{student.account.birthday}</td>
                                <td>{student.school_class_id}</td>
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