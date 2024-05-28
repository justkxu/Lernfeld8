'use client'

import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {getTeachers} from "@/api/getTeacher";
import {Teacher} from "@/types/teacher";

const TeachersPage = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const [isLoading, setIsLoading] = useState(false);

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
            <h1 className={"text-center display-4"}>Lehrer</h1>
            {teachers.length > 0 ? (
                <>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Nachname</th>
                            <th>Nutzername</th>
                            <th>Geburtstag</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map((teacher, index) => (
                            <tr key={index}>
                                <td>{teacher.id}</td>
                                <td>{teacher.account.name}</td>
                                <td>{teacher.account.last_name}</td>
                                <td>{teacher.account.username}</td>
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