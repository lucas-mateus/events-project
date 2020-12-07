import React, { useState, useMemo } from 'react';
import api from '../../services/api'
import { Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import cameraIcon from '../../assets/camera.png';
import './events.css';

export default function EventsPage({ history }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    const handleSubmit = async evt => {
        evt.preventDefault();

        const user_id = localStorage.getItem('user');
        const eventData = new FormData()
        eventData.append("thumbnail", thumbnail);
        eventData.append("date", date);
        eventData.append("category", category);
        eventData.append("title", title);
        eventData.append("price", price);
        eventData.append("description", description);

        try {
            if (title !== "" && date !== ""
                && category !== "" && description !== ""
                && price !== "" &&
                thumbnail !== null) {
                await api.post("/event/register", eventData, { headers: { user_id } })
            }else{
                setErrorMessage(true)
                setTimeout(()=>{
                    setErrorMessage(false)
                }, 4000)
            }
        } catch (error) {
            console.warn(error.message);
        }



    }


    return (
        <Container>
            <h4>Crie o seu Evento :)</h4>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Imagem para o evento:</Label>
                    <Label id="thumbnail" style={{ backgroundImage: `url(${preview})` }} className={thumbnail ? 'has.thumbnail' : ''}>
                        <Input type="file" name="thumbnail" onChange={(evt) => setThumbnail(evt.target.files[0])} />
                        <img src={cameraIcon} style={{ maxWidth: "50px" }} alt="Upload de imagem de evento" />
                    </Label>

                </FormGroup>


                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="title" className="mr-sm-2">Título:</Label>
                    <Input type="text" name="title" id="title" placeholder="Título do evento"
                        value={title} onChange={evt => setTitle(evt.target.value)} />
                </FormGroup>

                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="category" className="mr-sm-2">Categoria:</Label>
                    <Input type="text" name="category" id="category" placeholder="Categoria do evento"
                        value={category} onChange={evt => setCategory(evt.target.value)} />
                </FormGroup>

                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="date" className="mr-sm-2">Data:</Label>
                    <Input type="date" name="date" id="date" value={date}
                        onChange={evt => setDate(evt.target.value)} />
                </FormGroup>

                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="price" className="mr-sm-2">Preço:</Label>
                    <Input type="text" name="price" id="price" placeholder="Preço"
                        value={price} onChange={evt => setPrice(evt.target.value)} />
                </FormGroup>

                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="description">Breve descrição do evento:</Label>
                    <Input type="textarea" name="description" id="description" onChange={(evt) => setDescription(evt.target.value)} />
                </FormGroup>
                <Button type="submit" className="mt-2">Criar Evento</Button>
            </Form>
            {errorMessage ? (
                <Alert className="mt-2" color="danger">Formulário deve ser preenchido completamente</Alert>
            ): ""}
        </Container>
    )
}