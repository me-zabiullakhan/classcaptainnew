
// This file contains configuration for the Platform Owner (You).

export const PLATFORM_CONFIG = {
    // IMPORTANT: Add your Razorpay Key ID here to collect subscription payments from Academies.
    razorpayKeyId: "rzp_live_RmecQ0mAZzpRC5", 

    // Define student limits for each subscription plan
    plans: {
        monthly: {
            limit: 100,
            label: 'Monthly Plan'
        },
        quarterly: {
            limit: 300,
            label: 'Quarterly Plan'
        },
        yearly: {
            limit: Infinity, // Unlimited
            label: 'Yearly Plan'
        }
    }
};
