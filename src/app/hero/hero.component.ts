import { Component } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {

  hero: Hero | undefined;
  nextId: number | undefined;
  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ){}

  ngOnInit() : void {
    this.heroService.getHeroes()
    .subscribe(heroes => {
      this.nextId = heroes.length + 1;
      this.hero = {id:this.nextId, name:"", alias:"", picture:"", powers:[], description:""};
    });

  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  add(hero:Hero){
    if (this.hero) {
      this.heroService.addHero(this.hero)
        .subscribe(() => { 
          console.log("Hero addedd successfully");
        });
    }
    
  }
}
