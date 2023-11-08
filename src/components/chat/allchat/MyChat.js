import React from 'react'
import SingleChat from './SingleChat'
import data from "../../../common-data/Common.json"

function MyChat() {
  return (
      <div >
          {data.map((item) => <SingleChat props={item} />)}
    </div>
  )
}

export default MyChat