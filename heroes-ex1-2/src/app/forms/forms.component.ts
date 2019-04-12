import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, Injectable } from '@angular/core';
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
  forbiddenUsernames = ['Tiago', 'Ferrao'];
  // heroes = HEROES;
  // @Output() myHero = new EventEmitter<Hero>();
  heroes = HEROES;
  hero: Hero;
  @Input() herooo: {id: number, name: string, email: string, phone: string, hobbies: []};
  @Output() addedHero = new EventEmitter<void>();
  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.signupForm = new FormGroup( {
      'userData': new FormGroup({
        // 'name': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'name': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
        'phone': new FormControl(null, Validators.required),
        'hobbies': new FormArray([])
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
  }

  onSubmit() {
    if (this.herooo) {
      this.herooo.name = this.signupForm.get('userData.name').value;
      this.herooo.email = this.signupForm.get('userData.email').value;
      this.herooo.phone = this.signupForm.get('userData.phone').value;
      this.herooo.hobbies = this.signupForm.get('userData.hobbies').value;
      console.log(this.herooo);
      this.signupForm.reset();
      console.log(this.herooo);
    } else {
      const data = this.dataService.onloadData('http://localhost:4200/Hero')
      console.log(data);

      this.dataService.addRowApi(this.signupForm, 'http://localhost:4200/Hero');
      const data1 = this.dataService.onloadData('http://localhost:4200/Hero')
      console.log(data1);
      this.router.navigate(['/lista']);
    }
  }


  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('userData.hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return {'nameIsForbidden': false};
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);

        }
      }, 1500);
    });
    return promise;
  }
}
