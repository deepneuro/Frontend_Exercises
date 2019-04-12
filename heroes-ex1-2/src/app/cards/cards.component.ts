import { Component, OnInit, ContentChildren } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormsComponent } from './../forms/forms.component';
import { DataService } from './../data.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

// @ContentChildren(FormsComponent)

export class CardsComponent implements OnInit {
  heroes;
  // heroes = HEROES;

  selectedHero: Hero;

  constructor(private dataService: DataService) {
    this.heroes = dataService.onloadData('http://localhost:4200/Hero');

   }

  ngOnInit() {
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  drop(event: CdkDragDrop<Hero[]>) {
    moveItemInArray(this.heroes, event.previousIndex, event.currentIndex);
  }
}
