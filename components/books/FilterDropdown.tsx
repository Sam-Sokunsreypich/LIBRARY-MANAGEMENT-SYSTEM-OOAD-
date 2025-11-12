
import { StatusType } from '@/types/common';

interface FilterOption {
  value: StatusType;
  label: string;
}

interface FilterDropdownProps {
  activeStatus: StatusType;
  setActiveStatus: (status: StatusType) => void;
  options: FilterOption[];
  label: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ activeStatus, setActiveStatus, options, label }) => {
  return (
    <div className="mb-4 flex items-center">
      <label className="mr-3 font-medium text-gray-700">{label}</label>
      <select
        value={activeStatus}
        onChange={(e) => setActiveStatus(e.target.value as StatusType)}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;