import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { HomePage } from '../home/home';

import { AngularFire } from 'angularfire2';
import firebase from 'firebase';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  fireauth = firebase.auth();
  constructor(public navCtrl: NavController, public navParams: NavParams, public googleplus: GooglePlus, public af: AngularFire) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  googleauth() {
    this.googleplus.login({
      'webClientId': '<yourclientid>'
    })
      .then((res) => {
        const firecreds = firebase.auth.GoogleAuthProvider.credential(res.idToken);
        this.fireauth.signInWithCredential(firecreds).then((res) => {
          this.navCtrl.setRoot(HomePage);
        }).catch((err) => {
          alert('Firebase auth failed' + err);
        })
        
      }).catch((err) => {
        alert('Error' + err);
    })
  }

}
