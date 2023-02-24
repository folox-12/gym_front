import { Middleware } from '@nuxt/types';
import { useActivitiesComplex } from '~/pinia-store/ActivitiesComplexStore';
import { useFiltersStore } from '~/pinia-store/useFiltersStore';

const fetchActivitiesComplex: Middleware = async(context) => {
    const { $pinia } = context;

    const { getAllActivities } = useActivitiesComplex($pinia);
    const { filters } = useFiltersStore($pinia);

    await getAllActivities(filters);
};

export default fetchActivitiesComplex;
