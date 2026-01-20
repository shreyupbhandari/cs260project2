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
      <td>{grantData.InstState}</td>
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
          {console.log(grantArray)}
          </tbody>
        </table>
      
  </>
  );

}



function App() {
  const [Grant, setGrant]=useState([]);
  const [search, setSearch] = useState("");

  useEffect(()=>{
    async function fetchGrant() {
      const url="/NEH2020sGrant_Short.json";
      const response = await fetch(url);
      const result = await response.json();
      setGrant(result.Grants.Grant);
    }
   fetchGrant();
  },[])
  const filteredGrants = Grant.filter(grant =>
  grant.InstState
    ?.toLowerCase()
    .includes(search.toLowerCase())
);
  return (<>
    <input
      placeholder="Filter by state (e.g. CA, NY)"
      value={search}
      onChange={e => setSearch(e.target.value)}
    />

    <Table grantArray={filteredGrants}/>
      </>

  );
}

export default App;
