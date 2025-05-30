import { create } from "zustand";
import { getVerificationHistory, verifyUser } from "@/api/verification";
import { VerificationHistoryItem } from "@/api/verification";

interface VerificationState {
  isVerificationPending: boolean;
  verificationHistory: VerificationHistoryItem[];
  error: string | null;
  loading: boolean;
  fetchVerificationHistory: () => Promise<void>;
  submitVerification: () => Promise<void>;
  setVerificationPending: (status: boolean) => void;
}

export const useVerificationStore = create<VerificationState>()((set, get) => ({
  isVerificationPending: false,
  verificationHistory: [],
  error: null,
  loading: false,

  fetchVerificationHistory: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("token");
      const history = await getVerificationHistory(token || "");

      const hasPendingVerification = history.some(
        (item) => item.verified === null && item.verified_at === null
      );

      set({
        verificationHistory: history,
        isVerificationPending: hasPendingVerification,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: "Failed to fetch verification history",
        loading: false,
      });
    }
  },

  submitVerification: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("token");
      await verifyUser(token || "");
      set({
        isVerificationPending: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: "Failed to submit verification",
        loading: false,
      });
      throw error;
    }
  },

  setVerificationPending: (status: boolean) => {
    set({ isVerificationPending: status });
  },
}));
