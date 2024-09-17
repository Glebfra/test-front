import React, {useEffect, useState} from "react";
import {Alert, Button, Card, FloatingLabel, Form} from "react-bootstrap";
import axios from "axios";

function Login() {
    const [data, setData] = useState({});
    const [isError, setIsError] = useState(false);

    const handleChange = ({currentTarget: input}) => {
        let newData = {...data};
        newData[input.name] = input.value;
        setData(newData);
    }

    const register = (props) => {
        axios.post(
            'http://localhost:1337/api/auth/local/register',
            data
        ).then(response => {
            const token = response.data.jwt;
            localStorage.setItem('token', token);
            window.location.href = '/';
        }).catch(error => {
            setIsError(true);
        })
    }

    return (
        <div className="justify-content-center text-center d-flex">
            <Card style={{width: "32rem"}} border="secondary" className="mt-5">
                <Card.Title className="mt-4">Register</Card.Title>
                <Card.Text className="mt-4">
                    <Form>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Username"
                            className="mb-3 mx-5"
                        >
                            <Form.Control
                                type="text"
                                onChange={e => handleChange(e)}
                                name='username'
                                placeholder="Username"
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3 mx-5"
                        >
                            <Form.Control
                                type="email"
                                onChange={e => handleChange(e)}
                                name='email'
                                placeholder="name@example.com"
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingPassword"
                            label="Password"
                            className="mb-3 mx-5"
                        >
                            <Form.Control
                                type="password"
                                onChange={e => handleChange(e)}
                                name='password'
                                placeholder="Password"
                            />
                        </FloatingLabel>
                        <Button className="pb-2 mb-4" variant="outline-success" onClick={register}>Register</Button>
                    </Form>
                </Card.Text>
                {isError ? (
                    <Alert variant='danger' dismissible onClose={() => setIsError(false)}>
                        <Alert.Heading>Register Error</Alert.Heading>
                        <p>
                            This email or username is already exist
                        </p>
                    </Alert>
                ) : (<> </>)}
            </Card>
        </div>
    )
}

export default Login;