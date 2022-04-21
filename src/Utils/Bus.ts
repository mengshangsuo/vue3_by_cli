/* eslint-disable @typescript-eslint/ban-types */
//  发布订阅者模式

type BusClass = {
  emit: (name: string) => void;

  on: (name: string, callback: Function) => void;
};

type ParmsKey = string | number | symbol;

type ListObj = {
  [key: ParmsKey]: Array<Function>;
};

class Bus implements BusClass {
  listObj: ListObj;
  constructor () {
    this.listObj = {};
  }

  emit (name: string, ...args: Array<any>) {
    const fns: Array<Function> = this.listObj[name];
    // 将派发过来的事件的对应的回调函数进行执行；
    fns.forEach((fn) => fn.apply(this, args));
  }

  on (name: string, callback: Function) {
    // 注册事件，将回调函数存储在对象的上，是个数组；
    const fns: Array<Function> = this.listObj[name] || [];
    // 存储
    fns.push(callback);
    // 赋值  更新
    this.listObj[name] = fns;
  }
}

export default new Bus();
