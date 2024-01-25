import React,  { useState, useEffect } from 'react';
import { fetchData, postData } from '../HttpService/HttpService'
import "../css/style.css";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function Department() {

    const [address, setAddress] = useState('');
    const [locationData, setLocationData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5247/api/UserInformation/GetAutocomplete?input=${address}`);
          setLocationData(response.data);
        } catch (error) {
          console.error('Error fetching location data:', error);
        }
      };
  
      if (address) {
        fetchData();
      }
    }, [address]);
  
    const handleAddressChange = (e) => {
      setAddress(e.target.value);
    };


    // Dark Mode Code 
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
      setDarkMode((prevMode) => !prevMode);
    }

    const [DepartName, setDepartName] = useState ([])
    const [PhoneNo, setPhoneNo] = useState ([])
    const [Email, setEmail] = useState ([]) 
    const [country, setCountry] = useState ([])

    // Grid Table View 
    const [inputdata, setInputdata] = useState({ department: '', email: '', phoneno: '' })
    const [inputarr, setInputarr] = useState([])

    const handleInputCountry = (event) => {
        setCountry(event.target.value)
}

const handleInputDepart = (event) => {
    setDepartName(event.target.value)
    setInputdata({...inputdata,[event.target.name]:event.target.value})
}

const handleInputPhone = (event) => {
    setPhoneNo(event.target.value)
    setInputdata({...inputdata,[event.target.name]:event.target.value})
}

const handleInputEmail = (event) => {
    setEmail(event.target.value)
    setInputdata({...inputdata,[event.target.name]:event.target.value})
}

let {department, email, phoneno}=inputdata
function handleUpdate(){
  setInputarr([...inputarr,{department,email, phoneno}])
  setInputdata({department: "", email: "", phoneno: "",})
}
const handlePostData = async (e) => {
     
        // e.preventDefault();
        // if (!DepartName || !PhoneNo || !Email) {
        //     console.log('One or more fields are null or undefined.');
        //     alert('Please fill in all required fields.');
        //     return;
        // }
        
       var payload ={
            'email': sessionStorage.getItem("email"),
            'phoneno': sessionStorage.getItem("phoneno"),
            'country': sessionStorage.getItem("country"),
            'organisationid': sessionStorage.getItem("organisationid"),
            'departmentname': DepartName,
            'phoneno': PhoneNo,
            'email':Email
        }

        sessionStorage.setItem('departmentname', DepartName)
        // var organisationid = "organizationid";
        // sessionStorage.setItem('organisationid', organisationid);
        
        try {
          const result = await postData(`/Department/CreateDepartment?organisationid=${payload.organisationid}`, payload);
          sessionStorage.setItem('organisationid', result.Response.organisationid)
          console.log(result)
        } catch (error) {
          console.error('Error posting data:', error);
        }
        navigate('/Designation')
        // alert("Submitted")
     };
     useEffect(() => {
        let tempss = sessionStorage.getItem("state")
        setEmail(tempss)
        console.log(tempss)
    }, [])

    useEffect(() => {
        let tempc = sessionStorage.getItem("Country")
        setCountry(tempc)
    }, [])

    //  useEffect(() => {
    //     let temps = sessionStorage.getItem("email")
    //     setEmail(temps)
    //     console.log(temps)
    // }, [])

    // useEffect(() => {
    //     let tempn = sessionStorage.getItem("phoneno")
    //     setPhoneNo(tempn)
    //     console.log(tempn)
    // }, [])

    // Integration Get Country

    //   const GetCountryData = async() => {
    //   const res = await axios.get("http://localhost:5247/api/Department/GetAllCountry");
    //   setMydata(res.data.Response) } 
    
      // Integration Get State
    //   const getApiState = async(countryid) => {  
    //      const res = await axios.get("http://localhost:5247/api/Department/GetAllState?countryid="+ countryid +""); 
    //      setMystate(res.data.Response) 
    //  } 

        // Integration Get Cities
        // const getApiCity = async(stateid) => {  
        // const res = await axios.get("http://localhost:5247/api/Department/GetAllCity?stateid="+ stateid +"");
        // setCitys(res.data.Response) } 
            
        //       useEffect(() => {
        //         GetCountryData();
        //       }, []);   

    
    const navigate = useNavigate();
      
    return (
<div className= {`${darkMode ? 'dark-theme' : 'light-theme'}`}>
<div className=  'form-data' style={{ display: 'flex', }} >
<div className='sidebar' >

<div style={{display: 'flex', marginTop: '25px'}}>
<img src="/images/Layer 1.png" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: '0', width: '80.677px', height: '35px', marginLeft: '20px'}} />
</div>

<div className='sidelinddde'>
  <h2 style={{fontSize: '20px', color: '#626C83', marginLeft: '50px'}}>Saas</h2>
  <Link to="/Organization"> Organization </Link> 
  <Link to="/SubOrganization"> Sub Organization</Link>
  <Link to="/Department">  Department</Link> 
  <Link to="/Designation">  Designation</Link>
  <Link to="/Role">    Roles</Link> 
  <Link to="/Orgchart">   Org Chart</Link>
 </div>

</div>
                <div className='Acc-from' >
                    <div className='navbar11'>
                        {/* <input type='checkbox' name='' id='chk1' />
                        <div className='search-box'>
                            <form action=''>
                            <i className="fa fa-search" aria-hidden="true"></i>
                                <input type='text'  name='search' id='srch' placeholder='Search' />
                                </form>
                        </div> */}
                        <ul>
                        {/* <i className="fa fa-bell-o" aria-hidden="true"></i> */}
                        <div className='text'>
                          <label className="switchh">
                          <input type="checkbox" onClick={toggleDarkMode} />
                      <span className="sliders"></span>
                                 </label>
                        </div>
                        <div className='text2'>
                           <p className='pra'> Welcome </p>
                           <p className='para'> Heydim (Admin) </p>
                        </div>
                            
                        <div className='text3'>
                            <img src="/images/Ellipse 47.png" />
                        </div>
                        </ul>                   
                        <div className='menu'>
                            <label htmlFor="chk1">
                            <i className="fa fa-bars" aria-hidden="true"></i>
                            </label>
                        </div>
                 </div>
<div className='Cover' style={{ padding: '10px', height: '85vh'}}>
      <h2> Department </h2>
      <div className='Covermid'>

      <div className="">
    <div className="row">
    <div className="col-md-6">
        <div className="form-group">
        <label htmlFor="input2">Address</label>
        <input
   type='text'
   placeholder='Enter Address'
   className="form-control"
   value={address}
   onChange={handleAddressChange}
   />
      { !address.length ==  '' ?  (
        <select
          className='sectt'
          value={address}
          onChange={handleAddressChange}
        >
      <option value="" disabled>Select an Address</option>
          {locationData.map((element, index) => (   
            <option key={index} value={element.id}>
              {element.description}
            </option>
          ))}
        </select>
      )  : null}
            </div>
        </div>

        <div className="col-md-6">
            <div className="form-group">
        <label className='label'>Country</label>
        <input type="text" className="form-control" onChange={(e) => {handleInputCountry(e); setCountry(e.target.value);}}
             id='organisationname' value={country} required />
            </div>
        </div>
    </div>
</div>

<div className="">
    <div className="row">
    <div className="col-md-6">
        <div className="form-group">
        <label className='labels'>States</label>
        <select className='sect' >
{locationData && locationData.map((element, index) => (
      <option key={index}>{element.state}</option>
    ))}
    </select>
         
            </div>
        </div>
        <div className="col-md-6">
        <div className="form-group">
            <label className='labels'>Cities</label>
            <select className='sect' >
     {locationData && locationData.map((element, index) => (
      <option key={index}>{element.city}</option>
    ))}
    </select>
            </div>
        </div>
    </div>
</div>

<div className="">
    <div className="row">
    <div className="col-md-6">
            <div className="form-group">
                <label htmlFor="input1">Department Name</label>
                <input type="text" name='department'  value={inputdata.department} className="form-control" onChange={handleInputDepart} id='departmentname' required  />
            </div>
        </div>

          <div className="col-md-6">
            <div className="form-group">
                <label htmlFor="input2">Phone No</label>
                <input type="text" className="form-control"  name='phoneno' value={inputdata.phoneno} 
                 onChange={(e) => { handleInputPhone(e); setPhoneNo(e.target.value); }} id='phoneno' required />
            </div>
          </div>
    </div>
  </div>

  <div className="">
    <div className="row">
    <div className="col-md-6">
            <div className="form-group">
                <label htmlFor="input1">Email</label>
                <input type="text" className="form-control" name='email'  value={inputdata.email} onChange={(e) => { handleInputEmail(e); setEmail(e.target.value); }} id='email' required />
            </div>
        </div>
    </div>
  </div>
  <button onClick={ handlePostData} type='submit' className='Tbtns'>Save</button>  
  {/* <button onClick={handleUpdate} type='submit' className='Tbtns'>Update</button> */}
  </div>
  </div>

  {/* <table style={{border: '1px solid black'}}  width="100%" callPanding={10}>
          <tbody>
          <tr style={{border: '1px solid black'}}>
            <th>Department</th>
            <th>Phone Number</th>
            <th>Email</th>
          </tr>
          {
            inputarr.map( 
              (info,index)=>{
                  return(
                    <tr key={index}>
                      <td>{info.department}</td>
                      <td>{info.phoneno}</td>
                      <td>{info.email}</td>
                    </tr>
                  )
              }
  )
          }
          </tbody>
        </table> */}

   </div>
    </div>
        </div>
    )
}
export default Department;