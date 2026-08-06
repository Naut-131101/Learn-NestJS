// function Frozen<T extends { new (...args: any[]): {} }>(constructors: T) {
//     Object.freeze(constructors.prototype);
//     console.log(`[Frozen] Applied to: ${constructors.name}`);
//     return constructors;
// }
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// @Frozen
// class UserA {
//     constructor(public name: string) {}
//     hello() {
//         return `Hello ${this.name}`;
//     }
// }
// (globalThis as any).UserA = UserA;
// Decorator factory @Min(n)
function Min(minValue) {
    return function (target, propertyKey, descriptor) {
        const originalSetter = descriptor.set;
        descriptor.set = function (value) {
            if (value < minValue) {
                throw new Error(`"${propertyKey}" must be at least ${minValue}, but the current value is ${value}.`);
            }
            if (originalSetter) {
                originalSetter.call(this, value);
            }
        };
    };
}
// ------ Dùng thử ------
class Product {
    _price = 0;
    get price() {
        return this._price;
    }
    set price(v) {
        this._price = v;
    }
}
__decorate([
    Min(1000) // bắt buộc price >= 1000
], Product.prototype, "price", null);
// --- Run demo ---
function main() {
    const p = new Product();
    p.price = 2000; // OK
    console.log("price =", p.price);
    try {
        p.price = 500; // sẽ lỗi
    }
    catch (err) {
        console.error("ValidationError!:", err.message);
    }
}
main();
export {};
