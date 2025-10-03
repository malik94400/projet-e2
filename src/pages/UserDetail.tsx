import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { createTodo, getTodosByUser, getUser } from "../services/api";
import type {Todo, User} from "../types";
import Loader from "../components/Loader";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import SearchBar from "../components/SearchBar";

export default function UserDetail(){
    const { userId } = useParams();
    const uid = Number(userId);
    const [user, setUser] = useState<User | null>(null);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState("");

    useEffect(() => {
        if (!uid) return;
        (async () => {
            try{
                const u = await getUser(uid);
                const ts = await getTodosByUser(uid);
                setUser(u); setTodos(ts);
            } finally {
                setLoading(false);
            }
        })();
    }, [uid]);

    const filtered = useMemo(
        () => todos.filter(t => t.title.toLowerCase().includes(q.toLowerCase())),
        [todos, q]
    );

    async function onAdd(title: string, completed: boolean){
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const created = await createTodo({ userId: uid, title, completed });
        setTodos(prev => [created, ...prev]);
    }

    if (loading) return <Loader />;

    return (
        <div className="container">
            <p><Link to="/" className="btn secondary">← Retour</Link></p>

            <section id="user-info" className="note" aria-live="polite">
                {user ? (
                    <>
                        <strong className="name">{user.name}</strong><br/>
                        <span>{user.email}</span><br/>
                        <span>{user.company?.name}</span>
                    </>
                ) : <p>Utilisateur introuvable</p>}
            </section>

            <SearchBar value={q} onChange={setQ} placeholder="Rechercher une tâche…" />

            <TodoList todos={filtered} />

            <section aria-labelledby="add-title" style={{ marginTop: 24 }}>
                <h2 id="add-title" style={{ margin: "0 0 10px" }}>Ajouter une tâche</h2>
                <TodoForm onAdd={onAdd} />
            </section>
        </div>
    );
}