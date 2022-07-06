import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormField } from '../../../../core/models/form-field';
@Component({
  selector: 'mobiquity-pay-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss'],
})
export class InputBoxComponent implements OnInit {
  @Input() input: FormField<string> | any;
  @Input() form: FormGroup | any;
  get f() {
    return this.form.controls;
  }
  constructor() {}

  ngOnInit(): void {
    console.log(this.f);
  }
}
