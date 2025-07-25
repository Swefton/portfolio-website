"use client";

import React, { useState, useEffect } from "react";

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
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
                cursor: "pointer"
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: "#111",
                    color: "#eee",
                    borderRadius: "12px",
                    maxHeight: "85vh",
                    width: "90%",
                    maxWidth: "900px",
                    display: "flex",
                    overflow: "hidden",
                    boxShadow: "0 0 40px rgba(0,0,0,0.6)"
                }}
            >
                {/* Left - Selector List */}
                <div
                    style={{
                        width: "30%",
                        background: "#1a1a1a",
                        borderRight: "1px solid #333",
                        overflowY: "auto"
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                            style={{
                                padding: "16px",
                                cursor: "pointer",
                                background: selectedIndex === index ? "#333" : "transparent",
                                borderBottom: "1px solid #222"
                            }}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>

                {/* Right - Dynamic Content */}
                <div
                    style={{
                        width: "70%",
                        padding: "24px",
                        overflowY: "auto"
                    }}
                >
                    {items[selectedIndex].content}
                </div>
            </div>
        </div>
    );
};

export default TwoColumnSelector;
