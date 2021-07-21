import React, { useState, useEffect } from "react";
import axios from 'axios'

export default function PostPage(props) {
    // useState's first argument must be the default value
    const [ activePost, setActivePost ] = useState({})
    const [ activePostId, setActivePostId ] = useState(0);

    // load in the current active post
    useEffect(() => {
        const fetchPost = async (postId) => {
            // const base_URL = "https://3000-crimson-swan-e89x11fw.ws-us10.gitpod.io/api/lists/brands/"
            const base_URL = "https://jsonplaceholder.typicode.com/posts/"
            const response = await axios.get(base_URL + postId);
            console.log(postId, ">>>", response.data);
            setActivePost(response.data);
        }
        fetchPost(activePostId)
    }, [activePostId])

    return (
        <React.Fragment>
            <h1>Posts</h1>
            <h2> Active Post </h2>
            <input type="text" value={activePostId} 
                name="activePostId"
                onChange = {(e) => {
                    setActivePostId(e.target.value)
                }}
            />
            <div className="card">
                <div className="card-title">
                    {activePost.title}
                    {/* {activePost.name} */}
                </div>
                <p>{activePost.body}</p>
                {/* <p>{activePost.description}</p> */}
            </div>
            <hr/>
        </React.Fragment>
    )
}