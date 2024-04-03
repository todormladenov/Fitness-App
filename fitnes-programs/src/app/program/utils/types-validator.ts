import { ValidatorFn } from "@angular/forms";

export function typesValidator(types: string[]): ValidatorFn {

    return (control) => {
        const isTypeValid = types.includes(control.value);
        return isTypeValid ? null : { typesValidator: true }
    }
}