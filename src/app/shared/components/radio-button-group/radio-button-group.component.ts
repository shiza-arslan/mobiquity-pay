import { Component, Input, OnInit } from '@angular/core';
import { FormField } from '../../../util/utils/models/form-field';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mobiquity-pay-radio-button-group',
  templateUrl: './radio-button-group.component.html',
  styleUrls: ['./radio-button-group.component.scss'],
})
export class RadioButtonGroupComponent implements OnInit {
  @Input() input: FormField<string> | any;
  @Input() form: FormGroup | any;
  options = [
    {
      value: 'Male',
    },
    {
      value: 'Female',
    },
    {
      value: 'Other',
    },
  ];
  get f() {
    return this.form.controls;
  }
  constructor() {}

  ngOnInit(): void {}
}
