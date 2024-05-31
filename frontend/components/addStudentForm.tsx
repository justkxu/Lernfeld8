'use client'

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import {addUser} from "@/api/Users";
import {addStudentByUsername} from "@/api/getStudents";
import {Class} from "@/types/class";

interface Values {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    last_name: string;
    birthday: string;
    school_class_id: string;
}

interface Props {
    schoolClasses: Class[];
}

const AddStudentForm: React.FC<Props> = ({schoolClasses}) => {
    const [values, setValues] = useState<Values>({ username: '', email: '', password: '', confirmPassword: '', name: '', last_name: '', birthday: '', school_class_id: '' });
    const [error, setError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [infoText, setInfoText] = useState<String>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    function getClassName(school_class_id: number): string {
        let className = "";
        schoolClasses.forEach(oneClas => {
            if (oneClas.id == school_class_id) {
                className = oneClas.grade_id + oneClas.name;
            }
        })
        return className
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

        // Check if passwords match
        if (values.password !== values.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Check if email is valid
        if (!values.email.includes('@')) {
            setError('Invalid email');
            return;
        }

        setError(null);
        console.log(values);
        let payload: any = {
            "username": values.username,
            "password": values.password,
            "email": values.email,
            "name": values.name,
            "last_name": values.last_name,
            "birthday": values.birthday
        }
        const addUserResponse = await addUser(payload);
        payload={
            "school_class_id": values.school_class_id
        }
        const addStudentResponse = await addStudentByUsername(values.username, payload)

        if(addStudentResponse === 200 && addUserResponse === 200){
            setInfoText("Erfolgreich hinzugefügt!");
        }else if(addStudentResponse != 200 && addUserResponse === 200){
            setInfoText("Nutzer wurde erstellt, es gab ein Problem bei der Erstellung des Schülers");
        }else{
            setInfoText("Nutzer konnte nicht erstellt werden");
        }

        setIsSubmitted(true);
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

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Passwort</Form.Label>
                                <Form.Control type="password" placeholder="Passwort" name="password" value={values.password} onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <Form.Label>Passwort bestätigen</Form.Label>
                                <Form.Control type="password" placeholder="Passwort bestätigen" name="confirmPassword" value={values.confirmPassword} onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicBirthday">
                                <Form.Label>Geburtstag</Form.Label>
                                <Form.Control type="date" placeholder="Geburtstag" name="birthday" value={values.birthday} onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicClass">
                                <Form.Label>Klasse</Form.Label>
                                <Form.Select name="school_class_id" value={values.school_class_id} onChange={handleInputChange}>
                                    <option value="">Wählen Sie eine Klasse</option>
                                    {schoolClasses.map((schoolClass, index) => (
                                        <option key={index} value={schoolClass.id}>
                                            {getClassName(schoolClass.id)}
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