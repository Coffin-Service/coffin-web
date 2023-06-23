import Register from './pages/Register.js';
import Login from './pages/Login.js';
import RegisterAdm from './pages/RegisterAdm.js';
import LoginAdm from './pages/LoginAdm.js';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Partner from './pages/Partner';
import Admin from './pages/Admin';
import Missing from './pages/Missing';
import Unauthorized from './pages/Unauthorized';
import Lounge from './pages/Lounge';
import LinkPage from './pages/LinkPage';
import RequireAuth from './pages/RequireAuth';
import EditProfile from './pages/editprof';
import EditProfilePwd from './pages/editprof_pwd.js';
import AdminAcc from './pages/AdminUser.js';
import AdminTrans from './pages/AdminTrans.js';

import AdmFunHistory from './pages/admin/admfunhis';
import AdmCofHistory from './pages/admin/admcofhis';
import AdmCofDetail from './pages/admin/admcofdet';
import AdmFunDetail from './pages/admin/admfundet';
import AdmUserAcc from './pages/admin/admuseracc';
import AdmPartAcc from './pages/admin/admpartacc';

import PartFun from './pages/partner_funeral/partfun.js';
import PartFunServ from './pages/partner_funeral/partfunserv';
import PartFunServEdit from './pages/partner_funeral/partfunservedit.js';
import PartFunServHis from './pages/partner_funeral/partfunhis';
import PartFunServHisDet from './pages/partner_funeral/partfunhisdet';
import PartFunServDataHisEdit from './pages/partner_funeral/partfundatahisAdd.js';
import PartFunServDataHis from './pages/partner_funeral/partfundatahis';
import PartFunServDataHisDet from './pages/partner_funeral/partfundatahisdet';
import PartCof from './pages/partner_coffin/partcof';
import PartCofServ from './pages/partner_coffin/partcofserv';
import PartCofServHis from './pages/partner_coffin/partcofhis';
import PartCofServHisDet from './pages/partner_coffin/partcofhisdet';
import PartCofServDataHis from './pages/partner_coffin/partcofdatahis';
import PartCofServDataHisDet from './pages/partner_coffin/partcofdatahisdet';

import { Routes, Route } from 'react-router-dom';
import React,{useState, useEffect} from 'react';
import axios from './components/axios.js';

const ROLES = {
  'Coffin': 'Coffin',
  'Funeral':'funeral',
  'Admin': 'Admin'
}



const baseURL="https://coffin-server-production.up.railway.app/api/employee/health"

function App() {
  const[posts,setPosts]=useState([]);

  // useEffect(()=>{
    
  //   axios.get(baseURL)
  //     .then((response)=>{
  //       setPosts(response.data);
  //     })
      // .then((data)=>{
      //   console.log(data);
      // })

    // fetch('https://coffin-server-production.up.railway.app/',
    //   {
    //     // method:'GET',
    //     mode:'cors',
    //     headers:{
    //       'Access-Control-Allow-Origin':'*'
    //     }
    //   })
    //   .then((response)=>response.json())
    //   .then((data)=>{
    //     console.log(data);
        
    //   })
    //   .catch((err)=>{
    //     console.log(err.message);
    //   })
  // },[]);

  // if(!token){
  //   return <Login setToken={setToken}/>
  // }

  return (
    <div>
    {/* <h1>{posts.status}</h1> */}
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="loginadm" element={<LoginAdm/>}/>
        <Route path="registeradm" element={<RegisterAdm/>}/>
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="edit_profile" element={<EditProfile />} />
        <Route path="edit_profile/pwd" element={<EditProfilePwd />} />

        {/* we want to protect these routes */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}> */}
          <Route path="/" element={<Home />} />
        {/* </Route> */}

        <Route path="partner" element={<Partner />} />
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Funeral]} />}> */}
          <Route path='/partner/funeral' element={<PartFun/>}/>
          <Route path='/partner/funeral/service' element={<PartFunServ/>}/>
          <Route path='/partner/funeral/service/edit/:id' element={<PartFunServEdit/>}/>
          <Route path='/partner/funeral/transaction' element={<PartFunServHis/>}/>
          <Route path='/partner/funeral/transaction/detail/' element={<PartFunServHisDet/>}/>
          <Route path='/partner/funeral/service_data' element={<PartFunServDataHis/>}/>
          <Route path='/partner/funeral/service_data/add' element={<PartFunServDataHisEdit/>}/>
          <Route path='/partner/funeral/service_data/detail' element={<PartFunServDataHisDet/>}/>
        {/* </Route> */}

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Coffin]} />}> */}
          <Route path='/partner/coffin' element={<PartCof/>}/>
          <Route path='/partner/coffin/service' element={<PartCofServ/>}/>
          <Route path='/partner/coffin/transaction' element={<PartCofServHis/>}/>
          <Route path='/partner/coffin/transaction/detail' element={<PartCofServHisDet/>}/>
          <Route path='/partner/coffin/service_data' element={<PartCofServDataHis/>}/>
          <Route path='/partner/coffin/service_data/detail' element={<PartCofServDataHisDet/>}/>
        {/* </Route> */}


        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}> */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}> */}
          <Route path="admin" element={<Admin />} />
          <Route path="/admin/account_management" element={<AdminAcc/>}/>
          <Route path="/admin/transaction" element={<AdminTrans/>}/>
          <Route path='/admin/transaction/funeral' element={<AdmFunHistory/>}/>
          <Route path='/admin/transaction/coffin' element={<AdmCofHistory/>}/>
          <Route path='/admin/transaction/funeral/detail' element={<AdmFunDetail/>}/>
          <Route path='/admin/transaction/coffin/detail' element={<AdmCofDetail/>}/>
          <Route path='/admin/account_management/user' element={<AdmUserAcc/>}/>
          <Route path='/admin/account_management/partner' element={<AdmPartAcc/>}/>
        {/* </Route> */}

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}> */}
          <Route path="lounge" element={<Lounge />} />
        {/* </Route> */}

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
    </div>
  );
}

