import { AccountType } from "@/lib/types";

//TODO : Write test + storybook
export default function EnergyTypeFilter({
  selectedType,
  onTypeChange,
}: {
  selectedType: AccountType | "all";
  onTypeChange: (type: AccountType | "all") => void;
}) {
  const filterOptions = [
    { value: "all" as const, label: "All Energy", icon: "🌎" },
    { value: AccountType.Electricity, label: "Electricity", icon: "⚡" },
    { value: AccountType.Gas, label: "Gas", icon: "🔥" },
  ];

  return (
    <div className="flex justify-center gap-3">
      {filterOptions.map((option) => (
        <FilterButton
          key={option.value}
          icon={option.icon}
          label={option.label}
          isActive={selectedType === option.value}
          onClick={() => onTypeChange(option.value)}
        />
      ))}
    </div>
  );
}

function FilterButton({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-medium transition-all duration-200 transform hover:scale-105
        ${
          isActive
            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg"
            : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md"
        }
      `}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
