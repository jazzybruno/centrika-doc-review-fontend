import useGet from '@/hooks/useGet';
import { Select } from '@mantine/core';
import React, { FC, useEffect } from 'react';

interface Props {
  label?: string;
  placeholder?: string;
  value?: string;
  dataUrl: string;
  accessorKey?: string;
  labelKey?: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
}

const AsyncSelect: FC<Props> = ({
  label,
  labelKey,
  accessorKey,
  placeholder,
  value,
  dataUrl,
  onChange,
  disabled,
}) => {
  const [selected, setSelected] = React.useState(value);
  const { data, loading } = useGet<any[]>(dataUrl, { defaultData: [] });
  const [selectedData, setSelectedData] = React.useState<any[]>([]);

  useEffect(() => {
    console.log('data', data);
    const selectData = data?.map((item) => ({
      value: item[accessorKey ?? 'id'],
      label: item[labelKey ?? 'name'],
    }));
    setSelectedData(selectData ?? []);
    const selected = data?.find((item) => item[accessorKey ?? 'id'] === value);
    console.log('selected use', selected?.id);
    if (selected) {
      setSelected(selected.id);
    }
  }, [accessorKey, data, labelKey, value]);
  const loadingData = [{ value: 'loading', label: 'Loading...', disabled: true }];
  return (
    <Select
      label={label}
      placeholder={placeholder}
      // variant="unstyled"
      mt={6}
      disabled={disabled}
      data={loading ? loadingData : selectedData}
      value={selected}
      nothingFoundMessage="No data found"
      onChange={(e) => {
        // const selected = data?.find((item) => item[accessorKey ?? 'id'] === e);
        // console.log('e', e);
        setSelected(e!);
        onChange?.(e);
      }}
    />
  );
};

export default AsyncSelect;
