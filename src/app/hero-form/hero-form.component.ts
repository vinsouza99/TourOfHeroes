import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent {
  constructor(private heroService:HeroService){}

  model : Hero= {id:0, name:null, alias:null,picture:"noimage.png", powers:[],description:null};
  powersList: string = "";
  percentDone: number = 0;
  uploadSuccess: boolean = false;

  submitted = false;

  ngOnInit() : void {
    this.heroService.getHeroes()
    .subscribe(heroes => {
      const nextId = heroes.length + 1;
      this.model = {id:nextId, name:null, alias:null, picture:"noimage.png", powers:[], description:null};
    });

  }

  onSubmit() { 
    this.submitted = true; 
    console.log(this.model);
      if(this.powersList !== ""){
        this.model.powers = this.powersList.split(",");
      }
    this.heroService.addHero(this.model)
      .subscribe(() => { 
        console.log("Hero added successfully");
      });
  }
}
