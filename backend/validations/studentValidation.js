import Joi from 'joi';

export const studentValidationSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    address: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    year: Joi.string().required()
});

// export default studentValidationSchema;
