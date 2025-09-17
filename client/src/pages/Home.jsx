import React, { useState, useEffect } from 'react';
import homeLogo from '../assets/home-img.png';
import EastIcon from '@mui/icons-material/East';
import Typewriter from 'typewriter-effect';
import APIRequests from '../api';
import CircularProgress from '@mui/material/CircularProgress';


const Home = () => {
    const [data, setData] = useState();
    const user = JSON.parse(localStorage.getItem('profile'))
    const userType = user.type
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [button, setButton] = useState('')
    const [loading, setLoading] = useState(true)

    if (userType === 'hospital') {
        window.location.pathname = '/transplant'
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await APIRequests.getUser({ email: user.email, type: userType})
            console.log(res.data)
            setData(res.data)
            setLoading(false)
        }
        fetchData()
    },[])

    useEffect(() => {
        if (userType === 'donor') {
            setTitle('Welcome Back, Lifesaver!')
            setContent('Thank you for your commitment to saving lives as a registered organ donor. Your decision to donate is a powerful testament to your compassion and humanity.We salute your unwavering commitment to saving lives through organ donation.')
            setButton('My Donor Card ')
        } else if (userType === 'recipient') {
            setTitle('Find Hope, Find Life!')
            setContent('Are you or a loved one in need of a life-saving organ transplant? We understand the challenges and emotions that come with this journey. Our mission is to bring hope to those seeking a second chance at life by connecting you with generous organ donors who are willing to make a difference.')
            setButton('Find a Donor ')
        } else if (userType === 'hospital') {
            setTitle('Find a Donor')
            setContent('Are you or a loved one in need of a life-saving organ transplant? We understand the challenges and emotions that come with this journey. Our mission is to bring hope to those seeking a second chance at life by connecting you with generous organ donors who are willing to make a difference.')
            setButton('Find a Donor')
        }
    }, [userType])

    return (
        <>
       {loading ? 
            <CircularProgress color="secondary" 
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }}/>
            : ( <div className='h-screen w-full flex navBrM:flex-col items-start justify-between overflow-y-scroll navBrM:gap-4 bg-cream'>
            <div className='h-full navBrM:w-full navBrM:gap-4 mt-44 w-htext pl-8 flex flex-col items-start justify-start gap-4' style={{
                // fontFamily: 'Fira Sans'
            }}>
                <div className='text-maroon text-5xl font-bold'>
                    <Typewriter
                        options={{
                            // strings: [res],
                            delay: 50, // Adjust the delay between each character (lower value for faster typing)
                            cursor: "", // Change the cursor css (null to hide the cursor)
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString(title)
                                .start()
                        }}
                    />
                </div>
                <div className='text-red text-lg font-medium'>
                   {content}
                </div>
               <div>
                    <button onClick={() => {
                        window.location.href = userType === 'recipient' ? '/application' : '/donorcard'
                    }} className='bg-maroon text-white text-lg font-medium py-2 px-4 rounded-lg flex items-center gap-2 transform transition-transform duration-300 ease-in-out hover:scale-105'>
                        {button}<EastIcon sx={{ color: "white" }} />
                    </button>
                </div>
            </div>
            <div className='h-full w-home navBrM:self-end navBrM:w-1/2'>
                <img
                    src={homeLogo}
                    alt='home-logo'
                    width="100%"
                />
            </div>
        </div>)}
        
        </>
    );
};

export default Home;