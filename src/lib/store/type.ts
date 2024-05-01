import fs from 'fs'
import { app } from 'electron'

export class LocalStore<Schema extends object> {
  protected readonly _name: string
  protected store: Schema
  public get name(): string {
    return this._name
  }

  constructor(name: string, defaultValue: Schema) {
    this._name = name
    this.store = defaultValue
  }

  public get<Type>(getter: (store: Schema) => Type): Type | undefined {
    try {
      return getter(this.store)
    } catch (e) {
      return undefined
    }
  }

  public edit(setter: (store: Schema) => void): void {
    setter(this.store)
  }

  get filepath(): string {
    return `${app.getPath('userData')}/${this.name}.json`
  }

  initialize(): void {
    if (fs.existsSync(this.filepath) === false)
      fs.writeFileSync(this.filepath, JSON.stringify(this.store))
    try {
      this.store = JSON.parse(fs.readFileSync(this.filepath, 'utf-8'))
    } catch (err) {
      // todo: do nothing?
    }
  }

  save(): void {
    fs.writeFileSync(this.filepath, JSON.stringify(this.store))
  }
}
