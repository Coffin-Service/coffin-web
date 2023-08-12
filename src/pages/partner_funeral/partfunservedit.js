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


const BASE_URL ="https://coffin-server-production.up.railway.app";
const VIEW_PUT_URL = `${BASE_URL}/api/employee/funeral-services`;
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;

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
  
  const [errorMsg, setErrorMsg] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imageFocus, setImageFocus] = useState(false);
  // console.log(testId); 
  // const {getId}=location.state;
  // console.log(getId);
  const[id,setId]=useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const[description,setDescription]=useState('');
  const[image,setImage]=useState();
  const [errMsg, setErrMsg] = useState('');
  const [loginDetail,setLoginDetail]=useState([]);

  useEffect(()=>{
    // console.log(localStorage.getItem('token'));
    handleImgError();
    getLoginDetailRole();
  },[])

  const handleImage= (e) =>{
    const MAX_FILE_SIZE = 1024;
    const fileSizeKiloBytes = e.target.files[0].size / 1024;
    if(fileSizeKiloBytes>MAX_FILE_SIZE){
      setErrMsg("Max file size is 1MB");
      setIsSuccess(false);
      return;
    }

    if(e.target.files[0]&&fileSizeKiloBytes<MAX_FILE_SIZE){
      // setImg({
      //   src: URL.createObjectURL(e.target.files[0]),
      //   alt: e.target.files[0].name,
      // });
      const data = new FileReader()
      data.addEventListener('load',()=>{
        setImage(data.result)
      })
      data.readAsDataURL(e.target.files[0])
    }
    // console.log(image)
    setErrorMsg("");
    setIsSuccess(true);
  }
  const handleImgError = () =>{
    setImage(placeholder);
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
      console.log(image);
      
      try {
       
        const response = await axios.put(`${VIEW_PUT_URL}/${testId.id}`,
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
  
  function getLoginDetailRole(){
    console.log(localStorage.getItem('token'));
    const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))
    const getRole = axios.get(LOGIN_DETAIL_URL,{
      headers:{'Authorization':AuthToken}
    })
      .then(res=>{setLoginDetail(res.data.data)})
      .catch(err=>console.log(err))
  }

  return (
    <>
      <div className='bg-image'>
      <NavbarPartnerFuneral user={loginDetail.name}/>
      <div className="font_color">
        {/* <h1>
          This is Funeral Service Page for Partner (EDIT FUNERAL SERVICE)
        </h1> */}
        {/* <h1>Add New Package</h1> */}
        <form onSubmit={handleSubmit} style={{}}>
          <div style={{display:'flex',flexDirection:'row', marginLeft:'5%'}}>
            <div style={{display:'flex',flexDirection:'column',width:'70%'}}>
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
              <textarea 
                type="text" 
                id='description'
                placeholder="Description ..."
                onChange={(e)=>setDescription(e.target.value)}
                style={{width:350,height:100,overflowWrap:'break-word',resize:'none'}}/>
              
              </div>
              {/* <Link to="/partner/funeral/service"> */}
              {/* </Link> */}
              {/* add the image upload area */}


              <div style={{margin:'1%',display:'flex',flexDirection:'column'}}>
                <img src={image} width={350} height={250} style={{border:'0.1px solid gray',borderRadius:'10%'}} onError={handleImgError}/>
                <label for='image' style={{color:'black',margin:'1%'}}>
                Input Image:
                </label>
                <input 
                  type="file"
                  accept=".png, .jpg, .jpeg" 
                  id='image'
                  onChange={handleImage}
                  onFocus={() => setImageFocus(true)}
                  onBlur={() => setImageFocus(false)}
                  />
                <p className={imageFocus && !isSuccess ? "instructions" : "offscreen"}>
                  Max image size is 1MB<br />
                </p>
              </div>
            </div>
            <button type="submit" style={{width:'10%',backgroundColor:'#F3B792',alignSelf:'flex-end',marginRight:'7%',borderRadius:'30px'}}>Confirm</button>
        </form>

        
      </div>
      </div>
    </>
  );
};

export default PartFunServEdit;
