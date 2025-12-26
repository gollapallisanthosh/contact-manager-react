import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ContactService } from '../../contactServices/ContactServices';
import Spinner from '../Spinner/Spinner';

const ViewContact = () => {
const { contactId } = useParams();

  const [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage: "",
  });

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
        setState({
          loading: false,
          contact: {},
          errorMessage: error.message,
        });
      }
    };

    fetchContact();
  }, [contactId]);

  const { loading, contact, errorMessage } = state;

  return (
    <>
      {/* HEADER */}
      <section className="p-3 bg-light">
        <div className="container text-center">
          <h3 className="text-warning fw-bold">View Contact</h3>
          <p className="fst-italic text-muted">
            View complete contact details below
          </p>
        </div>
      </section>

      {/* LOADING */}
      {loading && <Spinner />}

      {/* ERROR */}
      {errorMessage && (
        <div className="container text-danger text-center mt-3">
          {errorMessage}
        </div>
      )}

      {/* CONTACT DETAILS */}
      {!loading && Object.keys(contact).length > 0 && (
        <section className="mt-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">

                <div className="card shadow-sm">
                  <div className="card-body text-center">

                    {/* OLD IMAGE */}
                    <img
                      src="https://assets.promptbase.com/DALLE_IMAGES%2F14I5mCtzHZbYPmUWLTlX14ev4jB2%2Fresized%2F1681218221065_1000x1000.webp?alt=media&token=011b1d07-ae8d-439b-aed7-cffd0a8b6778"
                      alt="avatar"
                      className="img-fluid rounded-circle mb-3"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />

                    {/* DETAILS */}
                    <ul className="list-group text-start">
                      <li className="list-group-item">
                        <strong>Name:</strong> {contact.name}
                      </li>
                      <li className="list-group-item">
                        <strong>Mobile:</strong> {contact.phone}
                      </li>
                      <li className="list-group-item">
                        <strong>Email:</strong> {contact.email}
                      </li>
                      <li className="list-group-item">
                        <strong>Address:</strong> {contact.address}
                      </li>
                      <li className="list-group-item">
                        <strong>Location:</strong> {contact.location}
                      </li>
                    </ul>

                    {/* BACK BUTTON */}
                    <div className="mt-3">
                      <Link to="/contacts/list" className="btn btn-warning">
                        Back to Contacts
                      </Link>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default ViewContact