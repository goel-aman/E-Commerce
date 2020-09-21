import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
// import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs'; 
import 'rxjs/add/operator/map'
import { switchMap,map } from 'rxjs/operators';
import { AppUser } from './models/app-user';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  
  constructor(private auth: AuthService,private userService: UserService) { }
  
  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      switchMap(user => this.userService.get(user.uid)),
      map((appUser: AppUser) => appUser.isAdmin))
     }
}
