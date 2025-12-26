import { useEffect, useState } from "react";
import { ContactService } from "../../contactServices/ContactServices";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";

const ContactList = () => {
  const [query, setQuery] = useState({ text: "" });

  const [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: "",
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const response = await ContactService.getAllContacts();

        setState({
          loading: false,
          contacts: response.data,
          filteredContacts: response.data,
          errorMessage: "",
        });
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          errorMessage: error.message,
        }));
      }
    };
    fetchContacts();
  }, []);

  const deleteContact = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!confirmDelete) return;
    await ContactService.deleteContact(id);
    const response = await ContactService.getAllContacts();
    setState((prev) => ({
      ...prev,
      contacts: response.data,
      filteredContacts: response.data,
    }));
  };

  const searchContacts = (e) => {
    const value = e.target.value;
    setQuery({ text: value });

    const filtered = state.contacts.filter((c) =>
      c.name.toLowerCase().includes(value.toLowerCase())
    );

    setState((prev) => ({
      ...prev,
      filteredContacts: filtered,
    }));
  };

  return (
    <>
      {/* PAGE BACKGROUND */}
      <section style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
        
        {/* HEADER */}
        <section className="p-3">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="mb-0">📇 Contact List</h3>
              <Link to="/contacts/add" className="btn btn-success">
                + Add
              </Link>
            </div>

            {/* SEARCH */}
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                value={query.text}
                onChange={searchContacts}
                className="form-control"
                placeholder="Search Contact"
              />
            </div>
          </div>
        </section>

        {/* LOADING */}
        {state.loading ? (
          <Spinner />
        ) : (
          <section className="container mt-3">
            <div className="row">
              {Array.isArray(state.filteredContacts) &&
                state.filteredContacts.map((contact) => (
                  <div className="col-md-6" key={contact.id}>
                    <div
                      className="card mb-3 border-0"
                      style={{borderRadius: "15px",boxShadow: "0 8px 20px rgba(0,0,0,0.08)",transition: "transform 0.2s ease"}}>
                      <div className="card-body d-flex align-items-center">

                        {/* IMAGE */}
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Contacts_%28iOS%29.png"
                          alt="avatar"
                          className="rounded-circle me-3"
                          style={{ width: "70px", height: "70px", objectFit: "cover", border: "2px solid #198754",}}/>

                        {/* DETAILS */}
                        <div className="flex-grow-1">
                          <ul className="list-group">
                            <li className="list-group-item list-group-item-action">
                            <b>Name:</b> <span className="mb-1 text-muted">{contact.name}</span>
                          </li>
                          <li className="list-group-item list-group-item-action">
                           <b>Email:</b> <span className="mb-1 text-muted">{contact.email}</span>
                          </li>
                          <li className="list-group-item list-group-item-action">
                          <b>Phone:</b> <span className="mb-0 text-muted">{contact.phone}</span>
                          </li>
                          </ul>
                        </div>
                        &nbsp;&nbsp;
                        {/* ACTIONS */}
                        <div className="d-flex flex-column">
                          <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning btn-sm mb-1">
                            <i className="fa fa-eye me-1"></i> 
                            View
                          </Link>

                          <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary btn-sm mb-1">
                            <i className="fa fa-edit me-1"></i> Edit
                          </Link>

                          <button onClick={() => deleteContact(contact.id)} className="btn btn-danger btn-sm">
                            Delete
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}

              {/* EMPTY STATE */}
              {state.filteredContacts.length === 0 && (
                <div className="col text-center text-muted mt-4">
                  No contacts found
                </div>
              )}
            </div>
          </section>
        )}
      </section>
    </>
  );
};
export default ContactList;
