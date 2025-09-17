import React, { useState, useEffect, useRef } from 'react';
import EastIcon from '@mui/icons-material/East';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import APIRequests from '../../api';
import CircularProgress from '@mui/material/CircularProgress';
import Logo from '../../assets/Organ_logo.png';
import ReactToPrint, { useReactToPrint } from "react-to-print";

const DonorCard = () => {
    const [data, setData] = useState();
    const [parts, setParts] = useState([]);
    const [contacts, setContacts] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const componentRef = useRef();
    const user = JSON.parse(localStorage.getItem('profile'))
    const userType = user.type

    const handleExportPDF = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `${user.name}'s Organ Donor Card`,
    })

    useEffect(() => {
        const fetchData = async () => {
            const res = await APIRequests.getUser({ email: user.email, type: userType })
            console.log(res.data)
            setData(res.data)
            setParts(res.data.organ.map((part) => {
                return (
                    <div className='bg-maroon text-cream px-2.5 py-1 rounded-2xl'>
                        {part.name}
                    </div>
                )
            }))
            setContacts(res.data.witnesses.map((contact) => {
                return (
                    <div className='w-full flex items-center justify-evenly gap-4 mb-1'>
                        <div>
                            Name: <span className='font-bold'>{contact.name}</span>
                        </div>
                        <div>
                            Email: <span className='font-bold'>{contact.email}</span>
                        </div>
                        <div>
                            Tel: <span className='font-bold'>{contact.phone}</span>
                        </div>
                    </div>
                )
            }));
            setLoading(false)
        }
        fetchData()
    }, [])

    const DateConvert = (dateString) => {
        const inputDate = new Date(dateString);
        const day = String(inputDate.getDate()).padStart(2, '0');
        const month = String(inputDate.getMonth() + 1).padStart(2, '0');
        const year = String(inputDate.getFullYear()).slice(2, 4);

        return `${day}/${month}/${year}`;
    }


    return (
        <>
            {loading ?
                <CircularProgress color="secondary"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }} />
                :
                (
                    <div className='flex flex-col items-center justify-center gap-4 w-full'>
                        <div ref={componentRef} className='h-full w-full flex items-center justify-center'>
                            <div className='border rounded-xl bg-cream text-maroon p-2.5 w-card h-card flex flex-col items-center justify-start gap-2'>
                                <div className='text-2xl font-extrabold flex items-start gap-2'>
                                    Organ Donor Card <img src={Logo} alt="" width="30" />
                                </div>
                                <div className='font-semibold flex flex-col gap-2 w-full'>
                                    <div className='flex items-center justify-between gap-4 text-xl'>
                                        <div>
                                            Name: <span className='font-bold'>{data.name}</span>
                                        </div>
                                        <div>
                                            Blood Group: <span className='font-bold'>{data.blood_group}</span>
                                        </div>
                                        <div>
                                            DonorID: <span className='font-bold'>{data.phone}</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-evenly gap-4 text-xl'>
                                        <div>
                                            Age: <span className='font-bold'>{data.age}</span>
                                        </div>
                                        <div>
                                            Date of Issue: <span className='font-bold'>{DateConvert(data.date)}</span>
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-start gap-2'>
                                        <div className='font-bold text-center'>
                                            After my death, I wish to donate the following organ(s) of my body for medical treatment of others in need:
                                        </div>
                                        <div className='flex items-center justify-center flex-wrap w-full'>
                                            {parts}
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-center justify-between w-full gap-2'>
                                        <div>
                                            In Emergency, Contact:
                                        </div>
                                        <div className='flex flex-col w-full items-center justify-center'>
                                            {contacts}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div onClick={handleExportPDF}>
                            <button className='bg-maroon text-white text-lg font-medium py-2 px-4 rounded-lg flex items-center gap-2 transform transition-transform duration-300 ease-in-out hover:scale-105'>
                                Download Donor Card<FileDownloadIcon sx={{ color: "white" }} />
                            </button>

                        </div>
                    </div>)
            }
        </>
    );
};

export default DonorCard;