import { useEffect, useState } from "react";
import { PostForm } from "../components/post/PostForm";
import { apiFetch } from "../api/api";
import { useParams } from "react-router";
import { Loader } from "../components/Loader";
import page from "../styles/page.module.css"

export function EditPage() {
    const params = useParams()
    const [post , setpost] = useState(null)

    const [error, setError] = useState(null)



    useEffect(()=>{
            async function getPost() {
                setError(null)
                try {
                    const postId = params.postId
                    const post = await apiFetch(`/posts/${postId}`)
                    
                    console.log(post);
                    setpost(post)
                } catch (error) {
                    console.error(error)
                    setError(error)
                } 
            }
            getPost()
    },
    [params.postId]
)
    if (error) return <p role="alert" className={page.error}>{error.message}</p>
    if (post === null) return <Loader />
    return (
        <PostForm post={post} />
    )
}