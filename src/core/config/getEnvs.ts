import 'dotenv/config';
import { EnvsI } from "./domain/interfaces/EnvsI";
import { envsValidator } from "./validators/envs.validator";

const getEnvs = (): EnvsI => {

    const { error, value } = envsValidator.validate({
        ...process.env,
        BROKER_HOSTS: process.env.BROKER_HOSTS?.split(', '),
    });

    if(error) {
        throw new Error(`Invalid enviroment variables: ${error}`);
    } 

    return {
        PORT: value.PORT,
        DB_NAME: value.DB_NAME,
        DB_PORT: value.DB_PORT,
        DB_HOST: value.DB_HOST,
        DB_USERNAME: value.DB_USERNAME,
        DB_PASSWORD: value.DB_PASSWORD,
        BROKER_HOSTS: value.BROKER_HOSTS,
        UPLOAD_FILES_SERVICE_URL: value.UPLOAD_FILES_SERVICE_URL,
        PUPIL_RECORDS_SERVICE_URL: value.PUPIL_RECORDS_SERVICE_URL,
    }
}

export const envsValues = getEnvs();