import type {Todo} from "../types";
import TodoItem from "./TodoItem";

export default function TodoList({ todos }: { todos: Todo[] }){
    if (!todos.length) return <p>Aucune tâche trouvée.</p>;
    return (
        <section id="todos" aria-live="polite">
        {todos.map(t => <TodoItem key={t.id} todo={t} />)}
    </section>
);
}