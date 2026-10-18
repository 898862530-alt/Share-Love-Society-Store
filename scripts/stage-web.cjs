const fs=require('node:fs');
fs.cpSync('dist/build/h5','dist/client',{recursive:true,force:true});
