import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [listPosting, setListPosting] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3000/api"
    }).then((response) => {
      setListPosting(response.data);
    }).catch((error) => {
      console.log('Error fetching data: ', error);
    });
  }, []);

  return (
    <div className='flex flex-col gap-4 items-center mt-12'>
      <div className='text-4xl font-semibold'>
        Daftar Posting
      </div>
        <div className='grid gap-2 items-center mt-4'>
          {listPosting.map((post) => (
            <div key={post.id} className='flex flex-col items-start border-4 rounded border-blue-500'>
              <div className='bg-slate-600 px-4 py-3 w-full capitalize font-medium'>{post.title}</div>
              <div className='px-4 py-2'>{post.content}</div>
            </div>
          ))}
        </div>
      
    </div>
  )
}

export default HomePage