import React from "react";
import { Link } from "react-router-dom"

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.name}</td>
      <td>{contact.category}</td>
      <td>{contact.categoryName}</td>
      <td>{contact.price}</td>
      <td>{contact.facility}</td>
      
      <td>
        <button>
          <Link to="/partner/funeral/service_data/detail" 
            state={{packageName:contact.name,category:contact.category}}>
              Detail
          </Link>
        </button>
      </td>

      <td>
        {/* <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button> */}
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;