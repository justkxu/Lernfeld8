'use client'

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import {updateClassById} from "@/api/getClasses";
import {Teacher} from "@/types/teacher";


interface Values {
    name: string,
    grade_id: string,
    head_teacher_id: string,
    school_class_id: string,
}

interface Props {
    name: string,
    grade_id: string,
    head_teacher_id: string,
    school_class_id: string,
    teachers: Teacher[];
}

function EditStudentForm(props: Props) {
    const [values, setValues] = useState<Values>({name: props.name, grade_id: props.grade_id, head_teacher_id:props.head_teacher_id, school_class_id: props.school_class_id});
    const [error, setError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false); // New state variable
    const [infoText, setInfoText] = useState<String>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    function getTeacherName(teacher_id: number): string {
        let teacherName = "";
        props.teachers.forEach(oneTeacher => {
            if (oneTeacher.id == teacher_id) {
                teacherName = oneTeacher.account.name + oneTeacher.account.last_name;
            }
        })
        return teacherName
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        for (let key in values) {
            if (values[key as keyof Values] === '') {
                setError(`Please fill in the ${key} field.`);
                return;
            }
        }


        setError(null);
        console.log(values);
        let payload: any = {
            "id": values.school_class_id,
            "name": values.name,
            "grade_id": values.grade_id,
            "head_teacher_id": values.head_teacher_id,
        }
        const editSchoolClassResponse = await updateClassById(values.school_class_id, payload);

        if(editSchoolClassResponse === 200){
            setInfoText("Erfolgreich bearbeitet!")
        }else{
            setInfoText("Klasse konnte nicht bearbeitet werden");
        }

        setIsSubmitted(true);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Card className="w-100" style={{ maxWidth: '400px' }}>
                <Card.Body>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {isSubmitted ? (
                        <p>{infoText}</p> // Render success banner when form is submitted
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
                                    <option value="">{getTeacherName(Number(values.head_teacher_id))}</option>
                                    {props.teachers.map((teacher, index) => (
                                        <option key={index} value={teacher.id}>
                                            {getTeacherName(teacher.id)}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Button variant="secondary" type="submit" className="w-100">
                                Speichern
                            </Button>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditStudentForm;