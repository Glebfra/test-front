import React, {useState} from "react";
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

    const login = (props) => {
        console.log(props)
        axios.post(
            'http://localhost:1337/api/auth/local/',
            data
        ).then(response => {
            const token = response.data.jwt;
            localStorage.setItem('token', token);
            window.location.href = '/';
        }).catch(error => {
            setIsError(true);
        });
    }

    return (
        <div className="justify-content-center text-center d-flex">
            <Card style={{width: "32rem"}} border="secondary" className="mt-5">
                <Card.Title className="mt-4">Login</Card.Title>
                <Card.Text className="mt-4">
                    <Form>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3 mx-5"
                        >
                            <Form.Control
                                type="email"
                                onChange={e => handleChange(e)}
                                name='identifier'
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
                        <Button className="pb-2 mb-4" variant="outline-success" onClick={login}>Log in</Button>
                    </Form>
                </Card.Text>
                {isError ? (
                    <Alert variant='danger' dismissible onClose={() => setIsError(false)}>
                        <Alert.Heading>Login Error</Alert.Heading>
                        <p>
                            Email or password is invalid
                        </p>
                    </Alert>
                ) : (<> </>)}
            </Card>
        </div>
    )
}

export default Login;