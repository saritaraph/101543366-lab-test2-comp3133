import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HarrypotterService } from '../services/harrypotter';
import { Character } from '../models/character';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-characterfilter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatCardModule],
  templateUrl: './characterfilter.html',
  styleUrl: './characterfilter.css'
})
export class Characterfilter {
  private service = inject(HarrypotterService);

  houses = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];

  selectedHouse = signal('');
  characters = signal<Character[]>([]);

  onHouseChange(house: string) {
    this.selectedHouse.set(house);

    if (!house) return;

    this.service.getCharactersByHouse(house).subscribe(data => {
      this.characters.set(data);
    });
  }
}