import { DataService } from './../data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DataService]
})

export class HeaderComponent implements OnInit {
  title = 'My Heroes List';
  heroes = HEROES;
  selectedHero: Hero;
  @Input() activate = false;
  @Input() newHero: Hero;
  constructor(private loggingService: DataService) {}

  ngOnInit() {
  }

  onAddHero() {
    // this.activate = true;
    // console.log(this.activate);
    // this.heroes.push()

    this.loggingService.logStatusChange('HULK');
  }
}
