import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

export interface CandeactivateGuard {
    canComponentDeactivate: () => boolean | Promise<boolean> | Observable<boolean>
}

@Injectable({
    providedIn: 'root'
})
export class CandeactivateGuardService implements CanDeactivate<CandeactivateGuard> {
    canDeactivate(component: CandeactivateGuard,
        currentRoute: ActivatedRouteSnapshot, 
        currentState: RouterStateSnapshot, 
        nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            return component.canComponentDeactivate();
        }
}