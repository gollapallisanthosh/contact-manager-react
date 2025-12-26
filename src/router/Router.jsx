import { createBrowserRouter } from "react-router-dom";
import Navbar from "../common/UI/Navbar";
import ContactList from "../components/contactList/ContactList";
import AddContact from "../components/addContact/AddContact";
import ViewContact from "../components/viewContact/ViewContact";
import EditContact from "../components/editContact/EditContact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: (
      <h2 className="text-center mt-5 text-danger">
         404 - Page Not Found
      </h2>
    ),
    children: [
      {
        index: true,
        element: <ContactList />
      },
      {
        path: "contacts/list",
        element: <ContactList />
      },
      {
        path: "contacts/add",
        element: <AddContact />
      },
      {
        path: "contacts/view/:contactId",
        element: <ViewContact />
      },
      {
        path: "contacts/edit/:contactId",
        element: <EditContact />
      }
    ]
  }
]);