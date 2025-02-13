export const validationProfesor = {
    user_id: {
      'number.base': '"user_id" debe ser un número',
      'any.required': '"user_id" es un campo obligatorio',
      'number.empty': '"user_id" no puede estar vacío',
    },
    nombre: {
      'string.base': '"nombre" debe ser un texto',
      'string.empty': '"nombre" no puede estar vacío',
      'string.min': '"nombre" debe tener al menos 1 carácter',
      'string.max': '"nombre" no puede exceder los 50 caracteres',
      'any.required': '"nombre" es un campo obligatorio',
    },
    apellido_paterno: {
      'string.base': '"apellido paterno" debe ser un texto',
      'string.empty': '"apellido paterno" no puede estar vacío',
      'string.min': '"apellido paterno" debe tener al menos 1 carácter',
      'string.max': '"apellido paterno" no puede exceder los 50 caracteres',
      'any.required': '"apellido paterno" es un campo obligatorio',
    },
    apellido_materno: {
      'string.base': '"apellido materno" debe ser un texto',
      'string.empty': '"apellido materno" no puede estar vacío',
      'string.min': '"apellido materno" debe tener al menos 1 carácter',
      'string.max': '"apellido materno" no puede exceder los 50 caracteres',
      'any.required': '"apellido materno" es un campo obligatorio',
    },
    email: {
      'string.base': '"email" debe ser un texto',
      'string.email': '"email" debe tener un formato de correo electrónico válido',
      'string.empty': '"email" no puede estar vacío',
      'any.required': '"email" es un campo obligatorio',
    },
    curp: {
      'string.base': '"curp" debe ser un texto',
      'string.length': '"curp" debe tener exactamente 18 caracteres',
      'any.required': '"curp" es un campo obligatorio',
    },
    matricula: {
      'string.base': '"matricula" debe ser un texto',
      'string.max': '"matricula" no puede exceder los 20 caracteres',
      'any.required': '"matricula" es un campo obligatorio',
    },
    fecha_nacimiento: {
      'string.base': '"fecha_nacimiento" debe ser un texto',
      'string.max': '"fecha_nacimiento" no puede exceder los 20 caracteres',
      'any.required': '"fecha_nacimiento" es un campo obligatorio',
    },
    calle: {
      'string.base': '"calle" debe ser un texto',
      'string.max': '"calle" no puede exceder los 100 caracteres',
      'any.required': '"calle" es un campo obligatorio',
    },
    codigo_postal: {
      'string.base': '"codigo_postal" debe ser un texto',
      'string.max': '"codigo_postal" no puede exceder los 10 caracteres',
      'any.required': '"codigo_postal" es un campo obligatorio',
    },
    colonia: {
      'string.base': '"colonia" debe ser un texto',
      'string.max': '"colonia" no puede exceder los 20 caracteres',
      'any.required': '"colonia" es un campo obligatorio',
    },
    numero_int: {
      'string.base': '"numero_int" debe ser un texto',
      'string.max': '"numero_int" no puede exceder los 10 caracteres',
      'any.required': '"numero_int" es un campo obligatorio',
    },
    numero_ext: {
      'string.base': '"numero_ext" debe ser un texto',
      'string.max': '"numero_ext" no puede exceder los 10 caracteres',
      'any.required': '"numero_ext" es un campo obligatorio',
    },
    celular: {
      'string.base': '"celular" debe ser un texto',
      'string.max': '"celular" no puede exceder los 10 caracteres',
      'any.required': '"celular" es un campo obligatorio',
    },
    correo: {
      'string.base': '"correo" debe ser un texto',
      'string.max': '"correo" no puede exceder los 100 caracteres',
      'any.required': '"correo" es un campo obligatorio',
    },
    tipo_sangre: {
      'string.base': '"tipo_sangre" debe ser un texto',
      'string.min': '"tipo_sangre" debe tener al menos 2 caracteres',
      'string.max': '"tipo_sangre" no puede exceder los 3 caracteres',
      'any.required': '"tipo_sangre" es un campo obligatorio',
      'any.only': '"tipo_sangre" debe ser uno de los siguientes: A+, A-, B+, B-, AB+, AB-, O+, O-',
    },
    resumen_profesional: {
      'string.base': '"resumen_profesional" debe ser un texto',
      'string.max': '"resumen_profesional" no puede exceder los 1000 caracteres',
      'any.required': '"resumen_profesional" es un campo obligatorio',
    },
  };
  

  export const validationCertificado = {
    profesor_id: {
      "number.base": "El ID del profesor debe ser un número",
      "any.required": "El ID del profesor es obligatorio",
    },
    nombre:{
      "string.base": "El nombre de la certificación debe ser un texto",
      "string.max": "El nombre de la certificación no debe exceder los 255 caracteres",
      "any.required": "El nombre de la certificación es obligatorio",
    },
    institucion: {
      "string.base": "La institución debe ser un texto",
      "string.max": "La institución no debe exceder los 255 caracteres",
      "any.required": "La institución es obligatoria",
    },
    fecha_obtencion: {
      "date.base": "La fecha de obtención debe ser una fecha válida",
      "any.required": "La fecha de obtención es obligatoria",
    },
    archivo: {
       "string.base": "El archivo debe ser una ruta de texto",
      "string.max": "El archivo no debe exceder los 255 caracteres",
    },
  };
  

  export const validationAptitudes = {
    profesor_id: {
      "number.base": "El ID del profesor debe ser un número",
      "any.required": "El ID del profesor es obligatorio",
    },
    aptitud:{
      "string.base": "La aptitud debe ser un texto",
      "string.max": "La aptitud no debe exceder los 255 caracteres",
      "any.required": "La aptitud es obligatorio",
    },
    descripcion: {
      "string.base": "La descripcion debe ser un texto",
      "string.max": "La descripcion no debe exceder los 255 caracteres",
      "any.required": "La descripcion es obligatoria",
    }
  };


  export const validationEducation = {
    profesor_id: {
      "number.base": "El ID del profesor debe ser un número",
      "any.required": "El ID del profesor es obligatorio",
    },
    aptitud:{
      "string.base": "La aptitud debe ser un texto",
      "string.max": "La aptitud no debe exceder los 255 caracteres",
      "any.required": "La aptitud es obligatorio",
    },
    descripcion: {
      "string.base": "La descripcion debe ser un texto",
      "string.max": "La descripcion no debe exceder los 255 caracteres",
      "any.required": "La descripcion es obligatoria",
    }
  };
  