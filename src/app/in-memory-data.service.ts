import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'James Howlett', alias:'Wolverine', picture: 'wolverine.png', description: "Cursed with a berserker fury, the violent mutant known as Wolverine has a reputation of both as an outstanding super hero and as a lethal killer. Born as James Howlett to a wealthy Canadian family at the end of the 19th century, he was forced to abandon his family after the tragic manifestation of his bestial abilities of accelerated healing factor, keenly enhanced senses and bone claws in each hand. Adopting the name Logan, he wandered the world, living a long life filled with blood, war and betrayal, having vile Sabretooth as his archenemy, and the Japanese warrior Ogun as his sensei. Unfortunately, by acting as a lone wolf, Logan was an unwitting subject of the Weapon X Program and had his bones coated in indestructible Adamantium, becoming an even more lethal asset. Rescued and assisted by Mac and Heather Hudson, he joined Department H as a Canadian government operative known as the Wolverine."},
      { id: 2, name:'Anthony Stark', alias: 'Iron Man', picture:'ironman.png', description:"Tony Stark is a genius inventor and billionaire industrialist, who suits up in his armor of cutting-edge technology to become the super hero Iron Man. The adopted son of weapons manufacturer Howard Stark, Tony inherited his family's company at a young age following his parents' death. While overseeing a manufacturing plant in a foreign country, Stark was kidnapped by local terrorists. Instead of giving in to his captors' demands to build weapons for them, Stark created a powerful suit of armor for himself to escape. Returning to America, Stark further upgraded the armor and put his vast resources and intellect to use for the betterment of the world as Iron Man." },
      { id: 3, name:'', alias: 'Bombasto', picture:'', description:'' },
      { id: 4, name:'', alias: 'Celeritas', picture:'', description:'' },
      { id: 5, name:'', alias: 'Magneta', picture:'', description:'' },
      { id: 6, name:'', alias: 'RubberMan', picture:'', description:'' },
      { id: 7, name:'', alias: 'Dynama', picture:'', description:'' },
      { id: 8, name:'', alias: 'Dr. IQ', picture:'', description:'' },
      { id: 9, name:'', alias: 'Magma', picture:'', description:'' },
      { id: 10, name:'', alias: 'Tornado', picture:'', description:'' }
  ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (10).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 10;
  }
}