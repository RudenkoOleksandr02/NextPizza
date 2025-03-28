import React from "react";
import {Filters} from "@/hooks/use-filters";
import {useRouter} from "next/navigation";
import qs from "qs";

export const useQueryFilters = (filters: Filters) => {
    const isMounted = React.useRef<boolean>(false);
    const router = useRouter();

    React.useEffect(() => {
        if (isMounted.current) {
            const params = {
                selectedIngredients: Array.from(filters.selectedIngredients),
                selectedSizes: Array.from(filters.selectedSizes),
                selectedPizzaTypes: Array.from(filters.selectedPizzaTypes),
                ...filters.price
            }
            const queryString = qs.stringify(params, {arrayFormat: 'comma'});
            router.push(`?${queryString}`, {scroll: false});
        }
        isMounted.current = true;
    }, [filters.selectedIngredients, filters.selectedSizes, filters.selectedPizzaTypes, filters.price]);
}