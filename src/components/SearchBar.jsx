import React,{useState} from 'react'
import { TextField } from '@mui/material'

export default function SearchBar(props){
    const [term,setterm]=useState(' ')

    function handleinput(event){
        setterm(event.target.value)
    }

    function handleSearch(event){
        setterm(event.target.value)
        props.onSearch(term)
    }

    return <>
    <div className='container mx-auto text-center py-4 '>
    <TextField
        helperText="Please Enter City Name"
        id="demo-helper-text-aligned"
        label="City"
        className='SearchOption w-96 bold m-15 text-4xl '
        onInput={handleinput}
        value={term}
    />
    
    <button onClick={handleSearch} className=' bg-sky-500 h-14 px-6 text-xls rounded shadow-xl ml-2' type="submit">Search</button>
    </div> 
    </>
}