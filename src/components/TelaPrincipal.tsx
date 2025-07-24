interface Props {
  email: string;
  onLogout: () => void;
}

const TelaPrincipal = ({ email, onLogout }: Props) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo, {email}!</h1>
      <button
        onClick={onLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Sair
      </button>
    </div>
  );
};

export default TelaPrincipal;
