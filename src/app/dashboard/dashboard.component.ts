import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  public heroes: Hero[] = [];
  loaded: boolean = false;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
    setTimeout(()=>{this.setHeroesCardFunctions();
    },500);
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes.slice(1, 5);
        this.loaded = true;
      });
  }
  setHeroesCardFunctions():void{
    this.heroes.forEach(hero => {
      const card = '#'+hero.id;
      $(card).hover(()=>{
        $(card).css("background-image",'url("../../assets/heroes-pictures/'+hero.picture+'")');
        console.log(hero.alias);
      },
      function(){
        $(card).css("background-image", "none");
      })
    })
  }

  showHeroBackground():void {
    console.log("worked");
  }
}