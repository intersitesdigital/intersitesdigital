import * as Select from '@radix-ui/react-select';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomSelect({
  value,
  onChange,
  placeholder,
  options = [],
}) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      {/* Trigger */}
      <Select.Trigger className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm backdrop-blur-md hover:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition">
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDown className="w-4 h-4 opacity-60" />
        </Select.Icon>
      </Select.Trigger>

      {/* Dropdown */}
      <Select.Portal>
        <Select.Content
          sideOffset={6}
          className="z-50 overflow-hidden rounded-xl border border-white/10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in-95"
        >
          <Select.Viewport className="p-2">
            {options.map((opt) => (
              <Select.Item
                key={opt}
                value={opt}
                className="relative flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-violet-50 dark:hover:bg-white/10 cursor-pointer select-none"
              >
                <Select.ItemText>{opt}</Select.ItemText>

                {/* Selected indicator */}
                <Select.ItemIndicator className="absolute right-2">
                  <Check className="w-4 h-4 text-violet-500" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}