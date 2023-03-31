import { Component } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})

export class NavBarComponent {
  scrollPage() : void {
    setTimeout(function() {
      const $destination : string = "nav";
      const offset : any = $($destination).offset();
      $('html, body').animate({
          scrollTop: offset.top
      }, 500);
    }, 300);
  }
}