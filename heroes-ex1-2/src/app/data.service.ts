import { FormGroup} from '@angular/forms';
import { Input } from '@angular/core';
import { HEROES } from './mock-heroes';


export class DataService {
    heroes = HEROES;
    @Input() newHero: {id: number, name: string, email: string, phone: string};
    @Input() myApiUrl: string;

    logStatusChange(status: string) {
        console.log('A server status changed, new status:' + status);
    }

    addRow(dataInput: FormGroup): void {
        this.newHero.name = dataInput.get('userData.name').value;
        this.newHero.email = dataInput.get('userData.email').value;
        this.newHero.phone = dataInput.get('userData.phone').value;
        this.heroes.push(this.newHero);
        console.log('Got new data inside!');
    }

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
        const insertHero = {};
        insertHero.name = dataInput.get('userData.name').value;
        insertHero.email = dataInput.get('userData.email').value;
        insertHero.phone = dataInput.get('userData.phone').value;


        var xhr = new XMLHttpRequest();
        xhr.open("POST", myApiUrl, false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(insertHero));
        console.log('Got new data inside!');
    }
}
