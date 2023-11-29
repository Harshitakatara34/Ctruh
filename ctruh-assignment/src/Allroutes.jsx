import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Post from './pages/Post'
import PostDetails from './pages/PostDetails'


const Allroutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Post/>} />
            <Route path="/post/:id" element={<PostDetails />} />
        </Routes>

    )
}

export default Allroutes