import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function TableRow({grantData})
{

  return (
    <>
    <tr>
      <td> {grantData.ProjectTitle}</td>
      <td> {grantData.Institution}</td>
    </tr>
    </>
  );

}

function Table({grantArray})
{
  return(<table>
    <tr>
      <th>Project Title</th>
      <th>Institution</th>
    </tr>
    {grantArray.map(data=>(<TableRow grantData={data}></TableRow>))}
  </table>);

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
