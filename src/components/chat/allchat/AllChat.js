import React from 'react'
import Navigation from '../../navigation/Navigation'
import Title from '../../common/Title'
import MyChat from './MyChat'
import SearchUser from '../../navigation/SearchUser'

function AllChat() {
    return (
        <div style={{ height: "94vh",backgroundColor:"black",borderRadius:"4px",padding:"8px", border:"1px solid gray" }} className='AllChat'>
            <Title title={`Let's chat`} size={'60px'} color={"white"} />
            <hr style={{color:"white"}}/>
            <Navigation />
            <MyChat />
            <SearchUser />
        </div>
    )
}

export default AllChat