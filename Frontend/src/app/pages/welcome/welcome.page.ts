import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  isModalOpen_definicoes = false;

  darkMode = false;
  isChecked: boolean = false;
  
  constructor() { }

  setOpen_definicoes(isOpen: boolean) {
    this.isModalOpen_definicoes = isOpen;
  }

  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };


  ngOnInit() {
  }

  //DARKMODE
  async ionViewWillEnter() {
    this.isChecked = (await Preferences.get({ key: 'darkmode' })).value === 'false';
  }

  toggleDarkMode() {
    if (this.darkMode) {
      document.body.classList.remove('dark');
      Preferences.set({ key: 'darkmode', value: this.isChecked ? 'true' : 'false' });
      console.log("DarkMode desativado!")
    } else {
      document.body.classList.add('dark');
      Preferences.set({ key: 'darkmode', value: this.isChecked ? 'false' : 'true' });
      console.log("DarkMode ativado!")
    }
    this.darkMode = !this.darkMode;
  }

}
