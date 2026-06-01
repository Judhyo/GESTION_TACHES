import { useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { boardApi } from "../../services/api";

export default function AddBoardModal({ isOpen, onClose, onCreate, user }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await boardApi.createBoard({ userId: user.id, title: title });
      onCreate({ id: Date.now(), userId: user.id, title: title });
      setTitle("");
      onClose();
    } catch {
      toast.error("Erreur lors de la création");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Nouveau Projet</h1>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <X />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre du projet
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="p-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Création..." : "Créer le projet"}
          </button>
        </div>
      </form>
    </div>
  );
}
