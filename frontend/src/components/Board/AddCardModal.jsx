import { useState } from "react";
import toast from "react-hot-toast";
import { X, FileText, AlignLeft, Plus } from "lucide-react";
import { cardApi } from "../../services/api";

export default function AddCardModal({ isOpen, onClose, onCreate, columnId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = {
        title,
        description,
        order: 1,
        columnId,
      };

      await cardApi.createCard(formData);
      onCreate({ ...formData, id: Date.now() });
      onClose();
      toast.success("Carte ajoutée avec succès");
      setTitle("");
      setDescription("");
    } catch {
      toast.error("Erreur lors de l'ajout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <Plus className="text-blue-600" size={20} />

            <h2 className="text-xl font-bold text-gray-800">Nouvelle Tâche</h2>
          </div>

          <button
            onClick={onClose}
            className="
              rounded-lg
              p-1
              text-gray-400
              transition
              hover:bg-red-50
              hover:text-red-500
            "
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div>
            <label className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-700">
              <FileText size={16} className="text-gray-500" />
              Titre
            </label>

            <input
              type="text"
              placeholder="Ex: Corriger le bug login"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                px-4
                py-2.5
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
              "
            />
          </div>
          <div>
            <label className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-700">
              <AlignLeft size={16} className="text-gray-500" />
              Description
            </label>

            <textarea
              rows={4}
              placeholder="Description de la tâche..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-gray-300
                px-4
                py-3
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
              "
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              py-3
              font-medium
              text-white
              transition
              hover:bg-blue-700
              disabled:opacity-50
            "
          >
            <Plus size={18} />

            {loading ? "Ajout..." : "Ajouter"}
          </button>
        </form>
      </div>
    </div>
  );
}
