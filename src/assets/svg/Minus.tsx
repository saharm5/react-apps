import React from "react";

interface MinusProps {
    color?: string;
    width?: number;
    height?: number;
}

export default function Minus({ color = "white", width = 20, height = 25 }: MinusProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height} fill={color}>
            <rect x="4" y="11" width="15" height="3" rx="1" />
        </svg>
    );
}
