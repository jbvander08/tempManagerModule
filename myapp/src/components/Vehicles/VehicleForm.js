import React, { useState, useEffect } from "react";

function VehicleForm({ onSubmit, onClose, editData }) {
  const [data, setData] = useState({
    id: null,
    name: "",
    type: "SUV",
    group: "",
    meter: "",
    status: "Active",
    archived: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setData(editData);
    } else {
      setData({
        id: null,
        name: "",
        type: "SUV",
        group: "",
        meter: "",
        status: "Active",
        archived: false,
      });
    }
  }, [editData]);

  const validate = () => {
    let temp = {};
    if (!data.name) temp.name = "Required";
    if (!data.group) temp.group = "Required";
    if (!data.meter) temp.meter = "Required";
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
      {/* LEFT COLUMN */}
      <div>
        <div className="form-group">
          <label>Vehicle Name *</label>
          <input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
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

        <div className="form-group">
          <label>Status</label>
          <select
            value={data.status}
            onChange={(e) => setData({ ...data, status: e.target.value })}
          >
            <option value="Active">Active</option>
            <option value="In Shop">In Shop</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div>
        <div className="form-group">
          <label>Group *</label>
          <input
            value={data.group}
            onChange={(e) => setData({ ...data, group: e.target.value })}
          />
          {errors.group && <p className="error-text">{errors.group}</p>}
        </div>

        <div className="form-group">
          <label>Odometer (km) *</label>
          <input
            type="number"
            value={data.meter}
            onChange={(e) => setData({ ...data, meter: e.target.value })}
          />
          {errors.meter && <p className="error-text">{errors.meter}</p>}
        </div>

        <div className="form-group">
          <label>Archived</label>
          <select
            value={data.archived ? "true" : "false"}
            onChange={(e) =>
              setData({ ...data, archived: e.target.value === "true" })
            }
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="form-actions">
        <button className="btn-primary" onClick={handleSubmit}>
          {editData ? "Save Changes" : "Add Vehicle"}
        </button>
        <button className="btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default VehicleForm;
