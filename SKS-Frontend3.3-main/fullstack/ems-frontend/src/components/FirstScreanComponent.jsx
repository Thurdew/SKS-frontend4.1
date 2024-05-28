import HeaderFirstComponent from "./HeaderFirstComponent";
import FooterComponent from "./FooterComponent";

const FirstScreanComponent = () => {

return(
  <div className="first" id="imageContainer">
    <HeaderFirstComponent/>
    <div className='container text-center' >
      <br /><br />
      <div className='row'>
        
        <div className='card col-md-6 offset-md-3 offset-md-3' style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
          <h2>SEVKİYAT KONTROL SİSTEMLERİ</h2>
          <div className='card-body'>
            <form style={{opacity: 0.8}}>
              <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
                <a href="http://localhost:5173/login" className="btn btn-primary mb-3">PERSONEL GİRİŞ EKRANI</a>
                <br />
                <a href="http://localhost:5173/customerlogin" className="btn btn-primary mb-3">MÜŞTERİ TAKİP EKRANI</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
<FooterComponent/>
  </div>
)

}

export default FirstScreanComponent;