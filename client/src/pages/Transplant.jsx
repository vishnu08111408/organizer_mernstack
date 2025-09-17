import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import APIRequests from '../api';
import CircularProgress from '@mui/material/CircularProgress';
import EHRTest from './EHR';
import HosDoner from './HosDoner';
import { toast } from 'react-toastify';

const Transplant = () => {
    const [donors, setDonors] = useState([]);
    const [recipients, setRecipients] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryRec, setSearchQueryRec] = useState('');
    const [EHR, setEHR] = useState([]);
    const [donorLoading, setDonorLoading] = useState(true);
    const [recipientLoading, setRecipientLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updatedRec, setUpdatedRec] = useState([]);
    const [updatedRecLoading, setUpdatedRecLoading] = useState(true);
    const [selectedOrgan, setSelectedOrgan] = useState(null);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    const getData = async () => {
        const dnr = await APIRequests.getDonors();
        setDonors(dnr.data);
        setEHR(dnr.data.ehr);
        setDonorLoading(false);
        // console.log(dnr.data);

        const rcpnts = await APIRequests.getRecipients();
        setRecipients(rcpnts.data);
        console.log(rcpnts.data)
        setRecipientLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    const handleRec = async (recVer, doNor) => {
        const data = {
            receiverID: recVer._id,
            donorID: doNor._id,
            organ: selectedOrgan,
        }
        console.log(data)
        try {
            const res = await APIRequests.matchOrgan(data);
            console.log(res.data);
            if (res.status === 200) {
                toast.success(res.data.message);
                await timeout(2000)
                window.location.reload();
            }
            else {
                toast.error("Error Occured");
                await timeout(2000)
                window.location.reload();
            }
            
        } catch (error) {
            console.log(error)
        }

    };

    // Filter donors or recipients based on search query
    const filteredData = (data) => {
        return data.filter((item) => {
            const isIdMatch = item.phone && item.phone.toString().includes(searchQuery);
            const isNameMatch = item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase());

            return isIdMatch || isNameMatch;
        });
    };

    const filteredDataRec = (data) => {
        return data.filter((item) => {
            const isIdMatch = item.phone && item.phone.toString().includes(searchQueryRec);
            const isNameMatch = item.name && item.name.toLowerCase().includes(searchQueryRec.toLowerCase());

            return isIdMatch || isNameMatch;
        });
    };

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }


    const renderUserList = (data) => (
        <div className='w-full h-screen overflow-y-scroll mb-24'>
            {filteredData(data).map((user, index) => (
                <div className='w-full flex items-center justify-between border my-2 rounded-xl p-2' key={index}>
                    <div className='text-xl font-bold text-maroon'>{user && user.phone}</div>
                    <div className='text-xl font-bold text-maroon'>{user && user.name}</div>
                    <div
                        onClick={() => {
                            setSelectedUser(user);
                        }}
                        className='border p-1 px-2 rounded-2xl text-sm font-bold text-white bg-maroon cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105'
                    >
                        View Details
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className='h-screen w-full flex overflow-y-scroll'>
            <div className='w-1/2 h-screen border overflow-y-scroll flex flex-col gap-4'>
                {selectedUser ? (
                    <HosDoner setSelectedOrg={setSelectedOrgan} setUpdatedRecLoading={setUpdatedRecLoading} setUpdatedRec={setUpdatedRec} donor={selectedUser} setSelectedUser={setSelectedUser} />
                ) : (
                    <>
                        <div className='w-full mt-4 text-center text-2xl font-bold'>
                            List of all Registered Donors
                        </div>
                        <div className='flex flex-col h-screen overflow-y-scroll'>
                            <input
                                type='text'
                                placeholder='Search by ID or Name'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='p-2 w-3/4 mb-4 border rounded self-center'
                            />
                            {donorLoading ? (
                                <div className='w-full h-full grid place-items-center'>
                                    <CircularProgress color='secondary' />
                                </div>
                            ) : (
                                renderUserList(donors)
                            )}
                        </div>
                    </>
                )}
            </div>
            <div className='w-1/2 border overflow-y-scroll flex flex-col gap-4'>
                {updatedRec.length > 0 ?
                    (<>
                        <div className='w-full mt-4 text-center text-2xl font-bold'>
                            List of Matched Recipients
                        </div>
                        <div className='flex flex-col h-screen overflow-y-scroll'>
                            {updatedRecLoading ? (
                                <div className='w-full h-full grid place-items-center'>
                                    <CircularProgress color='secondary' />
                                </div>
                            ) : (
                                <div className='mx-2'>
                                    {updatedRec.map((recipient, index) => (
                                        <Accordion
                                            key={index}
                                            expanded={expanded === `panel${index}`}
                                            onChange={handleChange(`panel${index}`)}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls={`panel${index}bh-content`}
                                                id={`panel${index}bh-header`}
                                            >
                                                <Typography sx={{ width: '33%', flexShrink: 0, fontSize: "1rem" }}>
                                                    {recipient.name}
                                                </Typography>
                                                <Typography sx={{ color: 'text.secondary' }}>
                                                    {recipient.phone}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                <div className='w-full h-full flex flex-col items-center gap-2'>
                                                        <div className='flex items-center justify-centersd gap-4'>
                                                            <div>
                                                                Condition: <span className='font-bold'>{recipient.condition}</span>
                                                            </div>
                                                            <div>
                                                                Age: <span className='font-bold'>{recipient.age}</span>
                                                            </div>
                                                            <div>
                                                                Blood Group: <span className='font-bold'>{recipient.blood_group}</span>
                                                            </div>
                                                            <div>
                                                                Gender: <span className='font-bold'>{recipient.gender
                                                                }</span>
                                                            </div>
                                                        </div>
                                                        <div className='flex items-center justify-between w-3/4'>
                                                            <div>
                                                            Organ(s): {recipient.organ.map((organ, index) => (
                                                                <span className={`font-bold mx-2 ${organ.status !== "accepted" ? "bg-maroon" : "bg-white" }  text-white p-1 rounded-2xl`}>{organ.status !== "accepted" && organ.name}</span>
                                                            ))}
                                                            </div>
                                                            <div className='flex items-center justify-center gap-2'>
                                                                <div onClick={async () => {
                                                                    toast.success("Notificatio Sent to recipient");
                                                                    await timeout(2000);
                                                                    window.location.reload();
                                                                    handleRec(recipient, selectedUser);
                                                                }} className='border p-1 mx- rounded-lg bg-green text-white cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105'>

                                                                    Accept
                                                                </div>
                                                                <div className='border p-1 mx- rounded-lg bg-red text-white cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105'>

                                                                    Reject
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                        <div className='w-full text-center font-bold'>
                                                            EHR: {recipient.ehrData[0] ? (
                                                                <div>
                                                                    <div className='flex items-start justify-evenly mt-4 gap-4'>
                                                                        <div className='font-semibold' >
                                                                            Allergies: {recipient.ehrData[0].allergies.map((allergy, index) => (
                                                                                <span className='font-bold mx-2'>{allergy.substance} {allergy.active ? "(Active)" : "Inactive"}</span>
                                                                            ))}
                                                                        </div>
                                                                        <div className='font-semibold'>
                                                                            Medications: {recipient.ehrData[0].medications.map((medication, index) => (
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
                                                                            Surgeries: {recipient.ehrData[0].surgeries.map((surgery, index) => (
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
                                                                            Problems: {recipient.ehrData[0].problems.map((problem, index) => (
                                                                                <div className='font-bold'>
                                                                                    Problem {index + 1}: {problem.name} {problem.active ? "(Active)" : "Inactive"}
                                                                                </div>
                                                                            ))}

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (<>No EHR Data</>)}
                                                        </div>
                                                    </div>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>)
                    :
                    (<>
                        <div className='w-full mt-4 text-center text-2xl font-bold'>
                            List of all Registered Recipients
                        </div>
                        <div className='flex flex-col h-screen overflow-y-scroll'>
                            <input
                                type='text'
                                placeholder='Search by ID or Name'
                                value={searchQueryRec}
                                onChange={(e) => setSearchQueryRec(e.target.value)}
                                className='p-2 w-3/4 mb-4 border rounded self-center'
                            />
                            {recipientLoading ? (
                                <div className='w-full h-full grid place-items-center'>
                                    <CircularProgress color='secondary' />
                                </div>
                            ) : (
                                <div className='mx-2'>
                                    {/* filter data */}
                                    {filteredDataRec(recipients).map((recipient, index) => (
                                        <Accordion
                                            key={index}
                                            expanded={expanded === `panel${index}`}
                                            onChange={handleChange(`panel${index}`)}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls={`panel${index}bh-content`}
                                                id={`panel${index}bh-header`}
                                            >
                                                <Typography sx={{ width: '33%', flexShrink: 0, fontSize: "1rem" }}>
                                                    {recipient.name}
                                                </Typography>
                                                <Typography sx={{ color: 'text.secondary' }}>
                                                    {recipient.phone}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    <div className='w-full h-full flex flex-col items-center gap-2'>
                                                        <div className='flex items-center justify-centersd gap-4'>
                                                            <div>
                                                                Condition: <span className='font-bold'>{recipient.condition}</span>
                                                            </div>
                                                            <div>
                                                                Age: <span className='font-bold'>{recipient.age}</span>
                                                            </div>
                                                            <div>
                                                                Blood Group: <span className='font-bold'>{recipient.blood_group}</span>
                                                            </div>
                                                            <div>
                                                                Gender: <span className='font-bold'>{recipient.gender
                                                                }</span>
                                                            </div>
                                                        </div>
                                                        <div className='flex items-center justify-between w-3/4'>
                                                            <div>
                                                            Organ(s): {recipient.organ.map((organ, index) => (
                                                                <span className={`font-bold mx-2 ${organ.status !== "accepted" ? "bg-maroon" : "bg-white" }  text-white p-1 rounded-2xl`}>{organ.status !== "accepted" && organ.name}</span>
                                                            ))}
                                                            </div>
                                                           
                                                        </div>
                                                        <div className='w-full text-center font-bold'>
                                                            EHR: {recipient.ehrData[0] ? (
                                                                <div>
                                                                    <div className='flex items-start justify-evenly mt-4 gap-4'>
                                                                        <div className='font-semibold' >
                                                                            Allergies: {recipient.ehrData[0].allergies.map((allergy, index) => (
                                                                                <span className='font-bold mx-2'>{allergy.substance} {allergy.active ? "(Active)" : "Inactive"}</span>
                                                                            ))}
                                                                        </div>
                                                                        <div className='font-semibold'>
                                                                            Medications: {recipient.ehrData[0].medications.map((medication, index) => (
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
                                                                            Surgeries: {recipient.ehrData[0].surgeries.map((surgery, index) => (
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
                                                                            Problems: {recipient.ehrData[0].problems.map((problem, index) => (
                                                                                <div className='font-bold'>
                                                                                    Problem {index + 1}: {problem.name} {problem.active ? "(Active)" : "Inactive"}
                                                                                </div>
                                                                            ))}

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (<>No EHR Data</>)}
                                                        </div>
                                                    </div>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>)}
            </div>
        </div>
    );
};

export default Transplant;
