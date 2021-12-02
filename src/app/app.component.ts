import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from './services/user.service';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [
  //   { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  // ]
})
export class AppComponent implements OnInit {
  title = 'Angular-Form';
  profileForm!: FormGroup;
  formattedDate!: string;


  Framworks = [
    {
       name: "angular", versions: [
        { version: '-----' },
        { version: '1.1.1' },
        { version: '1.2.1' },
        { version: '1.3.3' }
      ]
    },
    {
       name: 'react', versions: [
        { version: '-----' },
        { version: '2.1.2' },
        { version: '3.2.4' },
        { version: '4.3.1' }
      ]
    },
    {
       name: 'vue', versions: [
        { version: '-----' },
        { version: '3.3.1' },
        { version: '5.2.1' },
        { version: '5.1.3' }
      ]
    }
  ]

  get hobby() {
    return this.profileForm.get('hobby') as FormArray;
  }

  addSkill() {
    const control = new FormGroup({
      name: new FormControl(''),
      duration: new FormControl(''),
    })

    this.hobby.push(control);
  }

  constructor(private userService: UserService) {}

  emailControl = new FormControl('', {
    validators: [Validators.required, Validators.email],
    asyncValidators: this.userService.uniqueEmailValidator(),
    updateOn: 'blur',
  });


  ngOnInit() {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      emailControl: this.emailControl,
      framework: new FormControl('', Validators.required),
      frameworkVersion: new FormControl({ value: '', disabled: true }, Validators.required),
      hobby: new FormArray([
        new FormGroup({
          name: new FormControl('', Validators.required),
          duration: new FormControl('', Validators.required),
        })
      ]),
    });
  }

  // get hobby() {
  //   return this.profileForm.get('hobby') as FormArray;
  // }
  //
  // addSkill() {
  //   let control = new FormControl('', Validators.required);
  //   this.hobby.push(control);
  // }

  onSubmit() {
    console.warn(this.profileForm.getRawValue());
  }
}
