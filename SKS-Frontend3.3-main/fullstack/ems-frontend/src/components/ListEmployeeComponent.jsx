import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent';
import SideBar from './SideBar';



export const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    const navigator = useNavigate();

    useEffect(() => {   /* add employee */
        getAllEmployees();

    },[])

    function getAllEmployees(){
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee(){  {/* add employee butonu için oluşturduğumuz fonksiyon */}
        navigator('/add-employee')
    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id){
        console.log(id);

        deleteEmployee(id).then((response) =>{
            getAllEmployees();
        }).catch(error => {
            console.error(error);
        })
    }

  return (
    <div className='container'>

        <SideBar/>
    <div className='content'>
        <h2 className='text-center'>Personel Listesi</h2> 
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Personel Ekle</button>
    <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th>Personel Id</th>
                <th>Personel Adı</th>
                <th>Personel Soyadı</th>
                <th>Personel Email</th>
                <th>İşlem</th>

            </tr>
        </thead>
        <tbody>
            {
                employees.map(employee =>
                    <tr key = {employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>
                            <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Güncelle</button>
                            <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                                style={{marginLeft: '10px'}}
                            >Sil</button>
                        </td>
                        
                    </tr>)
            }
        </tbody>
    </table>



    </div>
   < div className="background-logo"></div>
    <FooterComponent/>
</div>
  )
}
