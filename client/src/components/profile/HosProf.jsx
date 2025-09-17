import React, { useEffect, useState } from "react";
import APIRequests from "../../api";

const HosProf = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming you have a user object with email and userType
        const user = JSON.parse(localStorage.getItem("profile"));
        const userType = "hospital"; // Replace with the actual user type

        const res = await APIRequests.getUser({
          email: user.email,
          type: userType,
        });

        if (res.status === 200) {
          console.log(res.data);
          setData(res.data);
          setLoading(false);
        } else {
          // Handle API error response here
          console.error("Error:", res.data.message);
          setLoading(false);
        }
      } catch (error) {
        // Handle network or unexpected errors here
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-gray-200 py-5">
      <div className="container mx-auto">
        <div className="max-w-screen-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src="https://img.freepik.com/free-vector/people-walking-sitting-hospital-building-city-clinic-glass-exterior-flat-vector-illustration-medical-help-emergency-architecture-healthcare-concept_74855-10130.jpg?w=1380&t=st=1694912285~exp=1694912885~hmac=23ae5e80dd8c694300490f0b9acc1e8e9f382c9ee884f13b62a00f30b96f3500" // Replace with the path to your hospital image
            alt="Hospital Image"
            className="w-full h-[300px] object-cover"
          />
          <div className="p-6">
            <h1 className="text-4xl font-semibold mb-4">{data.name}</h1>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <p className="text-gray-600">Email: {data.email}</p>
              <p className="text-gray-600">Phone: {data.phone}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Nodal Officer Details</h2>
              {data.nodal_officer_details ? (
                data.nodal_officer_details.map((nodal_officer, index) => (
                  <div className="flex justify-between" key={index}>
                    <span className="text-gray-600">
                      Nodal Officer {index + 1}
                    </span>
                    <span className="text-gray-500">{nodal_officer.name}</span>
                    <span className="text-gray-500">{nodal_officer.phone}</span>
                    <span className="text-gray-500">{nodal_officer.email}</span>
                  </div>
                ))
              ) : (
                <p>No officer data available</p>
              )}
            </div>
            {/* Additional hospital information can be displayed here */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HosProf;
