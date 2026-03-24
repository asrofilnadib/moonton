import Authenticated from "@/Layouts/Authenticated/Index";
import { Head } from "@inertiajs/react";
import Button from "@/Components/Button";
import SubscriptionCard from "@/Layouts/Authenticated/SubscriptionCard";

export default function SubscriptionPlan({
    name,
    price,
    feature,
    durationInMonths,
}) {
    return (
        <Authenticated>
            <Head title="Subscription Plan" />
            <div class="py-20 flex flex-col items-center">
                <div class="text-black font-semibold text-[26px] mb-3">
                    Pricing for Everyone
                </div>
                <p class="text-base text-gray-1 leading-7 max-w-[302px] text-center">
                    Invest your little money to get a whole new experiences from
                    movies.
                </p>

                <div class="flex justify-center gap-10 mt-[70px]">
                    {/* Basic */}
                    <SubscriptionCard
                        name="Basic"
                        price={299000}
                        feature={[
                            "Unlock 10 basic movies",
                            "Up to 3 users",
                            "Support 24/7 ready",
                        ]}
                        durationInMonths={3}
                    />

                    {/* Premium Plan */}
                    <SubscriptionCard
                        name="Premium"
                        price={899000}
                        feature={[
                            "Unlock 100 premium movies",
                            "High quality video",
                            "Up to 20 users",
                            "Downloadable content",
                            "Priority support",
                            "Exclusive content",
                            "Offline Mode",
                            "Support 24/7 ready",
                        ]}
                        durationInMonths={6}
                        isPremium={true}
                    />
                </div>
            </div>
        </Authenticated>
    );
}
