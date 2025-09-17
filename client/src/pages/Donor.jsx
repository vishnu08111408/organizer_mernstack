import React from 'react';
import DonorCard from '../components/donorcard/DonorCard';

const Donor = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    if (user.type !== 'donor') {
        window.location.href = '/home'
    }

    return (
        <div className='h-screen w-full flex flex-col items-center justify-start gap-4 mt-16'>
            <div className='text-3xl font-bold'>
                This is your donor card
            </div>
            <DonorCard />
            <div className='w-full text-center text-xl font-bold'>
                Download this card and keep it with you at all times. Please inform your relatives/family about your wish 
            </div>
        </div>
    );
};

export default Donor;