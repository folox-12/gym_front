import { Middleware } from '@nuxt/types';
import { useProfileStore } from '~/pinia-store/useProfileStore';

const isActivated: Middleware = async(context) => {
    const { $pinia, $auth } = context;

    const { isActivated: activated, getProfileInformation } = useProfileStore($pinia);
    await getProfileInformation();

    if (!$auth.user?.isActivated && !activated) {
        context.redirect('/');
    }
};

export default isActivated;
