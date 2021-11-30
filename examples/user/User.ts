import "reflect-metadata";
import {addPropertyMetadata, PROPERTY_METADATA_KEY} from "./metadataDecorator";
import {addProperty, logData, logMethod, logParameter, logProperty} from "./decorators";

@logData("Hello world")
@addProperty<boolean>('isOld', true)
export class User {

  @logProperty("Property message")
  @addPropertyMetadata({
    name: 'FN Name',
    description: 'First name description',
  })
  public firstName: string;

  @addPropertyMetadata({
    name: 'LN Name',
    description: 'Last name description',
  })
  // @ts-ignore
  public lastName: string;


  constructor(firstName: string, lastName?: string) {
    this.firstName = firstName;
    if (lastName)     this.lastName = lastName;
  }

  @logMethod("Method message")
  // @logMethod("Method message 2")
  public getFullName(@logParameter("Parameter|||message") text: string): string {
    return `${this.firstName} ${this.lastName} ${text}`;
  }
}

console.log('\n\n->->-> new User \n');
// const user = new User('John', 'Doe');
const user = new User('John');

/*
console.log('\n\n->->-> getFullName \n');
// console.log(user.getFullName('!!!'));
user.getFullName('!!!');

console.log('\n\n->->-> [❔] Is old? \n');
console.log('[❔] Is old?', (user as User & { isOld: boolean }).isOld);

console.log('\n\n->->-> METADATA \n');
console.log(
  "METADATA",
  Reflect.getMetadata(PROPERTY_METADATA_KEY, user),
);


 */