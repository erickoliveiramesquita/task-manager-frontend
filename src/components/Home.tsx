interface Props {
  email: string;
  onLogout: () => void;
}

const Home = ({ email, onLogout }: Props) => {
  return (
    <div className="w-full h-screen flex flex-col">
      <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Sistema do Érick</h1>
        <div>
          <span className="mr-4">Bem-vindo, {email}</span>
          <button
            onClick={onLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Sair
          </button>
        </div>
      </header>
      <main className="flex-grow bg-gray-100 p-6">
        <p className="text-gray-700 text-lg">
          Aqui começa a funcionalidade do sistema. Você pode adicionar tabelas,
          painéis, gráficos ou qualquer outro componente que deseje.
        </p>
        {/* Exemplo de conteúdo */}
        <div className="mt-6 p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Painel de Dados</h2>
          <p className="text-gray-600">Nenhum dado disponível ainda.</p>
        </div>
      </main>
    </div>
  );
};

export default Home;
