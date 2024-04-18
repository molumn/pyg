import { hash } from './hash'

type ProcessClosure<Parameters extends any[]> = (...parameters: Parameters) => unknown
type SortedClosureMap<ProcessParameters extends any[]> = {
  alias: string
  closure: ProcessClosure<ProcessParameters>
}[]

class ProcessInstance<T = unknown, TReturn = any, TNext = unknown> {
  protected generatorFunction: Generator<T, TReturn, TNext>

  constructor(generatorFunction: Generator<T, TReturn, TNext>) {
    this.generatorFunction = generatorFunction
  }

  next(...args: [] | [TNext]): IteratorResult<T, TReturn> {
    return this.generatorFunction.next(...args)
  }
  return(value: TReturn): IteratorResult<T, TReturn> {
    return this.generatorFunction.return(value)
  }
  throw(e: any): IteratorResult<T, TReturn> {
    return this.generatorFunction.throw(e)
  }

  [Symbol.iterator](): Generator<T, TReturn, TNext> {
    return this.generatorFunction[Symbol.iterator]()
  }
}

class DeclaredProcess<ProcessParametersType extends any[]> {
  protected readonly sortedClosureMap: SortedClosureMap<ProcessParametersType>

  constructor(sortedClosureMap: SortedClosureMap<ProcessParametersType>) {
    this.sortedClosureMap = sortedClosureMap
  }

  protected *generator(..._parameters: ProcessParametersType): Generator {
    for (const each of this.sortedClosureMap) {
      yield each.closure(..._parameters)
    }
  }

  instance(...parameters: ProcessParametersType): ProcessInstance {
    return new ProcessInstance(this.generator(...parameters))
  }
}

class ProcessBuilder<ProcessParametersType extends any[]> {
  protected closureMap: SortedClosureMap<ProcessParametersType> = []

  segment(alias: string, closure: ProcessClosure<ProcessParametersType>): this {
    this.closureMap.push({
      alias,
      closure
    })
    return this
  }

  protected static build<ProcessParameters extends any[]>(
    builder: ProcessBuilder<ProcessParameters>
  ): DeclaredProcess<ProcessParameters> {
    return new DeclaredProcess(builder.closureMap)
  }
}

export class Process extends ProcessBuilder<any[]> {
  static simple = <ProcessParameters extends any[]>(
    closure: ProcessClosure<ProcessParameters>
  ): DeclaredProcess<ProcessParameters> => {
    const map: SortedClosureMap<ProcessParameters> = [
      {
        alias: hash(Math.random().toString(16)),
        closure
      }
    ]
    return new DeclaredProcess(map)
  }

  static complex = <ProcessParameters extends any[]>(
    appliance: (builder: ProcessBuilder<ProcessParameters>) => void
  ): DeclaredProcess<ProcessParameters> => {
    const builder = new ProcessBuilder()
    appliance(builder)

    return Process.build(builder)
  }
}
