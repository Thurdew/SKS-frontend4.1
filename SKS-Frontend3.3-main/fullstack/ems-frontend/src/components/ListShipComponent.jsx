import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteShip, listShips } from "../services/ShipService";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from './FooterComponent';
import SideBar from "./SideBar";
import './ListShipComponent.css'; // Harici CSS dosyası

export const ListShipComponent = () => {
    const [ships, setShips] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllShips();
    }, []);

    function getAllShips() {
        listShips().then((response) => {
            setShips(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewShips() {
        navigator('/add-ship');
    }

    function updateShip(id) {
        navigator(`/edit-ship/${id}`);
    }

    function removeShip(id) {
        deleteShip(id).then((response) => {
            getAllShips();
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className='container'>
            <SideBar />
            <div className='content'>
                <h2 className='text-center'>Gemi Listesi</h2>
                <button className='btn btn-primary mb-2' onClick={addNewShips}>Gemi Ekle</button>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Gemi Id</th>
                            <th>Gemi Adı</th>
                            <th>İhracatçı</th>
                            <th>Kalkış Limanı</th>
                            <th>Varış Limanı</th>
                            <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ships.map(ship =>
                            <tr key={ship.id}>
                                <td>{ship.id}</td>
                                <td>{ship.shipName}</td>
                                <td>{ship.exporter}</td>
                                <td>{ship.departurePort}</td>
                                <td>{ship.destinationPort}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateShip(ship.id)}>Güncelle</button>
                                    <button className='btn btn-danger' onClick={() => removeShip(ship.id)} style={{ marginLeft: '10px' }}>Sil</button>
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

export default ListShipComponent;
