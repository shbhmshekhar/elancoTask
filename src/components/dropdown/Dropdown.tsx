import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface props{
  data:string[],
  setSelectedOption:any
  label:string
}

 const Dropdown = (props:props) =>{
  const{data, setSelectedOption, label} = props
  const [option, setOption] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value);
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id='demo-simple-select-standard-label'>{label}</InputLabel>
        <Select
          labelId='demo-simple-select-standard-label'
          id='demo-simple-select-standard'
          value={option}
          onChange={handleChange}
          label={label}
        >
          <MenuItem value='All'>  
            <em>All</em>
          </MenuItem>
          {data && data.map(option=> (
            <MenuItem value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Dropdown