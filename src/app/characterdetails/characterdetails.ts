import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HarrypotterService } from '../services/harrypotter';
import { Character } from '../models/character';

@Component({
  selector: 'app-characterdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './characterdetails.html',
  styleUrl: './characterdetails.css'
})
export class Characterdetails implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(HarrypotterService);

  character = signal<Character | null>(null);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error.set('Character ID not found.');
      this.loading.set(false);
      return;
    }

    this.service.getCharacterById(id).subscribe({
      next: (data) => {
        this.character.set(data[0] || null);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load character details.');
        this.loading.set(false);
      }
    });
  }
}