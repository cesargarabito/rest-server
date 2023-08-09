const path = require('path');
const { v4: uuidv4} = require('uuid');

const subirArchivo = (files, extensioesValidas = ['png', 'jpg', 'txt'], carpeta = '') => {
return new Promise(( resolve, reject) => {
    const { archivo } = files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length- 1];

    //Validar la extension
    
    if (!extensioesValidas.includes( extension )){
        return reject(`La extension ${extension} no es valida, solo estas son admitidas: ${extensioesValidas}`)
    }

    const nombreTemp = uuidv4() + '.' + extension;
  
    const uploadPath = path.join( __dirname, '../uploads/' , carpeta, nombreTemp);
  
    archivo.mv(uploadPath, function(err) {
      if (err) {
        reject(err)
      }
  
     resolve( nombreTemp );
    });
})

}

module.exports ={
    subirArchivo
}