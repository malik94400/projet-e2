import type {User} from "../types";
import { Link } from "react-router-dom";

interface Props {
    user: User;
    totalTasks?: number;
    percentCompleted?: number;
}

export default function UserCard({ user, totalTasks, percentCompleted }: Props){
    return (
        <div className="user-card">
            <h3>{user.name}</h3>
            <div className="user-meta">
                <span>{user.email}</span> · <span>{user.company?.name}</span>
            </div>

            {typeof totalTasks === "number" && typeof percentCompleted === "number" && (
                <div className="user-metrics">
                    <div className="metrics">
                        <span><strong>{totalTasks}</strong> tâches · <strong>{percentCompleted}%</strong> terminées</span>
                        <div className="bar"><span style={{ width: `${percentCompleted}%` }} /></div>
                    </div>
                </div>
            )}

            <Link className="btn" to={`/user/${user.id}`}>Voir détails</Link>
        </div>
    );
}