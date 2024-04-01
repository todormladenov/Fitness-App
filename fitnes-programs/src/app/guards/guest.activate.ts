import { Injectable, OnDestroy } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, catchError, map, of } from "rxjs";
import { UserService } from "../user/user.service";
import { getItem } from "../user/utils/storage-management";

@Injectable({ providedIn: 'root' })

export class GuestActivate implements CanActivate {

    constructor(private userService: UserService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        if (getItem('AuthToken')) {
            return false;
        }
        return true
    }
}