import { ApiResponse } from '@/types/base.type';
import { AuthAPi, getResError } from '@/utils/fetcher';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';

interface Opts {
  onMount?: boolean;
  defaultData?: any;
}

export default function useDelete<T = any>(url: string, _options?: Opts) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function deleteData(id?: string) {
    setLoading(true);
    setError(null);
    if (!id) {
      console.log('useDelete error', 'id is required');
      setError('id is required');
      return;
    }
    try {
      const response = await AuthAPi.delete<ApiResponse<T>>(`${url}/${id}`);
      console.log(response);
      notifications.show({
        title: 'Success',
        message: response.data?.message,
        color: 'blue',
        autoClose: 3000,
      });
    } catch (error: any) {
      const err = getResError(error);
      console.log('useDelete error', err);
      notifications.show({
        title: 'Failed to delete data',
        message: err,
        color: 'red',
        autoClose: 3000,
      });
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, deleteData };
}
