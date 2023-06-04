import Joi from "joi";


//not inuse

export const createFichaSchema = Joi.object({
    Serie: Joi.string().required(),
    Acunid_antiguo: Joi.string().required(),
    Enlace: Joi.string().required(),
    Descripcion: Joi.string().required(),
    Concatenacion: Joi.string().required(),
    Paraje: Joi.string().required(),
    Municipio: Joi.string().required(),
    Fauna: Joi.string().required(),
    Flora: Joi.string().required(),
    Geologia: Joi.string().required(),
    Enlace_ebird: Joi.string().required(),
    X: Joi.string().required(),
    Y: Joi.string().required(),
    Status_de_conservacion: Joi.string().required(),
    Recomendacion: Joi.string().required()
});
