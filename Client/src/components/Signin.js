import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom'


function Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()
    const postData = () => {
        fetch("/signin", {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.error) {
                    alert("not found")
                }
                else {
                    history.push('/')
                }
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <div style={{ width: "50%", margin: "0 auto" }}>
            <center><h1>Sign In</h1></center>
            <Form >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
            </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" onClick={() => postData()}>
                    SignIn
                </Button>
                <h5>
                    <Link to='/signup'>Create An Account</Link>
                </h5>
            </Form>
        </div>
    )
}

export default Signin
