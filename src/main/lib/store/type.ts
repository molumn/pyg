import fs from 'fs'
import { app } from 'electron'

export class LocalStore<Schema extends object> {
  private readonly _name: string
  private _store: Schema
  public get name(): string {
    return this._name
  }
  public get store(): Schema {
    return this._store
  }

  constructor(name: string, defaultValue: Schema) {
    this._name = name
    this._store = defaultValue
  }
  public get(key: string): unknown {
    return this._store[key]
  }

  get filepath(): string {
    return `${app.getPath('userData')}/${this.name}.json`
  }

  initialize(): void {
    if (fs.existsSync(this.filepath) === false)
      fs.writeFileSync(this.filepath, JSON.stringify(this._store))
    try {
      this._store = JSON.parse(fs.readFileSync(this.filepath, 'utf-8'))
    } catch (err) {
      // todo: do nothing?
    }
  }

  save(): void {
    fs.writeFileSync(this.filepath, JSON.stringify(this.store))
  }
}
