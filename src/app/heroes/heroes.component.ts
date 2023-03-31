import { Component } from '@angular/core';
import * as $ from 'jquery';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],

})

export class HeroesComponent {

  constructor(private heroService: HeroService) {}
  
  heroes: Hero[] = [];
  selectedHero?: Hero;


  getHeroes() : void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
    setTimeout(function() {
      const $div : string = "#heroes-list";
      const offset : any = $($div).offset();
      $('html, body').animate({
          scrollTop: offset.top
      }, 300);
    }, 300);
  }

  delete(hero:Hero): void{
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();

  }
}