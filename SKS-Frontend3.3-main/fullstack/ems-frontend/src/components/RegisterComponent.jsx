import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import SideBar from "./SideBar";

const RegisterComponent = () => {
  
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigator = useNavigate();

    const[errors, setErrors] = useState({
        userName : '',
        email : '',
        password : ''
    })

    function handleUserName(e){
        setUserName(e.target.value);
    }
    function handleEmail(e){
        setEmail(e.target.value);
    }
    function handlePassword(e){
        setPassword(e.target.value);
    }

    async function saveUser(e) {
        e.preventDefault();
      
        if (validateForm()) {
          const user = { userName, email, password };
          console.log(user);
      
          try {
            await axios.post("http://localhost:8080/user/save", {
              userName: userName,
              email: email,
              password: password,
            }).then((response) => {
              console.log(response.data);
              navigator('/home');
            }).catch(error => {
              console.error(error);
            });
          } catch (error) {
            console.error(error);
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

        if(userName.trim()){
            errorCopy.userName = '';
        }
        else{
            errorCopy.userName = 'Kullanıcı Adınız Gerekli'
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

        <div id='root'>
        <SideBar/>
        <div id="content" className='my-container'>
        <br /><br />
        <div className='row'>
            <div className='card '>
               {
                <h2 className='text-center'>KULLANICI KAYIT</h2>
               }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-3'>
                             <label className='form-label'> Kullanıcı Adı:</label>
                             <input
                                type = 'text'
                                placeholder='Kullanıcı Adını Giriniz'
                                name='userName'
                                value={userName}
                                className={`form-control ${errors.userName ? 'is-invalid' : '' }`}
                                onChange={handleUserName} 
                             ></input>
                             {errors.userName && <div className='invalid-feedback'>{errors.userName}</div>}
                        </div>

                        <div className='form-group mb-3'>
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

                        <div className='form-group mb-3'>
                             <label className='form-label'> Şifre:</label>
                             <input
                                type = 'text'
                                placeholder=' Şifrenizi Giriniz'
                                name='password'
                                value={password}
                                className={`form-control ${errors.password ? 'is-invalid' : '' }`}
                                onChange={handlePassword} 
                             ></input>
                             {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                        </div>

                        <button className='btn btn-success' onClick={saveUser}>Kaydet</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="background-logo"></div> {/* Şeffaf logo */}

        <FooterComponent/>
    </div>
    );
  }
  
  export default RegisterComponent;