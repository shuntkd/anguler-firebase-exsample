import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate, CanLoad {
  constructor(
    private authservice: AuthService,
    private router: Router
    ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authservice.afUser$.pipe(
      map(user => !user),
      tap(isGuest => {
        if(!isGuest){
          this.router.navigateByUrl('/');
        }
      })
    );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authservice.afUser$.pipe(
      map(user => !user),
      take(1),
      tap(isGuest => {
        if(!isGuest){
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
