import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HEROES } from '../../mock-heroes';
import { Hero } from '../../hero';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: {id: number};
  heroes = HEROES;
  hero: Hero;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = {
      id: this.route.snapshot.params['id']
    };
    console.log(this.form);


    for (let i = 0; i < this.heroes.length; i++) {
      if (this.heroes[i].id === this.form.id) {
        this.hero = this.heroes[i];
        console.log(this.hero);
        }
    }
  }

}
