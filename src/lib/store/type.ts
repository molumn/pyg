import fs from 'fs'
import { app } from 'electron'

export class LocalStore<Schema extends object> {
  protected readonly _name: string
  protected readonly _category: string
  protected store: Schema
  public get name(): string {
    return this._name
  }
  public get category(): string {
    return this._category
  }

  constructor(category: string, name: string, defaultValue: Schema) {
    this._category = category
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
    return `${app.getPath('userData')}/${this.category}/${this.name}.json`
  }
  get parentDir(): string {
    return `${app.getPath('userData')}/${this.category}`
  }

  initialize(): void {
    if (fs.existsSync(this.filepath) === false) {
      fs.mkdirSync(this.parentDir)
      fs.writeFileSync(this.filepath, JSON.stringify(this.store), { encoding: 'utf-8', flag: 'w' })
    }
    try {
      this.store = JSON.parse(fs.readFileSync(this.filepath, 'utf-8'))
    } catch (err) {
      // todo: do nothing?
      console.log('Store Initialization: json parse error')
    }
  }

  save(): void {
    fs.writeFileSync(this.filepath, JSON.stringify(this.store))
  }
}
