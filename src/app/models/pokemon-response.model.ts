export interface PokemonResponse {
  id: number;
  name: string;
  imageUrl: string;
  options: string[]; // Adicionando a lista de opções enviadas pelo backend
}
