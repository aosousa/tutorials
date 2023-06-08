import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { postUpdated } from './postsSlice'

export const EditPostForm = ({ match }) => {
  const { postId } = match.params

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const dispatch = useDispatch()
  const history = useHistory()

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }))
      history.push(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="post-title">Post Title:</label>
        <input
          type="text"
          id="post-title"
          name="post-title"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="post-content">Post Content:</label>
        <textarea
          name="post-content"
          id="post-content"
          value={content}
          onChange={onContentChanged}
        ></textarea>
      </form>

      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}
