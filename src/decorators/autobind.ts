/* 
named exports you need to destructure with the same name export you import it ... import { name of the export } from 'path' 
default exports is anyname you choose will be refered to that export you import ... as import anyNameWillReferToIt from 'path' 
import * as nameOfObj can be used as a namedObj to access the named exports as properties

*/
export default function AutoBind(
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
