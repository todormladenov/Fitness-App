import { Pointer } from "../types/pointer";

export function createPointer(className: string, objectId: string): Pointer {
    return {
        __type: 'Pointer',
        className: className,
        objectId: objectId
    }
}