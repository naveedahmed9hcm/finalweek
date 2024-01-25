import React,  { useState, useEffect } from 'react';
import { fetchData, postData } from '../HttpService/HttpService'
import "../css/style.css";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function SubOrganization() {
   
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
   
    // const [mydatas, setMydata] = useState([]);
    // const [mycity, setCitys] = useState([]);
    // const [mystate, setMystate] = useState ([])

    const [OrgName, setOrgName] = useState ([])
    const [subOrgName, setSubOrgName] = useState ([])
    const [owner, setOwner] = useState ([])
    const [PhoneNo, setPhoneNo] = useState ([])
    const [country, setCountry] = useState ([])

    const [Email, setEmail] = useState([])
    
    // OnChanged Function  

const handleInputCountry = (event) => {
        setCountry(event.target.value)
}

const handleInputOrg = (event) => {
    setOrgName(event.target.value)
}

const handleInputSubOrg = (event) => {
    setSubOrgName(event.target.value)
}

const handleInputPhone = (event) => {
    setPhoneNo(event.target.value)
}

const handleInputEmail = (event) => {
    setEmail(event.target.value)
}

const handleInputOwner = (event) => {
    setOwner(event.target.value)
}

const handlePostData = async (e) => {
    // e.preventDefault();
    // if (!OrgName || !owner || !PhoneNo || !Email) {
    //     console.log('One or more fields are null or undefined.');
    //     alert('Please fill in all required fields.');
    //     return;
    // }
  
       var payload = {
            'organisationname': sessionStorage.getItem("OrganizationName"),
            'nameofowner': sessionStorage.getItem("nameofowner"),
            'email': sessionStorage.getItem("email"),
            'phoneno': sessionStorage.getItem("phoneno"),
            'country': sessionStorage.getItem("country"),
            'address': address,
            'organisationname': OrgName,
            'suborganizationname': subOrgName,
            'nameofowner': owner,
            'phone': PhoneNo,
            'email':Email
        }
        try {
          const result = await postData("/OrganisationInformation/CreateOrganisationInformation", payload);
          console.log(result);
        } catch (error) {
          console.error('Error posting data:', error);
        }
        navigate('/Department')
        // alert("Submitted")
     };

     useEffect(() => {
        let tempc = sessionStorage.getItem("Country")
        setCountry(tempc)
    }, [])

     useEffect(() => {
        let tempo = sessionStorage.getItem("OrganizationName")
        setOwner(tempo)
    }, [])

    useEffect(() => {
      let tempnoo = sessionStorage.getItem("nameofowner")
      setOrgName(tempnoo)
  }, [])


    // useEffect(() => {
    //     let temps = sessionStorage.getItem("email")
    //     setEmail(temps)
    //     console.log(temps)
    // }, [])

    // useEffect(() => {
    //     let tempn = sessionStorage.getItem("phoneno")
    //     setPhoneNo(tempn)
    //     console.log(tempn)
    // }, [])  

    const [isMenuOpen, setMenuOpen]  = useState(false);

    const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    };
    const navigate = useNavigate();

    return (
<div className= {`${darkMode ? 'dark-theme' : 'light-theme'}`}>
<div className=  'form-data' style={{ display: 'flex', }} >
<div className='sidebar' >

<div style={{display: 'flex', marginTop: '25px'}}>
<img src="/images/Layer 1.png" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: '0', width: '80.677px', height: '35px', marginLeft: '20px'}} />

</div>
<div className='sidelinddde'>
  <h2 style={{fontSize: '20px', color: '#626C83', marginLeft: '50px'}}> Saas </h2>
  <Link to="/Organization"> Organization </Link> 
  <Link to="/SubOrganization"> Sub Organization</Link>
  <Link to="/Department"> Department</Link> 
  <Link to="/Designation"> Designation</Link>
  <Link to="/Role"> Roles</Link> 
  <Link to="/Orgchart"> Org Chart</Link>
 </div>
 
   </div>
                <div className='Acc-from'>
                    <div className='navbar11'>
                        {/* <input type='checkbox' name='' id='chk1' /> */}
                        {/* <div className='search-box'>
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
      <h2> Sub Organization </h2>
      <div className='Covermid'>

      <div className="">
    <div className="row">
    <div className="col-md-6">
            <div className="form-group">
                <label htmlFor="input1">Sub Organization</label>
                <input type="text" className="form-control" value={subOrgName} onChange={handleInputSubOrg} id='suborganisationname' required  />
            </div>
        </div>

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
    {address.length > 0 && (
      <div className='suggestion-list' style={{cursor: 'pointer'}}>
        {locationData
          .filter((element) =>
            element.description.toLowerCase().includes(address.toLowerCase())
          )
          .map((element, index) => (
            <div
              key={index}
              className='suggestion-item'
              onClick={() => setAddress(element.description)}
            >
              {element.description}
            </div>
          ))}
      </div>
    )}
      
            </div>
        </div>
    </div>
</div>

<div className="">
    <div className="row">
    <div className="col-md-6">
            <div className="form-group">
                <label htmlFor="input1">Organization Name</label>
                <input type="text" className="form-control" value={owner} onChange={(e) => {handleInputOrg(e); setOrgName(e.target.value);}}id='organisationname' required  />
            </div>
        </div>
        <div className="col-md-6">
        <div className="form-group">
        <label className='label'>Country</label>
        <input type="text" className="form-control" onChange={(e) => {handleInputCountry(e); setCountry(e.target.value);}}
             id='organisationname' value={country} required />
        {/* <select className='sect'>
        {locationData && locationData.map((element, index) => (
      <option>{element.country}</option>
    ))}
    </select> */}
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
            <label htmlFor="input2">Name Of Owner</label>
                <input type="text" className="form-control" value={OrgName} onChange={handleInputOwner} id='nameofowner' required />
            </div>
        </div>

        <div className="col-md-6">
            <div className="form-group">
            <label htmlFor="input1">Email</label>
                <input type="text" className="form-control" value={Email} onChange={(e) => { handleInputEmail(e); setEmail(e.target.value); }} id='nameofowner' required />
            </div>
        </div>
    </div>
</div>

<div className="">
    <div className="row">
    <div className="col-md-6">
            <div className="form-group">
            <label htmlFor="input2">Phone No</label>
                <input type="text" className="form-control" value={PhoneNo}
                 onChange={(e) => { handleInputPhone(e); setPhoneNo(e.target.value); }} id='phone' required />
            </div>
        </div>

    </div>
</div>
<button onClick={ handlePostData}  type='submit' className='Tbtns'>Save</button>
</div>
</div>
   </div>
    </div>
        </div>
    )
}
export default SubOrganization;