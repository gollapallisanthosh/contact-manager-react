import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ContactService } from '../../contactServices/ContactServices'
import Spinner from '../Spinner/Spinner';

const EditContact = () => {
const navigate = useNavigate();
  const { contactId } = useParams();

  const [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
    errorMessage: "",
  });

  // FETCH CONTACT
  useEffect(() => {
    const fetchContact = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true }));

        const response = await ContactService.getContact(contactId);

        setState({
          loading: false,
          contact: response.data,
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

    fetchContact();
  }, [contactId]);

  // UPDATE INPUT
  const updateInput = (e) => {
    setState((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [e.target.name]: e.target.value,
      },
    }));
  };

  // SUBMIT FORM
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await ContactService.updateContact(contactId, state.contact);
      navigate("/contacts/list", { replace: true });
    } catch (error) {
      setState((prev) => ({ ...prev, errorMessage: error.message }));
    }
  };

  const { loading, contact, errorMessage } = state;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="p-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-5">

                {/* TITLE */}
                <h3 className="text-primary fw-bold text-center mb-3">
                  Edit Contact
                </h3>

                {/* IMAGE AT TOP */}
                <div className="d-flex justify-content-center mb-4">
                  <img src={`https://ui-avatars.com/api/?name=${contact.name}&background=0D6EFD&color=fff&size=200`} alt="avatar"
                    className="rounded-circle shadow"
                    style={{ width: "160px", height: "160px", objectFit: "cover",}} />
                </div>

                {/* ERROR */}
                {errorMessage && (
                  <p className="text-danger text-center">{errorMessage}</p>
                )}

                {/* FORM */}
                <form onSubmit={submitForm} className="card p-3 shadow-sm">
                  <input className="form-control mb-2" name="name" value={contact.name}
                    onChange={updateInput}
                    placeholder="Name"
                    required />

                  <input className="form-control mb-2" name="phone" value={contact.phone}
                    onChange={updateInput}
                    placeholder="Mobile"
                    required />

                  <input className="form-control mb-2" name="email" value={contact.email}
                    onChange={updateInput}
                    placeholder="Email"
                    type="email"
                    required/>

                  <input className="form-control mb-3" name="address" value={contact.address}
                    onChange={updateInput}
                    placeholder="Address"/>

                  <input className="form-control mb-3" name="location" value={contact.location}
                    onChange={updateInput}
                    placeholder="Location"/>

                  <div className="d-flex justify-content-between">
                    <button className="btn btn-primary">
                      Update
                    </button>
 
                    <Link to="/contacts/list" className="btn btn-outline-dark">
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default EditContact;