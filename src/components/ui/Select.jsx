'use client';

import Select from 'react-select';

const options = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'design', label: 'Design' },
  { value: 'hr', label: 'Human Resources' },
];

const customStyles = {
  control: (base) => ({
    ...base,
    padding: '2px',
    borderRadius: '0.5rem',
    borderColor: '#e5e7eb',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#d1d5db',
    },
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? '#f3f4f6' : 'white',
    color: 'black',
  }),
};

export default function SelectInput({ onChange, value }) {
  return (
    <div className="w-full max-w-sm">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Pilih Divisi
      </label>
      <Select
        options={options}
        styles={customStyles}
        placeholder="Pilih..."
        onChange={onChange}
        value={value}
        isSearchable
      />
    </div>
  );
}