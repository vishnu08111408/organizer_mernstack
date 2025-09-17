import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Logo from '../../assets/Organ_logo.png'

const NavB = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorNEl, setAnchorNEl] = useState(null);
    const nOpen = Boolean(anchorNEl)
    const Open = Boolean(anchorEl)
    const user = JSON.parse(localStorage.getItem('profile')) || null
    const userType = user && user.type 
    const [showNav, setShowNav] = useState(true)
    const [room, setRoom] = useState(null);
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);

    const handleSubmit = () => {
        console.log('Room ID: ', room);
        if (room) {
            window.location.pathname = `/chat/${room}`
        }
    };

    const toggle1 = () => {
        console.log('Toggle 1 called');
        setModal1(!modal1);
    };
    
    const toggle2 = () => {
        console.log('Toggle 2 called');
        setModal2(!modal2);
    };

    const currPath = window.location.pathname

    // console.log(currPath)

    useEffect(() => {
        if (currPath === '/login' || currPath === '/register' || currPath.startsWith('/chat')) {
            setShowNav(false)
        }
    },[currPath])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNClick = (event) => {
        setAnchorNEl(event.currentTarget);
    };

    const handleNClose = () => {
        setAnchorNEl(null);
    };

    const handleLogout = () => {
        localStorage.clear()
        window.location.pathname = '/login'
    }

    const navigateTo = (path) => {
        window.location.pathname = path
    }

    if (!showNav) {
        return null
    }

    return (
        <Navbar collapseOnSelect expand="lg" sticky='top' variant="light" className='bg-dark-purple shadow-my-shadow'>
            <Container>
                <Navbar.Brand onClick={() => {
                    if (userType === 'hospital') {
                        navigateTo('/transplant')
                    } else {
                    navigateTo('/home')
                    }
                    }} className="nav-title" style={{ cursor: "pointer", fontWeight: "700" }}>
                    <img
                        src={Logo}
                        style={{ marginRight: "10px" }}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                    ORGANizer
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                {userType === 'hospital' ?
                    <Nav className="me-auto">
                        <Nav.Link
                            onClick={() => navigateTo('/transplant')}
                            style={{
                                fontWeight: currPath === '/transplant' ? '700' : '400',
                            }} >
                            Transplant
                        </Nav.Link>
                        <Nav.Link onClick={handleNClick}>
                            Chat
                        </Nav.Link>
                        <Menu
                            id='demo-positioned-menu'
                            aria-labelledby='demo-positioned-button'
                            anchorEl={anchorNEl}
                            open={nOpen}
                            onClose={handleNClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            MenuListProps={{
                                'aria-labelledby': 'demo-positioned-button',
                            }}
                        >
                            <MenuItem onClick={toggle1}><PersonIcon sx={{ marginRight: 1 }} />Join Room</MenuItem>
                            <MenuItem onClick={toggle2}><LogoutIcon sx={{ marginRight: 1 }} />Create Room</MenuItem>
                        </Menu>
                    </Nav>
                 : <Nav className="me-auto">
                       <Nav.Link
                            onClick={() => navigateTo('/home')}
                            style={{
                                fontWeight: currPath === '/home' ? '700' : '400',
                            }} >
                            Home
                        </Nav.Link>
                        {userType === 'recipient' && <Nav.Link
                            onClick={() => navigateTo('/application')}
                            style={{
                                fontWeight: currPath === '/application' ? '700' : '400',
                            }}>
                            Application
                        </Nav.Link>}
                        {userType === 'recipient' &&  
                        <>
                        <Nav.Link onClick={handleNClick}>
                            Chat
                        </Nav.Link>
                        <Menu
                            id='demo-positioned-menu'
                            aria-labelledby='demo-positioned-button'
                            anchorEl={anchorNEl}
                            open={nOpen}
                            onClose={handleNClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            MenuListProps={{
                                'aria-labelledby': 'demo-positioned-button',
                            }}
                        >
                            <MenuItem onClick={toggle1}><PersonIcon sx={{ marginRight: 1 }} />Join Room</MenuItem>
                            <MenuItem onClick={toggle2}><LogoutIcon sx={{ marginRight: 1 }} />Create Room</MenuItem>
                        </Menu>
                        </>
                        }
                        {userType === 'donor' && <Nav.Link
                            onClick={() => navigateTo('/donorcard')}
                            style={{
                                fontWeight: currPath === '/donorcard' ? '700' : '400',
                            }}>
                            Donor Card
                        </Nav.Link>}
                        <Nav.Link
                            onClick={() => navigateTo('/hospitals')}
                            style={{
                                fontWeight: currPath === '/hospitals' ? '700' : '400',
                            }}>
                            Find Hospitals
                        </Nav.Link>
                    </Nav>}

                    <Nav className='flex justify-start ms-auto items-start'>
                        <Nav.Link>
                            <div>
                                <IconButton onClick={handleClick} className='flex gap-4'>
                                    <div className='flex items-center'>
                                        <img
                                            className='profile-photo'
                                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                            alt="profile"
                                            width="35" />
                                        <ArrowDropDownIcon className='text-blue' />
                                    </div>
                                </IconButton>
                                <Menu
                                    id='demo-positioned-menu'
                                    aria-labelledby='demo-positioned-button'
                                    anchorEl={anchorEl}
                                    open={Open}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    MenuListProps={{
                                        'aria-labelledby': 'demo-positioned-button',
                                    }}
                                >
                                    <MenuItem onClick={() => navigateTo('/profile')}><PersonIcon sx={{ marginRight: 1 }} />View Profile</MenuItem>
                                    <MenuItem onClick={handleLogout}><LogoutIcon sx={{ marginRight: 1 }} />Logout</MenuItem>
                                </Menu>
                            </div>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <Modal style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'

            }} isOpen={modal1} toggle={toggle1}>
                        <ModalHeader toggle={toggle1}>Enter Room ID to Join</ModalHeader>
                        <ModalBody>
                            <label>
                                Room ID:
                                <input
                                    className='ml-4 w-3/2 border h-12 p-2.5 rounded-md'
                                    type="text"
                                    placeholder="Room ID"
                                    value={room}
                                    onChange={(e) => setRoom(e.target.value)}
                                />
                            </label>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" style={{ color: "black" }} onClick={handleSubmit}>
                                Join Room
                            </Button>{' '}
                            <Button color="secondary" style={{ color: "black" }} onClick={toggle1}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                    <Modal style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
                
            }} isOpen={modal2} toggle={toggle2}>
                        <ModalHeader toggle={toggle2}>Enter Room ID to Create a Room</ModalHeader>
                        <ModalBody>
                            <label>
                                Room ID:
                                <input
                                    className='ml-4 w-3/2 border h-12 p-2.5 rounded-md'
                                    type="text"
                                    placeholder="Room ID"
                                    value={room}
                                    onChange={(e) => setRoom(e.target.value)}
                                />
                            </label>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" style={{ color: "black" }} onClick={handleSubmit}>
                                Create Room
                            </Button>{' '}
                            <Button color="secondary" style={{ color: "black" }} onClick={toggle2}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
        </Navbar>
    );
};

export default NavB;