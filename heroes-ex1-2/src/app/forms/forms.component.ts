import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, Injectable, ɵConsole } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../hero';
import { DataService } from './../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HEROES } from '../mock-heroes';



@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  // providers: [ActivatedRoute]
})

@Injectable()

export class FormsComponent implements OnInit {
  statusUpdated = new EventEmitter<string>();
  @Input() signupForm: FormGroup;
  // heroes = HEROES;
  // @Output() myHero = new EventEmitter<Hero>();
  // heroes = HEROES;
  heroes;
  hero: Hero;
  @Input() herooo: {id: number, name: string, email: string, phone: string, hobbies: []};
  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.heroes = this.dataService.onloadData('http://localhost:4200/Hero');

    this.signupForm = new FormGroup( {
      'userData': new FormGroup({
        // 'name': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'name': new FormControl(null, Validators.required, this.forbiddenNames),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
        'phone': new FormControl(null, Validators.required, this.phoneSize),
        'hobbies': new FormArray([]),
        // 'id': new FormArray()
      }),
    });
    this.signupForm.statusChanges.subscribe( function response(status) {
        console.log(status);
        if (status === 'VALID') {
          (<HTMLInputElement>document.getElementById('btn-submit-hero-data')).disabled = false;
        } else {
          (<HTMLInputElement>document.getElementById('btn-submit-hero-data')).disabled = true;
        }
      }
    );
    // console.log(this.signupForm);
  }

  onSubmit() {
    if (this.herooo) {
      console.log('submiting..');
      console.log(this.signupForm);
      this.herooo.name = this.signupForm.get('userData.name').value;
      this.herooo.email = this.signupForm.get('userData.email').value;
      this.herooo.phone = this.signupForm.get('userData.phone').value;
      this.herooo.hobbies = this.signupForm.get('userData.hobbies').value;

      this.signupForm.reset();
      this.dataService.editApiRow(this.herooo, 'http://localhost:4200/Hero/', this.herooo.id);
      this.heroes = this.dataService.onloadData('http://localhost:4200/Hero');
    } else {
        console.log('not submited!');

        this.dataService.addRowApi(this.signupForm, 'http://localhost:4200/Hero');
        this.heroes = this.dataService.onloadData('http://localhost:4200/Hero');
        this.router.navigate(['/lista']);
    }
  }


  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('userData.hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        const forbiddenUsernames = ['tiago', 'ferrao'];
        if (control.value !== null) {
          const myInputValue = control.value.toLowerCase();
          if (forbiddenUsernames.indexOf(myInputValue) !== -1) {
            resolve({'emailIsForbidden': true});
          } else {
            resolve(null);
          }
        } else {
            resolve(null);
        }
      }, 1000);
    });
    return promise;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value !== null) {
          if (control.value === 'test@test.com') {
            resolve({'emailIsForbidden': true});
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return promise;
  }

  phoneSize(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value !== null) {
          if (control.value.length > 13) {
            resolve({'phoneIsForbidden': true});
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return promise;
  }


}
