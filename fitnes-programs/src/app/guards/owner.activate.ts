import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { UserService } from "../user/user.service";
import { ProgramService } from "../program/program.service";

@Injectable({ providedIn: 'root' })

export class OwnerActivate implements CanActivate {

    constructor(private userService: UserService, private router: Router, private programService: ProgramService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const programId = route.params['programId'];

        return this.programService.getProgramById(programId)
            .pipe(map(program => {
                if (this.userService.userId !== program.owner.objectId) {
                    return false;
                }
                return true
            }));
    }
}