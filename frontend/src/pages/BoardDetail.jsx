import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Column from "../components/Board/Column";
import Card from "../components/Board/Card";
import { DragDropProvider } from "@dnd-kit/react";
import { ArrowLeft, LayoutGrid } from "lucide-react";
import { cardApi, boardApi, columnApi } from "../services/api";
import Spinner from "../components/common/Spinner";

function BoardDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataCard, setDataCard] = useState([]);
  const [board, setBoard] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const boardId = Number(id);

  useEffect(() => {
    const fetchData = async () => {
      const q1 = await cardApi.readCard();
      setDataCard(q1);
      const q2 = await boardApi.readBoard(user.id);
      setBoard(q2);
      const q3 = await columnApi.readColumn(boardId);
      setColumns(q3);

      setLoading(true);
    };
    fetchData();
  }, [boardId, refresh, user.id]);
  const onCreate = (data) => {
    setDataCard([...dataCard, data]);
  };

  const onChangeTitle = () => {
    setRefresh(!refresh);
  };
  const handleDeleteCard = async (id) => {
    await cardApi.deleteCard(id);
    const newData = dataCard.filter((card) => card.id !== id);
    setDataCard(newData);
  };
  if (!loading) {
    return <Spinner />;
  }

  const boardData = board.find((item) => item.id === boardId);

  const columnData = columns
    .filter((item) => item.boardId === boardId)
    .sort((a, b) => a.order - b.order);

  const handleDragEnd = async (event) => {
    const { operation } = event;
    const cardId = operation.source?.id;
    const targetColumnId = operation.target?.id;

    if (!cardId || !targetColumnId) return;

    const targetCards = dataCard.filter(
      (card) => card.columnId === targetColumnId,
    );

    const lastOrder =
      targetCards.length > 0
        ? Math.max(...targetCards.map((card) => card.order))
        : 0;

    const updatedCards = dataCard.map((card) => {
      if (card.id === cardId) {
        let formData = {
          ...card,
          order: lastOrder + 1,
          columnId: targetColumnId,
        };
        cardApi.updateCard(cardId, formData);
        return formData;
      }
      return card;
    });

    setDataCard(updatedCards);
  };

  if (!boardData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-xl font-semibold text-gray-500">
          Board introuvable
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <LayoutGrid size={22} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {boardData.title}
            </h1>
            <p className="text-sm text-gray-500">Processus interactif</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/board")}
          className="
            flex items-center gap-2
            rounded-2xl
            bg-white
            px-5 py-3
            text-gray-700
            shadow-sm
            transition
            hover:bg-gray-200
          "
        >
          <ArrowLeft size={18} />
          Retour
        </button>
      </div>
      <div
        className="
          rounded-3xl
          bg-white
          p-4
          shadow-sm
        "
      >
        <DragDropProvider onDragEnd={handleDragEnd}>
          <div
            className="
              flex
              gap-5
              overflow-x-auto
              pb-4
              scrollbar-thin
            "
          >
            {columnData.map((column) => (
              <div
                key={column.id}
                className="
                  min-w-75
                  shrink-0
                "
              >
                <Column
                  id={column.id}
                  order={column.order}
                  title={column.title}
                  changeTitle={onChangeTitle}
                  onCreate={onCreate}
                >
                  <div className="flex flex-col gap-3">
                    {dataCard
                      .filter((card) => card.columnId === column.id)
                      .sort((a, b) => a.order - b.order)
                      .map((card) => (
                        <Card
                          key={card.id}
                          id={card.id}
                          title={card.title}
                          description={card.description}
                          order={card.order}
                          handleDeleteCard={() => handleDeleteCard(card.id)}
                        />
                      ))}
                  </div>
                </Column>
              </div>
            ))}
          </div>
        </DragDropProvider>
      </div>
    </div>
  );
}

export default BoardDetail;
