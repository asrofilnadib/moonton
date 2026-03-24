import React from "react";

export default function Button({
    type = "submit",
    className = "",
    variant = "primary",
    processing,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={`btn-${variant} ${processing ? "opacity-25" : ""} ${className}`}
            disabled={processing}
        >
            {children}
        </button>
    );
}
