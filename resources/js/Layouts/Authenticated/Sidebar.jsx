import SubscriptionDetail from "./SubscriptionDetail";
import MenuItems from "./MenuItems";
import { userMenu, otherMenu } from "./MenuList";
import { Link } from "@inertiajs/react";

export default function Sidebar({ auth, activePlan }) {
    return (
        <aside className="fixed z-50 w-[300px] h-full">
            <div className="flex flex-col p-[30px] pr-0 border-r border-[#F1F1F1] overflow-y-auto h-full bg-white">
                <Link href={route("prototype.dashboard")}>
                    <img src="/images/moonton.svg" alt="Moonton Logo" />
                </Link>
                <div className="links flex flex-col mt-[60px] h-full gap-[50px]">
                    {/* Menu */}
                    <div>
                        <div className="text-gray-1 text-sm mb-4">Menu</div>
                        {userMenu.map((menu, index) => (
                            <MenuItems
                                key={`${index}-${menu.text}`}
                                link={menu.link}
                                icon={menu.icon}
                                text={menu.text}
                                isActive={
                                    menu.link && route().current(menu.link)
                                }
                            />
                        ))}
                    </div>

                    {/* Others */}
                    <div>
                        <div className="text-gray-1 text-sm mb-4">Others</div>
                        {otherMenu.map((menu, index) => (
                            <MenuItems
                            key={`${index}-${menu.text}`}
                            link={menu.link}
                            icon={menu.icon}
                            text={menu.text}
                            isActive={menu.link && route().current(menu.link)}
                            method={menu.method}
                            />
                        ))}
                    </div>

                    {auth.activePlan && (
                        <SubscriptionDetail
                            isPremium={auth.activePlan.name === "Premium"}
                            name={auth.activePlan?.name}
                            activeDays={auth.activePlan?.active_days}
                            remainingActiveDays={
                                auth.activePlan?.remaining_days
                            }
                            elapsedDays={auth.activePlan?.elapsed_days}
                        />
                    )}
                </div>
            </div>
        </aside>
    );
}
