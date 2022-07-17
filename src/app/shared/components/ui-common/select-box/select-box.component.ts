import { Component, Input, OnInit } from '@angular/core';
import { FormField } from '../../../../models/form-field';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mobiquity-pay-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss'],
})
export class SelectBoxComponent implements OnInit {
  @Input() input: FormField<string> | any;
  @Input() form: FormGroup | any;
  get f() {
    return this.form.controls;
  }
  constructor() {}

  ngOnInit(): void {}
}
