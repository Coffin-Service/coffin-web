import React, {useEffect,useState} from "react"
import {nanoid} from "nanoid";
import { Link,useLocation,useNavigate, useParams } from "react-router-dom"
import NavbarPartnerFuneral from "../../components/NavbarPartnerFuneral"
import data from"../../mock-data-funeral.json"
import pic from"../../picture/dummypic.jpg";
import ReadOnlyRow from "./readRowFuneral";
import EditableRow from "./editRowFuneral";
import './partner.css';
import axios from "../../components/axios";
import placeholder from "../../picture/placeholder.png"
import './partner.css';

const BASE_URL ="https://coffin-server-production.up.railway.app";
const VIEW_URL = `${BASE_URL}/api/employee/funeral-services`;
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;

const PartFunServ = () => {
  const [file,setFile]=useState();
  // const testId=useParams();
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

  const navigate=useNavigate();
  const location=useLocation();
  
  const [funeral,setFuneral]=useState({});
  const [funeralName,setFuneralName]=useState('');
  const [funeralAddress,setFuneralAddress]=useState('');
  const [funeralDesc,setFuneralDesc]=useState('');
  const [funeralId,setFuneralId]=useState('');
  const [funeralImage,setFuneralImage]=useState();
  const [loginDetail,setLoginDetail]=useState([]);

  // const[{alt,src},setImg]=useState({
    //   src:placeholder,
    //   alt:'Upload an Image'
    // });
    
  const from = location.state?.from?.pathname || `/partner/funeral/service/edit/${funeralId}`;
  
  useEffect(()=>{
    console.log(localStorage.getItem('token'));
    getFuneralService();
    getLoginDetailRole();
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
        
        
        if(res.data.data.image===0||res.data.data.image===null){setFuneralImage(placeholder)}
        else{setFuneralImage(res.data.data.image);}

        console.log(res.data.data.image);
        // console.log(res.data.data);
      })
      // .then(res =>console.log( res.data.data))
      .catch(err=>console.log(err))
  }

  function getLoginDetailRole(){
    console.log(localStorage.getItem('token'));
    const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
    const getRole = axios.get(LOGIN_DETAIL_URL,{
        headers:{'Authorization':AuthToken}
      })
        .then(res=>{setLoginDetail(res.data.data)})
        // .then(res=>console.log(res.data.data))
        // .then(data=>console.log(data))
        .catch(err=>console.log(err))
  }

  const handleUpdate =()=>{
    navigate(from, { replace: true });
  }

  const handleImgError = () =>{
    setFuneralImage(placeholder);
  }
  return (
    <>
    <div className='bg-image'>
      <NavbarPartnerFuneral user={loginDetail.name}/>
      <div className="font_color">
        {/* <h1>
          This is Funeral Service Page for Partner (VIEW FUNERAL SERVICE)
        </h1> */}

        <div style={{flexDirection:'row',display:'flex'}}>
          <table  style={{marginTop:'1%',marginLeft:'5%',width:'67%'}}>
            {/* <thead>
              <tr>
                <th style={{width:'20%'}}>b</th>
                <th style={{width:'20%'}}>a</th>
              </tr>
            </thead> */}
            <tbody>
                <tr style={{height:'20%'}}>
                  <td style={{width:'10%'}}>Funeral Name</td>
                  <td ><div style={{width:'50%',whiteSpace:'pre-wrap',overflowWrap:'break-word'}}>{funeralName}</div></td>
                </tr>
                <tr style={{height:'20%'}}>
                  <td style={{width:'20%'}}>Address</td>
                  <td><div style={{width:'50%',whiteSpace:'pre-wrap',overflowWrap:'break-word'}}>{funeralAddress}</div></td>
                </tr>
                <tr style={{height:'20%'}}>
                  <td style={{width:'20%'}}>Description</td>
                  <td><div style={{width:'50%',whiteSpace:'pre-wrap',overflowWrap:'break-word'}}>{funeralDesc}</div></td>
                </tr>
                <tr></tr>
            </tbody>
          </table>

          <img src={funeralImage} width={350} height={250} style={{border:'0.1px solid gray',alignSelf:'flex-end',marginTop:'1%',borderRadius:'10%'}} onError={handleImgError}/>
          {/* <img src={placeholder} width={400} height={300} style={{alignSelf:'flex-end',padding:'1%',backgroundColor:'gray'}} onError={handleImgError}/> */}

        </div>
        
        <button style={{width:'10%',backgroundColor:'#F3B792',marginLeft:'85%',borderRadius:'30px'}} onClick={handleUpdate}>
          Change
        </button>
      </div>

        
    </div>
    </>
  );
};

export default PartFunServ;
