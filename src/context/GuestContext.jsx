import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import api from "../api";
import { toast } from "react-toastify";

export const GuestContext = createContext();

export function GuestProvider({ children }) {
    const [guestId, setGuestId] = useState(null);
    const [cart, setCart] = useState({ items: [] });

    const loadCart = id => {
        api.get(`/cart/${id}`)
            .then(cart => {
                setCart(cart.data);
            })
            .catch(err => {
                toast.error(err.message || "Error getting cart");
            }
        );
    }
    
    useEffect(() => {
        let id = localStorage.getItem("guestId");
        if (!id) {
            id = uuidv4();
            localStorage.setItem("guestId", id);
        }
        setGuestId(id);
        loadCart(id);
    }, []);
    return (
        guestId ? (
            <GuestContext.Provider value={{ userId: guestId, cart, loadCart }}>
                {children}
            </GuestContext.Provider>
        ) : null
    );
}
