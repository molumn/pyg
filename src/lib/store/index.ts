import { WorkspaceStore } from './workspace'

const localStores = {
  workspaceStore: new WorkspaceStore()
}

function initializeAllStores(): void {
  for (const key in localStores) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    localStores[key].initialize()
  }
}

function saveAllStores(): void {
  for (const key in localStores) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    localStores[key].save()
  }
}

const store = {
  localStores,
  init: initializeAllStores,
  save: saveAllStores
}

export default store
