import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteShipment, listShipments } from '../services/ForwardService';
import FooterComponent from './FooterComponent';
import SideBar from './SideBar';

export const ListForwardingComponent = () => {
    const [shipments, setShipments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllShipments();
    }, []);

    const getAllShipments = async () => {
        try {
            const response = await listShipments();
            setShipments(response.data);
        } catch (error) {
            console.error('v', error);
        }
    };

    const addNewShipment = () => {
        navigate('/add-forward');
    };

    const updateShipment = (id) => {
        navigate(`/edit-forward/${id}`);
    };

    const removeShipment = async (id) => {
        try {
            await deleteShipment(id);
            getAllShipments();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='container'>
            <SideBar />
            <div className='content'>
                <h2 className='text-center'>Sevkiyat Listesi</h2>
                <div>
                    <button className='btn btn-primary mb-2' onClick={addNewShipment}>Sevkiyat Ekle</button>
                </div>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                        <th>Comment</th>
                        <th>Tarih</th>
                        <th>Teslimat No</th>
                        <th>Müşteri Telefonu</th>
                        <th>Fiyat</th>
                        <th>Firma Adı</th>
                        <th>Gemi Adı</th>
                        <th>Kalkış Noktası</th>
                        <th>Varış Noktası</th>
                        <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shipments.map((shipment) => (
                            <tr key={shipment.id}>
                                <td>{shipment.comment}</td>
                                <td>{shipment.shipmentDate}</td>
                                <td>{shipment.teslimatNo}</td>
                                <td>{shipment.customerPhone}</td>
                                <td>{shipment.price}</td>
                                <td>{shipment.company.companyName}</td>
                                <td>{shipment.ship.shipName}</td>
                                <td>{shipment.departurePoint}</td>
                                <td>{shipment.destinationPoint}</td>
                                <td>
                                    <div className="button-group">
                                        <button className='btn btn-info' onClick={() => updateShipment(shipment.id)}>Güncelle</button>
                                        <button className='btn btn-danger' onClick={() => removeShipment(shipment.id)}>Sil</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="background-logo"></div> {/* Şeffaf logo */}
            <FooterComponent/>
        </div>
    );
};

export default ListForwardingComponent;
