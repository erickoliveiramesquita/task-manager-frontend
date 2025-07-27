import { useState } from "react";

// Exemplo: src/components/LastList.tsx
interface Props {
  onBack: () => void;
}

type User = {
  id: number;
  name: string;
  email: string;
};

const Settings = ({ onBack }: Props) => {
  const [users, setUsers] = useState<User[] | string>([]);
  const [loading, setLoading] = useState(false);

  const loader = async () => {
    const url = "https://task-manager-backend-flask-g2c9.onrender.com/users";
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        setUsers(data.error || "erro desconhecido");
      } else {
        //setUsers(JSON.stringify({ users }));
        setUsers(data);
      }
    } catch (err) {
      //setUsers("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Configurações</h2>
      {loading ? (
        <button
          onClick={loader}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Buscando
        </button>
      ) : (
        <button
          onClick={loader}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Listar Usuários
        </button>
      )}
      <div>
        <h2>Lista de Usuários</h2>
        <ul>
          {Array.isArray(users) ? (
            users.map((user, index) => (
              <li key={index}>
                {user.id}: {user.name} ({user.email})
              </li>
            ))
          ) : (
            <p>erro</p> // Caso seja uma string de erro
          )}
        </ul>
      </div>
      <button
        onClick={onBack}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
      >
        Voltar
      </button>
    </div>
  );
};

export default Settings;
