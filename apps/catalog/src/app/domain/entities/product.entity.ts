export class ProductEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string | null,
    public readonly price: number,
    public readonly category: string,
    public readonly stock: number,
    public readonly image: string | null,
    public readonly monthlyPrice: number | null,
    public readonly yearlyPrice: number | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  generateSlug(): string {
    return this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }

  isInStock(): boolean {
    return this.stock > 0;
  }

  matchesQuery(query: string): boolean {
    const normalizedQuery = query.toLowerCase().trim();

    return (
      this.name.toLowerCase().includes(normalizedQuery) ||
      (this.description &&
        this.description.toLowerCase().includes(normalizedQuery)) ||
      this.category.toLowerCase().includes(normalizedQuery)
    );
  }

  nameStartsWith(query: string): boolean {
    return this.name.toLowerCase().startsWith(query.toLowerCase().trim());
  }
}
