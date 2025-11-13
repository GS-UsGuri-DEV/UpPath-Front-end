import React from 'react';

export default function FormButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="w-full bg-blue-600 text-white rounded p-2 disabled:opacity-60"
      {...props}
    />
  );
}
