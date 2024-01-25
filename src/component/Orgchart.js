import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tree from 'react-d3-tree'; 
import { Link } from 'react-router-dom';

const TreeNode = ({ node, onNodeClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return ( 
    <div className="mb-4 w-full flex flex-col items-center">
      <div className="flex flex-col cursor-pointer space-x-2" onClick={handleToggle}>
        <span className={`text-2xl p-2.5 rounded-full font-medium text-${isOpen ? 'blue' : 'black'}-500`}>
          {node.organizationname && (
           <div>
              <img src='/images/signlogo.png' className="w-16 h-16 p-2.5 bg-white ml-3 rounded-full" alt="Logo" />
            </div>
          )}
          {node.organizationname || node.departmentname || node.designationame}
        </span>
      </div>

      <div className="text-2xl items-center justify-center">
        {node.departments && isOpen && (
          <div className="ml-4 flex gap-4 h-6 w-6 space-y-2 justify-center">
            {Object.values(node.departments).map((department) => (
              <div key={department.departmentid}>
                <img src={department.departmentimage || 'https://drive.google.com/file/d/1DpqbrD6zbeGKu4IksqOOMOZMpY0DIjy0/view?usp=drive_link'}
                  className="w-10 h-10 border p-2.5 bg-white rounded-full"
                  alt="Department Image"/>
                <div className="flex flex-row items-center space-x-2">
                  <TreeNode node={department} onNodeClick={onNodeClick} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {node.designations && isOpen && (
        <ul className="ml-8 space-y-2">
          {Object.values(node.designations).map((designation) => (
            <li key={designation.designationid}>
              <span className="text-black-500"> {designation.designationame}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Orgchart = () => {
  const [organisationInformation, setOrganisationInformation] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    // const organisationid = "5aa767ee-5f7a-42c1-9640-df8f9c5f5332";
    const organisationid = sessionStorage.getItem("organisationid")
    const getOrganisation = async (organisationid) => {
      try {
        const getData = await axios.get(`http://localhost:5247/api/Department/GetDepartmentsDesignationsByOrganizationId?organizationId=${organisationid}`);
        console.log(getData);
         setOrganisationInformation(getData.data.Response);
        const transformedData = mapData(getData.data.Response);
        setOrganisationInformation(transformedData);
      } catch (err) {
        console.error(err);
      }
    };
    getOrganisation(organisationid);
  }, []);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  }; 
  
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  
  const mapData = (data) => {
    const transformedData = {
      name: data.organizationname || data.departmentname || data.designationame, 
      // name: data.organizationname || (data.departmentname ? `${data.departmentname} - ${data.departmentimage}` : '') || data.designationame,
      children: [],
    };
  
    if (data.departments) {
      transformedData.children = Object.values(data.departments).map((department) =>
        mapData(department)
      );
    }
    
    if (data.designations) {
      transformedData.children = transformedData.children.concat(
        Object.values(data.designations).map((designation) => ({
          name: designation.designationame,
        }))
      );
    }
  
    return transformedData;
  };
  
  if (organisationInformation.length === 0) {
    return <div> Loading... </div>;
  }

  return (
    <div className={`${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className='form-data' style={{ display: 'flex' }}>
        <div className='sidebar'>
          <div style={{ display: 'flex', marginTop: '25px' }}>
            <img src="/images/Layer 1.png" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: '0', width: '80.677px', height: '35px', marginLeft: '20px' }} />
          </div>
          <div className='sidelinddde'>
            <h2 style={{ fontSize: '20px', color: '#626C83', marginLeft: '50px' }}>Saas</h2>
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
            <ul>
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
                <img src="/images/Ellipse 47.png" alt="User Avatar" />
              </div>
            </ul>
            <div className='menu'>
              <label htmlFor="chk1">
                <i className="fa fa-bars" aria-hidden="true"></i>
              </label>
            </div>
          </div>
          <div className='Cover' style={{ padding: '10px' }}>
            <h2>Organization Chart</h2>
            <div>
            <div style={{ width: '100%', height: '500px' }}>
          <Tree
            data={organisationInformation}
            orientation="vertical"
            translate={{ x: 300, y: 150 }}
            // pathFunc="step"
            separation={{ siblings: 2, nonSiblings: 2 }}
          />
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Orgchart;