import { createContext, ReactNode, useState } from "react";

interface InventoryItem {
    id: number;
    name: string;
    quantity: number;
  }
  interface InventoryContextType {
    inventory: InventoryItem[];
    addItem: (item: InventoryItem) => void;
    updateItem: (id: number, quantity: number) => void;
    removeItem: (id: number) => void;
    increaseItem: (id: number) => void;
    decreaseItem:(id: number) => void;
  }  
const CartContext = ({children}: {children : ReactNode}) => {
    const InventoryContext = createContext<InventoryContextType | undefined>(undefined);
    const [inventory, setInventory] = useState<InventoryItem[]>([]);

    const addItem = (item: InventoryItem) => {
        setInventory((prev) => {
          const existingItemIndex = prev.findIndex((i) => i.id === item.id);
      
          if (existingItemIndex !== -1) {
            // Update the existing item's quantity or other properties if necessary
            const updatedInventory = [...prev];
            updatedInventory[existingItemIndex] = {
              ...updatedInventory[existingItemIndex],
              quantity: (updatedInventory[existingItemIndex].quantity || 0) + (item.quantity || 1),
            };
            return updatedInventory;
          } else {
            // Add the new item if it doesn't exist
            return [...prev, item];
          }
        });
      };

      const increaseItem = (id: string | number) => {
        const idStr = String(id); // Convert `id` to string for comparison
        setInventory((prev) =>
          prev.map((item) =>
            String(item.id) === idStr // Convert `item.id` to string
              ? { ...item, quantity: (item.quantity || 0) + 1 }
              : item
          )
        );
      };
      
      
      
      const decreaseItem = (id: string | number) => {
        const idStr = String(id); // Convert `id` to string for comparison
        setInventory((prev) =>
          prev.map((item) =>
            String(item.id) === idStr // Convert `item.id` to string
              ? { ...item, quantity: (item.quantity || 0) - 1 }
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
  
    return (
      <InventoryContext.Provider value={{ inventory, addItem, updateItem, removeItem, increaseItem, decreaseItem }}>
        {children}
      </InventoryContext.Provider>
    );
}

export default CartContext