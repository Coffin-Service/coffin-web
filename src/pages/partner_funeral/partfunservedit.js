import React, {useRef,useEffect,useState} from "react"
import {nanoid} from "nanoid";
import { Link,useNavigate,useLocation,useParams } from "react-router-dom"
import NavbarPartnerFuneral from "../../components/NavbarPartnerFuneral"
import data from"../../mock-data-funeral.json"
import pic from"../../picture/dummypic.jpg";
import ReadOnlyRow from "./readRowFuneral";
import EditableRow from "./editRowFuneral";
import './partner.css';
import axios from "../../components/axios";
import placeholder from "../../picture/placeholder.png"


const VIEW_PUT_URL = 'https://coffin-server-production.up.railway.app/employee/funeral-services';

const PartFunServEdit = () => {
  const [file,setFile]=useState();
  // const handleChange=(e)=>{
  //   setFile(URL.createObjectURL(e.target.files[0]));
  // }

  // const [contacts, setContacts] = useState(data);
  // const [addFormData, setAddFormData] = useState({
  //   packageName: "",
  //   category: "",
  //   categoryName: "",
  //   price: "",
  //   facility:""
  // });

  // const [editFormData, setEditFormData] = useState({
  //   packageName: "",
  //   category: "",
  //   categoryName: "",
  //   price: "",
  //   facility:""
  // });

  // const [editContactId, setEditContactId] = useState(null);

  // const handleAddFormChange = (event) => {
  //   event.preventDefault();

  //   const fieldName = event.target.getAttribute("name");
  //   const fieldValue = event.target.value;

  //   const newFormData = { ...addFormData };
  //   newFormData[fieldName] = fieldValue;

  //   setAddFormData(newFormData);
  // };

  // const handleEditFormChange = (event) => {
  //   event.preventDefault();

  //   const fieldName = event.target.getAttribute("name");
  //   const fieldValue = event.target.value;

  //   const newFormData = { ...editFormData };
  //   newFormData[fieldName] = fieldValue;

  //   setEditFormData(newFormData);
  // };

  // const handleAddFormSubmit = (event) => {
  //   event.preventDefault();

  //   const newContact = {
  //     id: nanoid(),
  //     packageName: addFormData.packageName,
  //     category: addFormData.category,
  //     categoryName: addFormData.categoryName,
  //     price: addFormData.price,
  //     facility: addFormData.facility,
  //   };

  //   const newContacts = [...contacts, newContact];
  //   setContacts(newContacts);
  // };

  // const handleEditFormSubmit = (event) => {
  //   event.preventDefault();

  //   const editedContact = {
  //     id: editContactId,
  //     packageName: addFormData.packageName,
  //     category: addFormData.category,
  //     categoryName: addFormData.categoryName,
  //     price: addFormData.price,
  //     facility: addFormData.facility,
  //   };

  //   const newContacts = [...contacts];

  //   const index = contacts.findIndex((contact) => contact.id === editContactId);

  //   newContacts[index] = editedContact;

  //   setContacts(newContacts);
  //   setEditContactId(null);
  // };

  // const handleEditClick = (event, contact) => {
  //   event.preventDefault();
  //   setEditContactId(contact.id);

  //   const formValues = {
  //     id: nanoid(),
  //     packageName: addFormData.packageName,
  //     category: addFormData.category,
  //     categoryName: addFormData.categoryName,
  //     price: addFormData.price,
  //     facility: addFormData.facility,
  //   };

  //   setEditFormData(formValues);
  // };

  // const handleCancelClick = () => {
  //   setEditContactId(null);
  // };

  // const handleDeleteClick = (contactId) => {
  //   const newContacts = [...contacts];

  //   const index = contacts.findIndex((contact) => contact.id === contactId);

  //   newContacts.splice(index, 1);

  //   setContacts(newContacts);
  // };

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/partner/funeral/service";

  // const userRef = useRef();
  // const errRef = useRef();
  const testId = useParams();
  
  // console.log(testId); 
  // const {getId}=location.state;
  // console.log(getId);
  const[id,setId]=useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const[description,setDescription]=useState('');
  const[image,setImage]=useState();
  const[{alt,src},setImg]=useState({
    src:placeholder,
    alt:'Upload an Image'
  });
  const [errMsg, setErrMsg] = useState('');

  const handleImage= (e) =>{
    if(e.target.files[0]){
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
      const data = new FileReader()
      data.addEventListener('load',()=>{
        setImage(data.result)
      })
      data.readAsDataURL(e.target.files[0])
    }
    // console.log(image)
  }

  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'));
  // console.log(AuthToken);
  // useEffect(() => {
    //   userRef.current.focus();
    // }, [])
    
    useEffect(() => {
      setErrMsg('');
    }, [name, address,description,image])
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(typeof testId.id);
      setImage("empty");
      console.log(image);
      
      try {
        const response = await axios.put(`https://coffin-server-production.up.railway.app/api/employee/funeral-services/${testId.id}`,
          { name:name, address:address,description:description,image:image },
          { headers:
            {
            'Authorization':AuthToken,
            } 
          }
        )
                // const accessToken = response?.data.data.access_token;
                // localStorage.setItem('token',accessToken);
              //   const getToken = await getLoginDetailRole();
                // const roles = loginDetail.name;
                // console.log(loginDetail);
                // console.log(loginDetail.name);
                // console.log(roles);
                // setAuth({email, pwd, roles, accessToken });
                
                setName('');
                setAddress('');
                setDescription('');
                setImage('');
                  navigate(from, { replace: true });
                
              } catch (err) {
                  if (!err?.response) {
                      setErrMsg('No Server Response');
                  } else if (err.response?.status === 400) {
                      setErrMsg('Missing Username or Password');
                  } else if (err.response?.status === 401) {
                      setErrMsg('Unauthorized');
                  } else {
                      setErrMsg('Login Failed');
                  }
                  if (err.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                  } else if (err.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(err.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                  }
                  // errRef.current.focus();
              }
          }

  return (
    <>
      <NavbarPartnerFuneral/>
      <div className="font_color">
        <h1>
          This is Funeral Service Page for Partner (EDIT FUNERAL SERVICE)
        </h1>
        <h1>Add New Package</h1>
        <form onSubmit={handleSubmit}>

          <label for='name' style={{color:'black'}}>Funeral Name</label> 
          <input 
            type="text" 
            id="name"
            required="required"
            placeholder="Input funeral name"
            onChange={(e)=>setName(e.target.value)}
            style={{width:250}}/>

            <label for='address' style={{color:'black'}}>Address</label>
            <input 
              type="text" 
              id="address"
              required="required"
              placeholder="Input address"
              onChange={(e)=>setAddress(e.target.value)}
              style={{width:250}}/>

            <label for='description' style={{color:'black'}}>Description</label>
            <input 
              type="text" 
              id='description'
              placeholder="Description ..."
              onChange={(e)=>setDescription(e.target.value)}
              style={{width:350,height:100}}/>
            {/* <Link to="/partner/funeral/service"> */}
            {/* </Link> */}
            {/* add the image upload area */}

            <label for='image' style={{color:'black'}}>
            Input Image:
            </label>
            <input 
              type="file"
              accept=".png, .jpg, .jpeg" 
              id='image'
              onChange={handleImage}/>

              <button type="submit">Confirm</button>
        </form>

        {/* <form>
          <label>Package</label>
          <table className="custom_tablePackage">
            <thead>
              <tr>
                <th className="custom_rowPackageName">
                  <label>Package Name</label>
                  <br/>
                  <input 
                      type="text" 
                      name="packageName"
                      required="required"
                      placeholder="Input Package Name"
                      onChange={handleAddFormChange}/>
                  <br/>
                  <label>Upload Image</label>
                  <br/>
                  <input 
                      type="file" 
                      name="addCategory"
                      placeholder="Upload image"
                      onChange={{handleChange,handleAddFormChange}}
                      
                  />
                  <img src={file}/>
                  
                </th>
                <th className="custom_rowCategory">
                  <label>Category</label>
                  <br/>
                  <input 
                      type="text" 
                      name="categoryName"
                      required="required"
                      placeholder="Input Category Name"/>
                  <br/>
                  <label>Facility</label>
                  <br/>
                  <img src={pic} style={{width:50,padding:3}}/>
                  <img src={pic} style={{width:50,padding:3}}/>
                  <img src={pic} style={{width:50,padding:3}}/>
                  <img src={pic} style={{width:50,padding:3}}/>
                  <br/>
                  <label>Price</label>
                  <br/>
                  <input 
                      type="text" 
                      name="price"
                      required="required"
                      placeholder="Input Package Price"/>
                </th>
                {/* <th className="custom_rowAddMore">
                  <label>Add More Category</label>
                  <input 
                      type="file" 
                      name="addCategory"
                      placeholder="Upload image"
                      onChange={handleChange}
                  />
                  <img src={file}/>
                </th>
              </tr>
            </thead>
          </table>
          <button type="submit">Add Package</button>
        </form> */}
      </div>
    </>
  );
};

export default PartFunServEdit;
