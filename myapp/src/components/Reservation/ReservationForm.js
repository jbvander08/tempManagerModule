import React, { useState, useEffect } from "react";

function ReservationForm({ onSubmit, onClose, editData }) {
  const [data, setData] = useState({
    id: null,
    name: "",
    contact: "",
    destination: "",
    startDate: "",
    finishDate: "",
    time: "09:00 AM",
    type: "SUV",
    status: "Upcoming",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setData(editData);
    } else {
      setData({
        id: null,
        name: "",
        contact: "",
        destination: "",
        startDate: "",
        finishDate: "",
        time: "09:00 AM",
        type: "SUV",
        status: "Upcoming",
      });
    }
  }, [editData]);

  const validate = () => {
    let temp = {};
    if (!data.name) temp.name = "Required";
    if (!data.contact) temp.contact = "Required";
    if (!data.destination) temp.destination = "Required";
    if (!data.startDate) temp.startDate = "Required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const isEdit = Boolean(data.id);
    onSubmit(data, isEdit);
  };

  return (
    <div className="form-grid">
      <div>
        <div className="form-group">
          <label>Customer Name *</label>
          <input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Contact Number *</label>
          <input
            value={data.contact}
            onChange={(e) => setData({ ...data, contact: e.target.value })}
          />
          {errors.contact && <p className="error-text">{errors.contact}</p>}
        </div>

        <div className="form-group">
          <label>Destination *</label>
          <select
            value={data.destination}
            onChange={(e) => setData({ ...data, destination: e.target.value })}
          >
            <option value="">Select destination</option>
            <option value="Baguio">Baguio</option>
            <option value="Pampanga">Pampanga</option>
            <option value="Manila">Manila</option>
          </select>
          {errors.destination && <p className="error-text">{errors.destination}</p>}
        </div>
      </div>

      <div>
        <div className="form-group">
          <label>Start Date *</label>
          <input
            type="date"
            value={data.startDate}
            onChange={(e) => setData({ ...data, startDate: e.target.value })}
          />
          {errors.startDate && <p className="error-text">{errors.startDate}</p>}
        </div>

        <div className="form-group">
          <label>Finish Date</label>
          <input
            type="date"
            value={data.finishDate}
            onChange={(e) => setData({ ...data, finishDate: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Vehicle Type</label>
          <select
            value={data.type}
            onChange={(e) => setData({ ...data, type: e.target.value })}
          >
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
            <option value="Sedan">Sedan</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button className="btn-primary" onClick={handleSubmit}>
          {editData ? "Save Changes" : "Save Reservation"}
        </button>
        <button className="btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ReservationForm;
