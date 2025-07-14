export interface EnvsI {
    PORT: number;
    DB_NAME: string;
    DB_PORT: number;
    DB_HOST: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    BROKER_HOSTS: string[];
    UPLOAD_FILES_SERVICE_URL: string;
    PUPIL_TOPICS_SERVICE_URL: string;
}