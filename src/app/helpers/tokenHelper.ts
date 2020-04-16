import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { UserService } from '../shared/services/userService';


@Injectable()
export class tokenHelper {
    constructor(private userService: UserService
        ) {
    }
    GetToken() {
        if (this.userService.currentUserValue === null) {
            return '';
        }
        const currentUser = this.userService.gettoken();
        const decoded = jwt_decode(currentUser);
        if (decoded.exp < (Date.now() / 1000) ) {
            this.userService.logout();
            return '';
        }
        return `Bearer ${currentUser}`;
    }
}
