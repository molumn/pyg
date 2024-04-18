import { WorkspaceStore } from './workspace'

const localStores = {
  workspaceStore: new WorkspaceStore()
}
export default localStores

export function initializeAllStores(): void {
  for (const key in localStores) {
    localStores[key].initialize()
  }
}

export function saveAllStores(): void {
  for (const key in localStores) {
    localStores[key].save()
  }
}
