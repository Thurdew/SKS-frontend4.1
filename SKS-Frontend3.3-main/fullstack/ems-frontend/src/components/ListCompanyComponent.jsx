import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCompany, listCompanies } from "../services/CompanyService";
import SideBar from "./SideBar";
import "./ListCompanyComponent.css";
import FooterComponent from "./FooterComponent";

const ListCompanyComponent = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCompanies();
  }, []);

  const getAllCompanies = () => {
    listCompanies()
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addNewCompanies = () => {
    navigate("/add-company");
  };

  const updateCompany = (id) => {
    navigate(`/edit-company/${id}`);
  };
  const removeCompany = (id) => {
    deleteCompany(id)
      .then((response) => {
        getAllCompanies();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <SideBar />
      <div className="content">
        <h2 className="text-center">Firma Listesi</h2>
        <button className="btn btn-primary mb-2" onClick={addNewCompanies}>
          Firma Ekle
        </button>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Firma Id</th>
                <th>Firma Adı</th>
                <th>Telefon Numarası</th>
                <th>Email</th>
                <th>Vergi Dairesi</th>
                <th>Vergi Numarası</th>
                <th>Adres</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id}>
                  <td>{company.id}</td>
                  <td>{company.companyName}</td>
                  <td>{company.phoneNumber}</td>
                  <td>{company.email}</td>
                  <td>{company.taxOffice}</td>
                  <td>{company.taxNumber}</td>
                  <td>{company.address}</td>
                  <td>
                    <button
                      className="btn btn-info "
                      onClick={() => updateCompany(company.id)}
                    >
                      Güncelle
                    </button>
                    <button
                      className="btn btn-danger"  style={{ marginLeft: '10px' }}
                      onClick={() => removeCompany(company.id)}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div >
     
        
      </div>
      <div className="background-logo"></div> {/* Şeffaf logo */}
          <FooterComponent/>
    </div>
  );
};

export default ListCompanyComponent;