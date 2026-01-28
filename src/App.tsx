import { useEffect, useState } from "react"
import { getUsers } from "./services/users/getUsers";
import { SpecificUserModal } from "./components/home/SpecificUserModal";
import { UserItem } from "./components/home/UserItem";
import type { User } from "./types/User";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [searchUserInput, setSearchUserInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  function handleUserItemClick(id: number) {
    const clickedUser = users.find(user => user.id === id);
    if (!clickedUser) return;

    setSelectedUser(clickedUser);
    setModalOpen(true);
  }

  const filteredUsers = searchUserInput
    ? users.filter(user => user.name.toLowerCase().includes(searchUserInput))
    : users;


  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      setError(false);

      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const userData = await getUsers();
        setUsers(userData);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, [])

  return (
    <div className="max-w-2xl m-auto p-8">
      <h1 className="text-center text-3xl font-bold mb-4">Usuários</h1>
      <input
        type="text"
        onChange={(e) => setSearchUserInput(e.target.value)}
        value={searchUserInput}
        placeholder="Buscar usuário..."
        className="mb-4 w-full max-w-2xl p-4 border border-gray-300 rounded-lg"
      />

      {loading &&
        <div className="text-xl text-gray-500 animate-pulse">Carregando usuários...</div>
      }

      {error && (
        <div className="text-xl text-red-500">
          Erro ao carregar usuarios
        </div>
      )}

      {!loading && !error &&
        <ul className="flex flex-col gap-3 w-full">
          {filteredUsers.map(user => (
            <UserItem
              key={user.id}
              id={user.id}
              name={user.name}
              email={user.email}
              handleUserItemClick={handleUserItemClick}
            />
          ))}
        </ul>
      }


      {modalOpen && selectedUser && (
        <SpecificUserModal
          user={selectedUser}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}

export default App
