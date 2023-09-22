namespace App {
   export function AutoBind(
        // target: any,
        // MethodName: string,
        _: any,
        _2: string,
        descriptor: PropertyDescriptor
      ) {
        // unused parameters will give error either set noUnusedParameters :false
        // or name them with _ and _2
        const originalMethod = descriptor.value;
        const adjustedDescriptor = {
          enumerable: false,
          configurable: true,
          get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
          },
        };
        return adjustedDescriptor;
      }
}