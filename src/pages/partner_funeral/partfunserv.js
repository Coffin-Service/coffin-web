import React, {useEffect,useState} from "react"
import {nanoid} from "nanoid";
import { Link, useParams } from "react-router-dom"
import NavbarPartnerFuneral from "../../components/NavbarPartnerFuneral"
import data from"../../mock-data-funeral.json"
import pic from"../../picture/dummypic.jpg";
import ReadOnlyRow from "./readRowFuneral";
import EditableRow from "./editRowFuneral";
import './partner.css';
import axios from "../../components/axios";
import placeholder from "../../picture/placeholder.png"

const VIEW_URL = 'https://coffin-server-production.up.railway.app/api/employee/funeral-services';

const PartFunServ = () => {
  const [file,setFile]=useState();
  // const testId=useParams();
  const handleChange=(e)=>{
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    packageName: "",
    category: "",
    categoryName: "",
    price: "",
    facility:""
  });

  const [editFormData, setEditFormData] = useState({
    packageName: "",
    category: "",
    categoryName: "",
    price: "",
    facility:""
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      packageName: addFormData.packageName,
      category: addFormData.category,
      categoryName: addFormData.categoryName,
      price: addFormData.price,
      facility: addFormData.facility,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      packageName: addFormData.packageName,
      category: addFormData.category,
      categoryName: addFormData.categoryName,
      price: addFormData.price,
      facility: addFormData.facility,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      id: nanoid(),
      packageName: addFormData.packageName,
      category: addFormData.category,
      categoryName: addFormData.categoryName,
      price: addFormData.price,
      facility: addFormData.facility,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  const [funeral,setFuneral]=useState({});
  const [funeralName,setFuneralName]=useState('');
  const [funeralAddress,setFuneralAddress]=useState('');
  const [funeralDesc,setFuneralDesc]=useState('');
  const [funeralId,setFuneralId]=useState('');
  const [funeralImage,setFuneralImage]=useState();
  const[{alt,src},setImg]=useState({
    src:placeholder,
    alt:'Upload an Image'
  });
  
  
  useEffect(()=>{
    console.log(localStorage.getItem('token'));
    getFuneralService();
  },[])

  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
  function getFuneralService(){
    const funeralAPI = axios.get(VIEW_URL,
    {
      headers:{'Authorization':AuthToken}
    })
      .then(res=>{
        setFuneralName(res.data.data.name);
        setFuneralAddress(res.data.data.address);
        setFuneralDesc(res.data.data.description);
        setFuneralId(res.data.data.id);
        setImg(res.data.data.image);
        if(res.data.data.image===0){setFuneralImage(placeholder)}
        else{setFuneralImage(res.data.data.image);}

        console.log(res.data.data.image);
        // console.log(res.data.data);
      })
      // .then(res =>console.log( res.data.data))
      .catch(err=>console.log(err))
  }

  return (
    <>
      <NavbarPartnerFuneral/>
      <div className="font_color">
        <h1>
          This is Funeral Service Page for Partner (VIEW FUNERAL SERVICE)
        </h1>

      <div>
        <table>
          <thead>
            <tr>
              <th>Funeral Service</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>Funeral Name:</td>
                <td>{funeralName}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{funeralAddress}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{funeralDesc}</td>
              </tr>
          </tbody>
        </table>

        <div>image</div>
        <img src={funeralImage} alt={placeholder}/>

        </div>

        <form>
          <Link to={`/partner/funeral/service/edit/${funeralId}`}
          >
            <button>
              Update
            </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default PartFunServ;
