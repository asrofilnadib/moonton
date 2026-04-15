export default function SubscriptionDetail({
    isPremium,
    name,
    remainingActiveDays,
    activeDays,
  }) {
    const progressPercent = Math.min(
        100,
        Math.max(0, (remainingActiveDays / activeDays) * 100),
    );
    return (
        <>
            {!isPremium && (
                <div className="mt-auto pr-[30px]">
                    <div className="p-5 bg-white rounded-[25px] outline outline-1 outline-[#f1f1f1]">
                        <div className="text-black text-lg font-semibold mb-8">
                            {name}
                        </div>
                        <div className="text-black text-sm mb-2">
                            Sisa {remainingActiveDays} dari {activeDays} hari
                        </div>
                        <div className="rounded-full w-full h-[6px] bg-[#f1f1f1]">
                            <div
                                className="rounded-full h-full bg-alerange"
                                style={{
                                    width: `${progressPercent}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            {isPremium && (
                <div className="mt-auto pr-[30px]">
                    <div className="p-5 bg-black rounded-[25px]">
                        <img
                            src="/icons/ic_star-rounded.svg"
                            alt="Subscription Icon"
                        />
                        <div className="text-white text-lg font-semibold mt-4 mb-8">
                            {name}
                        </div>
                        <div className="text-white text-sm mb-2">
                            Sisa {remainingActiveDays} dari {activeDays} hari
                        </div>
                        <div className="rounded-full w-full h-[6px] bg-[#333333]">
                            <div
                                className="rounded-full h-full bg-[#FB6908]"
                                style={{
                                    width: `${progressPercent}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
