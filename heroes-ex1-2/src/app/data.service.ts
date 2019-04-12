import { FormGroup} from '@angular/forms';
import { Input } from '@angular/core';
import { HEROES } from './mock-heroes';
import { stringify } from '@angular/core/src/render3/util';
import { Hero } from './hero';


export class DataService {
    heroes = HEROES;
    insertHero: {id: number, name: string, email: string, phone: string};
    @Input() hero: Hero;

    @Input() newHero: {id: number, name: string, email: string, phone: string};
    @Input() myApiUrl: string;

    constructor() {
    }
    logStatusChange(status: string) {
        console.log('A server status changed, new status:' + status);
    }

    // addRow(dataInput: FormGroup): void {
    //     this.newHero.name = dataInput.get('userData.name').value;
    //     this.newHero.email = dataInput.get('userData.email').value;
    //     this.newHero.phone = dataInput.get('userData.phone').value;
    //     this.heroes.push(this.newHero);
    //     console.log('Got new data inside!');
    // }

    onloadData(myApiUrl) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", myApiUrl, false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(null);
        return JSON.parse(xhr.responseText);
    }

    addRowApi(dataInput: FormGroup, myApiUrl): void {
        // this.newHero.name = dataInput.get('userData.name').value;
        // this.newHero.email = dataInput.get('userData.email').value;
        // this.newHero.phone = dataInput.get('userData.phone').value;
        const insertHero = {name: '', email: '', phone: ''};
        insertHero.name = dataInput.get('userData.name').value;
        insertHero.email = dataInput.get('userData.email').value;
        insertHero.phone = dataInput.get('userData.phone').value;


        const xhr = new XMLHttpRequest();
        xhr.open("POST", myApiUrl, false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(insertHero));
        console.log('Got new data inside!');
    }

    deleteRowAPI(myApiUrl, i): void {
        // for (let i = 0; i < this.heroes.length; i++) {
        //     if (this.heroes[i] === hero) {
        //       this.heroes.splice(i, 1);
        //       }
        //   }




        const xhr = new XMLHttpRequest();
        xhr.onload  = function() {
                const users = JSON.parse(xhr.responseText);
                if (this.readyState === 4 && this.status === 200) {
                    // console.table(users);
                    // console.log(this);
                    // myFunction(this, i);
                    console.log('Deleted Row!');
            }
          };
        xhr.open('DELETE', myApiUrl + i, false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
    }

    editApiRow(data, myApiUrl, i): void {
        const json = JSON.stringify(data);
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', myApiUrl + i, false);
        xhr.setRequestHeader('Content-type','application/json');
        xhr.onload = function () {
            const users = JSON.parse(xhr.responseText);
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.table(users);
            } else {
                console.error(users);
            }
        };
        xhr.send(json);
    }
}
