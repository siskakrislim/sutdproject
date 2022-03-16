import { Injectable } from "@angular/core";
import {
    HttpClient
} from '@angular/common/http';

@Injectable()
export class AppService {

    users = [ // these are test data
        { id: '001', class: '001', group: '01', name: 'Matt' },
        { id: '002', class: '001', group: '01', name: 'Siska' },
        { id: '003', class: '002', group: '02', name: 'Kenneth' },
    ];

    admin = [
        {
            id: '00003', name: 'admin 1'
        }
    ];

    class = ['0030', '0031', '0032', '0033'];

    constructor(
        private http: HttpClient
    ) {

    }

    login(user) { // replace with an api to check the database if this user exist
        for (let x = 0; x < this.users.length; x++) {
            if (this.users[x]['class'] === user.class
                && this.users[x]['id'] === user.id
                && this.users[x]['group'] === user.group) {
                return true
            }
        }
        return false
    }

    adminLogin(id) { // get the data of this user from database
        let findedData = this.admin.find(i => i.id === id);
        if (typeof findedData === 'undefined') {
            return null;
        }
        return findedData;
    }

    saveUserInput(userinput) { // save user input in the database
        console.log(userinput);
    }

    getGroupData() { // get data from database to display in the charts
        console.log('getGroupData');
        return
    }

    getClass() { // get all the class from database
        return this.class;
    }

    getData() { // get all data from database for the sumarry page
        return
    }

    // testPython() {
    //     return this.http.post(`http://127.0.0.1:5000/api/test`, { responseType: 'text' });
    // }

}