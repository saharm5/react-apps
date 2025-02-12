import React from "react";

interface PlusProps {
    color?: string;
    width?: number;
    height?: number;
}

export default function Plus({ color = "white", width = 24, height = 25 }: PlusProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height} fill={color}>
            <rect x="3" y="10" width="16" height="2" rx="1" />
            <rect x="10" y="3" width="2" height="16" rx="1" />
        </svg>
    );
}
