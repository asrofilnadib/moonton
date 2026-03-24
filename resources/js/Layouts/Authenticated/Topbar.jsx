import { useState, useRef } from "react";

export default function Topbar() {
    const [dropdownOpen, setDropdownOpen] = useState(true);
    const dropdownRef = useRef();

    const triggerDropdown = () => {
        if (dropdownOpen) {
            dropdownRef.current.classList.remove("hidden");
        } else {
            dropdownRef.current.classList.add("hidden");
        }
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="flex justify-between items-center">
            <input
                type="text"
                className="top-search"
                placeholder="Search movie, cast, genre"
            />
            <div className="flex items-center gap-4">
                <span className="text-black text-sm font-medium">
                    Welcome, Granola Sky
                </span>
                <div className="collapsible-dropdown flex flex-col gap-2 relative cursor-pointer" onClick={triggerDropdown}>
                    <div
                        href="#!"
                        className="outline outline-2 outline-gray-2 p-[5px] rounded-full w-[60px] dropdown-button"
                    >
                        <img
                            src="/images/avatar.png"
                            className="rounded-full object-cover w-full"
                            alt=""
                        />
                    </div>
                    <div
                        className="bg-white rounded-2xl text-black font-medium flex flex-col gap-1 absolute z-[999] right-0 top-[80px] min-w-[180px] hidden overflow-hidden"
                        ref={dropdownRef}
                    >
                        <a
                            href="#!"
                            className="transition-all hover:bg-sky-100 p-4"
                        >
                            Dashboard
                        </a>
                        <a
                            href="#!"
                            className="transition-all hover:bg-sky-100 p-4"
                        >
                            Settings
                        </a>
                        <a
                            href="sign_in.html"
                            className="transition-all hover:bg-sky-100 p-4"
                        >
                            Sign Out
                        </a>
                    </div>
                </div>
            </div>
            <style jsx="true">
                {`
                    .top-search {
                        background-image: url("/icons/ic_search.svg");
                    }
                `}
            </style>
        </div>
    );
}
