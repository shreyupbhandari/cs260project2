import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import './table.css'

function TableRow({grantData,index})
{
  
  return (
    <>
    <tr key={grantData["@AppNumber"]}>
      <td>{index+1}</td>
      <td>{grantData.ProjectTitle}</td>
      <td>{grantData.Institution}</td>
      <td className={grantData.Program}>{grantData.Program}</td>
      <td>{grantData.InstCity}</td>
      <td>{grantData.PrimaryDiscipline}</td>
    </tr>
    </>
  );

}

function Table({grantArray})
{

  return(
    <>
      
        <title>Grant Table</title>
        <table>
          <thead className="Header">
            <tr>
              <th>SN</th>
              <th>Project Title</th>
              <th>Institution</th>
              <th>Program</th>
              <th>State</th>
              <th>Project Discipline</th>
            </tr>
          </thead>
          <tbody className="Body">
          {grantArray.map((data,index)=>(<TableRow grantData={data} index={index}></TableRow>))}
          </tbody>
        </table>
      
  </>
  );

}



function App() {
  const [Grant, setGrant]=useState([]);
  useEffect(()=>{
    async function fetchGrant() {
      const url="/NEH2020sGrant_Short.json";
      const response = await fetch(url);
      const result = await response.json();
      setGrant(result.Grants.Grant);
    }
   fetchGrant();
  },[])
  
    

  return (
    
    <Table grantArray={Grant}/>

  );
}

export default App;
