import React, { useState } from "react";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import img from "../assets/updated.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import {toast} from 'react-toastify';
import APIRequests from "../api";

const Application = () => {
  const [registrationDetails, setRegistrationDetails] = useState({
    email: JSON.parse(localStorage.getItem("profile")).email,
    organ: "", // Set default values for the properties you want to manage
    dateTime: "", // Set a default date and time
  });
  const [organs, setOrgans] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("sending data",registrationDetails);
    try{
      // setOrgans([...organs, {name: registrationDetails.organ, expiry_date: registrationDetails.dateTime, status: "sent"}]);
      const res = await axios.post("http://localhost:5000/api/receiver/application/add-organ", registrationDetails);
      console.log(res);
      // alert(res)
      if (res.status == 200) {
        toast.success("Application submitted successfully");
        setOrgans([...organs, {name: registrationDetails.organ, expiry_date: registrationDetails.dateTime}]);
      }
      else if (res.status == 400) { 
        toast.error("Recevier not found");
      }
      else if (res.status == 202) {
        toast.error("Organ already registered");
      }
    }catch(err){
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  React.useEffect(() => {
    // get organs
    APIRequests.getOrgans().then((res) => {
      console.log(res.data.organs);
      setOrgans(res.data.organs);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className="flex w-full h-full overflow-y-scroll">
      <div className="w-1/2 h-full mt-10">
        <div className="w-full h-full flex flex-col items-center justify-center mt-4 mx-2">
          <FormControl >
            <InputLabel id="demo-simple-select-label">Organ</InputLabel>
            <Select
              sx={{ width: "350px" }}
              labelId="demo-simple-select-label"
              label="Organ"
              id="demo-simple-select"
              value={registrationDetails.organ} // Access the 'organ' property from state
              onChange={(e) =>
                setRegistrationDetails({
                  ...registrationDetails,
                  organ: e.target.value,
                })
              }
            >
              <MenuItem value="Heart">Heart</MenuItem>
              <MenuItem value="Lungs">Lungs</MenuItem>
              <MenuItem value="Liver">Liver</MenuItem>
              <MenuItem value="Kidney">Kidney</MenuItem>
              <MenuItem value="Eyes">Eyes</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center mt-6 mx-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDateTimePicker
              sx={{ width: "350px" }}
              value={registrationDetails.dateTime} // Access the 'dateTime' property from state
              onChange={(newDateTime) =>
                setRegistrationDetails({
                  ...registrationDetails,
                  dateTime: newDateTime,
                })
              }
            />
          </LocalizationProvider>
          <Button
            sx={{ width: "150px" }}
            className="p-2 my-4"
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center mt-8 mx-2">
          {/* <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card> */}

          {organs && organs.map((organ) => {
            const expiryDate = dayjs(organ.expiry_date).format("DD/MM/YYYY") || "NA";
            return (
              <Card sx={{ maxWidth: 345 }} className="my-4">
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {organ.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Request Expiry: {expiryDate}
                    </Typography>
                    {organ.status && (
                      <Typography variant="body2" color="text.secondary">
                        Status: {organ.status.toUpperCase()}
                      </Typography>
                    )}
                  </CardContent>
                </CardActionArea>
               
              </Card>
            );
          })}
        </div>
      </div>
      <div className="w-1/2 h-full">
        <div className="w-full h-full flex flex-col items-end justify-center bg-cover">
          <img style={{ height: "103vh" }} src={img} alt="Campaign" />
        </div>
      </div>
    </div>
  );
};

export default Application;
