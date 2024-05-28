import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listShipments } from "../services/ForwardService";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import SideBar from "./SideBar";

export const ShipListReportsDetails = () => {
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
            console.error(error);
        }
    };

    const goBack = () => {
        navigate(-1); // Bu, bir önceki sayfaya yönlendirir.
    };

    return (
        <div className='container'>
            <SideBar />
            <div className='content'>
                <h2 className='text-center'>Gemi Detay Rapor</h2>
                <button className='btn btn-secondary mb-2' onClick={goBack}>Geri Dön</button>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Yüklendiği Gemi</th>
                            <th>Yüklenme Tarihi</th>
                            <th>Kalkış Limanı</th>
                            <th>Varış Limanı</th>
                            <th>Yük</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shipments.map((shipment) => (
                            <tr key={shipment.id}>
                                <td>{shipment.ship.shipName}</td>
                                <td>{shipment.ship.uploadDate}</td>
                                <td>{shipment.ship.departurePort}</td>
                                <td>{shipment.ship.destinationPort}</td>
                                <td>{shipment.ship.load}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="background-logo"></div> {/* Şeffaf logo */}
            <FooterComponent />
        </div>
    );
};
