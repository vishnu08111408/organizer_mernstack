import axios from "axios";
import React, { useEffect, useState } from "react";
import APIRequests from "../../api";

// Custom card component
function CustomCard({ children }) {
  return (
    <div className="bg-white p-4 rounded-md shadow-lg mb-4">{children}</div>
  );
}

export default function RecProf() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming you have a user object with email and userType
        const user = JSON.parse(localStorage.getItem("profile"));
        const userType = "recipient"; // Replace with the actual user type

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
      <div className="container mx-auto max-h-screen overflow-y-auto">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 lg:mr-10">
            <CustomCard>
              <div className="mb-4">
                <img
                  src="https://img.freepik.com/premium-vector/people-profile-graphic_24911-21374.jpg?w=740"
                  alt="avatar"
                  className="rounded-full w-32 h-32 mx-auto lg:mx-0"
                />
                <p className="text-center text-xl font-bold mt-2">
                  {data.name }
                </p>
                <div className="flex justify-center mb-2">
                  <button className="px-4 py-2 border border-blue-500 text-blue-500 ml-2 hover:bg-blue-100 item-center justify-center">
                    Status
                  </button>
                </div>
              </div>
            </CustomCard>
          </div>

          <div className="lg:w-2/3">
            <CustomCard>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Full Name</span>
                  <span className="text-gray-500">{data.name}</span>
                </div>
                <hr />
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Email</span>
                  <span className="text-gray-500">{data.email}</span>
                </div>
                <hr />
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Phone</span>
                  <span className="text-gray-500">{data.phone}</span>
                </div>
                <hr />
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Gender</span>
                  <span className="text-gray-500">{data.gender}</span>
                </div>
                <hr />
                <div className="flex justify-between">
                  <span className="text-gray-600">Age</span>
                  <span className="text-gray-500">{data.age}</span>
                </div>
                <hr />
                <div className="flex justify-between">
                  <span className="text-gray-600">Blood Group</span>
                  <span className="text-gray-500">{data.blood_group}</span>
                </div>
                <hr />
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight</span>
                  <span className="text-gray-500">{data.weight}</span>
                </div>
                <hr />
                <div className="flex justify-between">
                  <span className="text-gray-600">Height</span>
                  <span className="text-gray-500">{data.height}</span>
                </div>
                <hr />
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">Organs</h2>
                  {data.organ ? (
                    data.organ.map((organ, index) => (
                      <div className="flex justify-between" key={index}>
                        <span className="text-gray-600">Organ {index + 1}</span>
                        <span className="text-gray-500">{organ.name}</span>
                      </div>
                    ))
                  ) : (
                    <p>No organ data available</p>
                  )}
                </div>                           
                <hr />
                <div className="flex justify-between">
                  <span className="text-gray-600">Availibity</span>
                  <span className="text-gray-500">{data.availability}</span>
                </div>
              </div>
            </CustomCard>
          </div>
        </div>
      </div>
    </section>
  );
}
