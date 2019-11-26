import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  afUser$: Observable<User> = this.afAuth.user;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.afUser$.subscribe(user => console.log(user));
  }

  login(){
    this.afAuth.auth.signInWithPopup(
      new auth.GithubAuthProvider()
    ).then(()=>{
      this.snackbar.open('ようこそGitpetへ',null,{
        duration: 2000
      });
    });
  }

  logout(){
    this.afAuth.auth.signOut().then(() => {
      this.snackbar.open('ログアウトしました',null,{
        duration: 2000
      });
    });
    this.router.navigateByUrl('/welcome');
  }
}
