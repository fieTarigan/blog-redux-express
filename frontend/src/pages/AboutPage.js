import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutPage = () => {
  const token = localStorage.getItem('token_login');

  const [dataDiri, setDataDiri] = useState({
    username: "",
    foto: "https://via.placeholder.com/300",
    alamat: "",
  });
  const [dataPekerjaan, setDataPekerjaan] = useState([]);
  const [dataPendidikan, setDataPendidikan] = useState([]);
  const [dataOrganisasi, setDataOrganisasi] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3000/api/about",
      params: { "token": token }
    }).then((response) => {
      // console.log(response.data);
      setDataDiri({
        username: response.data.username,
        foto: response.data.foto,
        alamat: response.data.alamat,
      });

      setDataPekerjaan(response.data.Pekerjaans);
      setDataPendidikan(response.data.Pendidikans);
      setDataOrganisasi(response.data.Organisasis);
    }).catch((error) => {
      console.log('Error fetching data: ', error);
    });
  }, [token]);

  return (
    
    <div className='flex flex-col gap-4 items-center mt-12'>
      <div className='flex flex-col gap-4 items-center mt-12'>
        <div className='text-4xl font-semibold'>
          About Me
        </div>
        <div className='flex gap-4 items-center mt-4'>
          <div >
            <img src={dataDiri.foto} alt='profil' width='50px' style={{borderRadius: '50%'}} />
          </div>
          <div className='flex flex-col gap-3'>
            <div>Username: {dataDiri.username}</div>
            <div>Alamat: {dataDiri.alamat}</div>
          </div>
        </div>
      </div>

      <div>Daftar Pekerjaan</div>
      <div>
        {dataPekerjaan.map((data) => (
          <div key={data.id}>
            <div><span className='text-blue-500'>Nama pekerjaan:</span> {data.nama_pekerjaan}</div>
            <div><span className='text-blue-500'>Deskripsi:</span> {data.desc}</div>
          </div>
        ))}
      </div>
      
      <div>Daftar Pendidikan</div>
      <div>
        {dataPendidikan.map((data) => (
          <div key={data.id}>
            <div><span className='text-blue-500'>Jenis pendidikan:</span> {data.jenis_pendidikan}</div>
            <div><span className='text-blue-500'>Nama Institusi:</span> {data.nama_institusi}</div>
          </div>
        ))}
      </div>
      
      <div>Daftar Organisasi</div>
      <div>
        {dataOrganisasi.map((data) => (
          <div key={data.id}>
            <div><span className='text-blue-500'>Jabatan:</span> {data.jabatan}</div>
            <div><span className='text-blue-500'>Nama organisasi:</span> {data.nama_organisasi}</div>
          </div>
        ))}
      </div>
    </div>
    
  )
}

export default AboutPage