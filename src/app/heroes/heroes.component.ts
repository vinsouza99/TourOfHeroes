import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],

})

export class HeroesComponent {

  constructor(
    private heroService: HeroService,
    public dialog: MatDialog
    ) {}
  
  heroes: Hero[] = [];
  selectedHero?: Hero;
  loaded: boolean = false;

  getHeroes() : void {
    this.heroService.getHeroes()
    .subscribe(heroes => {
      this.heroes = heroes;
      this.loaded = true;
    });
  }
  openDialog(hero:Hero): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: {name:hero.alias}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.delete(hero);
      }
    });
  }
  
  ngOnInit(): void {
    this.getHeroes();
  }

  delete(hero:Hero): void{
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();

  }
}