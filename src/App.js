import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/about';
import Login from './pages/login';
import Register from './pages/register';
import EditProfile from './pages/editprof';
import AdmFunHistory from './pages/admin/admfunhis';
import AdmCofHistory from './pages/admin/admcofhis';
import AdmCofDetail from './pages/admin/admcofdet';
import AdmFunDetail from './pages/admin/admfundet';
import AdmUserAcc from './pages/admin/admuseracc';
import AdmPartAcc from './pages/admin/admpartacc';
import PartFunServ from './pages/partner_funeral/partfun';
import PartFunServHis from './pages/partner_funeral/partfunhis';
import PartFunServHisDet from './pages/partner_funeral/partfunhisdet';
import PartFunServDataHis from './pages/partner_funeral/partfundatahis';
import PartFunServDataHisDet from './pages/partner_funeral/partfundatahisdet';
import PartCofServ from './pages/partner_coffin/partcof';
import PartCofServHis from './pages/partner_coffin/partcofhis';
import PartCofServHisDet from './pages/partner_coffin/partcofhisdet';
import PartCofServDataHis from './pages/partner_coffin/partcofdatahis';
import PartCofServDataHisDet from './pages/partner_coffin/partcofdatahisdet';


function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/edit_profile' element={<EditProfile/>} />
        {/*Funeral partner routing */}

        {/*admin routing */}
        <Route path='/admin/transaction/funeral' element={<AdmFunHistory/>}/>
        <Route path='/admin/transaction/coffin' element={<AdmCofHistory/>}/>
        <Route path='/admin/transaction/funeral/detail' element={<AdmFunDetail/>}/>
        <Route path='/admin/transaction/coffin/detail' element={<AdmCofDetail/>}/>
        <Route path='/admin/account_management/user' element={<AdmUserAcc/>}/>
        <Route path='/admin/account_management/partner' element={<AdmPartAcc/>}/>
        <Route path='/partner/funeral/service' element={<PartFunServ/>}/>
        <Route path='/partner/funeral/transaction' element={<PartFunServHis/>}/>
        <Route path='/partner/funeral/transaction/detail' element={<PartFunServHisDet/>}/>
        <Route path='/partner/funeral/service_data' element={<PartFunServDataHis/>}/>
        <Route path='/partner/funeral/service_data/detail' element={<PartFunServDataHisDet/>}/>
        <Route path='/partner/coffin/service' element={<PartCofServ/>}/>
        <Route path='/partner/coffin/transaction' element={<PartCofServHis/>}/>
        <Route path='/partner/coffin/transaction/detail' element={<PartCofServHisDet/>}/>
        <Route path='/partner/coffin/service_data' element={<PartCofServDataHis/>}/>
        <Route path='/partner/coffin/service_data/detail' element={<PartCofServDataHisDet/>}/>

    </Routes>
    </Router>
  );
}

export default App;
