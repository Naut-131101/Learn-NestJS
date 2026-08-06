// function Frozen<T extends { new (...args: any[]): {} }>(constructors: T) {
//     Object.freeze(constructors.prototype);
//     console.log(`[Frozen] Applied to: ${constructors.name}`);
//     return constructors;
// }

// @Frozen
// class UserA {
//     constructor(public name: string) {}
//     hello() {
//         return `Hello ${this.name}`;
//     }
// }

// (globalThis as any).UserA = UserA;

// Decorator factory @Min(n)
function Min(minValue: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalSetter = descriptor.set;

    descriptor.set = function (value: number) {
      if (value < minValue) {
        throw new Error(
          `"${propertyKey}" must be at least ${minValue}, but the current value is ${value}.`
        );
      }

      if (originalSetter) {
        originalSetter.call(this, value);
      }
    };
  };
}

// ------ Dùng thử ------
class Product {
  private _price: number = 0;

  get price() {
    return this._price;
  }

  @Min(1000) // bắt buộc price >= 1000
  set price(v: number) {
    this._price = v;
  }
}

// --- Run demo ---
function main() {
  const p = new Product();

  p.price = 2000; // OK
  console.log("price =", p.price);

  try {
    p.price = 500; // sẽ lỗi
  } catch (err: any) {
    console.error("ValidationError!:", err.message);
  }
}

main();