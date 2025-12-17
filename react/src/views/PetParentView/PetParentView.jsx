import { useState, useEffect } from "react";
import PetParentService from "../../services/PetParentService";
import styles from "./PetParentView.module.css";

export default function PetParentView() {
  const [petParents, setPetParents] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    streetNumber: "",
    streetName: "",
    cityName: "",
    stateAbbreviation: "",
    petName: "",
    imageUrl: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPetParents();
  }, []);

  const fetchPetParents = async () => {
    const data = await PetParentService.getAll();
    setPetParents(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    await PetParentService.add(form);
    resetForm();
    fetchPetParents();
  };

  const handleUpdate = async () => {
    if (editingId) {
      await PetParentService.update(editingId, form);
      setEditingId(null);
      resetForm();
      fetchPetParents();
    }
  };

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      streetNumber: "",
      streetName: "",
      cityName: "",
      stateAbbreviation: "",
      petName: "",
      imageUrl: "",
    });
  };

  const handleEdit = (parent) => {
    setForm({
      firstName: parent.firstName,
      lastName: parent.lastName,
      phoneNumber: parent.phoneNumber,
      streetNumber: parent.streetNumber,
      streetName: parent.streetName,
      cityName: parent.cityName,
      stateAbbreviation: parent.stateAbbreviation,
      petName: parent.petName,
      imageUrl: parent.imageUrl,
    });
    setEditingId(parent.parentId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Pet Parents</h2>

      <div className={styles.form}>
        <div className={styles.formGrid}>
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <input
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
            required
          />
          <input
            name="streetNumber"
            type="number"
            placeholder="Street Number"
            value={form.streetNumber}
            onChange={handleChange}
            required
          />
          <input
            name="streetName"
            placeholder="Street Name"
            value={form.streetName}
            onChange={handleChange}
            required
          />
          <input
            name="cityName"
            placeholder="City Name"
            value={form.cityName}
            onChange={handleChange}
            required
          />
          <input
            name="stateAbbreviation"
            placeholder="State"
            value={form.stateAbbreviation}
            onChange={handleChange}
            required
          />
          <input
            name="petName"
            placeholder="Pet Name"
            value={form.petName}
            onChange={handleChange}
            required
          />
          <input
            name="imageUrl"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.buttonGroup}>
          <button onClick={handleAdd} className={styles.btnAdd}>
            Add Pet Parent
          </button>
          <button onClick={handleUpdate} className={styles.btnUpdate}>
            Update Pet Parent
          </button>
        </div>
      </div>

      <div className={styles.list}>
        {petParents.map((parent) => (
          <div key={parent.parentId} className={styles.card}>
            <img
              src={parent.imageUrl}
              alt={parent.petName}
              className={styles.petImage}
            />
            <h3>
              {parent.firstName} {parent.lastName}
            </h3>
            <p>Phone: {parent.phoneNumber}</p>
            <p>
              Address: {parent.streetNumber} {parent.streetName},{" "}
              {parent.cityName}, {parent.stateAbbreviation}
            </p>
            <p>Pet Name: {parent.petName}</p>
            <div className={styles.cardButtons}>
              <button
                onClick={() => handleEdit(parent)}
                className={styles.btnEdit}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
