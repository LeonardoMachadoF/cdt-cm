import type { User } from "../../types/User";


export async function getUsers(): Promise<User[]> {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
        throw new Error(`erro ao buscar usuários: ${response.status}`);
    }

    const users: User[] = await response.json();
    return users;
}