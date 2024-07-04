/* eslint-disable */

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import React, { useState } from "react";
import api from '../../services/Api'
import { toast } from 'react-toastify';


const CreateUser = ({ direction }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone_number, setPhone] = useState('')
    const [admin, setAdmin] = useState(false)

    const [selectedFile, setSelectedFile] = useState(null);
    const [file, setFile] = useState();


    function handleChange(e) {
        setSelectedFile(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));

    }


    const register = async (event) => {
        event.preventDefault()
        let type = 'customer'
        if (admin) type = 'admin'
        const values = { name, email, password, phone_number, type }
        var data = new FormData();
        console.log(data)
        Object.keys(values).forEach((e) => {
            data.append(e, values[e]);
        });
        if (selectedFile) data.append("file", selectedFile);
        await api.post('/api/users/admin', data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(() => window.location.reload(false))
            .catch(error => {
                if (error.response.status !== 200) toast.warn('User already Exist')
            })



    }

    return (
        <Container>
            <h1>{direction == 'rtl' ? "تسجيل حساب" : "Register account"}</h1>
            <hr />

            <Form onSubmit={register}>

                <Form.Group className="mb-3" controlId="dfull_name">
                    <Form.Label>{direction == 'rtl' ? "الاسم" : "Name"}</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type="text"
                        placeholder={direction == 'rtl' ? "الاسم" : "Name"}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="demail">
                    <Form.Label>{direction == 'rtl' ? "البريد الالكتروني" : "Email address"}</Form.Label>
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        placeholder="example@mail.com"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="dpassword">
                    <Form.Label>{direction == 'rtl' ? "كلمة المرور" : "Password"}</Form.Label>
                    <Form.Control
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        placeholder="*****"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="dphone">
                    <Form.Label>{direction == 'rtl' ? "رقم الجوال" : "Phone Number"}</Form.Label>
                    <Form.Control
                        value={phone_number}
                        onChange={e => setPhone(e.target.value)}
                        type="text"
                        placeholder="+963912345678"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="file">
                    <Form.Label>{direction == 'rtl' ? "صورة شخصية" : "Profile image"}</Form.Label>
                    <Form.Control
                        name='file'
                        onChange={handleChange}
                        type="file"
                        placeholder="image.jpeg"
                    />
                    {(file) && <img
                        alt="Profile-image"
                        className="mt-2"
                        src={file}
                        width={150}
                        height={150}
                    />}
                </Form.Group>

                <Form.Group className="mb-3" controlId="isAdmin">
                    <Form.Check
                        value={!admin}
                        onChange={() => {
                            console.log(admin)
                            setAdmin(!admin)
                        }}
                        reverse={direction == 'rtl' ? true : false}
                        type="switch"
                        label={direction == 'rtl' ? "حساب مسؤول" : "Admin account"}
                    />

                </Form.Group>

                <Button variant="primary" type="submit" >
                    {direction == 'rtl' ? "إنشاء" : "Create"}
                </Button>

            </Form>
        </Container>
    );
}

export default CreateUser