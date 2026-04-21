import Authenticated from "@/Layouts/Authenticated/Index";
import { Head, router } from "@inertiajs/react";
import Button from "@/Components/Button";
import SubscriptionCard from "@/Layouts/Authenticated/SubscriptionCard";

export default function SubscriptionPlan({ auth, subscriptionPlans }) {
    const handleUserSubscribe = (id) => {
        router.post(
            route("user.dashboard.subscriptionPlan.userSubscribe", {
                subscriptionPlan: id,
            }),
            {},
            {
                onSuccess: (page) => {
                    onSnapMidtrans(page.props.userSubscription);
                },
            },
        );
    };

    const onSnapMidtrans = (userSubscription) => {
        window.snap.pay(userSubscription.snap_token, {
            onSuccess: function (result) {
                router.visit(route("user.dashboard.index"));
            },
            onPending: function (result) {
                router.visit(route("user.dashboard.index"));
            },
            onError: function (result) {
                router.visit(route("user.dashboard.index"));
            },
        });
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Subscription Plan">
                <script
                    src="https://app.sandbox.midtrans.com/snap/snap.js"
                    data-client-key={import.meta.env.VITE_MIDTRANS_CLIENT_KEY}
                ></script>
            </Head>
            <div className="py-20 flex flex-col items-center">
                <div className="text-black font-semibold text-[26px] mb-3">
                    Pricing for Everyone
                </div>
                <p className="text-base text-gray-1 leading-7 max-w-[302px] text-center">
                    Invest your little money to get a whole new experiences from
                    movies.
                </p>

                <div className="flex justify-center gap-10 mt-[70px]">
                    {subscriptionPlans.map((subscriptionPlan) => (
                        <SubscriptionCard
                            key={subscriptionPlan.id}
                            name={subscriptionPlan.name}
                            price={subscriptionPlan.price}
                            feature={JSON.parse(subscriptionPlan.features)}
                            durationInMonths={
                                subscriptionPlan.active_period_in_months
                            }
                            isPremium={subscriptionPlan.name === "Premium"}
                            onUserSubscribe={() =>
                                handleUserSubscribe(subscriptionPlan.id)
                            }
                        />
                    ))}
                </div>
            </div>
        </Authenticated>
    );
}
