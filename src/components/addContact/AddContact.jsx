import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContactService } from '../../contactServices/ContactServices';

const AddContact = () => {
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    address: "",
    role: "friend"
  });

  const submitForm = (e) => {
    e.preventDefault();
    ContactService.createContact(contact).then(() => navigate("/"));
  };

  return (
    <div className="container mt-4">
      <h3>Add Contact</h3>
      <form onSubmit={submitForm}>
        {Object.keys(contact).map(key => (
          key !== "role" ? (
            <input key={key} className="form-control mb-2" placeholder={key} value={contact[key]}
              onChange={e => setContact({ ...contact, [key]: e.target.value })} />
          ) : (
            <select key={key} className="form-control mb-2" value={contact.role}
              onChange={e => setContact({ ...contact, role: e.target.value })}>
              <option>friend</option>
              <option>work</option>
              <option>home</option>
              <option>relatives</option>
            </select>
          )
        ))}
        <button className="btn btn-primary">Create</button>
        <button className="btn btn-secondary ms-2" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
};

export default AddContact;