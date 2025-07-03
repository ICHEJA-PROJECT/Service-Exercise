import { ExerciseInstructionMediaI } from "./ExerciseInstructionMediaI";
import { TypeExerciseI } from "./TypeExerciseI";

export interface ExerciseI {
    id: number;
    instructions: string;
    paths_images: Array<string>;
    context: any;
    template_id: number;
    types: TypeExerciseI[];
    instructions_media: ExerciseInstructionMediaI[];
}