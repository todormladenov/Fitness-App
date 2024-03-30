import { Pointer } from "src/app/shared/types/pointer"

export interface Exercise {
    objectId: string | null,
    createdAt: string,
    updatedAt: string,
    title: string,
    sets: string,
    repetitions: string,
    program: Pointer | null,
    owner: Pointer | null
}

export interface CreatedExercise {
    objectId: string,
    createdAt: string,
}