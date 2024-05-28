import React from "react";

const HeaderComponent = () => {

    return(
        <div>
            <header>
                <nav className="navbar navbar-dark bg-dark">
                    <a className="navbar-brand"  href="http://localhost:5173/home">SEVKİYAT KONTROL SİSTEMLERİ</a>
                    <ul class="nav nav-pills nav-fill">
                          <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="http://localhost:5173/home">ANA SAYFA</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" href="http://localhost:5173/employees">PERSONEL EKLE</a>
                          </li>


                          <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">TANIMLAMALAR</a>
                            <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="http://localhost:5173/vehicle">Araç Tanımlama</a></li>
                              <li><a class="dropdown-item" href="http://localhost:5173/ship">Gemi Tanımlama</a></li>
                              <li><a class="dropdown-item" href="http://localhost:5173/company">Firma Tanımlama</a></li>
                              <li><a class="dropdown-item" href="http://localhost:5173/product">Ürün Tanımlama</a></li>
                            
                              
                            </ul>
                          </li>


                          <li class="nav-item">
                            <a class="nav-link"  href="http://localhost:5173/forward">SEVKİYAT OLUŞTUR</a>
                          </li>

                          <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">RAPORLAR</a>
                            <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="http://localhost:5173/shipReports">GEMİ RAPORU</a></li>
                              <li><a class="dropdown-item" href="http://localhost:5173/companyReports">FİRMA RAPORU</a></li>
                              
                            </ul>
                          </li>

                          <li class="nav-item">
                            <a class="nav-link"  href="http://localhost:5173/register">KULLANICI KAYIT</a>
                          </li>

                          <li class="nav-item">
                            <a class="nav-link"  href="http://localhost:5173">ÇIKIŞ YAP</a>
                          </li>

                          <li class="nav-item">
                            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                          </li>
                    </ul>
                </nav>
            </header>
        </div>
        
    )
}

export default HeaderComponent