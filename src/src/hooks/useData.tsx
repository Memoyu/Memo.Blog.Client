import { useState } from 'react';

export function useData<T>(
    initialData: T
): [data: T, loading: boolean, (data: T) => void, (loading: boolean) => void] {
    const [data, setData] = useState<T>(initialData);
    const [loading, setLoading] = useState(false);

    return [data, loading, setData, setLoading];
}
