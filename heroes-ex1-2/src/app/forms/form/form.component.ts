import { Hero } from './../../hero';
import { DataService } from './../../data.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers:[DataService]
})
export class FormComponent implements OnInit {
  hero: Hero;
  data: Hero;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.hero = this.dataService.onloadData('http://localhost:4200/Hero');
  }

}
