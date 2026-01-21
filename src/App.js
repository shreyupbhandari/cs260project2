import logo from './logo.svg';
import './App.css';
import { use, useEffect, useState } from 'react';
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
  const [filterState, setfilterState] = useState("ALL");
  const [searchText,setSearchText]= useState("");


  useEffect(()=>{
    async function fetchGrant() {
      const url="/NEH2020sGrant_Short.json";
      const response = await fetch(url);
      const result = await response.json();
      setGrant(result.Grants.Grant);
    }
   fetchGrant();
  },[])
  let interactiveData=[...Grant]
  //To create dropdown options for states; the set function ensures that there are no duplicates
  const states= ["ALL",...new Set((Grant.map(grant => grant.InstState)))];

  //Check for the filters through the drop down.
  if (filterState !== "ALL") 
    {
    interactiveData= Grant.filter(data => data.InstState === filterState)
    }
  // Check for any changes in the search option for universities
    if (searchText.trim() !== "") {
    interactiveData = Grant.filter(data =>data.Institution.toLowerCase().includes(searchText.toLowerCase()));
    }

  return (<>
    <select
      value={filterState}
      onChange={event => setfilterState(event.target.value)}>
      {states.map(state => <option key={state} value={state}>{state}</option>)}
    </select>

    <input
      placeholder="Search University"
      value={searchText}
      onChange={event => setSearchText(event.target.value)}/>


    <Table grantArray={interactiveData}/>
      </>

  );
}

export default App;
