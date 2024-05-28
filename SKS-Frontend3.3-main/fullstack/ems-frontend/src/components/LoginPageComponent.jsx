import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderFirstComponent from "./HeaderFirstComponent";
import FooterComponent from './FooterComponent';

function LoginPageComponent() {
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const[errors, setErrors] = useState({
      email : '',
      password : ''
  })

  function handleEmail(e){
    setEmail(e.target.value);
  }
  function handlePassword(e){
    setPassword(e.target.value);
  }

    async function loginUser(e) {

      e.preventDefault();
      
      if(validateForm()){
       
        try {
          const response = await axios.post("http://localhost:8080/user/login", {
            email: email,
            password: password,
          });
    
          console.log("Login response:", response.data);
    
          if (response.data.status) {
            navigate('/home');
          } else {
            alert("E-posta veya şifre eşleşmiyor.");
          }
        } catch (error) {
          console.error("Login error:", error);
          alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
      }
    }

      function validateForm(){

        let valid = true;

        const errorCopy = {...errors}

        if(email.trim()){
          errorCopy.email = '';
        }
        else{
          errorCopy.email = 'Email Gerekli'
          valid = false;
        }

        if(password.trim()){
          errorCopy.password = '';
        }
        else{
          errorCopy.password = 'Şifreniz Gerekli'
          valid = false;
        }

        setErrors(errorCopy);
        return valid

      }


    return (
        <div className="first" id="imageContainer1">
        <HeaderFirstComponent/>
        <div className='container'>
            <br /><br />
            <div className='row' style={{ marginTop: '90px' }}>
                <div className='card ' style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
                   {
                    <h2 className='text-center'>GİRİŞ</h2>
                   }
                    <div className='card-body'>
                        <form>
                        <div className='form-group '>
                             <label className='form-label'> Email:</label>
                             <input
                                type = 'text'
                                placeholder=' Personel Email Giriniz'
                                name='email'
                                value={email}
                                className={`form-control ${errors.email ? 'is-invalid' : '' }`}
                                onChange={handleEmail} 
                             ></input>
                             {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>

                        <div className='form-group '>
                             <label className='form-label'> Şifre:</label>
                             <input
                                type = 'password'
                                placeholder=' Şifrenizi Giriniz'
                                name='password'
                                value={password}
                                className={`form-control ${errors.password ? 'is-invalid' : '' }`}
                                onChange={handlePassword} 
                             ></input>
                             {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                        </div>

                            <button className='btn btn-success' onClick={loginUser}>Giriş</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <FooterComponent/>
        </div>
    );
  }
  
  export default LoginPageComponent;