export default App;


// import React, {useState,useEffect} from 'react';
// import './App.css';
// import NavbarAdmin from './components/NavbarAdmin';
// // import { BrowserRouter as Router, Routes, Route, useNavigate}
// //     from 'react-router-dom';
// import Home from './pages/Home';
// import About from './pages/about';
// // import Login from './pages/login';
// // import Register from './pages/register';
// import EditProfile from './pages/editprof';
// import AdmFunHistory from './pages/admin/admfunhis';
// import AdmCofHistory from './pages/admin/admcofhis';
// import AdmCofDetail from './pages/admin/admcofdet';
// import AdmFunDetail from './pages/admin/admfundet';
// import AdmUserAcc from './pages/admin/admuseracc';
// import AdmPartAcc from './pages/admin/admpartacc';
// import PartFunServ from './pages/partner_funeral/partfun';
// import PartFunServHis from './pages/partner_funeral/partfunhis';
// import PartFunServHisDet from './pages/partner_funeral/partfunhisdet';
// import PartFunServDataHis from './pages/partner_funeral/partfundatahis';
// import PartFunServDataHisDet from './pages/partner_funeral/partfundatahisdet';
// import PartCofServ from './pages/partner_coffin/partcof';
// import PartCofServHis from './pages/partner_coffin/partcofhis';
// import PartCofServHisDet from './pages/partner_coffin/partcofhisdet';
// import PartCofServDataHis from './pages/partner_coffin/partcofdatahis';
// import PartCofServDataHisDet from './pages/partner_coffin/partcofdatahisdet';
// import NavbarPartFun from './components/NavbarPartnerFuneral';
// import NavbarPartCof from './components/NavbarPartnerCoffin';

// import {Login} from "./pages/Login.jsx";
// // import {Register} from './pages/Register.jsx';
// import {Admin} from './pages/admin/Admin.jsx';
// import Layout from './pages/Layout.js'
// import Register from './pages/register';

// function App(){
//   return(
//     <main className="App">
//       <Register />
//     </main>
//   );
// }


  // const [currentForm,setCurrentForm]=useState('login');

  // const toggleForm=(formName)=>{
  //   setCurrentForm(formName);
    
  // }
  // const handleSubmit = event =>{
  //   event.preventDefault();
  // }
  // return(

  //   <Routes>
  //     <Route path="/" element={<Layout/>}>
        
  //       <Route path='/login' element={<Login/>} />
  //       <Route path='register' element={<Register/>} />

  //     </Route>
  //   </Routes>


    // <div className='App'>
        // {/* {(()=>{ 
        //     switch(currentForm){
        //       case "login" : return <Login onFormSwitch={toggleForm}/>;
        //       case "register" : return <Register  onFormSwitch={toggleForm}/>;
        //       case "admin" : 
        //          return <Admin onFormSwitch={toggleForm}/> 
        //       default : return null;
        //     }
        //   }
        // )()} */}
    // {/* </div> */}
  // );
// }



// function App() {
//   const [status,setStatus]=useState('login')

  
//   const handleClick=(statusState)=>{
//     setStatus(statusState)
//     console.log('adminlogin')
//   }
//   return (
//     <div>
//     {(() => 
//       {
//         switch(status)
//         {
//           case 'login' :
//             return (
//               <React.Fragment>
                
//                 <Router>
//                   <Routes>
//                     <Route exact path='/' element={<Home />} />
//                     <Route path='/login' element={<Login/>} />
//                     <Route path='/register' element={<Register/>} />
//                   </Routes>
//                 </Router>

