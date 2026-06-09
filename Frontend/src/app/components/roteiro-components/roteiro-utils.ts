import { environment } from 'src/environments/environment';

export function getImageUrl(nome: string): string {
  return `${environment.apiUrl}/uploads/${nome}`;
}
