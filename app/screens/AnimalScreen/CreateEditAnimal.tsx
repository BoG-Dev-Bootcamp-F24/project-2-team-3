import React, { useState, useEffect } from "react";
import "./CreateAnimal.css";

interface Animal {
  _id?: string;
  name: string;
  breed: string;
  hoursTrained: number;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
  note: string;
}

interface CreateEditAnimalProps {
  animalToEdit?: Animal | null;
  onCancel: () => void;
  onSuccess: () => void;
}

const CreateEditAnimal: React.FC<CreateEditAnimalProps> = ({
  animalToEdit,
  onCancel,
  onSuccess,
}) => {
  const [animal, setAnimal] = useState<Animal>({
    name: "",
    breed: "",
    hoursTrained: 0,
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    note: "",
  });

  useEffect(() => {
    if (animalToEdit) {
      setAnimal(animalToEdit);
    }
  }, [animalToEdit]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setAnimal({ ...animal, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint = animalToEdit
      ? `/api/animal/${animalToEdit._id}`
      : "/api/animal";
    const method = animalToEdit ? "PUT" : "POST";

    const animalToSend = {
      ...animal,
      userEmail: "jackson@gmail.com"
    };

    fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(animalToSend),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error saving animal");
        }
        return res.json();
      })
      .then(() => {
        onSuccess(); // Notify parent of success
      })
      .catch((err) => console.error("Error submitting form:", err));
  };

  return (
    <div className="animal-create-container">
      <h1>{animalToEdit ? "Edit Animal" : "Create Animal"}</h1>
      <form onSubmit={handleSubmit} className="animal-form">
        <input
          type="text"
          name="name"
          placeholder="Animal Name"
          value={animal.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={animal.breed}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="hoursTrained"
          placeholder="Total Hours Trained"
          value={animal.hoursTrained}
          onChange={handleChange}
          required
        />
        <div>
          <select
            name="birthMonth"
            value={animal.birthMonth}
            onChange={handleChange}
            required
          >
            <option value="">Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            {/* Add other months */}
          </select>
          <input
            type="number"
            name="birthDay"
            placeholder="Date"
            value={animal.birthDay}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="birthYear"
            placeholder="Year"
            value={animal.birthYear}
            onChange={handleChange}
            required
          />
        </div>
        <textarea
          name="note"
          placeholder="Notes (Optional)"
          value={animal.note}
          onChange={handleChange}
        />
        <div className="button-group">
          <button type="submit" className="save-button">
            {animalToEdit ? "Update" : "Save"}
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditAnimal;
