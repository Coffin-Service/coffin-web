import React, {useRef,useEffect, useState} from "react"
import {nanoid} from "nanoid";
import { Link , useNavigate, useLocation } from "react-router-dom"
import NavbarPartnerFuneral from "../../components/NavbarPartnerFuneral"
import data from "../../mock-data-funeral.json"
import EditableRow from "./editRowFuneral";
import ReadOnlyRow from "./readRowFuneral";
import axios from "../../components/axios";
import e from "cors";
import './partner.css';
import placeholder from "../../picture/placeholder.png"
import ButtonFacility from "./buttonFacility";

const BASE_URL="https://coffin-server-production.up.railway.app";
const FUN_URL = `${BASE_URL}/api/employee/funeral-packages`;
const FAC_URL =`${BASE_URL}/api/employee/funeral-facilities`;
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;

let facilityToAdd=[];

const PartFunServDataHisEdit = () => {
  // const [trans,setTrans]=useState(data);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/partner/funeral/service_data";

  const userRef = useRef();
  const imgRef=useRef();
  const errRef = useRef();
  
  const [active,setActive]=useState(true);
  
  const [facList,setFacList]=useState([]);
  const [loginDetail,setLoginDetail]=useState([]);

  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'));

  const [trans, setTrans] = useState(data);
  const [isLoad,setIsLoad]=useState(true);
  
  const [name, setName] = useState('');
  const [image,setImage]=useState('-');
  const [categoryName,setCategoryName]=useState('');
  const [price,setPrice]=useState(0);
  const [facility,setFacility]=useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [facilityAdd,setFacilityAdd]= useState([])
  
  

  useEffect(() => {
    userRef.current.focus();
    // imgRef.current.focus();
}, [])
  useEffect(() => {
    setErrMsg('');
  }, [name, image, categoryName, price])
  useEffect(()=>{
    getLoginDetailRole();
    getFac();
    console.log("facilitysaved"+facility);
  },[])

  const handleClick = () => {
    setActive(!active);
  }



  const [categories, setCategories] = 
  // useState();
  useState({
    name: "",
    price: 0,
    facilities:[""]
  });

  function getFac(){
    const funAPI = axios.get(FAC_URL,
      {
        headers:{'Authorization':AuthToken}
      })
        .then(res=>{
          // console.log(res?.data.data);
          setFacList(res?.data?.data);
  
          // console.log(funList.categories.facilities.logo)
        })
        // .then(res =>console.log(res.data))
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('pressed submit')
    console.log(facilityToAdd)
    // setFacilityAdd(facilityToAdd)
    // console.log(facilityAdd)
    const newCategories = [{
      name : categoryName,
      price : price,
      facilities : facilityToAdd
    }];
    console.log(newCategories);
    try {
        const response = axios.post(FUN_URL,
          { name:name, image:image, categories:newCategories },
          { headers:{'Authorization':AuthToken}}
        )
                setName('');
                setImage('');
                setCategories();
                setFacility('');
                  navigate(from, { replace: true });
                
              } catch (err) {
                  console.log(err);
                  // errRef.current.focus();
              }
          }
  
  function onLoad(){
    if(image.length>0){
      console.log(true)
      setIsLoad(false);
    }
  }

  function handleFac(id,e){
    // setFacility(facility=>({tags:[tags.facility,id]}));
    console.log(facility);
    if(facilityToAdd.includes(id)){//remove
      e.currentTarget.style.backgroundColor="";
      let updateList = facilityToAdd.filter((facilityToAdd)=> facilityToAdd !== id)
      facilityToAdd=updateList;

      // let updatedList = facilityToAdd.filter((facilityAdd)=> facilityAdd !== id)
      // setFacilityAdd(updatedList);
    }
    else{//add
      e.currentTarget.style.backgroundColor="gray";
      facilityToAdd.push(id);
      // facilityAdd.push(id);
      console.log("facilityadded"+facilityToAdd);
    }
    // setFacility((facility)=>([facility,id]))

    console.log("current List "+facilityToAdd);
  }

  function handleFacility(){
    facList.map((fac)=>{
      if(true){
      return (
        <button style={{}} onClick={(e)=>{e.preventDefault();handleFac(fac.id)}}>
          <img src={fac.logo}/>
          <div>{fac.name}</div>
        </button>
      )
      }
    })
  }

  const handleImgError = () =>{
    setImage(placeholder);
  }

  const handleImage= (e) =>{
    if(e.target.files[0]){
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
  }

  //get facility logo function
  
  return (
    
    <>
      <NavbarPartnerFuneral user={loginDetail.name}/>
      <div>
        {/* <h1>
          This is Funeral Service Data History Edit Page for Partner
        </h1> */}
        {/* <h1>Data</h1>
         */}
        <div style={{textAlign:"center"}}>
          <form onSubmit={handleSubmit}style={{marginLeft:'3%',marginTop:'1%'}}>

            <table className="font_color">
            <thead>
              <tr>
                <th style={{width:'28%',textAlign:'left'}}>Package</th>
                <th style={{width:'100%',textAlign:'left'}}>Category</th>
                {/* <th></th> */}
              </tr>
            </thead>
              <tbody>
                {/* <tr>
                  <td className="custom_rowName" style={{fontWeight:'bold'}}>Package</td>
                  <td className="custom_rowName">Category</td>
                </tr> */}
                <tr>
                  <td style={{textAlign:'left'}}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                      <label htmlFor="packageName">Package Name:</label>
                      <input
                          ref={userRef}
                          type="text"
                          id="packageName"
                          autoComplete="off"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          required
                          style={{width:'80%',borderRadius:'30px',paddingLeft:'3%'}}
                      />
                      
                      
                      <label htmlFor="packageName">
                        <img src={image} width={350} height={250} style={{border:'0.1px solid gray',borderRadius:'10%'}}  onError={handleImgError}/>
                      </label>
                      
                      <input
                        type="file"
                        id="image"
                        accept=".png, .jpg, .jpeg" 
                        onChange={handleImage}
                        
                      />

                    </div>
                  </td>

                  <td style={{textAlign:'left'}}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                      
                      <label htmlFor="categoryName">Category Name:</label>
                      <input
                          type="text"
                          id="categoryName"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setCategoryName(e.target.value)}
                          value={categoryName}
                          required
                          style={{width:'40%',borderRadius:'30px',paddingLeft:'2%'}}
                      />
                      <label htmlFor="facility">Facility:</label>

                      {/* not done yet */}
                      <div style={{width:'100%'}}>
                        {
                          
                          facList.map((fac,i)=>(
                            // <ButtonFacility key={i} fac={fac.id} handleFac={facilityId}/>
                            <button style={{border:'none'}} onClick={(e)=>{e.preventDefault();handleFac(fac.id,e)}} id="buttonfacility">
                              <img src={fac.logo}/>
                              <div>{fac.name}</div>
                            </button>
                          ))
                        }
                        {/* <button onClick={()=>handleFacility()}>Check Selected</button> */}
                        
                      </div>

                      <label htmlFor="price">Price:</label>
                      <input
                          type="number"
                          id="price"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setPrice(e.target.value)}
                          value={price}
                          required
                          style={{height:'40px',width:'40%',borderRadius:'30px',paddingLeft:'2%'}}
                      />

                    </div>
                  </td>
                  
                </tr>
              </tbody>
            </table>

            <button style={{alignSelf:'flex-start',width:'10%',border:'none',borderRadius:'30px',backgroundColor:'#F3B792',marginRight:'20%'}}>
              {/* <Link> */}
                Add Package
              {/* </Link> */}
            </button>

          </form>
        </div>
      </div>
    </>
  );
};

export default PartFunServDataHisEdit;
