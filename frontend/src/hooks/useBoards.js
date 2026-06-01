import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../services/api";
import toast from "react-hot-toast";

// Récupérer tous les boards
export const useBoards = () => {
  return useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const { data } = await api.getBoards();
      return data;
    },
  });
};

// Récupérer un board avec ses colonnes et cartes
export const useBoard = (boardId) => {
  return useQuery({
    queryKey: ["board", boardId],
    queryFn: async () => {
      const { data } = await api.getColumns(boardId);
      return data;
    },
    enabled: !!boardId,
  });
};

// Créer un board
export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title) => api.createBoard(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      toast.success("Board créé avec succès");
    },
    onError: () => {
      toast.error("Erreur lors de la création");
    },
  });
};

// Créer une colonne
export const useCreateColumn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ boardId, title, order }) =>
      api.createColumn(boardId, title, order),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["board", variables.boardId] });
      toast.success("Colonne ajoutée");
    },
  });
};

// Créer une carte
export const useCreateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ columnId, title, order }) =>
      api.createCard(columnId, title, order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board"] });
      toast.success("Carte ajoutée");
    },
  });
};

// Déplacer une carte
export const useMoveCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardId, newColumnId, newOrder }) =>
      api.moveCard(cardId, newColumnId, newOrder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board"] });
    },
  });
};

// Supprimer une carte
export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardId) => api.deleteCard(cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board"] });
      toast.success("Carte supprimée");
    },
  });
};
