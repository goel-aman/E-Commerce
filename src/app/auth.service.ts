import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
 
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { switchMap,map } from 'rxjs/operators';
import { UserService } from './user.service';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
   }

   login(){
     let returnUrl =  this.route.snapshot.queryParamMap.get('returnUrl') || '/';
     localStorage.setItem('returnUrl',returnUrl);
     this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()); 
  }

   logout(){
    this.afAuth.auth.signOut();
   }

   get appUser$() : Observable<AppUser>{
     return this.user$.pipe(
      switchMap(user => {
        if(user)
        return this.userService.get(user.uid);
        else{
          return Observable.of(null);
        }
      }
      ),
      map((appUser: AppUser) => appUser)
     )
   }
}
