import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormField } from '../../../models/form-field';
@Component({
  selector: 'mobiquity-pay-pin-box',
  templateUrl: './pin-box.component.html',
  styleUrls: ['./pin-box.component.scss'],
})
export class PINBoxComponent implements OnInit {
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
