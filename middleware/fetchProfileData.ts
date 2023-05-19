import { Middleware } from '@nuxt/types';
import { useProfileStore } from '~/pinia-store/useProfileStore';

const fetchProfileData: Middleware = async(context) => {
    const { $pinia } = context;

    const { getProfileInformation } = useProfileStore($pinia);

    await getProfileInformation();
};

export default fetchProfileData;
