import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { HarrypotterService } from '../services/harrypotter';
import { Character } from '../models/character';

@Component({
  selector: 'app-characterlist',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './characterlist.html',
  styleUrl: './characterlist.css'
})
export class Characterlist implements OnInit {
  private harryPotterService = inject(HarrypotterService);

  characters = signal<Character[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.harryPotterService.getAllCharacters().subscribe({
      next: (data) => {
        this.characters.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load characters.');
        this.loading.set(false);
      }
    });
  }
}