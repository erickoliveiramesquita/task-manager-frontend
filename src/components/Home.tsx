import { useState } from "react";
import LastList from "./LastList";
import AllLists from "./AllLists";
import Settings from "./Settings";

interface Props {
  email: string;
  name: string;
  handleLogout: () => void;
}

const Home = ({ name, handleLogout }: Props) => {
  const [page, setPage] = useState(0); // 0: Home, 1: LastList, 2: AllLists, 3: Settings

  const handleGoTo = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white px-6 py-4 rounded-b-xl flex justify-between items-center">
        <h1 className="text-xl font-bold">Task Manager</h1>
        <div>
          <span className="mr-4">Bem-vindo, {name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Sair
          </button>
        </div>
      </header>

      {page === 0 && (
        <main className="flex-grow bg-gray-100 p-6 flex flex-col items-center justify-center gap-6">
          <button 
            className="w-full max-w-md bg-white py-6 px-8 rounded-xl shadow-md text-blue-700 font-semibold text-lg hover:bg-blue-50 transition"
            onClick={() => handleGoTo(1)}>
            📂 Última lista de tarefa aberta
          </button>

          <button 
            className="w-full max-w-md bg-white py-6 px-8 rounded-xl shadow-md text-blue-700 font-semibold text-lg hover:bg-blue-50 transition"
            onClick={() => handleGoTo(2)}>
            📋 Ver todas as listas de tarefas
          </button>

          <button 
            className="w-full max-w-md bg-white py-6 px-8 rounded-xl shadow-md text-blue-700 font-semibold text-lg hover:bg-blue-50 transition"
            onClick={() => handleGoTo(3)}>
            ⚙️ Configurações da conta
          </button>
        </main>
      )}
      {page === 1 && <LastList onBack={() => setPage(0)} />}
      {page === 2 && <AllLists onBack={() => setPage(0)} />}
      {page === 3 && <Settings onBack={() => setPage(0)} />}
    </div>
  );
};

export default Home;
