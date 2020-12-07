import React, { useState } from 'react';
import api from '../../services/api'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function Register({ history }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async evt => {
        evt.preventDefault();
        const response = await api.post('/user/register', { firstName, lastName, email, password });
        const userId = response.data._id || false;

        if (userId) {
            localStorage.setItem('user', userId);
            console.log(userId)
            history.push('/dashboard');
        } else {
            const { message } = response.data;
            console.log(message);
        }
    }


    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="firstName" className="mr-sm-2">Nome</Label>
                <Input type="text" name="firstName" id="firstName" placeholder="Seu nome"
                    onChange={evt => setFirstName(evt.target.value)} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="lastName" className="mr-sm-2">Sobrenome</Label>
                <Input type="text" name="lastName" id="lastName" placeholder="Seu sobrenome"
                    onChange={evt => setLastName(evt.target.value)} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="email" className="mr-sm-2">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Seu email"
                    onChange={evt => setEmail(evt.target.value)} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="password" className="mr-sm-2">Senha</Label>
                <Input type="password" name="password" id="password" placeholder="Senha"
                    onChange={evt => setPassword(evt.target.value)} />
            </FormGroup>
            <Button className="mt-2">Submit</Button>
        </Form>
    )
}