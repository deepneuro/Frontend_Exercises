import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { DataService } from './../data.service';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})


export class ListaComponent implements OnInit {
  closeForm = false;
  heroes;
  selectedHero: Hero;
  myHero: [{id: number, name: string, email: string, phone: string}]
  constructor(private router: Router, private dataService: DataService) {
    this.heroes = dataService.onloadData('http://localhost:4200/Hero');
   }

  ngOnInit() {
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    // this.router.navigate(['/forms', hero.id]);
  }

  onDelete(hero: Hero) {
    for (let i = 0; i < this.heroes.length; i++) {
      if (this.heroes[i] === hero) {
        // this.heroes.splice(i, 1);
        console.log(this.heroes[i].id);
        this.dataService.deleteRowAPI('http://localhost:4200/Hero/', this.heroes[i].id);
        this.heroes = this.dataService.onloadData('http://localhost:4200/Hero');
      }
    }
  }

  closeEdit() {
    this.selectedHero = undefined;
  }

  drop(event: CdkDragDrop<Hero[]>) {
    moveItemInArray(this.heroes, event.previousIndex, event.currentIndex);
  }

  onHeroAdded(heroData: Hero) {
    this.myHero.push({
      id: heroData.id,
      name: heroData.name,
      email: heroData.email,
      phone: heroData.phone
    });
    console.log(this.myHero);
  }
}
