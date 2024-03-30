import { Pointer } from "src/app/shared/types/pointer"

export interface Exercise {
    objectId: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    title: string | null,
    sets: number | null,
    repetitions: string | null,
    program: Pointer | null,
    owner: Pointer | null
}

export interface CreatedExercise {
    objectId: string,
    createdAt: string,
}