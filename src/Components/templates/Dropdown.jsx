import React from 'react'

const Dropdown = ({title, options, func}) => {
  return (
    <div className='select'>
    <select defaultValue='0' onChange={func } name="format" id="format">
      <option value="0" disabled >{title}</option>
      {options.map((el, i)=>(
        <option key={i} value={el} >{el.toUpperCase()} </option>
      ))}
    </select>
  </div>
  )
}

export default Dropdown



//(e)=> setCategory(e.target.value)
//console.log(e.target.value)