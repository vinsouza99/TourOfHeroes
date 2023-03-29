import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../heroes-list';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],

})

export class HeroesComponent {
  hero: Hero = {
    id: 1,
    name: 'Windstorm',
    picture: 'windstorm.png',
    description: "A junkie, Windstorm was at some point found near-to-death in an alley of an unnamed city by the mutant Israel Super-Agent Sabra, who uses her powers to relive her, granting to her part of her powers and also her specific powers of controlling winds."
  };
  
  heroes = HEROES;
  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}