import React, {useState} from "react";
import {Button, Card} from "react-bootstrap";
import axios from "axios";

function ProductCard({id, title, image, price, userProducts = []}) {
    const [isOnCart, setIsOnCart] = useState(false);
    const [isLogged, setIsLogged] = useState(localStorage.getItem('token') != null);

    const addOnCart = () => {
        axios.post(
            'http://localhost:1337/api/cart/add',
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
            console.log(error.status);
        })
    }

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
            {isLogged ? (
                isOnCart ? (
                    <Button variant='outline-danger' className='d-flex p-3 mb-3' onClick={deleteFromCart}>Delete from
                            cart</Button>
                ) : (
                    <Button variant='outline-success' className='d-flex p-3 mb-3' onClick={addOnCart}>Add to
                            cart</Button>
                )
            ) : (
                <Button variant='outline-success' className='d-flex p-3 mb-3' href='/login/'>Login</Button>
            )}
        </Card>
    )
}

export default ProductCard;