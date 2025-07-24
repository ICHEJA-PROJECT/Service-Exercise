import { HttpService } from "@nestjs/axios";
import { HttpStatus, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { catchError, firstValueFrom } from "rxjs";

@Injectable()
export class PreferencesService {
    constructor(private readonly httpService: HttpService) {}

    async getReactivesImpairments(learningPathId: number) {
        return await firstValueFrom(
            this.httpService
            .get(`/reactive-impairments/learning-paths/${learningPathId}`)
            .pipe(catchError((error) => {
                throw new RpcException({
                    message: error.message,
                    status: HttpStatus.BAD_REQUEST
                });
            }))
        );
    }

    async getResourcesImpairments(learningPathId: number) {
        return await firstValueFrom(
            this.httpService
            .get(`/resource-impairments/learning-paths/${learningPathId}`)
            .pipe(catchError((error) => {
                throw new RpcException({
                    message: error.message,
                    status: HttpStatus.BAD_REQUEST
                });
            }))
        );
    }

    async getPreferencesByStudent(studentId: number) {
        return await firstValueFrom(
            this.httpService
            .get(`preferences/students/${studentId}`)
            .pipe(catchError(error => {
                throw new RpcException({
                    message: error.message,
                    status: HttpStatus.BAD_REQUEST,
                });
            }))
        );
    }
}