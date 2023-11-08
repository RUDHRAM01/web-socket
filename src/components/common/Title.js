import React from 'react'

function Title({title, size, color}) {
  return (
      <div style={{fontSize:size,color:color}}>
          {title}
    </div>
  )
}

export default Title