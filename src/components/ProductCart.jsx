import React from "react";
import {Button, Card} from "react-bootstrap";
import axios from "axios";

function ProductCart({id, title, image, price}) {
    const deleteFromCart = () => {
        axios.post(
            'http://localhost:1337/api/cart/delete',
            {
                id: id
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <Card className='d-flex align-items-center' style={{width: '18rem'}}>
            <Card.Title className='m-3'>{title}</Card.Title>
            <Card.Img variant='top' src={image} style={{width: 200, height: 200, borderRadius: 30}}></Card.Img>
            <Card.Body>
                <Card.Text>Price: {price}</Card.Text>
            </Card.Body>
            <Button variant='outline-danger' className='d-flex p-3 mb-3' onClick={deleteFromCart}>Delete from
                cart</Button>
        </Card>
    )
}

export default ProductCart;