import { useEffect, useMemo, useState } from "react";
import { getUsers, getTodosByUser } from "../services/api";
import type {User} from "../types";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";

interface Metrics { total: number; pct: number; }

export default function Home(){
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [metrics, setMetrics] = useState<Record<number, Metrics>>({});

    useEffect(() => {
        (async () => {
            try{
                const us = await getUsers();
                setUsers(us);

                // calcul des métriques par user (séquentiel, simple)
                const m: Record<number, Metrics> = {};
                for (const u of us){
                    const todos = await getTodosByUser(u.id);
                    const total = todos.length;
                    const completed = todos.filter(t => t.completed).length;
                    m[u.id] = { total, pct: total ? Math.round((completed/total)*100) : 0 };
                }
                setMetrics(m);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const filtered = useMemo(
        () => users.filter(u => u.name.toLowerCase().includes(search.toLowerCase())),
        [users, search]
    );

    if (loading) return <Loader />;

    return (
        <div className="container">
            <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un utilisateur..." />
            <section id="users">
                {filtered.map(u => (
                    <UserCard
                        key={u.id}
                        user={u}
                        totalTasks={metrics[u.id]?.total}
                        percentCompleted={metrics[u.id]?.pct}
                    />
                ))}
                {!filtered.length && <p>Aucun utilisateur trouvé.</p>}
            </section>
        </div>
    );
}