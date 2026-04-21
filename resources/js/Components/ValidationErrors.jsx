import React from "react";

export default function ValidationErrors({ errors }) {
    const errorList = Object.entries(errors).filter(([, msg]) => Boolean(msg));

    if (errorList.length === 0) {
        return null;
    }

    return (
        <div
            className="mb-4 rounded-lg border border-red-500/50 bg-red-950/50 px-4 py-3 text-sm text-red-200"
            role="alert"
        >
            <p className="font-medium text-red-100">
                Whoops! Something went wrong.
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-red-200/90">
                {errorList.map(([field, message]) => (
                    <li key={field}>
                        <span className="capitalize">
                            {field.replaceAll("_", " ")}
                        </span>
                        : {message}
                    </li>
                ))}
            </ul>
        </div>
    );
}
