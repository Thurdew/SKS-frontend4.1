import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderFirstComponent from "./HeaderFirstComponent";
import { getShipmentNo } from "../services/ForwardService";
import FooterComponent from "./FooterComponent";



const CustomerLoginPageComponent = () => {
    const [teslimatNo, setTeslimatNo] = useState("");
    const navigate = useNavigate();
  
    const [errors, setErrors] = useState({
      teslimatNo: "",
    });
  
    function handleTeslimatNo(e) {
      setTeslimatNo(e.target.value);
    }
  
    async function loginCustomer(e) {
      e.preventDefault();
      
      if (validateForm()) {
        try {
            const response = await axios.post("http://localhost:8080/shipments/customerlogin", {
              teslimatNo: teslimatNo,
            });
          
            console.log("login response:", response.data);
          
            if (response.data.success) { // response.data içinde success anahtarını kontrol ediyoruz
              fetchShipmentDetails(teslimatNo);
            } else {
              alert("Teslimat numarası geçersiz.");
            }
          } catch (error) {
            console.error("Login error:", error);
            alert("Bir hata oluştu. Lütfen tekrar deneyin.");
          }
      }
    }

    const fetchShipmentDetails = async (teslimatNo) => {
      try {
        const response = await getShipmentNo(teslimatNo);
        console.log("shipment details:", response.data);
        const shipments = Array.isArray(response.data) ? response.data : [response.data];
        // Sevkiyat verilerini elde ettikten sonra /customer-page rotasına yönlendir
        navigate("/customer-page", { state: { shipments, teslimatNo } });
      } catch (error) {
        console.error("Fetch shipment details error:", error);
        alert("Sevkiyat verileri alınamadı. Lütfen tekrar deneyin.");
      }
    };
  
    function validateForm() {
      let valid = true;
      const errorCopy = { ...errors };
  
      if (teslimatNo.trim()) {
        errorCopy.teslimatNo = "";
      } else {
        errorCopy.teslimatNo = "Teslimat numarası gerekli";
        valid = false;
      }
  
      setErrors(errorCopy);
      return valid;
    }
  
    return (
      <div className="first" id="imageContainer1">
      <HeaderFirstComponent/>
        <div className="container">
          <br /><br />
            <div className='row' style={{ marginTop: '90px' }}>
          
            <div className="card" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
              <h2 className="text-center">MÜŞTERİ GİRİŞİ</h2>
              <div className="card-body" > 
                <form>
                  <div className="form-group mb-2">
                    <label className="form-label">Teslimat Numarası:</label>
                    <input
                      type="text"
                      placeholder="Teslimat Numaranızı Giriniz"
                      name="teslimatNo"
                      value={teslimatNo}
                      className={`form-control ${ errors.teslimatNo ? "is-invalid" : "" }`}
                      onChange={handleTeslimatNo}
                    ></input>
                    {errors.teslimatNo && (<div className="invalid-feedback">{errors.teslimatNo}</div>)}
                  </div>
                  <button className="btn btn-success" onClick={loginCustomer}>
                    Giriş
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent/>
      </div>
    );
  }

export default CustomerLoginPageComponent;