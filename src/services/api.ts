import type {User, Todo} from "../types";

const BASE = "https://jsonplaceholder.typicode.com";

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("HTTP " + res.status);
    return res.json();
}

export function getUsers(): Promise<User[]> {
    return fetchJson<User[]>(`${BASE}/users`);
}

export function getUser(id: number): Promise<User> {
    return fetchJson<User>(`${BASE}/users/${id}`);
}

export function getTodosByUser(userId: number): Promise<Todo[]> {
    return fetchJson<Todo[]>(`${BASE}/todos?userId=${userId}`);
}

export function createTodo(todo: Omit<Todo, "id">): Promise<Todo> {
    return fetchJson<Todo>(`${BASE}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
    });
}