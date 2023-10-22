import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostingPage = () => {
  const token = localStorage.getItem('token_login');

  const [form, setForm] = useState({
    title: "",
    content: "",
    status: 0,
    token: token
  });
  const [listPosting, setListPosting] = useState([]);
  const [errorAdd, setErrorAdd] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios({
        method: "POST",
        url: 'http://localhost:3000/api/post/create',
        data: form
      });

      console.log(result);
      setErrorAdd('sukses');
      window.location.reload();
    } catch (error) {
      console.log(error);
      setErrorAdd('error');
    } finally {
      setForm({});
      e.target.reset();
    }
  };

  const changeStatus = async (postId) => {
    try {
      const response = await axios({
        method: 'PUT',
        url: `http://localhost:3000/api/post/updateStatus/${postId}`
      })

      console.log(response.data.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setErrorAdd('error');
    }
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3000/api/post",
      params: { "token": token }
    }).then((response) => {
      setListPosting(response.data);
    }).catch((error) => {
      console.log('Error fetching data: ', error);
    });
  }, [token]);
  
  return (
    <div className='flex flex-col gap-4 items-center mt-12'>
      <div className='text-4xl font-semibold'>
        PostingPage
      </div>

      <form onSubmit={handleSubmit} className="border-2 py-6 px-16 flex flex-col items-center w-1/3">
        <div className="w-full">
          <label htmlFor="title">Title</label><br/>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="text-blue-600 px-2 w-full"
          />
        </div>
        
        <div className="w-full">
          <label htmlFor="content">Content</label><br/>
          <input
            type="text"
            name="content"
            value={form.content}
            onChange={handleChange}
            className="text-blue-600 px-2 w-full"
          />
        </div>

        <div className="w-full">
          <label htmlFor="status">Status artikel</label><br/>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="text-blue-600 px-2 w-full"
          >
            <option value="0" selected>Draft</option>
            <option value="1">Published</option>
          </select>
        </div>


        <button type="submit" className="mt-2 bg-slate-300 text-blue-800 px-4 py-1 rounded">
          Post
        </button>
      </form>

      {errorAdd && <div>{errorAdd}</div>}

      <div className='flex flex-col gap-4 items-center mt-12'>
        <div className='text-4xl font-semibold'>
          My Posting
        </div>
        <div className='grid gap-2 items-center mt-4'>
          {listPosting.map((post) => (
            <div key={post.id} className='flex flex-col items-start border-4 rounded border-blue-500'>
              <div className='bg-slate-600 px-4 py-3 w-full flex justify-between items-center'>
                <div className='capitalize font-medium'>{post.title}</div>
                <div className='flex gap-4 items-center'>
                  <div>Status: {post.status == 0 ? 'Draft' : 'Posted'}</div>
                  <button onClick={() => changeStatus(post.id)} className="bg-slate-300 text-blue-800 px-4 py-1 rounded">
                    Change Status
                  </button>
                </div>
                
              </div>
              <div className='px-4 py-2'>{post.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostingPage