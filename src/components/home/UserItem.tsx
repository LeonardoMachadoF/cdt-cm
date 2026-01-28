type Props = {
    id: number;
    email: string;
    name: string;
    handleUserItemClick: (id: number) => void;
}

export function UserItem({ id, email, name, handleUserItemClick }: Props) {
    return (
        <li
            onClick={() => handleUserItemClick(id)}
            className="cursor-pointer p-4 border border-gray-200 rounded-lg hover:scale-[1.02] transition-all"
        >
            <span className="font-semibold text-gray-800">{name}, </span>
            <span className="text-gray-600">{email}</span>
        </li>
    )
}