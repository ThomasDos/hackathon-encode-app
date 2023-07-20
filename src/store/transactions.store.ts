import { create } from 'zustand'

interface AppSettingsState {
  receipt: any
  vaa: any
  sequence: string
}

interface AppSettingsActions {
  setReceipt: (receipt: any) => void
  setVaa: (vaa: any) => void
  setSequence: (sequence: string) => void
  resetStore: () => void
}

const useTransactionsStore = create<AppSettingsState & AppSettingsActions>((set) => ({
  receipt: '',
  vaa: '',
  sequence: '',
  setReceipt: (receipt) => set((state) => ({ receipt })),
  setVaa: (vaa) => set((state) => ({ vaa })),
  setSequence: (sequence) => set((state) => ({ sequence })),
  resetStore: () => set((state) => ({ receipt: '', vaa: '', sequence: '' }))
}))

export default useTransactionsStore
