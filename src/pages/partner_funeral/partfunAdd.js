import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom"
import axios from '../../components/axios';
import NavbarPartnerFuneral from "../../components/NavbarPartnerFuneral"
import {useDropzone} from 'react-dropzone';

const BASE_URL ="https://coffin-server-production.up.railway.app";
const LOGIN_DETAIL_URL = `${BASE_URL}/api/employee/me`;

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

const PartFunAdd = () => {

    useEffect(()=>{
        getLoginDetailRole();
      },[])

    const [loginDetail,setLoginDetail]=useState([]);

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

    function Previews(props) {
        const [files, setFiles] = useState([]);
        const {getRootProps, getInputProps} = useDropzone({
          accept: {
            'image/*': []
          },
          onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
              preview: URL.createObjectURL(file)
            })));
          }
        });
        
        const thumbs = files.map(file => (
          <div style={thumb} key={file.name}>
            <div style={thumbInner}>
              <img
                src={file.preview}
                style={img}
                // Revoke data uri after image is loaded
                onLoad={() => { URL.revokeObjectURL(file.preview) }}
              />
            </div>
          </div>
        ));
      
        useEffect(() => {
          // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
          return () => files.forEach(file => URL.revokeObjectURL(file.preview));
        }, []);
      
        return (
          <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside style={thumbsContainer}>
              {thumbs}
            </aside>
          </section>
        );
      }

    function AcceptMaxFiles(props) {
        const {
          acceptedFiles,
          fileRejections,
          getRootProps,
          getInputProps
        } = useDropzone({    
          maxFiles:2
        });
      
        const acceptedFileItems = acceptedFiles.map(file => (
          <li key={file.path}>
            {file.path} - {file.size} bytes
          </li>
        ));
      
        const fileRejectionItems = fileRejections.map(({ file, errors  }) => { 
         return (
           <li key={file.path}>
                {file.path} - {file.size} bytes
                <ul>
                  {errors.map(e => <li key={e.code}>{e.message}</li>)}
               </ul>
      
           </li>
         ) 
        });
        
      
        return (
          <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
              <em>(2 files are the maximum number of files you can drop here)</em>
            </div>
            <aside>
              <h4>Accepted files</h4>
              <ul>{acceptedFileItems}</ul>
              <h4>Rejected files</h4>
              <ul>{fileRejectionItems}</ul>
            </aside>
          </section>
        );
      }

    return (
        <>
        <div className='bg-image'>
            <NavbarPartnerFuneral user={loginDetail.name}/>
                <h1 style={{color:'black'}}>Post Add Page</h1>
                <br />
            <div>
                <label for='description' style={{color:'black'}}></label>
                <textarea 
                    type="text" 
                    id='description'
                    placeholder="Write your post here"
                    // onChange={(e)=>setDescription(e.target.value)}
                    style={{width:750,height:300,overflowWrap:'break-word',resize:'none'}}/>
            </div>

            <AcceptMaxFiles/>
            <Previews/>
            <button>Confirm</button>
            <div style={{borderBottom:'1px solid black',marginTop:'3%'}}></div>
        </div>
        </>
    )
}

export default PartFunAdd
