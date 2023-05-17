import React, {useState} from "react"
import { Link, useNavigate, useLocation } from 'react-router-dom';
import App from "../../App";
import NavbarPartCof from "../../components/NavbarPartnerCoffin";
import data from "../../mock-data-funeral-trans.json"
import axios from "../../components/axios";
import placeholder from "../../picture/placeholder.png"

const POST_URL = 'https://coffin-server-production.up.railway.app/api/employee/coffin-packages';

const PartCofServ = () => {
  const [active,setActive]=useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/partner";

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [quantity, setQuantity] = useState('');
  const [desc, setDesc] = useState('');
  const [errMsg, setErrMsg] = useState('');
  
  const [image, setImage] = useState();
  const[{alt,src},setImg]=useState({
    src:placeholder,
    alt:'Upload an Image'
  });

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
  // console.log(image)

  const handlebase64Image=(e)=>{
    console.log(e.target.files)
    const data = new FileReader()
    data.addEventListener('load',()=>{
      setImage(data.result)
    })
    data.readAsDataURL(e.target.files[0])
  }
  // console.log(image)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const AuthToken = 'Bearer '.concat(localStorage.getItem('token'))

    try {
      console.log(image)
        const response = await axios.post(POST_URL,
          { name:name, address:address,price:price,weight:weight,length:length,width:width,height:height,quantity:quantity,description:desc,image:image },
          {headers:{'Authorization':AuthToken}}
        )
          setName('');
          setAddress('');
          setPrice('');
          setWeight('');
          setLength('');
          setWidth('');
          setHeight('');
          setQuantity('');
          setDesc('');
          setImage('');
                  // navigate(from, { replace: true });
                
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

              }
          }

  return (
    <>
    <NavbarPartCof/>
      {/* <div>
        <ul>
          <li>
            <Link to="/admin/transaction/funeral">Funeral Service</Link>
          </li>
          <li>
            <Link to="/admin/transaction/coffin"
            style={{opacity:active?0.7:1}}>Coffin Service</Link>
          </li>
        </ul>
      </div> */}

      <div>
        <h1>
          This is Coffin Service Page for Partner
        </h1>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <label for='name' style={{color:'black'}}>
            Coffin name:
          </label>
          <input 
              type="text"
              id='name'
              value={name}
              onChange={(e)=> setName(e.target.value)} />

          <label for='address' style={{color:'black'}}>
            Address:
          </label>
          <input 
              type="text"
              id='address'
              value={address}
              onChange={(e)=> setAddress(e.target.value)}/>

          <label for='price' style={{color:'black'}}>
            Price:
          </label>
          <input 
            type="number" 
            id='price'
            value={price}
            onChange={(e)=> setPrice(e.target.value)}/>

          <label for='weight' style={{color:'black'}}>
            Weight:
          </label>
          <input 
            type="number" 
            id='weight'
            value={weight}
            onChange={(e)=> setWeight(e.target.value)}/>
           
           <label for='length_width_height' style={{color:'black'}}>
            Dimensions:
          </label>
          <label id='length_width_height' style={{color:'black'}}>
            Length
            <input 
              type="number" 
              value={length}
              onChange={(e)=> setLength(e.target.value)}/>
            Width
            <input 
              type="number" 
              value={width}
              onChange={(e)=> setWidth(e.target.value)}/>
            Height
            <input 
              type="number" 
              value={height}
              onChange={(e)=> setHeight(e.target.value)}/>
          </label>

          <label for='quantity' style={{color:'black'}}>
            Quantity:
          </label>
          <input 
            type="number" 
            id='quantity'
            value={quantity}
            onChange={(e)=> setQuantity(e.target.value)}/>

          <label for='desc' style={{color:'black'}}>
            Description:
          </label>
          <input 
            type="text" 
            id='desc'
            value={desc}
            onChange={(e)=> setDesc(e.target.value)}/>

          <label for='image' style={{color:'black'}}>
            Input Image:
          </label>
          <input 
            type="file"
            accept=".png, .jpg, .jpeg" 
            id='image'
            onChange={handleImage}/>
          <img src={src} alt={alt} />

          {/* <input
            type="file"
            onChange={handlebase64Image}/>
          <img src={image}/> */}
          <button>Confirm</button>
        </form>
      </div>
    </>
  );
};

export default PartCofServ;
