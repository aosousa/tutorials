import { createSlice, nanoid, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { client } from '../../api/client'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts');
    return response.data;
})

export const addNewPost = createAsyncThunk('posts/addNewPost',
    // the payload creator receives the partial {title, content, user} object
    async initialPost => {
        // send initial data to the fake API server
        const response = await client.post('/fakeApi/posts', initialPost)

        // response includes the complete post object, including unique ID
        return response.data
    }
)

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

export const {
    selectAll: selectAllPosts,
    selectIds: selectPostIds,
    selectById: selectPostById,
} = postsAdapter.getSelectors((state) => state.posts)  

const initialState = postsAdapter.getInitialState({
    status: 'idle',
    error: null
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action) => {
                state.items.push(action.payload)
            },
            prepare: (title, content, userId) => {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0
                        }
                    }
                }
            }
        },
        postUpdated: (state, action) => {
            const { id, title, content } = action.payload
            const existingPost = state.entities[id]
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload
            const existingPost = state.entities[postId]
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    // used for actions defined outside the slice - such as the thunks below
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            postsAdapter.upsertMany(state, action.payload)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(addNewPost.fulfilled, postsAdapter.addOne)
    }
});

export const { postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;

export const selectPostsByUser = createSelector(
    // input
    [selectAllPosts, (state, userId) => userId],
    
    // output
    (posts, userId) => posts.filter(post => post.user === userId)
)