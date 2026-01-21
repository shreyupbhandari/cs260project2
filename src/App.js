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
      <td>{grantData.YearAwarded}</td>
    </tr>
    </>
  );

}

function Table({grantArray,sortDirection, sortDirectionYear, onSort,onYearSort})
{

  return(

    <>
        <title>Grant Table</title>
        <table>
          <thead className="Header">
            <tr>
              <th>SN</th>
              <th className="sortable" onClick={onSort}><span>Project Title</span>
              <span className="sort-icon">
                {sortDirection === "asc" && "▲"}
                {sortDirection === "desc" && "▼"}
              </span>
              </th>
              <th>Institution</th>
              <th>Program</th>
              <th>State</th>
              <th>Project Discipline</th>
              <th className="sortable" onClick ={onYearSort}><span>Year</span>
              <span className="sort-icon">
                {sortDirectionYear === "asc" && "▲"}
                {sortDirectionYear === "desc" && "▼"}
              </span>
              </th>
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
  const [sortDirection, setSortDirection] = useState(null);
  const [sortDirectionYear,setSortDirectionYear]= useState(null);

  useEffect(()=>{
    async function fetchGrant() {
      const url="/NEH2020sGrant_Short.json";
      const response = await fetch(url);
      const result = await response.json();
      setGrant(result.Grants.Grant);
    }
   fetchGrant();
  },[])
  let interactiveData= [...Grant]
  function toggleProjectTitleSort()
   {setSortDirection(prev => 
    prev === "asc" ? "desc" : "asc");}
  function toggleYearSort()
   {setSortDirectionYear(prev => 
    prev === "asc" ? "desc" : "asc");}
  //To create dropdown options for states; the set function ensures that there are no duplicates
  const states= ["ALL",...new Set((Grant.map(grant => grant.InstState)))];

  //Check for the filters through the drop down.
  if (filterState !== "ALL") 
    {
    interactiveData= interactiveData.filter(data => data.InstState === filterState)
    }
  // Check for any changes in the search option for universities
    if (searchText.trim() !== "") {
    interactiveData = interactiveData.filter(data =>data.Institution.toLowerCase().includes(searchText.toLowerCase()));
    }
  //Sorting based on project title
    interactiveData = [...interactiveData].sort((a, b) => {
  if (!sortDirection) 
    {return 0;} //If no sort direction is specified, do not sort

  else if (sortDirection === "asc") {
    if (a.ProjectTitle < b.ProjectTitle) 
      {return -1;}
    if (a.ProjectTitle > b.ProjectTitle) 
      {return 1;}
    else
      {return 0;}
      // Ascending order
  }
  else if (sortDirection==="desc") // Descending order
    {
      if (a.ProjectTitle < b.ProjectTitle) 
        {return 1;}
      if (a.ProjectTitle > b.ProjectTitle) 
        {return -1;}
      else
        {return 0;}
    }
    });

  interactiveData = [...interactiveData].sort((a, b) => {
  if (!sortDirectionYear) 
    {return 0;} //If no sort direction is specified, do not sort

  else if (sortDirectionYear === "asc") {
    if (a.YearAwarded < b.YearAwarded) 
      {return -1;}
    if (a.YearAwarded > b.YearAwarded) 
      {return 1;}
    else
      {return 0;}
      // Ascending order
  }
  else if (sortDirectionYear==="desc") // Descending order
    {
      if (a.YearAwarded < b.YearAwarded) 
        {return 1;}
      if (a.YearAwarded > b.YearAwarded) 
        {return -1;}
      else
        {return 0;}
    }
    });

  return (<>
  <div className="controls">
    <select
      value={filterState}
      onChange={event => setfilterState(event.target.value)}>
      {states.map(state => <option key={state} value={state}>{state}</option>)}
    </select>

    <input
      placeholder="Search University"
      value={searchText}
      onChange={event => setSearchText(event.target.value)}/>
  </div>

    <Table grantArray={interactiveData} sortDirection={sortDirection} sortDirectionYear={sortDirectionYear} onSort={toggleProjectTitleSort} onYearSort={toggleYearSort}/>
      </>

  );
}

export default App;
