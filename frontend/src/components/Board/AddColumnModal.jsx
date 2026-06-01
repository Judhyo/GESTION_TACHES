import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { X, Plus, Columns3, Hash, Trash2 } from "lucide-react";

import { columnApi } from "../../services/api";

export default function AddColumnModal({ boardId, onClose }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([
    {
      title: "",
      boardId: boardId,
      order: 1,
    },
  ]);

  const handleColumnChange = (index, value) => {
    const updated = [...formData];

    updated[index].title = value;

    setFormData(updated);
  };

  const handleRemoveColumn = (index) => {
    const updated = formData.filter((i) => i !== index);
    const reordered = updated.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }));

    setFormData(reordered);
  };

  const handleAddColumn = () => {
    setFormData([
      ...formData,
      {
        title: "",
        boardId: boardId,
        order: formData.length + 1,
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await columnApi.createColumn(formData);

      toast.success("Colonnes créées avec succès");

      navigate(`/board/${boardId}`);
    } catch {
      toast.error("Erreur lors de la création");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="
          flex
          max-h-[90vh]
          w-full
          max-w-2xl
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
      >
        <div className="flex items-center justify-between border-b p-6">
          <div className="flex items-center gap-2">
            <Columns3 className="text-blue-600" />

            <h1 className="text-2xl font-bold text-gray-800">
              Ajouter des colonnes
            </h1>
          </div>

          <button
            type="button"
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
            <X />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-4">
            {formData.map((column, index) => (
              <div
                key={index}
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-gray-50
                  p-4
                "
              >
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Colonne {index + 1}
                  </label>

                  {formData.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveColumn(index)}
                      className="
                        rounded-lg
                        p-1
                        text-gray-400
                        transition
                        hover:bg-red-50
                        hover:text-red-500
                      "
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  placeholder={`Titre colonne ${index + 1}`}
                  value={column.title}
                  onChange={(e) => handleColumnChange(index, e.target.value)}
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
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
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddColumn}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border-2
              border-dashed
              border-gray-300
              py-3
              text-gray-600
              transition
              hover:border-blue-400
              hover:bg-blue-50
              hover:text-blue-600
            "
          >
            <Plus size={18} />
            Ajouter une colonne
          </button>
        </div>

        <div className="border-t p-6">
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
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
            {loading ? "Création..." : "Créer les colonnes"}
          </button>
        </div>
      </form>
    </div>
  );
}
