import React from "react";
import PropTypes from "prop-types";

Button.propTypes = {
    type: PropTypes.oneOf(["submit", "button", "reset"]),
    className: PropTypes.string,
    variant: PropTypes.oneOf([
        "primary",
        "warning",
        "danger",
        "light-outline",
        "white-outline",
    ]),
    processing: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

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
            type={type}
            className={`btn-${variant} ${processing ? "opacity-25" : ""} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
