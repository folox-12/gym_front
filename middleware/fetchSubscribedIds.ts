import { Middleware } from '@nuxt/types';
import { useSubscription } from '~/pinia-store/SubscriptionStore';


const fetchSubscription : Middleware = async(context) => {
    const { $pinia, $auth } = context;

    const { fetchSubscribedComplexesId } = useSubscription($pinia);

    if($auth.loggedIn) {
        await fetchSubscribedComplexesId()
    }

};

export default fetchSubscription;
