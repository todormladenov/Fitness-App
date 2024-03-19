import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { passwordMatch } from '../utils/password-match-validator';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchDirective,
      multi: true
    }
  ]
})

export class PasswordMatchDirective implements Validator {
  @Input('appPasswordMatch') passwordValue: string | undefined;

  validator: ValidatorFn = () => null;

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    this.validator = passwordMatch(this.passwordValue)
    return this.validator(control);
  }
}
