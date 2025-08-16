import React, { useState, useEffect } from "react";
import styles from './TwoColumn.module.css';

const TwoColumnSelector = ({ open, onClose, items }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        if (open) {
            document.addEventListener("keydown", handleEscape);
        } else {
            setSelectedIndex(0);
        }
        return () => document.removeEventListener("keydown", handleEscape);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            onClick={onClose}
            className={styles.overlay}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={styles.modal}
            >
                {/* Sidebar */}
                <div className={styles.sidebar}>
                {items.map((item, index) => (
                    <div
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`${styles.sidebarItem} ${index === selectedIndex ? styles.selected : ''}`}
                    >
                    {item.label}
                    </div>
                ))}
                </div>
                {/* Content */}
                <div className={styles.content}>
                    {items[selectedIndex].content}
                </div>
            </div>
        </div>
    );
};

export default TwoColumnSelector;
