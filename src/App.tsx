import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import DataTable from './components/table/DataTable';
import {DATA} from './models';
import Dropdown from './components/dropdown/Dropdown';

function App() {

  const [data, setData] = useState<DATA>([]);
  const[dropDownAPIData, setDropDownAPIData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

const getData1 = async (url:string) => {
  try{
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }catch(err){
    console.log(err);
  }
}


  useEffect(() => {
      (async()=> {
      const tableData = await getData1('https://engineering-task.elancoapps.com/api/raw');
      setData(tableData);
      const dropdownApiData = await getData1('https://engineering-task.elancoapps.com/api/applications');
      setDropDownAPIData(dropdownApiData);
    })()
  }, []);

  useEffect(()=> {
    console.log("selectedOption", selectedOption);
    if(selectedOption!==null || selectedOption !=='All'){
      (async ()=> {
        const tableData = await getData1(`https://engineering-task.elancoapps.com/api/applications/${selectedOption}`);
        console.log("tableData",tableData, `https://engineering-task.elancoapps.com/api/applications/${selectedOption}`);
        // setData(tableData);
      })()
    }
    
  },[selectedOption])

  return (
    <div className="App">
      <Dropdown data={dropDownAPIData} setSelectedOption={setSelectedOption}/>
     <DataTable tableData = {data} />
    </div>
  );
}

export default App;
