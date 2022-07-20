import { ValidatorFn } from '@angular/forms';

export class FormField<T> {
  value: T | undefined;
  key: string;
  label: string;
  placeholder?: string;
  isValidations: boolean;
  validations?: Array<any>;
  validators?: Array<ValidatorFn>;
  order: number;
  controlType: string;
  type: string;
  pattern?: string;
  options: { key: string; value: string }[];

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      placeholder?: string;
      isValidations?: boolean;
      validations?: [];
      validators?: ValidatorFn[] | undefined;
      order?: number;
      controlType?: string;
      type?: string;
      pattern?:string;
      options?: { key: string; value: string }[];
    } = {},
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.isValidations = !!options.isValidations;
    this.validators = options.validators;
    this.validations = options.validations;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.pattern = options.pattern || '',
    this.placeholder = options.placeholder || '';
    this.options = options.options || [];
  }
}
