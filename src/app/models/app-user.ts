export interface AppUser{
    name: string;
    email: string;
    isAdmin: boolean;
}

export interface Item{
    id?: string;
    title?: string;
    price?: number;
    category?: string;
    imageUrl: string;
  }

export interface Cat{
    id?: string;
    name?: string;
}
