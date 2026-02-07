import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export type WalletResponse = {
  addresses: {
    bitcoin: { network: string; address: string; path: string };
    ethereum: { network: string; address: string; path: string };
    tron: { network: string; address: string; path: string };
  };
};

@Injectable({ providedIn: 'root' })
export class WalletService {
  private apiUrl = `${environment.apiBaseUrl}/wallet`;

  constructor(private http: HttpClient) {}

  fetchWallet(): Observable<WalletResponse> {
    return this.http.get<WalletResponse>(this.apiUrl);
  }
}
