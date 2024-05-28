
import './App.css'
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponent from './components/FooterComponent'

import HeaderComponent from './components/HeaderComponent'
import HomeComponent from './components/HomeComponent'
import { ListEmployeeComponent } from './components/ListEmployeeComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import VehicleComponent from './components/VehicleComponent'
import ListVehicleComponent from './components/ListVehicleComponent'
import ListShipComponent from './components/ListShipComponent'
import ShipComponent from './components/ShipComponent'
import ListCompanyComponent from './components/ListCompanyComponent'
import CompanyComponent from './components/CompanyComponent'
import ListProductComponent from './components/ListProductComponent'
import ProductComponent from './components/ProductComponent'
import LoginPageComponent from './components/LoginPageComponent'
import RegisterComponent from './components/RegisterComponent'
import FirstScreanComponent from './components/FirstScreanComponent'
import ListForwardingComponent from './components/ListForwardingComponent'
import ForwardComponent from './components/ForwardComponent'
import ComapnyListReports from './components/CompanyListReports'
import ShipListReports from './components/ShipListReports'
import { CompanyListReportsDetails } from './components/CompanyListReportsDetails'
import { ShipListReportsDetails } from './components/ShipListReportsDetails'
import CustomerLoginPageComponent from './components/CustomerLoginPageComponent'
import CustomerHomsePageComponent from './components/CustomerHomePageComponent'





function App() {


  return (
    <>
    
    <BrowserRouter>                   {/* react-router-dom kütüphanesi tarafından geldi */}
        <Routes>

            <Route path='/' element = {<FirstScreanComponent/>}></Route>
                                      {/* // http://localhost:3000   bu root istek geldiğinde ana sayfa olan ListEmployeeComponent açılıcak*/ }     
            <Route path='/home'element = {<HomeComponent/>}></Route>
                                      {/* // http://localhost:3000/employees bu root istek geldiğinde employee gözükücek */}
            <Route path='/employees' element = {<ListEmployeeComponent/>}></Route>
            {/* // http://localhost:3000/add-employee bu root istek EmployeeComponent sayfası görünücek */}
            <Route path='/add-employee' element = {<EmployeeComponent/>}></Route>
            {/* // http://localhost:3000/edit-employee/1 */}
            <Route path='/edit-employee/:id' element = {<EmployeeComponent/>}></Route>

            

            <Route path='/vehicle' element = {<ListVehicleComponent/>}></Route>

            <Route path='/add-vehicle' element = {<VehicleComponent/>}></Route>

            <Route path='/edit-vehicle/:id' element = {<VehicleComponent/>}></Route>


            <Route path='/ship' element = {<ListShipComponent/>}></Route>

            <Route path='/add-ship' element = {<ShipComponent/>}></Route>

            <Route path='/edit-ship/:id' element = {<ShipComponent/>}></Route>

            
            <Route path='/company' element = {<ListCompanyComponent/>}></Route>

            <Route path='/add-company' element = {<CompanyComponent/>}></Route>

            <Route path='/edit-company/:id' element = {<CompanyComponent/>}></Route>
            <Route path='/CompanyReports' element = {<ComapnyListReports/>}></Route>


            <Route path='/product' element = {<ListProductComponent/>}></Route>

            <Route path='/add-product' element = {<ProductComponent/>}></Route>

            <Route path='/edit-product/:id' element = {<ProductComponent/>}></Route>


            <Route path='/companyReports' element = {<ComapnyListReports/>}></Route>
            <Route path='/companyRaportsDetails' element = {<CompanyListReportsDetails/>}></Route>
           
            <Route path='/shipReports' element = {<ShipListReports/>}></Route>
            <Route path='/shipRaportsDetails' element = {<ShipListReportsDetails/>}></Route>



            <Route path='/login' element = {<LoginPageComponent/>}></Route>

            <Route path='/register' element = {<RegisterComponent/>}></Route>

            <Route path='/customerlogin' element = {<CustomerLoginPageComponent/>}></Route>

            <Route path='/customer-page' element = {<CustomerHomsePageComponent/>}></Route>


           








            <Route path='/forward' element = {<ListForwardingComponent/>}></Route> {/* //   bu root istek geldiğinde sevkiyat oluştur kısmı*/ }
            
            <Route path='/add-forward' element = {<ForwardComponent/>}></Route>

            <Route path='/edit-forward/:id' element = {<ForwardComponent/>}></Route>

        </Routes>  
      </BrowserRouter>        
    </>
  )
}

export default App
