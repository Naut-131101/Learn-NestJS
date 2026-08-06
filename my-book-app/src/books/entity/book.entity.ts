export class Book {
  constructor(
    public readonly id: number,
    public title: string,
    public author: string,
    public category: string,
    public available: boolean,
  ) {}
}
