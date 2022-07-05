import { Component, Input, OnInit } from '@angular/core';
import { FormField } from '../../../../core/models/form-field';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mobiquity-pay-radio-button-group',
  templateUrl: './radio-button-group.component.html',
  styleUrls: ['./radio-button-group.component.css'],
})
export class RadioButtonGroupComponent implements OnInit {
  @Input() input: FormField<string> | any;
  @Input() form: FormGroup | any;
  get f() {
    return this.form.controls;
  }
  constructor() {}

  ngOnInit(): void {}
}
