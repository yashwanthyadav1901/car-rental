import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCarDetails() {
  const [location, setLocation] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8001/dashboard/manage-location")
      .then((result) => {
        console.log(result);
        if (result.data.Status) {
          setLocation(result.data.Result);
        } else {
          console.log("error deleting location");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const [data, setData] = useState({
    model: "",
    brand: "",
    year: "",
    license_plate: "",
    baggage: "",
    fuel: "",
    manual: "",
    seat: "",
    rent_per_day: "",
    location: "",
    image: null,
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const formdata = new FormData();

      formdata.append("model", data.model);
      formdata.append("brand", data.brand);
      formdata.append("year", data.year);
      formdata.append("license_plate", data.license_plate);
      formdata.append("seat", data.seat);
      formdata.append("baggage", data.baggage);
      formdata.append("fuel", data.fuel);
      formdata.append("manual", data.manual);
      formdata.append("location", data.location);
      formdata.append("rent_per_day", data.rent_per_day);
      formdata.append("image", data.image);

      // Log the formdata for debugging
      console.log("Form Data:", formdata);

      const response = await axios.post(
        "http://localhost:8001/dashboard/manage-cars",
        formdata
      );
      console.log(formdata);

      // Log the response for debugging
      console.log("Response:", response);

      // Check the status code and handle accordingly
      if (response.status === 200) {
        navigate("/dashboard/manage-cars");
      } else {
        // Handle unexpected status code
        console.error("Unexpected status code:", response.status);
      }
    } catch (err) {
      // Log the full error object for detailed information
      console.error("Error:", err);

      // Check if there's a response from the server
      if (err.response) {
        console.error("Server response:", err.response.data);
      }

      // Handle error as needed
    }
  };

  return (
    <div className="main-container">
      <div className="d-flex flex-column align-items-center pt-4">
        <h2>Add Car Details</h2>
        <form className="row g-3 w-50" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputModel" className="form-label">
              model
            </label>
            <input
              type="text"
              className="form-control"
              id="inputModel"
              placeholder="Enter model"
              autoComplete="off"
              onChange={(e) =>
                setData((prevData) => ({ ...prevData, model: e.target.value }))
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputBrand" className="form-label">
              Brand
            </label>
            <input
              type="text"
              className="form-control"
              id="inputBrand"
              placeholder="Enter Brand"
              autoComplete="off"
              onChange={(e) =>
                setData((prevData) => ({ ...prevData, brand: e.target.value }))
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputyear" className="form-label">
              year
            </label>
            <input
              type="number"
              className="form-control"
              id="inputyear"
              placeholder="Enter year"
              autoComplete="off"
              onChange={(e) =>
                setData((prevData) => ({ ...prevData, year: e.target.value }))
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputLicensePlate" className="form-label">
              License Number
            </label>
            <input
              type="text"
              className="form-control"
              id="inputLicensePlate"
              placeholder="Enter License Plate Number"
              autoComplete="off"
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  license_plate: e.target.value,
                }))
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputBaggage" className="form-label">
              Baggage
            </label>
            <input
              type="number"
              className="form-control"
              id="inputBaggage"
              placeholder="input baggage capacity"
              autoComplete="off"
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  baggage: e.target.value,
                }))
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputFuel" className="form-label">
              Fuel
            </label>
            <input
              type="text"
              className="form-control"
              id="inputFuel"
              placeholder="Enter Fuel"
              autoComplete="off"
              onChange={(e) =>
                setData((prevData) => ({ ...prevData, fuel: e.target.value }))
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputManual" className="form-label">
              Manual
            </label>
            <input
              type="text"
              className="form-control"
              id="inputManual"
              placeholder="Enter Manual or automatic"
              autoComplete="off"
              onChange={(e) =>
                setData((prevData) => ({ ...prevData, manual: e.target.value }))
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputSeater" className="form-label">
              Seater
            </label>
            <input
              type="number"
              className="form-control"
              id="inputSeater"
              placeholder="Enter no of seats"
              autoComplete="off"
              onChange={(e) =>
                setData((prevData) => ({ ...prevData, seat: e.target.value }))
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputRent" className="form-label">
              Rent per day
            </label>
            <input
              type="text"
              className="form-control"
              id="inputRent"
              placeholder="Enter Rent"
              autoComplete="off"
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  rent_per_day: e.target.value,
                }))
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="selectLocation" className="form-label">
              Select Location
            </label>
            <select
              className="form-select"
              id="selectLocation"
              onChange={(e) => {
                setData((prevData) => ({
                  ...prevData,
                  location: e.target.value,
                }));
              }}
              value={data.location}
            >
              <option value="">Select...</option>
              {location &&
                location.map((loc) => (
                  <option key={loc.id} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control"
              id="inputGroupFile01"
              onChange={(e) => setData({ ...data, image: e.target.files[0] })}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCarDetails;
