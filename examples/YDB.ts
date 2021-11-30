import { TypedData, Ydb, withTypeOptions, identityConversion } from 'ydb-sdk';
import Type = Ydb.Type;

export const typeMetadataKey = Symbol('type');

export function declareType(type: Ydb.IType) {
  return Reflect.metadata(typeMetadataKey, type);
}

