import { createContext, useContext, useState, ReactNode } from "react";

interface InventoryItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface InventoryContextType {
  inventory: InventoryItem[];
  addItem: (item: InventoryItem) => void;
  updateItem: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  increaseItem: (id: number) => void;
  decreaseItem: (id: number) => void;
  getTotal: () => number;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const addItem = (item: InventoryItem) => {
    setInventory((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const increaseItem = (id: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseItem = (id: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const updateItem = (id: number, quantity: number) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: number) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  const getTotal = () => {
    return inventory.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        addItem,
        increaseItem,
        decreaseItem,
        updateItem,
        removeItem,
        getTotal,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
