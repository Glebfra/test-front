import {Button, Nav, Navbar} from "react-bootstrap";
import {useState} from "react";

function Menu() {
    const [isLogged, setIsLogged] = useState(localStorage.getItem('token') != null);

    const handleLogin = () => {
        window.location.href = '/login/'
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLogged(false);
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary py-3 mb-3" sticky="top" style={{borderRadius: 20}}>
            <Navbar.Brand className='ms-3' href="/">Cart API</Navbar.Brand>
            <div className='vr mx-2'/>
            <Navbar.Collapse>
                <Nav className='align-items-center me-auto'>
                    <Nav.Link className='ms-2' href='/cart/'>Cart</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            {
                isLogged ? (
                    <div className='me-4 d-flex'>
                        <Button className='mx-2' variant='outline-danger' onClick={handleLogout}>Log out</Button>
                    </div>
                ) : (
                    <div className='me-4'>
                        <Button variant='outline-success' onClick={handleLogin}>Login</Button>
                    </div>
                )
            }
        </Navbar>
    )
}

export default Menu