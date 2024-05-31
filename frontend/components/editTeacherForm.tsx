'use client'

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import {updateUserByUsername} from "@/api/Users";
import {updateTeacherByUsername} from "@/api/getTeacher";

interface Values {
    username: string;
    email: string;
    name: string;
    last_name: string;
    birthday: string;
    abbreviation: string;
}

function EditTeacherForm(props: Values) {
    const [values, setValues] = useState<Values>({ username: props.username, email: props.email, name: props.name, last_name: props.last_name, birthday: props.birthday, abbreviation: props.abbreviation});
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
        let editUserResponse  = await updateUserByUsername(username, payload)

        payload = {
            "abbreviation": values.abbreviation,
        }
        let editTeacherResponse  = await updateTeacherByUsername(values.username, payload)

        if(editTeacherResponse === 200 && editUserResponse === 200){
            setInfoText("Erfolgreich Bearbeitet!");
        }else if(editTeacherResponse != 200 && editUserResponse === 200){
            setInfoText("Nutzer wurde bearbeitet, es gab ein Problem bei der Bearbeitung des Lehrers");
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

                            <Form.Group className="mb-3" controlId="formBasicBirthday">
                                <Form.Label>Geburtstag</Form.Label>
                                <Form.Control type="date" placeholder="Geburtstag" name="birthday" value={values.birthday} onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicClass">
                                <Form.Label>Abkürzung</Form.Label>
                                <Form.Control type="text" placeholder="Kürzel" name="abbreviation" value={values.abbreviation} onChange={handleInputChange} />
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

export default EditTeacherForm;