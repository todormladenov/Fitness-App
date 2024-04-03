import { ValidatorFn } from "@angular/forms";

export function passwordMatch(passwordValue: string | undefined): ValidatorFn {

    return (control) => {        
        const isMatch = passwordValue === control.value;
        return isMatch ? null : { passwordMatch: true };
    }
}