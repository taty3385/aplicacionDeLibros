const formatResponse = { // se crea un objeto para dar la vista de los datos
    getData: (data, tipo) => { // se crea la funcion para  obtener los datos de books/authors/publishers
      if (data.length === 0) { // si no hay datos se retorna un mensaje de error
        return JSON.stringify({ // se convierte el objeto a un archivo json para que pueda ser leido
          status: "error", // se crea un objeto con el status de error
          message: `No hay ${tipo} para mostrar`, // se crea un mensaje de error y pasa el tipo de dato si es book/author/publisher
          data: [],
        } , null , 2);
      } else {
        return JSON.stringify({ // si hay datos se retorna un mensaje de success y los datos
          status: "success",
          message: `${tipo} encontrados`,
          data: data,
        }, null , 2);
      }
    },
    add: (newdata ,tipo) => {  // funcion para agregar un nuevo book/author/publisher
      if (!newdata) { // si no se pudo agregar el book/author/publisher se retorna un mensaje de error
        return JSON.stringify({ // se convierte el objeto a un archivo json para que pueda ser leido
          status: "error",
          message: `No se pudo agregar el ${tipo}` ,
          data: [],
        } , null , 2);
      } else {
        return JSON.stringify({ // si se pudo agregar el book/author/publisher se retorna un mensaje de success y los datos del nuevo book/author/publisher
          status: "success",
          message: ` ${tipo} añadido correctamente`,
          data: newdata,
        } ,null , 2);
      }
  },
  delete: (id ,data ,tipo)=>{  // funcion para eliminar un book/author/publisher
    if(!id){ // si no  existe el id se retorna un mensaje de error de que no se pudo eliminar el book/author/publisher
      return JSON.stringify({
        status : "error",
        message : `No se pudo eliminar el ${tipo}`,
       
      } , null , 2);
    } else{
      return JSON.stringify({ // si el id existe se retorna un mensaje de success y los datos del book/author/publisher elimin
        status: "success",
        message: `Se elimino el ${tipo} con el id: ${id}`,
       data: data
      }, null , 2);

    }

  },

  search: (search, tipo )=>{ // funcion para buscar un book/author/publisher
    if(!search){ // si no se encontro el book/author/publisher se retorna un mensaje de error
      return JSON.stringify({ // se convierte el objeto a un archivo json para que pueda ser leido
        status : "error",
        message : `No se encontro el ${tipo}`,
        data : [],
      }, null , 2);
    }
    else{
      return JSON.stringify({ // si se encontro el book/author/publisher se retorna un mensaje de success y los datos del book/author/publisher
        status: "success",
        message: `Se encontro el ${tipo} con el nombre: ${search.name}`,
        data: search
    }, null , 2);
  }

  },
  edit: (id , newdata , tipo)=>{ // funcion para editar un book/author/publisher
    if (!id){ // si el id no existe se retorna un mensaje de error
      return JSON.stringify({ // se convierte el objeto a un archivo json para que pueda ser leido
        status : "error",
        message : `No se encontro el ${tipo} con el id: ${id}`,
        data : [],
      })
    }else{ 
      return JSON.stringify({ // si el id existe se retorna un mensaje de success y los datos del book/author/publisher editado
        status : "success",
        messagge: `Se edito el ${tipo} con el id: ${id}`,
        data: newdata, // se retorna el nuevo dato
      } , null , 2);
    }

  }
}

module.exports = { // se exporta el objeto formatResponse
  formatResponse,
}
