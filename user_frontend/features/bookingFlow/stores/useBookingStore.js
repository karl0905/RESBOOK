import { create } from 'zustand'

export const useBookingStore = create((set) => ({
  // Initial state
  date: null,
  time: null,
  guestCount: null,
  comment: '',

  // Set date (converts Date to ISO string format)
  setDate: (date) => set(() => ({
    date: date.toISOString().split('T')[0]
  })),

  // Set time (ensures "HH:MM:SS" format)
  setTime: (time) => set(() => ({
    time: time.length === 5 ? `${time}:00` : time
  })),

  // Set guest count
  setGuestCount: (count) => set(() => ({
    guestCount: Math.max(1, Math.min(count, 10))
  })),

  // Set comment
  setComment: (comment) => set(() => ({
    comment: comment
  })),

  // Reset entire booking state
  resetBooking: () => set(() => ({
    date: null,
    time: null,
    guestCount: null,
    comment: ''
  }))
}));
