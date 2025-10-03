import type {Todo} from "../types";

export default function TodoItem({ todo }: { todo: Todo }){
    const status = todo.completed ? "✅ terminée" : "🕓 en cours";
    return (
        <article className="user-card">
            <h3 style={{ marginBottom: 6 }}>{todo.title}</h3>
            <p className="user-meta">Statut : {status}</p>
        </article>
    );
}