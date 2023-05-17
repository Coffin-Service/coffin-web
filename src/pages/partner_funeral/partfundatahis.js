import React, {useEffect, useState} from "react"
import {nanoid} from "nanoid";
import { Link } from "react-router-dom"
import NavbarPartnerFuneral from "../../components/NavbarPartnerFuneral"
import data from "../../mock-data-funeral.json"
import EditableRow from "./editRowFuneral";
import ReadOnlyRow from "./readRowFuneral";
import axios from "../../components/axios";

const FUN_URL = 'https://coffin-server-production.up.railway.app/api/employee/funeral-packages';

const PartFunServDataHis = () => {
  // const [trans,setTrans]=useState(data);

  const [active,setActive]=useState(true);

  const [funList,setFunList]=useState([]);
  const [localFunList,setLocalFunList]=useState(funList);
  
  const AuthToken = 'Bearer '.concat(localStorage.getItem('token'));

  useEffect(()=>{
    console.log(localStorage.getItem('token'));
    refreshFunList();
  },[])

  const handleClick = () => {
    setActive(!active);
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

  const [trans, setTrans] = useState(data);

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
      id: trans,
      packageName: addFormData.packageName,
      category: addFormData.category,
      categoryName: addFormData.categoryName,
      price: addFormData.price,
      facility: addFormData.facility,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === trans);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setTrans(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setTrans(contact.id);

    const formValues = {
      packageName: addFormData.packageName,
      category: addFormData.category,
      categoryName: addFormData.categoryName,
      price: addFormData.price,
      facility: addFormData.facility,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setTrans(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  function refreshFunList(){
    const cofAPI = axios.get(FUN_URL,
    {
      headers:{'Authorization':AuthToken}
    })
      .then(res=>{
        setFunList(res.data.data);
        console.log(funList);
        // console.log(funList.categories.facilities.logo)
      })
      // .then(res =>console.log(res.data))
      .catch(err=>console.log(err))
  }

  return (
    
    <>
      <NavbarPartnerFuneral/>
      <div>
        <h1>
          This is Funeral Service Data History Page for Partner
        </h1>
        <h1>Data</h1>
        <div style={{textAlign:"center"}}>
          <form>
          <table className="center">
            <thead>
              <tr>
                <th>Package Name</th>
                <th>Category</th>
                <th>Price (Rp)</th>
                <th>Facility</th>
                <th>Detail</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody >
              {trans.map((contact)=>(
                <>
                  {/* {trans===contact.id?(
                    <EditableRow 
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}/>
                  ):(
                    <ReadOnlyRow
                      contact={contact}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}/>
                  )} */}
                </>

                // <tr>
                //   <td>{tran.packageName}</td>
                //   <td>{tran.category}</td>
                //   <td>{tran.categoryName}</td>
                //   <td>{tran.price}</td>
                //   <td>{tran.facility}</td>
                //   <td>
                //     <button>
                //       <Link to="/partner/funeral/service_data/detail" 
                //       state={{packageName:tran.packageName,category:tran.category}}>
                //         Detail
                //       </Link>
                //     </button>
                //   </td>
                // </tr>
              ))}

              {/* {funList.map((fun)=>(
                <>
                  {funList===fun.id?(
                    <EditableRow 
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}/>
                  ):(
                    <ReadOnlyRow
                      contact={localFunList}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}/>
                  )}
                </>
              ))} */}

              {funList.map((fun)=>(
                <tr>
                  <td style={{borderTop:"1px solid #222"}}>{fun.name}</td>
                  
                  {/* {fun.categories.map((cat)=>(            
                    <div>
                        <td>{cat.name}</td>
                        {
                          cat.facilities.map((fac)=>(
                            <ul></ul>
                          ))
                        }
                    </div>        
                  ))} */}

                  <td style={{borderTop:"1px solid #222"}}>
                    {
                      fun.categories.map((cat)=>(
                        // <tr>{cat.name}</tr>
                        <div>
                          <table className="custom_table font_color">
                            <thead>
                              <tr>
                                <th className="custom_rowName" style={{margin:'auto',padding:'0.5'}}>{cat.name}</th>
                              </tr>
                            </thead>
                          </table>
                        </div>
                        ))
                    }
                  </td>

                  <td style={{borderTop:"1px solid #222"}}>
                    {
                      fun.categories.map((cat)=>(
                        <div>
                          <table className="custom_table font_color">
                            <thead>
                              <tr>
                                <th className="custom_rowName" style={{margin:'auto',padding:'0.5'}}>{cat.price}</th>
                              </tr>
                            </thead>
                          </table>
                        </div>
                        ))
                    }
                  </td>

                  <td style={{borderTop:"1px solid #222"}}>
                    {
                      fun.categories.map((cat)=>(
                          <div>
                            {cat.facilities.map((fac)=>(
                              
                                {/* <img src={fac.logo}/> */}
                                <div>
                                  <table className="custom_table font_color">
                                    <thead>
                                      <tr>
                                        <th className="custom_rowName" style={{margin:'auto',padding:'0.5'}}>{cat.price}</th>
                                      </tr>
                                    </thead>
                                  </table>
                                </div>
                              
                              ))}
                          </div>
                        ))
                    }
                  </td>
                  
                  <td style={{borderTop:"1px solid #222"}}>
                    <button>
                      <Link to="/partner/funeral/service_data/detail" 
                        state={{packageName:fun.name}}>
                          Detail
                      </Link>
                    </button>
                  </td>

                </tr>
              ))}   

            </tbody>
          </table>
          </form>
        </div>
      </div>
    </>
  );
};

export default PartFunServDataHis;
