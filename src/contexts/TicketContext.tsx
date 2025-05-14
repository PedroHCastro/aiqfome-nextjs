"use client";

import { TicketItemModel } from "@/types";
import { createContext, useEffect, useState } from "react";

interface TicketContextType {
  ticket: TicketItemModel[];
  addToTicket: (item: TicketItemModel) => void;
  removeFromTicket: (itemId: number) => void;
  clearTicket: () => void;
}

export const TicketContext = createContext<TicketContextType>(
  {} as TicketContextType
);

export function TicketProvider({ children }: { children: React.ReactNode }) {
  const [ticket, setTicket] = useState<TicketItemModel[]>([]);

  useEffect(() => {
    const savedTicket = localStorage.getItem("ticket");
    if (savedTicket) setTicket(JSON.parse(savedTicket));
  }, []);

  useEffect(() => {
    localStorage.setItem("ticket", JSON.stringify(ticket));
  }, [ticket]);

  function addToTicket(item: TicketItemModel) {
    setTicket((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  }

  function removeFromTicket(itemId: number) {
    console.log({ remove_itemId: itemId });
    setTicket((prev) => {
      const existing = prev.find((i) => i.id === itemId);

      console.log(
        existing && { existing, quantityMore: existing.quantity > 1 }
      );

      if (!existing) return prev;

      if (existing.quantity > 1) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else {
        return prev.filter((i) => i.id !== itemId);
      }
    });
  }

  function clearTicket() {
    setTicket([]);
  }

  return (
    <TicketContext.Provider
      value={{ ticket, addToTicket, removeFromTicket, clearTicket }}
    >
      {children}
    </TicketContext.Provider>
  );
}
