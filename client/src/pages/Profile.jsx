import React from 'react';
import DonProf from '../components/profile/DonProf';
import RecProf from '../components/profile/RecProf';
import HosProf from '../components/profile/HosProf';

const Profile = () => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const userType = profile.type;
    return (
        <div>
            {userType === 'donor' && <DonProf />}
            {userType === 'recipient' && <RecProf />}
            {userType === 'hospital' && <HosProf />}
        </div>
    );
};

export default Profile;