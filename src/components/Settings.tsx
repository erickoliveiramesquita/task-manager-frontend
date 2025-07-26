// Exemplo: src/components/LastList.tsx
interface Props {
  onBack: () => void;
}

const Settings = ({ onBack }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Última Lista de Tarefas</h2>
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
