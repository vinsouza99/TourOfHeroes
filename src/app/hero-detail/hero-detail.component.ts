import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  hero: Hero | undefined;
  editMode: boolean = false;
  powers: String[] = [];
  powersExist: boolean = true;
  loaded: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ){}

  ngOnInit() : void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
    .subscribe(hero => {
      this.hero = hero;
      this.loaded = true;
      if(this.hero){
        this.powers = this.hero.powers;
        if(this.powers.length===0){
          this.powersExist = false;
        }
      }
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  save(){
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.toggleEditMode());
    }
    
  }
}
