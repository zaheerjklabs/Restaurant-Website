import React from 'react';
import { RESTAURANT_TABLES } from '../../data/tastingMenuData';
import { Users, Sparkles, Check } from 'lucide-react';

interface TableFloorPlanSelectorProps {
  selectedTableId?: string;
  onSelectTable: (tableId: string) => void;
  guestCount: number;
}

export const TableFloorPlanSelector: React.FC<TableFloorPlanSelectorProps> = ({
  selectedTableId,
  onSelectTable,
  guestCount,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
          Visual Table & Seating Picker (Optional)
        </label>
        <span className="text-[11px] text-stone-400">
          Filter by party size: {guestCount} guests
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
        {RESTAURANT_TABLES.map((table) => {
          const isSelected = selectedTableId === table.id;
          const isCapacityMatch = table.seats >= guestCount;

          return (
            <button
              key={table.id}
              type="button"
              onClick={() => onSelectTable(table.id)}
              className={`p-3 rounded-xl border text-left transition-all flex items-start justify-between ${
                isSelected
                  ? 'border-[#E96A24] bg-[#E96A24]/10 shadow-xs'
                  : 'border-stone-200 hover:border-stone-300 bg-white'
              } ${!isCapacityMatch ? 'opacity-60' : ''}`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#171714] font-serif">
                    {table.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 font-mono">
                    {table.seats} Seats
                  </span>
                </div>
                <p className="text-[11px] text-[#77766F] mt-1 line-clamp-1">
                  {table.position}
                </p>
              </div>

              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border mt-0.5 ${
                isSelected ? 'bg-[#E96A24] border-[#E96A24] text-white' : 'border-stone-300'
              }`}>
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
