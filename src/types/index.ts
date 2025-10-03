export interface User {
    id: number;
    name: string;
    email: string;
    company?: { name: string };
}

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}