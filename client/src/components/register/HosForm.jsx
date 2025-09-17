import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import LocationSearchInput from "../map/LocationSearch";
import MyMap from "../map/Map";
import { toast } from "react-toastify";
import APIRequests from "../../api";


const HosForm = () => {
    const [nodalOfficerDetails, setNodalOfficerDetails] = useState([
        { name: "", phone: "", email: "" },
      ]);
  const [location, setLocation] = useState(null);
  const [locationConfirmed, setLocationConfirmed] = useState(false);

  const [registrationDetails, setRegistrationDetails] = useState({
    type: "hospital",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    nodal_officer_details: nodalOfficerDetails,
    location: location,
  });

  useEffect(() => {
    setRegistrationDetails((prev) => ({ ...prev, location: location }));
  }, [location]);

  const handleNodalOfficerDetailsChange = (index, field, value) => {
    const updatedNodalOfficerDetails = [...nodalOfficerDetails];
    updatedNodalOfficerDetails[index][field] = value;
    setNodalOfficerDetails(updatedNodalOfficerDetails);
    
    // Update registrationDetails with the new nodal officer details
    setRegistrationDetails({
      ...registrationDetails,
      nodal_officer_details: updatedNodalOfficerDetails,
    });
  };

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registrationDetails.password !== registrationDetails.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // Prepare the data to send to the API

    try {
      console.log(registrationDetails);
      const response = await APIRequests.signUp(registrationDetails);

      if (response.status === 200) {
        toast.success("Registration successful");
        await timeout(2000);
        window.location.href = "/login";
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <form
        className="bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-6 w-full max-w-2xl border border-gray-200"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Name"
          variant="outlined"
          value={registrationDetails.name}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              name: e.target.value,
            })
          }
          fullWidth
          InputProps={{ className: 'rounded-lg bg-gray-50' }}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={registrationDetails.email}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              email: e.target.value,
            })
          }
          fullWidth
          InputProps={{ className: 'rounded-lg bg-gray-50' }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={registrationDetails.password}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              password: e.target.value,
            })
          }
          fullWidth
          InputProps={{ className: 'rounded-lg bg-gray-50' }}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={registrationDetails.confirmPassword}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              confirmPassword: e.target.value,
            })
          }
          fullWidth
          InputProps={{ className: 'rounded-lg bg-gray-50' }}
        />
        <TextField
          label="Phone"
          type="number"
          variant="outlined"
          value={registrationDetails.phone}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              phone: e.target.value,
            })
          }
          fullWidth
          InputProps={{ className: 'rounded-lg bg-gray-50' }}
        />
        <div className="flex flex-col gap-2">
          {nodalOfficerDetails.map((nodalOfficer, index) => (
            <div key={index} className="flex gap-4 items-center">
              <TextField
                label={`Nodal Officer Name`}
                variant="outlined"
                value={nodalOfficer.name}
                onChange={(e) =>
                  handleNodalOfficerDetailsChange(index, "name", e.target.value)
                }
                InputProps={{ className: 'rounded-lg bg-gray-50' }}
              />
              <TextField
                label={`Nodal Officer Phone`}
                variant="outlined"
                value={nodalOfficer.phone}
                onChange={(e) =>
                  handleNodalOfficerDetailsChange(index, "phone", e.target.value)
                }
                InputProps={{ className: 'rounded-lg bg-gray-50' }}
              />
              <TextField
                label={`Nodal Officer Email`}
                variant="outlined"
                value={nodalOfficer.email}
                onChange={(e) =>
                  handleNodalOfficerDetailsChange(index, "email", e.target.value)
                }
                InputProps={{ className: 'rounded-lg bg-gray-50' }}
              />
            </div>
          ))}
        </div>
       
            

        <label className="w-full">
          Location:
          <div className="flex flex-col gap-2">
            <LocationSearchInput setLatLng={setLocation} />
            <div className="flex items-center gap-2">
              {!locationConfirmed ? (
                <button
                  type="button"
                  className="px-6 py-2 bg-blue-700 hover:bg-blue-900 text-white rounded-lg font-bold text-base shadow border border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled={
                    !location ||
                    isNaN(Number(location.latitude)) ||
                    isNaN(Number(location.longitude))
                  }
                  onClick={() => setLocationConfirmed(true)}
                  style={{ minWidth: '150px', color: '#fff', backgroundColor: '#1d4ed8' }}
                >
                  Confirm Location
                </button>
              ) : (
                <button
                  type="button"
                  className="px-6 py-2 bg-green-700 text-white rounded-lg font-bold text-base shadow cursor-default border border-green-900"
                  disabled
                  style={{ minWidth: '150px', color: '#fff', backgroundColor: '#047857' }}
                >
                  Location Confirmed
                </button>
              )}
            </div>
          </div>
          <MyMap
            lat={location ? location.latitude : null}
            long={location ? location.longitude : null}
            forReg={true}
            setLatLng={setLocation}
          />
        </label>
        <button
          className="w-full py-3 bg-red-700 hover:bg-red-900 text-white rounded-lg font-bold text-base shadow mt-2 border border-red-900 focus:outline-none focus:ring-2 focus:ring-red-400"
          type="submit"
          style={{ minWidth: '150px', color: '#fff', backgroundColor: '#b91c1c' }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default HosForm;
