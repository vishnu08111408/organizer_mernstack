import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import RecForm from './RecForm';
import DonForm from './DonForm';    
import HosForm from './HosForm';
import Logo from '../../assets/Organ_logo.png';

const Register = () => {
    const [value, setValue] = useState('1');
    const [title, setTitle] = useState("Register as Recipient");

    useEffect(() => {
        if (value === '1') {
            setTitle('Register as a Recipient');
        } else if (value === '2') {
            setTitle('Register as a Donor');
        } else {
            setTitle('Register as a Hospital');
        }
    }, [value]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='w-full h-screen flex flex-col items-center'>
            <div onClick={() => {
                window.location.pathname = '/login'
            }} className='bg-lg-pink text-maroon text-3xl font-bold w-full text-center pt-8 pb-4 flex items-center justify-center gap-2'>
                <div>
                    <img 
                    src={Logo}
                    alt="" 
                    width="40"
                    />
                </div>
                <div>
                {title}
                </div>
            </div>
            <Box sx={{ width: '100%', height: "100%", overflowY: "scroll",typography: 'body1' }}>
                <TabContext sx={{ }} value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList value={value}
                            onChange={handleChange}
                            sx={{
                                '& .MuiTabs-indicator': {
                                    backgroundColor: '#3D0C11',
                                },
                                '& .MuiTab-root': {
                                    color: '#3D0C11',
                                    fontWeight: 'bold',
                                    padding: "0 4rem",
                                    letterSpacing: '0.1rem',
                                    fontSize: '1rem',
                                },

                                '& .Mui-selected': {
                                    color: "#3D0C11",
                                },
                                backgroundColor: '#ffadbe',
                            }}
                            aria-label="secondary tabs example"
                            centered>
                            <Tab sx={{
                                color: '#3D0C11 !important',
                            }} label="Recipient" value="1" />
                            <Tab sx={{
                                color: '#3D0C11 !important',
                            }} label="Donor" value="2" />
                            <Tab sx={{
                                color: '#3D0C11 !important',
                            }} label="Hospital" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"><RecForm /></TabPanel>
                    <TabPanel value="2"><DonForm /></TabPanel>
                    <TabPanel value="3"><HosForm /></TabPanel>
                </TabContext>
            </Box>
        </div>
    );
};

export default Register;