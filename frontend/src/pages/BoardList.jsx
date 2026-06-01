import { useState, useEffect } from "react";
import { Plus, FolderKanban, Search } from "lucide-react";
import Board from "../components/Board/Board";
import AddBoardModal from "../components/Board/AddBoardModal";
import Navbar from "../components/common/Navbar";
import { boardApi } from "../services/api";
import Spinner from "../components/common/Spinner";

function BoardList() {
  const [board, setBoard] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchData = async () => {
      const response = await boardApi.readBoard(user.id);
      setBoard(response);
      setLoading(true);
    };
    fetchData();
  }, [refresh, user.id]);

  const handleCreate = (newData) => {
    setBoard([...board, newData]);
    setRefresh(!refresh);
  };

  const boards = board.map((item) => (
    <Board
      key={item.id}
      id={item.id}
      title={item.title}
      onCreate={handleCreate}
    />
  ));
  const [open, setOpen] = useState(false);

  if (!loading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <AddBoardModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onCreate={handleCreate}
          user={user}
        />
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Liste des Projets
            </h1>

            <p className="mt-2 text-gray-500">
              Gérez vos projets et vos tâches facilement
            </p>
          </div>

          <div className="flex gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm">
              <Search size={18} className="text-gray-400" />

              <input
                type="text"
                placeholder="Rechercher un projet..."
                className="outline-none"
              />
            </div>

            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white shadow-lg transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Ajouter un Projet
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {board.length > 0 ? (
            boards
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center rounded-2xl bg-white py-16 shadow-sm">
              <FolderKanban size={60} className="text-gray-300" />

              <h2 className="mt-4 text-xl font-semibold text-gray-700">
                Aucun projet trouvé
              </h2>

              <p className="mt-2 text-gray-500">
                Commencez par créer votre premier projet
              </p>

              <button className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700">
                Créer un Projet
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BoardList;
