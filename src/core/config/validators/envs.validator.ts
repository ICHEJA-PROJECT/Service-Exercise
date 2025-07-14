import * as Joi from "joi";
import { EnvsI } from "../domain/interfaces/EnvsI";

export const envsValidator = Joi.object<EnvsI>({
    PORT: Joi.number().required(),
    DB_NAME: Joi.string().required().description("Name of database"),
    DB_PORT: Joi.number().required().description("Port of database"),
    DB_HOST: Joi.string().required().description("Host of database"),
    DB_USERNAME: Joi.string().required().description("Username to acceso at database"),
    DB_PASSWORD: Joi.string().required().description("Password to access at database"),
    BROKER_HOSTS: Joi.array().items(Joi.string()).required().description("Hosts of the message broker"),
    UPLOAD_FILES_SERVICE_URL: Joi.string().required(),
    PUPIL_TOPICS_SERVICE_URL: Joi.string().required(),
}).unknown(true);