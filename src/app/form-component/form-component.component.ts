import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { default as schema } from './form-validation-schema';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent {
  myForm: FormGroup | any;
  public Errorlabel: string = '';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      uploadDocument: ['no', Validators.required],
      document: ['']
    });
    this.myForm.controls['uploadDocument'].valueChanges.subscribe((data: any) => {
      this.myForm.controls['document'].patchValue('');
    });
  }

  validateForm() {
    const formData = this.myForm.value;
    schema.validate(formData)
      .then(() => {
        console.log('Form Is Valid');
        this.Errorlabel = 'Form Is Valid';
      })
      .catch((errors) => {
        console.error('Form Is Invalid');
        this.Errorlabel = 'Form Is Invalid';
      });
  }

  get uploadDocument() {
    return this.myForm.get('uploadDocument');
  }

  get document() {
    return this.myForm.get('document');
  }

  onSubmit() {
    this.validateForm();
  }
}
