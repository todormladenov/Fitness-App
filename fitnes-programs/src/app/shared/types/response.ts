import { Exercise } from "src/app/exercise/types/exercise";
import { Program } from "src/app/program/types/program";

export interface ReadingProgramApiResponse {
    results: Program[]
}

export interface ReadingExerciseApiResponse {
    results: Exercise[]
}