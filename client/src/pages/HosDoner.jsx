import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import APIRequests from '../api';

const HosDoner = ({ donor, setUpdatedRec, setUpdatedRecLoading, setSelectedOrg}) => {
    const navigate = useNavigate();
    const ehr = donor.ehrData[0];
    // console.log("'''", donor)
    // console.log("'''''",ehr)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [selectedOrgan, setSelectedOrgan] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

    // Function to handle form submission
    const handleMatchmaking = async() => {
        // Check if both organ and expiry date are filled
        if (selectedOrgan && expiryDate) {
            // Perform matchmaking or other actions here
            console.log('Selected Organ:', selectedOrgan);
            console.log('Expiry Date:', expiryDate);
            setSelectedOrg(selectedOrgan)
            // setUpdatedRec('Helloooo')
            const res = await APIRequests.getMatches({ organ: selectedOrgan, expiry_hours: expiryDate });
            console.log(res.data);
            if (res.data.length === 0) {
                toast.error('No matches found!');
            }
            setUpdatedRec(res.data);
            setUpdatedRecLoading(false);
            handleClose();
        } else {
            // Display an error or alert message to the user
            toast.error('Please fill in both organ and expiry date fields.');
        }
    };

    const BMI = (weight, height) => {
        const bmi = ((weight / (height * height)) * 10000).toFixed(2);
        if (bmi < 18.5) {
            return `${bmi} (Underweight)`
        }
        else if (bmi >= 18.5 && bmi <= 24.9) {
            return `${bmi} (Normal)`
        }
        else if (bmi >= 25 && bmi <= 29.9) {
            return `${bmi} (Overweight)`
        }
        else if (bmi >= 30) {
            return `${bmi} (Obese)`
        }
    };

    return (
        <div className='w-full h-full flex flex-col items-center gap-4 mt-4 text-maroon'>
            <div className='text-2xl font-bold text-maroon flex items-center'>
                {donor.name}'s Details
            </div>
            <div className='w-full h-full flex flex-col items-center justify-start gap-4'>
                <div className='flex items-center justify-evenly gap-4 w-full'>
                    <div>
                        Name: <span className='font-bold'>{donor.name}</span>
                    </div>
                    <div>
                        Age: <span className='font-bold'>{donor.age}</span>
                    </div>
                    <div>
                        Blood Group: <span className='font-bold'>{donor.blood_group}</span>
                    </div>
                    <div>
                        Condition: <span className='font-bold'>{donor.availability ? 'Deceased' : 'Alive'}</span>
                    </div>
                </div>
                <div className='w-full flex items-center justify-evenly gap-4'>
                    <div>
                        BMI: <span className='font-bold'>{BMI(donor.weight, donor.height)}</span>
                    </div>
                    <div>
                        Gender: <span className='font-bold'>{donor.gender}</span>
                    </div>
                    <div>
                        Tel: <span className='font-bold'>{donor.phone}</span>
                    </div>
                </div>
                <div className='w-full text-center'>
                    Organs: {donor.organ.map((organ, index) => (
                        <span className='font-bold border p-1 px-2 mx-2 rounded-2xl text-sm text-white bg-maroon'>{organ.name} </span>
                    ))}
                </div>
                <div className='w-full text-center'>
                    Health History: {donor.health_history.map((history, index) => (
                        <span className='font-bold mx-2'>{history}</span>
                    ))}
                </div>
                <div className='w-full text-center font-bold'>
                    EHR: {ehr ? (
                        <div>
                            <div className='flex items-start justify-evenly mt-4 gap-4'>
                                <div className='font-semibold' >
                                    Allergies: {ehr.allergies.map((allergy, index) => (
                                        <span className='font-bold mx-2'>{allergy.substance} {allergy.active ? "(Active)" : "Inactive"}</span>
                                    ))}
                                </div>
                                <div className='font-semibold'>
                                    Medications: {ehr.medications.map((medication, index) => (
                                        <div className='font-bold'>
                                            <div>
                                                Medication {index + 1}: {medication.name}
                                            </div>
                                            <div>
                                                Dosage: {medication.dosage}
                                            </div>
                                            <div>
                                                Frequency: {medication.frequency}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='flex items-center justify-evenly mt-2 gap-4'>
                                <div className='font-semibold'>
                                    Surgeries: {ehr.surgeries.map((surgery, index) => (
                                        <div className='font-bold'>
                                            <div>
                                                Surgery {index + 1}: {surgery.name}
                                            </div>
                                            <div>
                                                Date: {formatDate(surgery.date)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='font-semibold'>
                                    Problems: {ehr.problems.map((problem, index) => (
                                        <div className='font-bold'>
                                            Problem {index + 1}: {problem.name} {problem.active ? "(Active)" : "Inactive"}
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    ) : (<>No EHR Data</>)}
                </div>
                {donor.availability && <div>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Edit Donor
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Are you sure you want to begin MatchMaking?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <div className='flex flex-col items-center justify-center gap-4'>
                                    <div className='w-full'>
                                        <label htmlFor='organ-select'>Select Organ:</label>
                                        <select
                                            id='organ-select'
                                            className='p-2 border rounded ml-2'
                                            name='organ'
                                            value={selectedOrgan}
                                            onChange={(e) => setSelectedOrgan(e.target.value)}
                                        >
                                            <option value='' disabled>Select an organ</option>
                                            {donor.organ.map((organ, index) => (
                                                <option key={index} value={organ.name}>
                                                    {organ.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Expiry Date Input */}
                                    <div className='w-full'>
                                        <label htmlFor='expiry-date'>Expiry Hours:</label>
                                        <input
                                            className='p-2 border rounded ml-2 w-1/4'
                                            type='number'
                                            id='expiry-date'
                                            name='expiryDate'
                                            value={expiryDate}
                                            onChange={(e) => setExpiryDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                            <Button onClick={handleMatchmaking} disabled={!selectedOrgan || !expiryDate}>
                                Begin MatchMaking
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>}
            </div>
        </div>
    );
};

export default HosDoner;