//                 <Login handleClick={handleClick} />
//               </React.Fragment>
              
//             )

//           case 'admin' :
//             return(
//               <React.Fragment>
//                 <Router>
//                 <NavbarAdmin/>
//                   <Routes>
//                     <Route path='/edit_profile' element={<EditProfile/>} />

//                     <Route path='/admin/transaction/funeral' element={<AdmFunHistory/>}/>
//                     <Route path='/admin/transaction/coffin' element={<AdmCofHistory/>}/>
//                     <Route path='/admin/transaction/funeral/detail' element={<AdmFunDetail/>}/>
//                     <Route path='/admin/transaction/coffin/detail' element={<AdmCofDetail/>}/>
//                     <Route path='/admin/account_management/user' element={<AdmUserAcc/>}/>
//                     <Route path='/admin/account_management/partner' element={<AdmPartAcc/>}/>
//                   </Routes>
//                 </Router>

                
//               </React.Fragment>
//             )

//             case 'part_fun' :
//             return(
//               <React.Fragment>
//                 <Router>
//                 <NavbarPartFun/>
//                   <Routes>
//                     <Route path='/edit_profile' element={<EditProfile/>} />

//                     <Route path='/partner/funeral/service' element={<PartFunServ/>}/>
//                     <Route path='/partner/funeral/transaction' element={<PartFunServHis/>}/>
//                     <Route path='/partner/funeral/transaction/detail' element={<PartFunServHisDet/>}/>
//                     <Route path='/partner/funeral/service_data' element={<PartFunServDataHis/>}/>
//                     <Route path='/partner/funeral/service_data/detail' element={<PartFunServDataHisDet/>}/>
//                   </Routes>
//                 </Router>

                
//               </React.Fragment>
//             )

//             case 'part_cof' :
//             return(
//               <React.Fragment>
//                 <Router>
//                 <NavbarPartCof/>
//                   <Routes>
//                     <Route path='/edit_profile' element={<EditProfile/>} />

//                     <Route path='/partner/coffin/service' element={<PartCofServ/>}/>
//                     <Route path='/partner/coffin/transaction' element={<PartCofServHis/>}/>
//                     <Route path='/partner/coffin/transaction/detail' element={<PartCofServHisDet/>}/>
//                     <Route path='/partner/coffin/service_data' element={<PartCofServDataHis/>}/>
//                     <Route path='/partner/coffin/ service_data/detail' element={<PartCofServDataHisDet/>}/>
//                   </Routes>
//                 </Router>

                
//               </React.Fragment>
//             )

//           default :
//             return null
//         }      
//       })
//       ()
//     }
//     </div>
//     // <Router>
//     // <NavbarAdmin />
//     // <Routes>
//     //     <Route exact path='/' element={<Home />} />
//     //     <Route path='/about' element={<About/>} />
//     //     <Route path='/login' element={<Login/>} />
//     //     <Route path='/register' element={<Register/>} />
//     //     <Route path='/edit_profile' element={<EditProfile/>} />
//         // {/*Funeral partner routing */}

//         // {/*admin routing */}
//     //     <Route path='/admin/transaction/funeral' element={<AdmFunHistory/>}/>
//     //     <Route path='/admin/transaction/coffin' element={<AdmCofHistory/>}/>
//     //     <Route path='/admin/transaction/funeral/detail' element={<AdmFunDetail/>}/>
//     //     <Route path='/admin/transaction/coffin/detail' element={<AdmCofDetail/>}/>
//     //     <Route path='/admin/account_management/user' element={<AdmUserAcc/>}/>
//     //     <Route path='/admin/account_management/partner' element={<AdmPartAcc/>}/>
//     //     <Route path='/partner/funeral/service' element={<PartFunServ/>}/>
//     //     <Route path='/partner/funeral/transaction' element={<PartFunServHis/>}/>
//     //     <Route path='/partner/funeral/transaction/detail' element={<PartFunServHisDet/>}/>
//     //     <Route path='/partner/funeral/service_data' element={<PartFunServDataHis/>}/>
//     //     <Route path='/partner/funeral/service_data/detail' element={<PartFunServDataHisDet/>}/>
//     //     <Route path='/partner/coffin/service' element={<PartCofServ/>}/>
//     //     <Route path='/partner/coffin/transaction' element={<PartCofServHis/>}/>
//     //     <Route path='/partner/coffin/transaction/detail' element={<PartCofServHisDet/>}/>
//     //     <Route path='/partner/coffin/service_data' element={<PartCofServDataHis/>}/>
//     //     <Route path='/partner/coffin/ service_data/detail' element={<PartCofServDataHisDet/>}/>

//     // </Routes>
//     // </Router> 
//   );
// }

// export default App;
