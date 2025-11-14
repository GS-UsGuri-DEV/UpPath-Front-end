import React from 'react';

export default function FormButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="btn-primary"
      {...props}
    />
  );
}
