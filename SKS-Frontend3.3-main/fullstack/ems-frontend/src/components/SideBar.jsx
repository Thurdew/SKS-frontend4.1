import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faCar, faBuilding, faUserPlus, faShip, faShippingFast, faSignOutAlt, faFileAlt, faFileInvoice, faTruck, faDatabase, faCog, faChessRook, faTruckMoving } from "@fortawesome/free-solid-svg-icons";
import './SideBar.css';
import logo from './logo1.png';

const SideBar = () => {
  const navigate = useNavigate();
  const sidebarRef = useRef();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsExpanded(true);
    };

    const handleMouseLeave = () => {
      setIsExpanded(false);
    };

    const sidebarElement = sidebarRef.current;
    sidebarElement.addEventListener('mouseenter', handleMouseEnter);
    sidebarElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      sidebarElement.removeEventListener('mouseenter', handleMouseEnter);
      sidebarElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const createLink = (to, icon, text, subMenuItems = []) => (
    <div className="nav-button" key={to}>
      <Link to={to}>
        <FontAwesomeIcon icon={icon} className="fa-icon" />
        {isExpanded && <span>{text}</span>}
      </Link>
      {isExpanded && subMenuItems.length > 0 && (
        <div className="sub-menu">
          {subMenuItems.map((item, index) => (
            <div className="sub-menu-item" key={index}>
              <Link to={item.to}>
                <FontAwesomeIcon icon={item.icon} className="fa-icon" />
                {item.text}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const DateTime = () => {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setDateTime(new Date());
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    const formattedDateTime = `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;

    return (
      <div className="date-time">
        <span>{formattedDateTime}</span>
      </div>
    );
  };

  const logout = () => {
    // Çıkış işlemleri buraya gelecek
    // Örneğin localStorage'dan kullanıcı bilgilerini silerek ve yönlendirme yaparak çıkış yapabilirsiniz
    navigate('/login'); // Çıkış yaptıktan sonra login sayfasına yönlendir
  };

  return (
    <div className={`sidebar-container ${isExpanded ? "open" : ""}`} ref={sidebarRef}>
      <div className="logo">
        <img src={logo} alt="Logo" />
        {isExpanded && <h2 className="sidebar-title">Sevkiyat Kontrol Sistemleri</h2>}
        {!isExpanded && <><span className="sks-text">SKS</span><hr className="divider" /></>}
      </div>
      <DateTime />
      <nav className="nav">
        <ul>
          {createLink("/home", faHome, "Ana Sayfa")}
          {createLink("/add-vehicle", faDatabase, "Tanımlamalar", [
            { to: "/vehicle", icon: faTruck, text: "Araç Tanımlama" },
            { to: "/ship", icon: faShip, text: "Gemi Tanımlama" },
            { to: "/company", icon: faBuilding, text: "Firma Tanımlama" },
            { to: "/product", icon: faUserPlus, text: "Ürün Tanımlama" },
            { to: "/employees", icon: faUserPlus, text: "Personel Ekle" }
          ])}
          {createLink("/forward", faShippingFast, "Sevkiyat Oluştur")}
         
          {createLink("/", faFileAlt, "Raporlar", [
            { to: "/ShipReports", icon: faFileAlt, text: "Gemi Raporu" },
            { to: "/CompanyReports", icon: faFileAlt, text: "Firma Raporu" }
          ])}
          {createLink("/register", faUserPlus, "Kullanıcı Kaydet")}
          {/* Çıkış yap butonu */}
          {createLink("/", faSignOutAlt, "Çıkış Yap", [], logout)}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
