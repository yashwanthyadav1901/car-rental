import { useEffect, useState } from "react";
import "./BookCar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BookCar() {
  const navigateTo = useNavigate();
  const [location, setLocation] = useState([]);
  const [pickUp, setPickUp] = useState("");
  const [dropof, setDropof] = useState("");
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8001/dashboard/manage-location")
      .then((result) => {
        if (result.data.Status) {
          setLocation(result.data.Result);
        } else {
          console.log("error fetching location");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const openSearchPage = (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector(".error-message");
    if (pickUp === "" || pickTime === "" || dropTime === "") {
      errorMsg.style.display = "flex";
    } else {
      navigateTo(`/user/car-search`, {
        state: {
          location: pickUp,
          dropOfLocation: dropof,
          pickTime: pickTime,
          dropTime: dropTime,
        },
      });
    }
  };

  console.log(pickTime, dropTime);

  const handlePick = (e) => {
    setPickUp(e.target.value);
  };
  const handleDrop = (e) => {
    setDropof(e.target.value);
  };

  const handlePickTime = (e) => {
    setPickTime(e.target.value);
  };

  const handleDropTime = (e) => {
    setDropTime(e.target.value);
  };


  return (
    <>
      <section id="booking-section" className="book-section">
        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Book a car</h2>

              <p className="error-message">All fields required!</p>

              <form className="box-form">
                <div className="box-form__car-type">
                  <label htmlFor="selectLocation">
                    &nbsp; Pick-up <b>*</b>
                  </label>
                  <select
                    className="form-select"
                    id="selectLocation"
                    onChange={handlePick}
                  >
                    <option value="">Select...</option>
                    {location.map((loc) => (
                      <option key={loc.id} value={loc.name}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="box-form__car-type">
                  <label htmlFor="selectLocation">
                    &nbsp; Drop-of <b>*</b>
                  </label>
                  <select
                    className="form-select"
                    id="selectLocation"
                    onChange={handleDrop}
                  >
                    <option value="">Select...</option>
                    {location.map((loc) => (
                      <option key={loc.id} value={loc.name}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="picktime">
                    &nbsp; Pick-up <b>*</b>
                  </label>
                  <input
                    id="picktime"
                    value={pickTime}
                    onChange={handlePickTime}
                    type="date"
                  />
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="droptime">
                    &nbsp; Drop-of <b>*</b>
                  </label>
                  <input
                    id="droptime"
                    value={dropTime}
                    onChange={handleDropTime}
                    type="date"
                  />
                </div>

                <button onClick={openSearchPage} type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BookCar;
