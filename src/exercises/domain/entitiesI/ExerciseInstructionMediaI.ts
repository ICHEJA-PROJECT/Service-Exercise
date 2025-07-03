import { ExerciseI } from "./ExerciseI";
import { TypeInstructionMediaI } from "./TypeInstructionMediaI";

export interface ExerciseInstructionMediaI {
    exercise_id: number;
    type_instruction_id: number;
    path_media: string;
    exercise: ExerciseI;
    type_instruction_media: TypeInstructionMediaI;
}