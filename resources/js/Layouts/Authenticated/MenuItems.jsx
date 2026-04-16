import { Link } from "@inertiajs/react";

export default function MenuItems({
    link,
    icon,
    text,
    isActive,
    method = "get",
}) {
    return (
        <Link
            href={link ? route(link) : "#!"}
            method={method}
            className={`side-link ${isActive ? "active" : ""}`}
        >
            {icon}
            {text}
        </Link>
    );
}
