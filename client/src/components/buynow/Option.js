import React from 'react'

const Option = () => {
  return (
    <>
      <div className="add_remove_select">
        <select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10+</option>
        </select>
      <p style={{cursor:"pointer"}}>Delete</p><span>|</span>
      <p className='forremovemedia'>Save for Later</p><span>|</span>
      <p className='forremovemedia' >See More like this</p><span>|</span>
      </div>
    </>
  )
}

export default Option
