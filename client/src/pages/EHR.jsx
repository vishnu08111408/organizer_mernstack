import React from 'react';

const EHRTest = ({ donor }) => {
    const ehr = donor.ehrData[0];
    console.log("e", ehr)
    return (
        <div className='w-full h-full'>
            {ehr && 
                 (
                    <div>
                        <div>
                            Allergies: {ehr.allergies.map((item, index) => (
                                <span className='bg-maroon mx-1 text-white p-1 rounded-xl' key={index}>
                                    {item.substance}
                                </span>
                            ))}
                        </div>
                        <div>
                            {}
                        </div>
                        <div>
                            {}
                        </div>
                        <div>
                            {}
                        </div>
                        <div>
                            {}
                        </div>
                        <div>
                            {}
                        </div>
                    </div>
                )}
        </div>

    );
};

export default EHRTest;