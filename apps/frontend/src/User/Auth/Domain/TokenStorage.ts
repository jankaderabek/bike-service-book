export interface TokenStorage {
  save(token: string): Promise<void>

  load(): Promise<string | null>
}
