import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listShipments } from "../services/ForwardService";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import SideBar from "./SideBar";

export const CompanyListReportsDetails = () => {
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
                <h2 className='text-center'>Firma Detay Rapor</h2>
                <button className='btn btn-secondary mb-2' onClick={goBack}>Geri Dön</button>
                <br /><br />
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Tarih</th>
                            <th>Firma</th>
                            <th>Yüklendiği Gemi</th>
                            <th>Araç Sınıfı</th>
                            <th>Çekici</th>
                            <th>Dorse</th>
                            <th>Kalkış Yeri</th>
                            <th>Varış Yeri</th>
                            <th>Ürün Yeri</th>
                            <th>Fiyat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shipments.map((shipment) => (
                            <tr key={shipment.id}>
                                <td>{shipment.shipmentDate}</td>
                                <td>{shipment.company.companyName}</td>
                                <td>{shipment.ship.shipName}</td>
                                <td>{shipment.vehicles[0].vehicleType}</td>
                                <td>{shipment.vehicles[0].towPlate}</td>
                                <td>{shipment.vehicles[0].trailerPlate}</td>
                                <td>{shipment.departurePoint}</td>
                                <td>{shipment.destinationPoint}</td>
                                <td>{shipment.product.productName}</td>
                                <td>{shipment.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="background-logo"></div> {/* Şeffaf logo */}

            <FooterComponent />
        </div>
    );
}

export default CompanyListReportsDetails;
