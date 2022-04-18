//  发布订阅者模式

type BusClass = {
  emit: (name: string) => void

  on: (name: string, callback: Function) => void
}

type ParmsKey = string | number | symbol

type ListObj = {
  [key: ParmsKey]: Array<Function>
}

class Bus implements BusClass {
  list: ListObj
  constructor() {
    this.list = {}
  }

  emit(name: string, ...args: Array<any>) {
    let fns: Array<Function> = this.list[name]
    fns.forEach((fn) => fn.apply(this, args))
  }

  on(name: string, callback: Function) {
    let fns: Array<Function> = this.list[name] || []
    fns.push(callback)
    this.list[name] = fns
  }
}

export default new Bus()
