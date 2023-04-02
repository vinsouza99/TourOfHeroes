import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  loaded: boolean = false;

  ngOnInit(): void {
    this.loaded = true;
  }

}
