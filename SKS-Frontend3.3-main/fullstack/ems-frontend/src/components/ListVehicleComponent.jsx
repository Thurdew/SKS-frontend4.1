import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteVehicle, listVehicles } from '../services/VehicleService';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import SideBar from './SideBar';
import './ListVehicleComponent.css'; // Harici CSS dosyası

export const ListVehicleComponent = () => {
    const [vehicles, setVehicles] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllVehicles();
    }, []);

    function getAllVehicles() {
        listVehicles().then((response) => {
            setVehicles(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewVehicles() {
        navigator('/add-vehicle');
    }

    function updateVehicle(id) {
        navigator(`/edit-vehicle/${id}`);
    }

    function removeVehicle(id) {
        deleteVehicle(id).then((response) => {
            getAllVehicles();
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className='container'>
            <SideBar />
            <div className='content'>
                <h2 className='text-center'>Araç Listesi</h2>
                <button className='btn btn-primary mb-2' onClick={addNewVehicles}>Araç Ekle</button>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Araç Id</th>
                            <th>Araç Tipi</th>
                            <th>Sürücü Adı</th>
                            <th>Sürücü Numarası</th>
                            <th>Çekici Plakası</th>
                            <th>Römork Plakası</th>
                            <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map(vehicle =>
                            <tr key={vehicle.id}>
                                <td>{vehicle.id}</td>
                                <td>{vehicle.vehicleType}</td>
                                <td>{vehicle.driverName}</td>
                                <td>{vehicle.driverPhone}</td>
                                <td>{vehicle.towPlate}</td>
                                <td>{vehicle.trailerPlate}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateVehicle(vehicle.id)}>Güncelle</button>
                                    <button className='btn btn-danger' onClick={() => removeVehicle(vehicle.id)} style={{ marginLeft: '10px' }}>Sil</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="background-logo"></div> {/* Şeffaf logo */}
            <FooterComponent />
        </div>
    );
}

export default ListVehicleComponent;
