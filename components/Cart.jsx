/*
 * Created on Wed Oct 12 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect } from "react";
import Cart from "/public/libs/cart.js";
import styles from "../styles/Cart.module.css";

export const CartListItem = ({ item, itemQty, onDelete }) => {
    const handleDelete = () => {
        console.log(`Attempting to delete item "${item.name}"...`);
        onDelete(item);
    };

    return (
        <li
            data-cy="cart-list-item"
            className={styles.cartListItem + " total-radius"}
        >
            <button
                data-cy="cart-list-item-delete"
                className={"uibutton delete " + styles.deleteButton}
                onClick={handleDelete}
            >
                {"\u2715"}
            </button>
            <span
                className={styles.itemInfo}
            >{`${item.name} (${itemQty})`}</span>
        </li>
    );
};

export const CartBanner = ({
    cart = {},
    onClear = () => {},
    onItemDelete = () => {},
}) => {
    const [cartSize, setCartSize] = useState(0);
    const [localCart, setLocalCart] = useState(cart);

    useEffect(() => {
        const size = Object.keys(cart).length;
        const total = Object.values(cart).reduce((a, b) => a + b[1], 0);
        if (cart) setCartSize(total);
    }, [cart]);

    const handleItemDelete = (item) => {
        // callback to OrderPanel.updateItems(itemId, quantity);
        if (onItemDelete) {
            onItemDelete(item);
        } else {
            delete cart[item.id];
        }
    };

    const localDelete = (item) => {
        let oldLen = Object.keys(cartItems).length;
        // Copy state object
        let newCartItems = { ...cartItems };
        // newCartItems[item.id] = [item, quantity];

        // Remove item if quantity is 0
        if (quantity === 0) {
            delete newCartItems[item.id];
            console.log(`Successfully removed item with id: ${item.id}`);
        }

        // Set to new updated value
        setCartItems(newCartItems);

        // console.log(orderItems);
    };

    const itemStrings = Object.keys(cart).map((key) => {
        const cartItem = cart[key];
        return (
            <CartListItem
                key={key}
                item={cartItem[0]}
                itemQty={cartItem[1]}
                onDelete={handleItemDelete}
            />
        );
    });

    return (
        <div data-cy="cart-banner" className={styles.cartBanner}>
            <div className={styles.cartInfo}>
                <button
                    data-cy="cart-clear"
                    className={"uibutton delete " + styles.deleteButton}
                    onClick={onClear}
                >
                    {"\u2715"}
                </button>
                <h2>
                    Cart (<span data-cy="cart-size">{cartSize}</span>)
                </h2>
            </div>
            <ul className={styles.cartList}>{itemStrings}</ul>
        </div>
    );
};

export default CartBanner;
