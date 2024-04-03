import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { typesValidator } from '../utils/types-validator';

@Directive({
  selector: '[appTypes]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: TypesDirective,
      multi: true
    }
  ]
})
export class TypesDirective implements Validator, OnChanges {
  @Input('appTypes') appTypes: string[] = []
  constructor() { }

  validator: ValidatorFn = () => null;

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue } = changes['appTypes'];

    if (currentValue?.length) {
      this.validator = typesValidator(currentValue);
    }

  }

}