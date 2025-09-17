import { create } from 'zustand';

type DayMonthYear = {
  value: string;
  label: string;
};

type DatetimeState = {
  days: DayMonthYear[];
  months: DayMonthYear[];
  years: DayMonthYear[];
  fetchDatetime: () => Promise<void>;
};

export const useDatetimeStore = create<DatetimeState>((set) => ({
  days: [],
  months: [],
  years:[],
  fetchDatetime: async () => {
    try {
      const res = await fetch('http://localhost:3001/datetime');
      const data = await res.json();
      set({
        days: data.data.days,
        months: data.data.months,
        years: data.data.years,
      });
    } catch (error) {
      console.error('Failed to fetch datetime:', error);
    }
  },
}));
