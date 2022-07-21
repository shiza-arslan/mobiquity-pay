import { Component, Input } from '@angular/core';
import { FormField } from '../../../util/utils/models/form-field';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mobiquity-pay-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  @Input() input: FormField<string> | any;
  @Input() form: FormGroup | any;

  get f() {
    return this.form.controls;
  }
}
