type Closure<Parameters extends unknown[], ReturnType = unknown> = (
  ...parameters: Parameters
) => ReturnType
type ProcessSegment<Parameters extends unknown[], ReturnType = unknown> = {
  async: boolean
  closure: Closure<Parameters, ReturnType>
}
type ProcessSegments = {
  [key: string]: ProcessSegment<any[], any>
}

class ProcessHandler {
  protected __done: boolean
  get done(): boolean {
    return this.__done
  }

  protected readonly segments: ProcessSegments

  constructor(segments: ProcessSegments) {
    this.__done = false
    this.segments = segments
  }

  private async *generator(): AsyncGenerator<unknown, void> {
    for (const step of Object.keys(this.segments)) {
      const segment = this.segments[step]
      yield segment.async ? await segment.closure() : segment.closure()
    }
  }

  async next(): any {
    const result = await this.generator().next()
    if (result.done) this.__done = true
    return result.value
  }
}

class ProcessHandlerBuilder {
  protected step = 0
  protected segments: ProcessSegments = {}

  protected pass(): void {
    this.step += 1
  }

  sync<Parameters extends unknown[], ReturnType = unknown>(
    closure: Closure<Parameters, ReturnType>
  ): ProcessHandlerBuilder {
    this.segments[this.step] = {
      async: false,
      closure: closure
    }
    this.pass()
    return this
  }
  async<Parameters extends unknown[], ReturnType = unknown>(
    closure: Closure<Parameters, ReturnType>
  ): ProcessHandlerBuilder {
    this.segments[this.step] = {
      async: true,
      closure: closure
    }
    this.pass()
    return this
  }

  protected static build(builder: ProcessHandlerBuilder): ProcessHandler {
    return new ProcessHandler(builder.segments)
  }
}

export class Process extends ProcessHandlerBuilder {
  static simple<Parameters extends unknown[] = [], ReturnType = unknown>(
    closure: Closure<Parameters, ReturnType>
  ): ProcessHandler {
    const builder = new ProcessHandlerBuilder()
    builder.sync(closure)
    return this.build(builder)
  }
  static simpleAsync<Parameters extends unknown[] = [], ReturnType = unknown>(
    closure: Closure<Parameters, ReturnType>
  ): ProcessHandler {
    const builder = new ProcessHandlerBuilder()
    builder.async(closure)
    return this.build(builder)
  }

  static from(appliance: (builder: ProcessHandlerBuilder) => void): ProcessHandler {
    const builder = new ProcessHandlerBuilder()
    appliance(builder)
    return this.build(builder)
  }
}
