import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Box,
    Container
} from '@mui/material';
import APIRequests from '../../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MuiOtpInput } from 'mui-one-time-password-input';


export default function VerifyEmailForm({ open, handleClose, email, type }) {
    const [pin, setPin] = useState("");
    const navigate = useNavigate();

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                email: email,
                otp: pin,
                type: type,
            };
            const res = await APIRequests.verifyOTP(data);
            if (res.status === 200) {
                localStorage.setItem("isIn", 'true');
                localStorage.setItem("profile", JSON.stringify(res.data));
                toast.success('Login Successful!');
                await timeout(2000);
                if (type === 'hospital') {
                    window.location.pathname = '/transplant'

                }
                else {

                    window.location.pathname = '/home'
                }
            }
            handleClose();
        } catch (error) {
            console.error(error);
            toast.error('Invalid OTP!');
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} sx={{
            '& .MuiDialog-paper': {
                backdropFilter: 'blur(15px)',
                backgroundColor: 'rgba(148, 245, 221, 0.1)', // Using rgba to give it a translucent effect
                borderRadius: '20px',   
                color: 'white',
            }
        }}>
            <DialogTitle>Verify your Email</DialogTitle>
            <DialogContent>
                <Container maxWidth="sm">
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" spacing={2}>
                        <Typography variant="body1">
                            We have sent a code to your email:
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                            {email}
                        </Typography>
                        <MuiOtpInput
                            value={pin}
                            onChange={setPin}
                            length={6}
                            variant="outlined"
                            TextFieldsProps={{ placeholder: '-' }}
                            color={'white'}
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '& .MuiOutlinedInput-input': {
                                    color: 'white',
                                },
                            }}
                        />
                        <Button
                            fullWidth
                            variant="outlined"
                            // color="primary"

                            onClick={handleSubmit}
                            sx={{ marginTop: 3,
                                color: 'white',
                                borderColor: 'white',
                                ":hover": {
                                    backgroundColor: 'white',
                                    color: 'black', 
                                }
                            }}
                        >
                            Verify
                        </Button>
                    </Box>
                </Container>
            </DialogContent>
            {/* <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions> */}
        </Dialog>
    );
}
