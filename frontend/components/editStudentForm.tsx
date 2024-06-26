'use client'

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import {updateUserByUsername} from "@/api/Users";
import {updateStudentByUsername} from "@/api/getStudents";
import {Class} from "@/types/class";
import {number} from "prop-types";

interface Values {
    username: string;
    email: string;
    name: string;
    last_name: string;
    birthday: string;
    school_class_id: string;
}

interface Props {
    username: string;
    email: string;
    name: string;
    last_name: string;
    birthday: string;
    school_class_id: string;
    schoolClasses: Class[];
}

function EditStudentForm(props: Props) {
    const [values, setValues] = useState<Values>({ username: props.username, email: props.email, name: props.name, last_name: props.last_name, birthday: props.birthday, school_class_id: props.school_class_id});
    const [username] = useState<string>(props.username);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false); // New state variable
    const [infoText, setInfoText] = useState<String>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    function getClassName(school_class_id: number): string {
        let className = "";
        props.schoolClasses.forEach(oneClas => {
            if (oneClas.id == school_class_id) {
                className = oneClas.grade_id + oneClas.name;
            }
        })
        return className
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
            "username": values.username,
            "email": values.email,
            "name": values.name,
            "last_name": values.last_name,
            "birthday": values.birthday
        }
        const editUserResponse  = await updateUserByUsername(username, payload)

        payload = {
            "school_class_id": values.school_class_id,
        }
        const editStudentResponse  = await updateStudentByUsername(values.username, payload)

        if(editStudentResponse === 200 && editUserResponse === 200){
            setInfoText("Erfolgreich Bearbeitet!");
        }else if(editStudentResponse != 200 && editUserResponse === 200){
            setInfoText("Nutzer wurde bearbeitet, es gab ein Problem bei der Bearbeitung des Schülers");
        }else{
            setInfoText("Nutzer konnte nicht bearbeitet werden");
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
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Name eingeben" name="name" value={values.name} onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                <Form.Label>Nachname</Form.Label>
                                <Form.Control type="text" placeholder="Nachname eingeben" name="last_name" value={values.last_name} onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Benutzername</Form.Label>
                                <Form.Control type="text" placeholder="Benutzernamen eingeben" name="username" value={values.username} onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email eingeben" name="email" value={values.email} onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicBirthday">
                                <Form.Label>Geburtstag</Form.Label>
                                <Form.Control type="date" placeholder="Geburtstag" name="birthday" value={values.birthday} onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicClass">
                                <Form.Label>Klasse</Form.Label>
                                <Form.Select name="school_class_id" value={values.school_class_id} onChange={handleInputChange}>
                                    <option value="">{getClassName(Number(values.school_class_id))}</option>
                                    {props.schoolClasses.map((schoolClass, index) => (
                                        <option key={index} value={schoolClass.id}>
                                            {getClassName(schoolClass.id)}
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