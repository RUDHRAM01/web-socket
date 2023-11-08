import React from 'react'
import Navigation from '../../navigation/Navigation'
import Title from '../../common/Title'
import MyChat from './MyChat'
import SearchUser from '../../navigation/SearchUser'

function AllChat() {
    return (
        <div style={{ width: "30%", height: "94vh" }}>
            <Title title={`Let's chat`} size={'60px'} />
            <Navigation />
            <MyChat />
            <SearchUser />
        </div>
    )
}

export default AllChat