import React, { useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { createVehicle, getVehicle, updateVehicle } from '../services/VehicleService'
import HeaderComponent from './HeaderComponent'
import FooterComponent from "./FooterComponent";
import SideBar from './SideBar';





const VehicleComponent = () => {

    const [vehicleType, setVehicleType] = useState('')
    const [driverName, setDriverName] = useState('')
    const [driverPhone, setDriverPhone] = useState('')
    const [towPlate, setTowPlate] = useState('')
    const [trailerPlate, setTrailerPlate] = useState('')


    const {id} = useParams();

    const[errors, setErrors] = useState({
        vehicleType : '',
        driverName : '',
        driverPhone : '',
        towPlate : '',
        trailerPlate : ''
    })

    const navigator = useNavigate();


    useEffect(() => {     /* Update Vehicle */
        if(id){
            getVehicle(id).then((response) =>{
                setVehicleType(response.data.vehicleType);
                setDriverName(response.data.driverName);
                setDriverPhone(response.data.driverPhone);
                setTowPlate(response.data.towPlate);
                setTrailerPlate(response.data.trailerPlate);
            }).catch(error => {
                console.error(error)
            })
        }

    }, [id])


    function handleVehicleType(e){ 
        setVehicleType(e.target.value);
    
    }
    function handleDriverName(e){
        setDriverName(e.target.value)
    }
    function handleDriverPhone(e){
        setDriverPhone(e.target.value)
    }
    function handleTowPlate(e){
        setTowPlate(e.target.value)
    }
    function handleTrailerPlate(e){
        setTrailerPlate(e.target.value)
    }


    function saveOrUpdateVehicle(e){
        e.preventDefault();
        if(validateForm()){
            const vehicle = {vehicleType, driverName, driverPhone, towPlate, trailerPlate}
            console.log(vehicle)
/* update yapılırsa if blok çalışır normal bir add işlemi yapılırsa else blok çalışıcak */
            if(id){
                updateVehicle(id,vehicle).then((response) =>{
                    console.log(response.data)
                    navigator('/vehicle');  
                }).catch(error => {
                    console.error(error);
                })
            }
            else{
                createVehicle(vehicle).then((response) =>{
                console.log(response.data);
                navigator('/vehicle')            /*kullanıcıyı ekledikten sonra navigator fonksiyonu ile kullanıcıyı employees sayfasına
            yani anasayfaya tekrardan gönderdik bunun için öncelikle import ettik navigatoru react router dom kütüphanesinden
            ardından navigator const oluşturduk ve bu kısımda çağırdık.*/
                }).catch(error => {
                    console.error(error);
                })
            }

       
        }

    }


    function validateForm(){
        let valid = true;

        const errorCopy = {...errors}

        if(vehicleType.trim()){
            errorCopy.vehicleType = '';
        }
        else{
            errorCopy.vehicleType = 'Araç Tipi Gerekli';
            valid = false;
        }

        if(driverName.trim()){
            errorCopy.driverName = '';
        }
        else{
            errorCopy.driverName = 'Sürücü Adı Gerekli';
            valid = false;
        }

        if(driverPhone.trim()){
            errorCopy.driverPhone = '';
        }
        else{
            errorCopy.driverPhone = 'Sürücü Numarası Gerekli'
            valid = false;
        }

        if(towPlate.trim()){
            errorCopy.towPlate = '';
        }
        else{
            errorCopy.towPlate = 'Çekici Plakası Gerekli'
            valid = false;
        }

        if(trailerPlate.trim()){
            errorCopy.trailerPlate = '';
        }
        else{
            errorCopy.trailerPlate = 'Römork Plakası Gerekli'
            valid = false;
        }

        setErrors(errorCopy);
        return valid
    }

    function pageTitle(){   /* statik page update and add employee */
        if (id) {
            return <h2 className='text-center'>ARAÇ GÜNCELLE</h2>
        }
        else{
            return <h2 className='text-center'>ARAÇ EKLEME</h2>
        }

    }

    return (
        <div id='root'>
        <SideBar/>
        <div id="content" className='my-container'>
            <br /><br />
            <div className='row' style={{ marginTop: '-90px' }}>
                <div className='card'>
                   {
                    pageTitle()  
                   }
                    <div className='card-body'>
                        <form>
                            <div className='form-group '>
                                 <label className='form-label'> Araç Tipi:</label>
                                 <input
                                    type = 'text'
                                    placeholder='Araç Tipini Giriniz'
                                    name='vehicleType'
                                    value={vehicleType}
                                    className={`form-control ${errors.vehicleType ? 'is-invalid' : '' }`}
                                    onChange={handleVehicleType} 
    /* input alanında herhangi bir değişiklik olduğunda tetiklenicek fonksiyonu belirtir.  onChange ={handleFirstName} satırından bahsediliyor.*/
                                 
                                 ></input>
                                 {errors.vehicleType && <div className='invalid-feedback'>{errors.vehicleType}</div>}
    
                            </div>
    
                            <div className='form-group'>
                                 <label className='form-label'> Sürücü Adı:</label>
                                 <input
                                    type = 'text'
                                    placeholder='Sürücü Adını Giriniz'
                                    name='driverName'
                                    value={driverName}
                                    className={`form-control ${errors.driverName ? 'is-invalid' : '' }`}
                                    onChange={handleDriverName} 
    
                                 
                                 ></input>
                                 {errors.driverName && <div className='invalid-feedback'>{errors.driverName}</div>}
                            </div>
    
                            <div className='form-group '>
                                 <label className='form-label'> Sürücü Numarası:</label>
                                 <input
                                    type = 'text'
                                    placeholder='Sürücü Numarasını Giriniz'
                                    name='driverPhone'
                                    value={driverPhone}
                                    className={`form-control ${errors.driverPhone ? 'is-invalid' : '' }`}
                                    onChange={handleDriverPhone} 
    
                                 
                                 ></input>
                                 {errors.driverPhone && <div className='invalid-feedback'>{errors.driverPhone}</div>}
                            </div>

                            <div className='form-group'>
                                 <label className='form-label'> Çekici Plakası:</label>
                                 <input
                                    type = 'text'
                                    placeholder='Çekici Plakasını Giriniz'
                                    name='towPlate'
                                    value={towPlate}
                                    className={`form-control ${errors.towPlate ? 'is-invalid' : '' }`}
                                    onChange={handleTowPlate} 
    
                                 
                                 ></input>
                                 {errors.towPlate && <div className='invalid-feedback'>{errors.towPlate}</div>}
                            </div>

                            <div className='form-group '>
                                 <label className='form-label'> Römork Plakası:</label>
                                 <input
                                    type = 'text'
                                    placeholder='Römork Plakasını Giriniz'
                                    name='trailerPlate'
                                    value={trailerPlate}
                                    className={`form-control ${errors.trailerPlate ? 'is-invalid' : '' }`}
                                    onChange={handleTrailerPlate} 
    
                                 
                                 ></input>
                                 {errors.trailerPlate && <div className='invalid-feedback'>{errors.trailerPlate}</div>}
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateVehicle}>Kaydet</button>
                            <button className='btn btn-secondary' onClick={() => navigator('/vehicle')} style={{ marginLeft: "10px" }}>Geri Dön</button>

                        </form>
    
                    </div>
                </div>
            </div>
            <div className="background-logo"></div> {/* Şeffaf logo */}
    
        </div>
        
        <FooterComponent />

    </div>
      )


}

export default VehicleComponent