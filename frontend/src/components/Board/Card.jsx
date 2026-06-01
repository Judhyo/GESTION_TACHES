import React from "react";
import { useDraggable } from "@dnd-kit/react";
import { Trash2, GripVertical } from "lucide-react";

function Card({ id, title, description, order, handleDeleteCard }) {
  const { ref } = useDraggable({ id });
  return (
    <div
      ref={ref}
      className="
        group
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-4
        shadow-sm
        cursor-grab
        active:cursor-grabbing
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-md
        hover:border-blue-200
      "
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex gap-2">
          <div className="mt-1 text-gray-300 group-hover:text-gray-500">
            <GripVertical size={16} />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-800">{title}</h4>

            {description && (
              <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={() => handleDeleteCard(id)}
          className="
            opacity-0
            group-hover:opacity-100
            transition
            text-gray-400
            hover:text-red-500
            hover:bg-red-50
            rounded-lg
            p-1
          "
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span
          className="
            rounded-full
            bg-blue-50
            px-2 py-1
            text-[10px]
            font-medium
            text-blue-600
          "
        >
          {order}
        </span>

        <span className="text-[10px] text-gray-400">Drag me</span>
      </div>
    </div>
  );
}

export default Card;
