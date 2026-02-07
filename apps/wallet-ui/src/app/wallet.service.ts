import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type WalletResponse = {
  addresses: {
    bitcoin: { network: string; address: string; path: string };
    ethereum: { network: string; address: string; path: string };
    tron: { network: string; address: string; path: string };
  };
};

@Injectable({ providedIn: 'root' })
export class WalletService {
  private apiUrl = 'http://localhost:3000/wallet';

  constructor(private http: HttpClient) {}

  fetchWallet(): Observable<WalletResponse> {
    return this.http.get<WalletResponse>(this.apiUrl);
  }
}
