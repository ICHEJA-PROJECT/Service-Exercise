import { ClientProxy, RpcException } from "@nestjs/microservices";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ExerciseI } from "../entitiesI/ExerciseI";
import { USER_SERVICE_OPTIONS } from "src/shared/constants/user_service_options";
import { catchError, firstValueFrom } from "rxjs";
import { ExerciseType } from "src/shared/constants/exercise_type";
import { buildSpellExercise } from "../services/buidSpellExercise";
import { buildFindExercise } from "../services/buildFindExercise";
import { buildRelateExercise } from "../services/buildRelateExercise";

@Injectable()
export class GetPersonalizedExerciseUseCase {
    constructor(
        @Inject(USER_SERVICE_OPTIONS.USER_SERVICE_NAME)
        private readonly usersClient: ClientProxy,
    ) {}

    async run(exercise: ExerciseI, pupilId: number) {
        try {
            if(exercise.template.topic.name = "Nombre propio") {

                if(!pupilId) {
                    throw new RpcException({
                        status: HttpStatus.BAD_REQUEST,
                        error: 'Se require el id del estudiante.'
                    });
                }

                const student = await firstValueFrom(
                    this.usersClient
                        .send(
                            { cmd: USER_SERVICE_OPTIONS.STUDENT_FIND_BY_ID },
                            pupilId
                        )
                        .pipe(catchError(error => {
                            throw new RpcException({
                                message: error.message,
                                status: HttpStatus.BAD_REQUEST,
                            });
                        }))
                );

                switch (exercise.template.layout.name) {
                    case ExerciseType.SPELL:
                        exercise.context = buildSpellExercise(student.person.firstName);
                        break;
                    case ExerciseType.SIMPLE_RELATE:
                        const names = await firstValueFrom(
                                this.usersClient
                                    .send(
                                        { cmd: USER_SERVICE_OPTIONS.STUDENT_FIND_UNIQUE_NAMES },
                                        {}
                                    )
                                    .pipe(catchError(error => {
                                        throw new RpcException({
                                            message: error.message,
                                            status: HttpStatus.BAD_REQUEST,
                                        });
                                    }))
                            );
                        
                        exercise.context = buildFindExercise(names, student.person.firstName);
                        break;
                    case ExerciseType.COMPLEX_RELATE:
                        exercise.context = buildRelateExercise(student);
                        break;
                    default:
                        throw new RpcException({
                            status: HttpStatus.BAD_REQUEST,
                            error: 'Error en el tipo de layout del ejercicio.'
                        })
                }

            }

            return exercise.context;
        } catch (error) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message
            });
        }
    }
}