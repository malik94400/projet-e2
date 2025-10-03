// `src/components/TodoForm.tsx`
import { type FormEvent, useState } from "react";

interface Props {
    onAdd: (title: string, completed: boolean) => void;
}

export default function TodoForm({ onAdd }: Props){
    const [title, setTitle] = useState("");
    const [completed, setCompleted] = useState(false);
    const [msg, setMsg] = useState("");
    const [busy, setBusy] = useState(false);

    async function handleSubmit(e: FormEvent){
        e.preventDefault();
        if (title.trim().length < 5){
            setMsg("Le titre doit contenir au moins 5 caractères.");
            return;
        }
        setBusy(true); setMsg("Envoi en cours…");
        try{
            await onAdd(title.trim(), completed);
            setTitle(""); setCompleted(false);
            setMsg("Tâche ajoutée (simulation API) ✅");
        }catch{
            setMsg("Erreur lors de l'ajout ❌");
        }finally{
            setBusy(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="note" noValidate>
            <label className="sr-only" htmlFor="todo-title">Titre</label>
            <input
                id="todo-title"
                className="input"
                placeholder="Ex : appeler le client"
                value={title}
                onChange={e => setTitle(e.target.value)}
                aria-invalid={title.length>0 && title.length<5}
            />
            <div style={{ margin: "10px 0" }}>
                <input id="todo-done" type="checkbox" checked={completed} onChange={e => setCompleted(e.target.checked)} />
                <label htmlFor="todo-done">Marquer comme terminée</label>
            </div>
            <button className="btn" type="submit" disabled={busy}>Ajouter</button>
            {msg && <p role="status" className="note" style={{ marginTop: 8 }}>{msg}</p>}
        </form>
    );
}