import React, {useState, useEffect} from 'react';
import './App.css';
import DataTable from './components/table/DataTable';
import {DATA} from './models';
import Dropdown from './components/dropdown/Dropdown';

function App() {
  const [fullData, setFullData]= useState<DATA>([]);
  const [data, setData] = useState<DATA>([]);
  const[applicationDropDownAPIData, setApplicationDropDownAPIData] = useState([]);
  const [applicationSelectedOption, setApplicationSelectedOption] = useState('All');
  const [resourcesDropDownData, setResourcesDropDownData] = useState([]);
  const [selectedResource, setSelectedResource] = useState('All');

  

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
      setFullData(tableData)
      const appDropdownApiData = await getData1('https://engineering-task.elancoapps.com/api/applications');
      setApplicationDropDownAPIData(appDropdownApiData);
      const resDropdownApiData = await getData1('https://engineering-task.elancoapps.com/api/resources');
      setResourcesDropDownData(resDropdownApiData);
    })()
  }, []);

  useEffect(()=> {
    if(applicationSelectedOption ==='All'){
     setData(fullData)
    
    }else{
      (async ()=> {
        const tableData = await getData1(`https://engineering-task.elancoapps.com/api/applications/${applicationSelectedOption}`);
        setData(tableData);
      })()
    }
    
  },[applicationSelectedOption])

  useEffect(()=> {
    if(selectedResource ==='All'){
      setData(fullData)
     }else{
       (async ()=> {
         const tableData = await getData1(`https://engineering-task.elancoapps.com/api/resources/${selectedResource}`);
         setData(tableData);
       })()
     }
  },[selectedResource])



  return (
    <div className="App">
      <div className='dropdown__container'>
      <Dropdown data={applicationDropDownAPIData} setSelectedOption={setApplicationSelectedOption} label={'Application'}/>
      <Dropdown data={resourcesDropDownData} setSelectedOption={setSelectedResource} label={'Resources'}/>
      </div>
     <DataTable tableData = {data} />
    </div>
  );
}

export default App;
