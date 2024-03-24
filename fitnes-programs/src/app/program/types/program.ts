import { Pointer } from "src/app/shared/types/pointer";

export interface CreatedProgram {
    objectId: string,
    createdAt: string,
}

export interface Program {
    objectId: string,
    createdAt: string,
    updatedAt: string,
    title: string,
    description: string,
    type: string,
    image: string,
    price: string,
    owner: Pointer
}