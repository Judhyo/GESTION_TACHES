import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderKanban, ArrowRight, Clock3, Layers3 } from "lucide-react";
import { columnApi } from "../../services/api";
import AddColumnModal from "./AddColumnModal";

function Board({ title, id }) {
  const navigate = useNavigate();
  const [showAddColumn, setShowAddColumn] = useState(false);

  const handleShowColumn = async () => {
    let dataColumn = await columnApi.readColumn(id);
    if (dataColumn.length < 1) {
      setShowAddColumn(true);
    } else {
      navigate(`/board/${id}`);
    }
  };
  const handleCloseAddModal = () => {
    setShowAddColumn(false);
  };

  return (
    <>
      {showAddColumn && (
        <AddColumnModal boardId={id} onClose={handleCloseAddModal} />
      )}
      <div
        className="
        group
        cursor-pointer
        rounded-3xl
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
      "
      >
        <div className="flex items-start justify-between">
          <div
            className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-blue-100
            text-blue-600
          "
          >
            <FolderKanban size={28} />
          </div>
        </div>

        <div className="mt-6">
          <h2
            className="
            text-2xl
            font-bold
            text-gray-800
            transition-colors
            group-hover:text-blue-600
          "
          >
            {title}
          </h2>
        </div>
        {/* <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Layers3 size={16} />
            <span>3 Colonnes</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock3 size={16} />
            <span>Mis à jour</span>
          </div>
        </div> */}
        <div
          className="
          mt-8
          flex
          items-center
          justify-between
          border-t
          pt-4
        "
        >
          <span className="text-sm font-medium text-gray-600">
            Voir le tableau
          </span>

          <div
            className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-gray-100
            transition-all
            group-hover:bg-blue-600
            group-hover:text-white
          "
            onClick={handleShowColumn}
          >
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;
