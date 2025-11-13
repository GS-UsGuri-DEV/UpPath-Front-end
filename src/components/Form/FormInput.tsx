import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
};

export default function FormInput({ label, className, ...rest }: Props) {
  return (
    <div className={"space-y-1 " + (className ?? '')}>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <input className="w-full border rounded p-2" {...rest} />
    </div>
  );
}
