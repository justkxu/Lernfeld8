'use client'

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import {addClass} from "@/api/getClasses";
import {Teacher} from "@/types/teacher";

interface Values {
    name: string,
    grade_id: string,
    head_teacher_id: string,
}

interface Props {
    teachers: Teacher[];
}

const AddStudentForm: React.FC<Props> = ({teachers}) => {
    const [values, setValues] = useState<Values>({name:'', grade_id:'', head_teacher_id:'' });
    const [error, setError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [infoText, setInfoText] = useState<String>("");


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    function getTeacherName(teacher_id: number): string {
        let teacherName = "";
        teachers.forEach(oneTeacher => {
            if (oneTeacher.id == teacher_id) {
                teacherName = oneTeacher.account.name + oneTeacher.account.last_name;
            }
        })
        return teacherName
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Check if all fields are filled
        for (let key in values) {
            if (values[key as keyof Values] === '') {
                setError(`Please fill in the ${key} field.`);
                return;
            }
        }

        setError(null);
        console.log(values);
        let payload: any = {
            "name": values.name,
            "grade_id": values.grade_id,
            "head_teacher_id": values.head_teacher_id,
        }
        const addSchoolClassResponse = await addClass(payload);

        if(addSchoolClassResponse === 200){
            setInfoText("Erfolgreich hinzugefügt!");
        }else{
            setInfoText("Klasse konnte nicht erstellt werden");
        }

        setIsSubmitted(true); // Set isSubmitted to true when form is submitted
    };

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Card className="w-100" style={{ maxWidth: '400px' }}>
                <Card.Body>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {isSubmitted ? (
                        <p>{infoText}</p>
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Klassen Name</Form.Label>
                                <Form.Control type="text" placeholder="Name eingeben" name="name" value={values.name} onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Klassen Stufe</Form.Label>
                                <Form.Control type="text" placeholder="Klassenstufe eingeben" name="grade_id" value={values.grade_id} onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicClass">
                                <Form.Label>Klassenlehrer</Form.Label>
                                <Form.Select name="head_teacher_id" value={values.head_teacher_id} onChange={handleInputChange}>
                                    <option value="">Wählen Sie einen Lehrer</option>
                                    {teachers.map((teacher, index) => (
                                        <option key={index} value={teacher.id}>
                                            {getTeacherName(teacher.id)}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Button variant="secondary" type="submit" className="w-100">
                                Hinzufügen
                            </Button>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddStudentForm;