import React from 'react';

export default function ButtonWarning(params) {
  return (
    <div>
      <button
        className="bg-primary w-full rounded-full p-[10px] text-white font-bold font-lg hover:bg-white hover:border-2 hover:border-solid hover:border-primary hover:text-primary hover:p-[8px]"
        onClick={params.onClick}
      >
        {params.action}
      </button>
    </div>
  );
}
