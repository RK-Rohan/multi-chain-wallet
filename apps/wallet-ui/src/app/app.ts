import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletService, WalletResponse } from './wallet.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  loading = signal(false);
  error = signal('');
  data = signal<WalletResponse | null>(null);

  constructor(private wallet: WalletService) {}

  generate(): void {
    this.loading.set(true);
    this.error.set('');

    this.wallet.fetchWallet().subscribe({
      next: (payload) => {
        this.data.set(payload);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.message ?? 'Failed to load wallet');
        this.loading.set(false);
      }
    });
  }
}
