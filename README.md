# blog-redux-express

npx sequelize-cli model:generate --name User --attributes username:string,password:string,foto:string,alamat:string

npx sequelize-cli model:generate --name Pekerjaan --attributes id_user:integer,nama_pekerjaan:string,desc:string

npx sequelize-cli model:generate --name Pendidikan --attributes id_user:integer,jenis_pendidikan:string,nama_institusi:string

npx sequelize-cli model:generate --name Organisasi --attributes id_user:integer,jabatan:string,nama_organisasi:string

npx sequelize-cli model:generate --name Posting --attributes id_user:integer,title:string,content:string,status:integer