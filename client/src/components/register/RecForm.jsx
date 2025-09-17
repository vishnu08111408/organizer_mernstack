import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import LocationSearchInput from "../map/LocationSearch";
import MyMap from "../map/Map";
import { toast } from "react-toastify";
import APIRequests from '../../api';

const RecForm = () => {
  const [location, setLocation] = useState(null);
  const [locationConfirmed, setLocationConfirmed] = useState(false);
  const [registrationDetails, setRegistrationDetails] = useState({
    type: "receiver",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    phone: "",
    location: location,
    blood_group: "",
    age: "",
    weight: "",
    height: "",
    health_history: "",
  });

  useEffect(() => {
    setRegistrationDetails((prev) => ({ ...prev, location: location }));
  }, [location]);

  const bGroup = [
    {
      value: "A+",
      label: "A+",
    },
    {
      value: "A-",
      label: "A-",
    },
    {
      value: "B+",
      label: "B+",
    },
    {
      value: "B-",
      label: "B-",
    },
    {
      value: "AB+",
      label: "AB+",
    },
    {
      value: "AB-",
      label: "AB-",
    },
    {
      value: "O+",
      label: "O+",
    },
    {
      value: "O-",
      label: "O-",
    },
  ];

  const handleGenderChange = (e) => {
    setRegistrationDetails({ ...registrationDetails, gender: e.target.value });
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
    if (!location || !locationConfirmed || !location.latitude || !location.longitude) {
      toast.error("Please select and confirm your location.");
      return;
    }
    try {
      const response = await APIRequests.signUp(registrationDetails);
      if (response.status === 200) {
        toast.success("Registration successful");
        await timeout(2000);
        window.location.pathname = "/login";
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
        <TextField
          label="Blood Group"
          select
          sx={{ width: "150px", backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}
          value={registrationDetails.blood_group}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              blood_group: e.target.value,
            })
          }
          variant="outlined"
        >
          {bGroup.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Age"
          type="number"
          sx={{ width: "100px", backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}
          variant="outlined"
          value={registrationDetails.age}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              age: e.target.value,
            })
          }
        />
        <div className="flex flex-col gap-1">
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={registrationDetails.gender}
            onChange={handleGenderChange}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </div>
        <div className="flex gap-4">
          <TextField
            label="Weight (kg)"
            type="number"
            variant="outlined"
            value={registrationDetails.weight}
            onChange={(e) =>
              setRegistrationDetails({
                ...registrationDetails,
                weight: e.target.value,
              })
            }
            sx={{ backgroundColor: '#f9fafb', borderRadius: '0.5rem', flex: 1 }}
          />
          <TextField
            label="Height (cm)"
            type="number"
            variant="outlined"
            value={registrationDetails.height}
            onChange={(e) =>
              setRegistrationDetails({
                ...registrationDetails,
                height: e.target.value,
              })
            }
            sx={{ backgroundColor: '#f9fafb', borderRadius: '0.5rem', flex: 1 }}
          />
        </div>
        <TextField
          id="outlined-multiline-static"
          label="Any Past Medical Records"
          multiline
          minRows={1}
          maxRows={4}
          sx={{ width: "100%", backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}
          value={registrationDetails.health_history}
          onChange={(e) =>
            setRegistrationDetails({
              ...registrationDetails,
              health_history: e.target.value,
            })
          }
        />


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

export default RecForm;
