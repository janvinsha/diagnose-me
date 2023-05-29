import type { FC } from "react";
import React, { useId } from "react";

type Props = {
  question: React.ReactNode;
  checked: boolean;
  onChange: () => void;
  className?: string;
};

const CheckBoxInput: FC<Props> = ({
  question,
  checked,
  onChange,
  className = "",
}) => {
  const id = useId();
  return (
    <div className={className}>
      <div className="flex items-center">
        <input
          className="h-3 w-3 border-indigo-300 bg-indigo-100 text-indigo-600 focus:outline-none"
          type="checkbox"
          id={`option1_${id}`}
          checked={checked}
          onChange={() => onChange()}
        />
        <label className="ml-2 text-sm text-gray-900" htmlFor={`option1_${id}`}>
          {question}
        </label>
      </div>
    </div>
  );
};

export default CheckBoxInput;
