const formatResponse = {
    getData: (data, tipo) => {
      if (data.length === 0) {
        return JSON.stringify({
          status: "error",
          message: `No hay ${tipo} para mostrar`,
          data: [],
        } , null , 2);
      } else {
        return JSON.stringify({
          status: "success",
          message: `${tipo} encontrados`,
          data: data,
        }, null , 2);
      }
    },
    add: (newdata ,tipo) => {
      if (!newdata) {
        return JSON.stringify({
          status: "error",
          message: `No se pudo agregar el ${tipo}` ,
          data: [],
        } , null , 2);
      } else {
        return JSON.stringify({
          status: "success",
          message: ` ${tipo} añadido correctamente`,
          data: newdata,
        } ,null , 2);
      }
  },
  delete: (id ,data ,tipo)=>{
    if(!id){
      return JSON.stringify({
        status : "error",
        message : `No se pudo eliminar el ${tipo}`,
       
      } , null , 2);
    } else{
      return JSON.stringify({
        status: "success",
        message: `Se elimino el ${tipo} con el id: ${id}`,
       data: data
      }, null , 2);

    }

  },

  search: (search, tipo )=>{
    if(!search){
      return JSON.stringify({
        status : "error",
        message : `No se encontro el ${tipo}`,
        data : [],
      }, null , 2);
    }
    else{
      return JSON.stringify({
        status: "success",
        message: `Se encontro el ${tipo} con el nombre: ${search.name}`,
        data: search
    }, null , 2);
  }

  },
  edit: (id , newdata , tipo)=>{
    if (!id){
      return JSON.stringify({
        status : "error",
        message : `No se encontro el ${tipo} con el id: ${id}`,
        data : [],
      })
    }else{
      return JSON.stringify({
        status : "success",
        messagge: `Se edito el ${tipo} con el id: ${id}`,
        data: newdata,
      } , null , 2);
    }

  }
}

module.exports = {
  formatResponse,
}
