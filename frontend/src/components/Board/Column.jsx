import { useDroppable } from "@dnd-kit/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddCardModal from "./AddCardModal";
import { columnApi } from "../../services/api";
function Column({ id, title, order, changeTitle, onCreate, children }) {
  const { ref } = useDroppable({ id });
  const [isEditing, setIsEditing] = useState(false);
  const [titles, setTitles] = useState(title);
  const [showAddCardModal, setShowAddCardModal] = useState(false);

  const handleAddCard = () => {
    setShowAddCardModal(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      columnApi.updateColumn(id, { title: titles });
      setIsEditing(false);
      changeTitle();
    }
  };

  const handleCloseModal = () => {
    setShowAddCardModal(false);
  };

  return (
    <div
      ref={ref}
      className="
        w-75
        shrink-0
        rounded-3xl
        bg-gray-50
        p-4
        shadow-sm
        transition
        hover:shadow-md
      "
    >
      <div className="mb-4 flex items-center justify-between">
        {isEditing ? (
          <input
            type="text"
            value={titles}
            onChange={(e) => setTitles(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => handleKeyDown(e)}
            onClick={(e) => e.stopPropagation()}
            className="font-semibold px-2 py-1  rounded w-30"
            autoFocus
          />
        ) : (
          <h3
            onClick={() => setIsEditing(true)}
            className="text-lg font-bold text-gray-800"
          >
            {title}
          </h3>
        )}

        {order === 1 && (
          <div className="flex items-center gap-2">
            {showAddCardModal && (
              <AddCardModal
                isOpen={handleAddCard}
                columnId={id}
                onCreate={onCreate}
                onClose={handleCloseModal}
              />
            )}
            <button
              onClick={handleAddCard}
              className="
              flex h-8 w-8 items-center justify-center
              rounded-xl
              bg-white
              text-gray-500
              shadow-sm
              transition
              hover:bg-gray-200
            "
            >
              <Plus size={16} />
            </button>
          </div>
        )}
      </div>
      <div
        className="
          min-h-100
          space-y-3
          rounded-2xl
          border-2
          border-dashed
          border-gray-200
          bg-white
          p-3
          transition
          hover:border-blue-300
          hover:bg-blue-50/30
        "
      >
        {children}
      </div>
    </div>
  );
}

export default Column;
