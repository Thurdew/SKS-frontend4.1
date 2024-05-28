import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listShips } from "../services/ShipService";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import SideBar from "./SideBar";
import './CompanyReports.css';


export const ShipListReports = () => {
    const [ships, setShips] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllShips();
    }, []);

    function getAllShips() {
        listShips()
            .then((response) => {
                setShips(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const detailRapor = () => {
        navigator('/shipRaportsDetails');
    };

    return (
        <div className='container'>
            <SideBar />
            <div className='content'>
                <h2 className='text-center'>Gemi Raporları</h2>
                <button className='custom-button1' onClick={detailRapor}>Görüntüle</button>
                <table className='table table-striped table-bordered' style={{ marginTop: '-0.1px' }}>
                    <thead>
                        <tr>
                            <th>Gemi Adı</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ships.map((ship) => (
                            <tr key={ship.id}>
                                <td>{ship.shipName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <FooterComponent />
            <div className="background-logo"></div> {/* Şeffaf logo */}
        </div>
    );
}

export default ShipListReports;
