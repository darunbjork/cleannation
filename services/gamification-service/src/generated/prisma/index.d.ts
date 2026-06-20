
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model UserStats
 * 
 */
export type UserStats = $Result.DefaultSelection<Prisma.$UserStatsPayload>
/**
 * Model PointsTransaction
 * 
 */
export type PointsTransaction = $Result.DefaultSelection<Prisma.$PointsTransactionPayload>
/**
 * Model Badge
 * 
 */
export type Badge = $Result.DefaultSelection<Prisma.$BadgePayload>
/**
 * Model UserBadge
 * 
 */
export type UserBadge = $Result.DefaultSelection<Prisma.$UserBadgePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PointsReason: {
  EVENT_COMPLETED: 'EVENT_COMPLETED',
  MEDIA_VERIFIED: 'MEDIA_VERIFIED',
  BADGE_BONUS: 'BADGE_BONUS',
  STREAK_BONUS: 'STREAK_BONUS',
  REFERRAL_BONUS: 'REFERRAL_BONUS',
  ADMIN_ADJUSTMENT: 'ADMIN_ADJUSTMENT'
};

export type PointsReason = (typeof PointsReason)[keyof typeof PointsReason]


export const BadgeCategory: {
  FIRST_CLEANUP: 'FIRST_CLEANUP',
  EVENTS_10: 'EVENTS_10',
  EVENTS_50: 'EVENTS_50',
  EVENTS_100: 'EVENTS_100',
  STREAK_7DAY: 'STREAK_7DAY',
  STREAK_30DAY: 'STREAK_30DAY',
  REGION_CHAMPION: 'REGION_CHAMPION',
  NATIONAL_CHAMPION: 'NATIONAL_CHAMPION',
  TON_COLLECTED: 'TON_COLLECTED',
  ORGANIZER_100: 'ORGANIZER_100'
};

export type BadgeCategory = (typeof BadgeCategory)[keyof typeof BadgeCategory]


export const BadgeRarity: {
  COMMON: 'COMMON',
  RARE: 'RARE',
  EPIC: 'EPIC',
  LEGENDARY: 'LEGENDARY'
};

export type BadgeRarity = (typeof BadgeRarity)[keyof typeof BadgeRarity]

}

export type PointsReason = $Enums.PointsReason

export const PointsReason: typeof $Enums.PointsReason

export type BadgeCategory = $Enums.BadgeCategory

export const BadgeCategory: typeof $Enums.BadgeCategory

export type BadgeRarity = $Enums.BadgeRarity

export const BadgeRarity: typeof $Enums.BadgeRarity

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more UserStats
 * const userStats = await prisma.userStats.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more UserStats
   * const userStats = await prisma.userStats.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.userStats`: Exposes CRUD operations for the **UserStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserStats
    * const userStats = await prisma.userStats.findMany()
    * ```
    */
  get userStats(): Prisma.UserStatsDelegate<ExtArgs>;

  /**
   * `prisma.pointsTransaction`: Exposes CRUD operations for the **PointsTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PointsTransactions
    * const pointsTransactions = await prisma.pointsTransaction.findMany()
    * ```
    */
  get pointsTransaction(): Prisma.PointsTransactionDelegate<ExtArgs>;

  /**
   * `prisma.badge`: Exposes CRUD operations for the **Badge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Badges
    * const badges = await prisma.badge.findMany()
    * ```
    */
  get badge(): Prisma.BadgeDelegate<ExtArgs>;

  /**
   * `prisma.userBadge`: Exposes CRUD operations for the **UserBadge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserBadges
    * const userBadges = await prisma.userBadge.findMany()
    * ```
    */
  get userBadge(): Prisma.UserBadgeDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    UserStats: 'UserStats',
    PointsTransaction: 'PointsTransaction',
    Badge: 'Badge',
    UserBadge: 'UserBadge'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "userStats" | "pointsTransaction" | "badge" | "userBadge"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      UserStats: {
        payload: Prisma.$UserStatsPayload<ExtArgs>
        fields: Prisma.UserStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          findFirst: {
            args: Prisma.UserStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          findMany: {
            args: Prisma.UserStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>[]
          }
          create: {
            args: Prisma.UserStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          createMany: {
            args: Prisma.UserStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>[]
          }
          delete: {
            args: Prisma.UserStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          update: {
            args: Prisma.UserStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          deleteMany: {
            args: Prisma.UserStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          aggregate: {
            args: Prisma.UserStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserStats>
          }
          groupBy: {
            args: Prisma.UserStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserStatsCountArgs<ExtArgs>
            result: $Utils.Optional<UserStatsCountAggregateOutputType> | number
          }
        }
      }
      PointsTransaction: {
        payload: Prisma.$PointsTransactionPayload<ExtArgs>
        fields: Prisma.PointsTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PointsTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointsTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PointsTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointsTransactionPayload>
          }
          findFirst: {
            args: Prisma.PointsTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointsTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PointsTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointsTransactionPayload>
          }
          findMany: {
            args: Prisma.PointsTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointsTransactionPayload>[]
          }
          create: {
            args: Prisma.PointsTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointsTransactionPayload>
          }
          createMany: {
            args: Prisma.PointsTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PointsTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointsTransactionPayload>[]
          }
          delete: {
            args: Prisma.PointsTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointsTransactionPayload>
          }
          update: {
            args: Prisma.PointsTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointsTransactionPayload>
          }
          deleteMany: {
            args: Prisma.PointsTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PointsTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PointsTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointsTransactionPayload>
          }
          aggregate: {
            args: Prisma.PointsTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePointsTransaction>
          }
          groupBy: {
            args: Prisma.PointsTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PointsTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PointsTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<PointsTransactionCountAggregateOutputType> | number
          }
        }
      }
      Badge: {
        payload: Prisma.$BadgePayload<ExtArgs>
        fields: Prisma.BadgeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BadgeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BadgeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          findFirst: {
            args: Prisma.BadgeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BadgeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          findMany: {
            args: Prisma.BadgeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>[]
          }
          create: {
            args: Prisma.BadgeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          createMany: {
            args: Prisma.BadgeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BadgeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>[]
          }
          delete: {
            args: Prisma.BadgeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          update: {
            args: Prisma.BadgeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          deleteMany: {
            args: Prisma.BadgeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BadgeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BadgeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgePayload>
          }
          aggregate: {
            args: Prisma.BadgeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBadge>
          }
          groupBy: {
            args: Prisma.BadgeGroupByArgs<ExtArgs>
            result: $Utils.Optional<BadgeGroupByOutputType>[]
          }
          count: {
            args: Prisma.BadgeCountArgs<ExtArgs>
            result: $Utils.Optional<BadgeCountAggregateOutputType> | number
          }
        }
      }
      UserBadge: {
        payload: Prisma.$UserBadgePayload<ExtArgs>
        fields: Prisma.UserBadgeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserBadgeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBadgePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserBadgeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBadgePayload>
          }
          findFirst: {
            args: Prisma.UserBadgeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBadgePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserBadgeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBadgePayload>
          }
          findMany: {
            args: Prisma.UserBadgeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBadgePayload>[]
          }
          create: {
            args: Prisma.UserBadgeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBadgePayload>
          }
          createMany: {
            args: Prisma.UserBadgeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserBadgeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBadgePayload>[]
          }
          delete: {
            args: Prisma.UserBadgeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBadgePayload>
          }
          update: {
            args: Prisma.UserBadgeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBadgePayload>
          }
          deleteMany: {
            args: Prisma.UserBadgeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserBadgeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserBadgeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBadgePayload>
          }
          aggregate: {
            args: Prisma.UserBadgeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserBadge>
          }
          groupBy: {
            args: Prisma.UserBadgeGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserBadgeGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserBadgeCountArgs<ExtArgs>
            result: $Utils.Optional<UserBadgeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserStatsCountOutputType
   */

  export type UserStatsCountOutputType = {
    pointsHistory: number
    badges: number
  }

  export type UserStatsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pointsHistory?: boolean | UserStatsCountOutputTypeCountPointsHistoryArgs
    badges?: boolean | UserStatsCountOutputTypeCountBadgesArgs
  }

  // Custom InputTypes
  /**
   * UserStatsCountOutputType without action
   */
  export type UserStatsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStatsCountOutputType
     */
    select?: UserStatsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserStatsCountOutputType without action
   */
  export type UserStatsCountOutputTypeCountPointsHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PointsTransactionWhereInput
  }

  /**
   * UserStatsCountOutputType without action
   */
  export type UserStatsCountOutputTypeCountBadgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserBadgeWhereInput
  }


  /**
   * Count Type BadgeCountOutputType
   */

  export type BadgeCountOutputType = {
    userBadges: number
  }

  export type BadgeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userBadges?: boolean | BadgeCountOutputTypeCountUserBadgesArgs
  }

  // Custom InputTypes
  /**
   * BadgeCountOutputType without action
   */
  export type BadgeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeCountOutputType
     */
    select?: BadgeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BadgeCountOutputType without action
   */
  export type BadgeCountOutputTypeCountUserBadgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserBadgeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model UserStats
   */

  export type AggregateUserStats = {
    _count: UserStatsCountAggregateOutputType | null
    _avg: UserStatsAvgAggregateOutputType | null
    _sum: UserStatsSumAggregateOutputType | null
    _min: UserStatsMinAggregateOutputType | null
    _max: UserStatsMaxAggregateOutputType | null
  }

  export type UserStatsAvgAggregateOutputType = {
    totalPoints: number | null
    eventsJoined: number | null
    eventsCompleted: number | null
    currentStreakDays: number | null
    longestStreakDays: number | null
    kgWasteEstimated: number | null
  }

  export type UserStatsSumAggregateOutputType = {
    totalPoints: number | null
    eventsJoined: number | null
    eventsCompleted: number | null
    currentStreakDays: number | null
    longestStreakDays: number | null
    kgWasteEstimated: number | null
  }

  export type UserStatsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    totalPoints: number | null
    eventsJoined: number | null
    eventsCompleted: number | null
    currentStreakDays: number | null
    longestStreakDays: number | null
    lastEventAt: Date | null
    kgWasteEstimated: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserStatsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    totalPoints: number | null
    eventsJoined: number | null
    eventsCompleted: number | null
    currentStreakDays: number | null
    longestStreakDays: number | null
    lastEventAt: Date | null
    kgWasteEstimated: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserStatsCountAggregateOutputType = {
    id: number
    userId: number
    totalPoints: number
    eventsJoined: number
    eventsCompleted: number
    currentStreakDays: number
    longestStreakDays: number
    lastEventAt: number
    kgWasteEstimated: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserStatsAvgAggregateInputType = {
    totalPoints?: true
    eventsJoined?: true
    eventsCompleted?: true
    currentStreakDays?: true
    longestStreakDays?: true
    kgWasteEstimated?: true
  }

  export type UserStatsSumAggregateInputType = {
    totalPoints?: true
    eventsJoined?: true
    eventsCompleted?: true
    currentStreakDays?: true
    longestStreakDays?: true
    kgWasteEstimated?: true
  }

  export type UserStatsMinAggregateInputType = {
    id?: true
    userId?: true
    totalPoints?: true
    eventsJoined?: true
    eventsCompleted?: true
    currentStreakDays?: true
    longestStreakDays?: true
    lastEventAt?: true
    kgWasteEstimated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserStatsMaxAggregateInputType = {
    id?: true
    userId?: true
    totalPoints?: true
    eventsJoined?: true
    eventsCompleted?: true
    currentStreakDays?: true
    longestStreakDays?: true
    lastEventAt?: true
    kgWasteEstimated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserStatsCountAggregateInputType = {
    id?: true
    userId?: true
    totalPoints?: true
    eventsJoined?: true
    eventsCompleted?: true
    currentStreakDays?: true
    longestStreakDays?: true
    lastEventAt?: true
    kgWasteEstimated?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserStats to aggregate.
     */
    where?: UserStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStats to fetch.
     */
    orderBy?: UserStatsOrderByWithRelationInput | UserStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserStats
    **/
    _count?: true | UserStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserStatsMaxAggregateInputType
  }

  export type GetUserStatsAggregateType<T extends UserStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateUserStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserStats[P]>
      : GetScalarType<T[P], AggregateUserStats[P]>
  }




  export type UserStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserStatsWhereInput
    orderBy?: UserStatsOrderByWithAggregationInput | UserStatsOrderByWithAggregationInput[]
    by: UserStatsScalarFieldEnum[] | UserStatsScalarFieldEnum
    having?: UserStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserStatsCountAggregateInputType | true
    _avg?: UserStatsAvgAggregateInputType
    _sum?: UserStatsSumAggregateInputType
    _min?: UserStatsMinAggregateInputType
    _max?: UserStatsMaxAggregateInputType
  }

  export type UserStatsGroupByOutputType = {
    id: string
    userId: string
    totalPoints: number
    eventsJoined: number
    eventsCompleted: number
    currentStreakDays: number
    longestStreakDays: number
    lastEventAt: Date | null
    kgWasteEstimated: number
    createdAt: Date
    updatedAt: Date
    _count: UserStatsCountAggregateOutputType | null
    _avg: UserStatsAvgAggregateOutputType | null
    _sum: UserStatsSumAggregateOutputType | null
    _min: UserStatsMinAggregateOutputType | null
    _max: UserStatsMaxAggregateOutputType | null
  }

  type GetUserStatsGroupByPayload<T extends UserStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserStatsGroupByOutputType[P]>
            : GetScalarType<T[P], UserStatsGroupByOutputType[P]>
        }
      >
    >


  export type UserStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    totalPoints?: boolean
    eventsJoined?: boolean
    eventsCompleted?: boolean
    currentStreakDays?: boolean
    longestStreakDays?: boolean
    lastEventAt?: boolean
    kgWasteEstimated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pointsHistory?: boolean | UserStats$pointsHistoryArgs<ExtArgs>
    badges?: boolean | UserStats$badgesArgs<ExtArgs>
    _count?: boolean | UserStatsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userStats"]>

  export type UserStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    totalPoints?: boolean
    eventsJoined?: boolean
    eventsCompleted?: boolean
    currentStreakDays?: boolean
    longestStreakDays?: boolean
    lastEventAt?: boolean
    kgWasteEstimated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userStats"]>

  export type UserStatsSelectScalar = {
    id?: boolean
    userId?: boolean
    totalPoints?: boolean
    eventsJoined?: boolean
    eventsCompleted?: boolean
    currentStreakDays?: boolean
    longestStreakDays?: boolean
    lastEventAt?: boolean
    kgWasteEstimated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pointsHistory?: boolean | UserStats$pointsHistoryArgs<ExtArgs>
    badges?: boolean | UserStats$badgesArgs<ExtArgs>
    _count?: boolean | UserStatsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserStats"
    objects: {
      pointsHistory: Prisma.$PointsTransactionPayload<ExtArgs>[]
      badges: Prisma.$UserBadgePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      totalPoints: number
      eventsJoined: number
      eventsCompleted: number
      currentStreakDays: number
      longestStreakDays: number
      lastEventAt: Date | null
      kgWasteEstimated: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userStats"]>
    composites: {}
  }

  type UserStatsGetPayload<S extends boolean | null | undefined | UserStatsDefaultArgs> = $Result.GetResult<Prisma.$UserStatsPayload, S>

  type UserStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserStatsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserStatsCountAggregateInputType | true
    }

  export interface UserStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserStats'], meta: { name: 'UserStats' } }
    /**
     * Find zero or one UserStats that matches the filter.
     * @param {UserStatsFindUniqueArgs} args - Arguments to find a UserStats
     * @example
     * // Get one UserStats
     * const userStats = await prisma.userStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserStatsFindUniqueArgs>(args: SelectSubset<T, UserStatsFindUniqueArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UserStats that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserStatsFindUniqueOrThrowArgs} args - Arguments to find a UserStats
     * @example
     * // Get one UserStats
     * const userStats = await prisma.userStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, UserStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UserStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsFindFirstArgs} args - Arguments to find a UserStats
     * @example
     * // Get one UserStats
     * const userStats = await prisma.userStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserStatsFindFirstArgs>(args?: SelectSubset<T, UserStatsFindFirstArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UserStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsFindFirstOrThrowArgs} args - Arguments to find a UserStats
     * @example
     * // Get one UserStats
     * const userStats = await prisma.userStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, UserStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UserStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserStats
     * const userStats = await prisma.userStats.findMany()
     * 
     * // Get first 10 UserStats
     * const userStats = await prisma.userStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userStatsWithIdOnly = await prisma.userStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserStatsFindManyArgs>(args?: SelectSubset<T, UserStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UserStats.
     * @param {UserStatsCreateArgs} args - Arguments to create a UserStats.
     * @example
     * // Create one UserStats
     * const UserStats = await prisma.userStats.create({
     *   data: {
     *     // ... data to create a UserStats
     *   }
     * })
     * 
     */
    create<T extends UserStatsCreateArgs>(args: SelectSubset<T, UserStatsCreateArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UserStats.
     * @param {UserStatsCreateManyArgs} args - Arguments to create many UserStats.
     * @example
     * // Create many UserStats
     * const userStats = await prisma.userStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserStatsCreateManyArgs>(args?: SelectSubset<T, UserStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserStats and returns the data saved in the database.
     * @param {UserStatsCreateManyAndReturnArgs} args - Arguments to create many UserStats.
     * @example
     * // Create many UserStats
     * const userStats = await prisma.userStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserStats and only return the `id`
     * const userStatsWithIdOnly = await prisma.userStats.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, UserStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a UserStats.
     * @param {UserStatsDeleteArgs} args - Arguments to delete one UserStats.
     * @example
     * // Delete one UserStats
     * const UserStats = await prisma.userStats.delete({
     *   where: {
     *     // ... filter to delete one UserStats
     *   }
     * })
     * 
     */
    delete<T extends UserStatsDeleteArgs>(args: SelectSubset<T, UserStatsDeleteArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UserStats.
     * @param {UserStatsUpdateArgs} args - Arguments to update one UserStats.
     * @example
     * // Update one UserStats
     * const userStats = await prisma.userStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserStatsUpdateArgs>(args: SelectSubset<T, UserStatsUpdateArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UserStats.
     * @param {UserStatsDeleteManyArgs} args - Arguments to filter UserStats to delete.
     * @example
     * // Delete a few UserStats
     * const { count } = await prisma.userStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserStatsDeleteManyArgs>(args?: SelectSubset<T, UserStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserStats
     * const userStats = await prisma.userStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserStatsUpdateManyArgs>(args: SelectSubset<T, UserStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserStats.
     * @param {UserStatsUpsertArgs} args - Arguments to update or create a UserStats.
     * @example
     * // Update or create a UserStats
     * const userStats = await prisma.userStats.upsert({
     *   create: {
     *     // ... data to create a UserStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserStats we want to update
     *   }
     * })
     */
    upsert<T extends UserStatsUpsertArgs>(args: SelectSubset<T, UserStatsUpsertArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UserStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsCountArgs} args - Arguments to filter UserStats to count.
     * @example
     * // Count the number of UserStats
     * const count = await prisma.userStats.count({
     *   where: {
     *     // ... the filter for the UserStats we want to count
     *   }
     * })
    **/
    count<T extends UserStatsCountArgs>(
      args?: Subset<T, UserStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserStatsAggregateArgs>(args: Subset<T, UserStatsAggregateArgs>): Prisma.PrismaPromise<GetUserStatsAggregateType<T>>

    /**
     * Group by UserStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserStatsGroupByArgs['orderBy'] }
        : { orderBy?: UserStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserStats model
   */
  readonly fields: UserStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pointsHistory<T extends UserStats$pointsHistoryArgs<ExtArgs> = {}>(args?: Subset<T, UserStats$pointsHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "findMany"> | Null>
    badges<T extends UserStats$badgesArgs<ExtArgs> = {}>(args?: Subset<T, UserStats$badgesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserStats model
   */ 
  interface UserStatsFieldRefs {
    readonly id: FieldRef<"UserStats", 'String'>
    readonly userId: FieldRef<"UserStats", 'String'>
    readonly totalPoints: FieldRef<"UserStats", 'Int'>
    readonly eventsJoined: FieldRef<"UserStats", 'Int'>
    readonly eventsCompleted: FieldRef<"UserStats", 'Int'>
    readonly currentStreakDays: FieldRef<"UserStats", 'Int'>
    readonly longestStreakDays: FieldRef<"UserStats", 'Int'>
    readonly lastEventAt: FieldRef<"UserStats", 'DateTime'>
    readonly kgWasteEstimated: FieldRef<"UserStats", 'Float'>
    readonly createdAt: FieldRef<"UserStats", 'DateTime'>
    readonly updatedAt: FieldRef<"UserStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserStats findUnique
   */
  export type UserStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where: UserStatsWhereUniqueInput
  }

  /**
   * UserStats findUniqueOrThrow
   */
  export type UserStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where: UserStatsWhereUniqueInput
  }

  /**
   * UserStats findFirst
   */
  export type UserStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where?: UserStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStats to fetch.
     */
    orderBy?: UserStatsOrderByWithRelationInput | UserStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserStats.
     */
    cursor?: UserStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserStats.
     */
    distinct?: UserStatsScalarFieldEnum | UserStatsScalarFieldEnum[]
  }

  /**
   * UserStats findFirstOrThrow
   */
  export type UserStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where?: UserStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStats to fetch.
     */
    orderBy?: UserStatsOrderByWithRelationInput | UserStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserStats.
     */
    cursor?: UserStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserStats.
     */
    distinct?: UserStatsScalarFieldEnum | UserStatsScalarFieldEnum[]
  }

  /**
   * UserStats findMany
   */
  export type UserStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where?: UserStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStats to fetch.
     */
    orderBy?: UserStatsOrderByWithRelationInput | UserStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserStats.
     */
    cursor?: UserStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStats.
     */
    skip?: number
    distinct?: UserStatsScalarFieldEnum | UserStatsScalarFieldEnum[]
  }

  /**
   * UserStats create
   */
  export type UserStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a UserStats.
     */
    data: XOR<UserStatsCreateInput, UserStatsUncheckedCreateInput>
  }

  /**
   * UserStats createMany
   */
  export type UserStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserStats.
     */
    data: UserStatsCreateManyInput | UserStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserStats createManyAndReturn
   */
  export type UserStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many UserStats.
     */
    data: UserStatsCreateManyInput | UserStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserStats update
   */
  export type UserStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a UserStats.
     */
    data: XOR<UserStatsUpdateInput, UserStatsUncheckedUpdateInput>
    /**
     * Choose, which UserStats to update.
     */
    where: UserStatsWhereUniqueInput
  }

  /**
   * UserStats updateMany
   */
  export type UserStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserStats.
     */
    data: XOR<UserStatsUpdateManyMutationInput, UserStatsUncheckedUpdateManyInput>
    /**
     * Filter which UserStats to update
     */
    where?: UserStatsWhereInput
  }

  /**
   * UserStats upsert
   */
  export type UserStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the UserStats to update in case it exists.
     */
    where: UserStatsWhereUniqueInput
    /**
     * In case the UserStats found by the `where` argument doesn't exist, create a new UserStats with this data.
     */
    create: XOR<UserStatsCreateInput, UserStatsUncheckedCreateInput>
    /**
     * In case the UserStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserStatsUpdateInput, UserStatsUncheckedUpdateInput>
  }

  /**
   * UserStats delete
   */
  export type UserStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter which UserStats to delete.
     */
    where: UserStatsWhereUniqueInput
  }

  /**
   * UserStats deleteMany
   */
  export type UserStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserStats to delete
     */
    where?: UserStatsWhereInput
  }

  /**
   * UserStats.pointsHistory
   */
  export type UserStats$pointsHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointsTransaction
     */
    select?: PointsTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointsTransactionInclude<ExtArgs> | null
    where?: PointsTransactionWhereInput
    orderBy?: PointsTransactionOrderByWithRelationInput | PointsTransactionOrderByWithRelationInput[]
    cursor?: PointsTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PointsTransactionScalarFieldEnum | PointsTransactionScalarFieldEnum[]
  }

  /**
   * UserStats.badges
   */
  export type UserStats$badgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    where?: UserBadgeWhereInput
    orderBy?: UserBadgeOrderByWithRelationInput | UserBadgeOrderByWithRelationInput[]
    cursor?: UserBadgeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserBadgeScalarFieldEnum | UserBadgeScalarFieldEnum[]
  }

  /**
   * UserStats without action
   */
  export type UserStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
  }


  /**
   * Model PointsTransaction
   */

  export type AggregatePointsTransaction = {
    _count: PointsTransactionCountAggregateOutputType | null
    _avg: PointsTransactionAvgAggregateOutputType | null
    _sum: PointsTransactionSumAggregateOutputType | null
    _min: PointsTransactionMinAggregateOutputType | null
    _max: PointsTransactionMaxAggregateOutputType | null
  }

  export type PointsTransactionAvgAggregateOutputType = {
    points: number | null
    balanceAfter: number | null
  }

  export type PointsTransactionSumAggregateOutputType = {
    points: number | null
    balanceAfter: number | null
  }

  export type PointsTransactionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    points: number | null
    reason: $Enums.PointsReason | null
    eventId: string | null
    mediaId: string | null
    balanceAfter: number | null
    createdAt: Date | null
  }

  export type PointsTransactionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    points: number | null
    reason: $Enums.PointsReason | null
    eventId: string | null
    mediaId: string | null
    balanceAfter: number | null
    createdAt: Date | null
  }

  export type PointsTransactionCountAggregateOutputType = {
    id: number
    userId: number
    points: number
    reason: number
    eventId: number
    mediaId: number
    balanceAfter: number
    createdAt: number
    _all: number
  }


  export type PointsTransactionAvgAggregateInputType = {
    points?: true
    balanceAfter?: true
  }

  export type PointsTransactionSumAggregateInputType = {
    points?: true
    balanceAfter?: true
  }

  export type PointsTransactionMinAggregateInputType = {
    id?: true
    userId?: true
    points?: true
    reason?: true
    eventId?: true
    mediaId?: true
    balanceAfter?: true
    createdAt?: true
  }

  export type PointsTransactionMaxAggregateInputType = {
    id?: true
    userId?: true
    points?: true
    reason?: true
    eventId?: true
    mediaId?: true
    balanceAfter?: true
    createdAt?: true
  }

  export type PointsTransactionCountAggregateInputType = {
    id?: true
    userId?: true
    points?: true
    reason?: true
    eventId?: true
    mediaId?: true
    balanceAfter?: true
    createdAt?: true
    _all?: true
  }

  export type PointsTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PointsTransaction to aggregate.
     */
    where?: PointsTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointsTransactions to fetch.
     */
    orderBy?: PointsTransactionOrderByWithRelationInput | PointsTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PointsTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointsTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointsTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PointsTransactions
    **/
    _count?: true | PointsTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PointsTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PointsTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PointsTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PointsTransactionMaxAggregateInputType
  }

  export type GetPointsTransactionAggregateType<T extends PointsTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregatePointsTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePointsTransaction[P]>
      : GetScalarType<T[P], AggregatePointsTransaction[P]>
  }




  export type PointsTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PointsTransactionWhereInput
    orderBy?: PointsTransactionOrderByWithAggregationInput | PointsTransactionOrderByWithAggregationInput[]
    by: PointsTransactionScalarFieldEnum[] | PointsTransactionScalarFieldEnum
    having?: PointsTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PointsTransactionCountAggregateInputType | true
    _avg?: PointsTransactionAvgAggregateInputType
    _sum?: PointsTransactionSumAggregateInputType
    _min?: PointsTransactionMinAggregateInputType
    _max?: PointsTransactionMaxAggregateInputType
  }

  export type PointsTransactionGroupByOutputType = {
    id: string
    userId: string
    points: number
    reason: $Enums.PointsReason
    eventId: string | null
    mediaId: string | null
    balanceAfter: number
    createdAt: Date
    _count: PointsTransactionCountAggregateOutputType | null
    _avg: PointsTransactionAvgAggregateOutputType | null
    _sum: PointsTransactionSumAggregateOutputType | null
    _min: PointsTransactionMinAggregateOutputType | null
    _max: PointsTransactionMaxAggregateOutputType | null
  }

  type GetPointsTransactionGroupByPayload<T extends PointsTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PointsTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PointsTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PointsTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], PointsTransactionGroupByOutputType[P]>
        }
      >
    >


  export type PointsTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    points?: boolean
    reason?: boolean
    eventId?: boolean
    mediaId?: boolean
    balanceAfter?: boolean
    createdAt?: boolean
    stats?: boolean | UserStatsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pointsTransaction"]>

  export type PointsTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    points?: boolean
    reason?: boolean
    eventId?: boolean
    mediaId?: boolean
    balanceAfter?: boolean
    createdAt?: boolean
    stats?: boolean | UserStatsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pointsTransaction"]>

  export type PointsTransactionSelectScalar = {
    id?: boolean
    userId?: boolean
    points?: boolean
    reason?: boolean
    eventId?: boolean
    mediaId?: boolean
    balanceAfter?: boolean
    createdAt?: boolean
  }

  export type PointsTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stats?: boolean | UserStatsDefaultArgs<ExtArgs>
  }
  export type PointsTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stats?: boolean | UserStatsDefaultArgs<ExtArgs>
  }

  export type $PointsTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PointsTransaction"
    objects: {
      stats: Prisma.$UserStatsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      points: number
      reason: $Enums.PointsReason
      eventId: string | null
      mediaId: string | null
      balanceAfter: number
      createdAt: Date
    }, ExtArgs["result"]["pointsTransaction"]>
    composites: {}
  }

  type PointsTransactionGetPayload<S extends boolean | null | undefined | PointsTransactionDefaultArgs> = $Result.GetResult<Prisma.$PointsTransactionPayload, S>

  type PointsTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PointsTransactionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PointsTransactionCountAggregateInputType | true
    }

  export interface PointsTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PointsTransaction'], meta: { name: 'PointsTransaction' } }
    /**
     * Find zero or one PointsTransaction that matches the filter.
     * @param {PointsTransactionFindUniqueArgs} args - Arguments to find a PointsTransaction
     * @example
     * // Get one PointsTransaction
     * const pointsTransaction = await prisma.pointsTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PointsTransactionFindUniqueArgs>(args: SelectSubset<T, PointsTransactionFindUniqueArgs<ExtArgs>>): Prisma__PointsTransactionClient<$Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PointsTransaction that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PointsTransactionFindUniqueOrThrowArgs} args - Arguments to find a PointsTransaction
     * @example
     * // Get one PointsTransaction
     * const pointsTransaction = await prisma.pointsTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PointsTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, PointsTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PointsTransactionClient<$Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PointsTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsTransactionFindFirstArgs} args - Arguments to find a PointsTransaction
     * @example
     * // Get one PointsTransaction
     * const pointsTransaction = await prisma.pointsTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PointsTransactionFindFirstArgs>(args?: SelectSubset<T, PointsTransactionFindFirstArgs<ExtArgs>>): Prisma__PointsTransactionClient<$Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PointsTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsTransactionFindFirstOrThrowArgs} args - Arguments to find a PointsTransaction
     * @example
     * // Get one PointsTransaction
     * const pointsTransaction = await prisma.pointsTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PointsTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, PointsTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PointsTransactionClient<$Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PointsTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PointsTransactions
     * const pointsTransactions = await prisma.pointsTransaction.findMany()
     * 
     * // Get first 10 PointsTransactions
     * const pointsTransactions = await prisma.pointsTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pointsTransactionWithIdOnly = await prisma.pointsTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PointsTransactionFindManyArgs>(args?: SelectSubset<T, PointsTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PointsTransaction.
     * @param {PointsTransactionCreateArgs} args - Arguments to create a PointsTransaction.
     * @example
     * // Create one PointsTransaction
     * const PointsTransaction = await prisma.pointsTransaction.create({
     *   data: {
     *     // ... data to create a PointsTransaction
     *   }
     * })
     * 
     */
    create<T extends PointsTransactionCreateArgs>(args: SelectSubset<T, PointsTransactionCreateArgs<ExtArgs>>): Prisma__PointsTransactionClient<$Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PointsTransactions.
     * @param {PointsTransactionCreateManyArgs} args - Arguments to create many PointsTransactions.
     * @example
     * // Create many PointsTransactions
     * const pointsTransaction = await prisma.pointsTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PointsTransactionCreateManyArgs>(args?: SelectSubset<T, PointsTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PointsTransactions and returns the data saved in the database.
     * @param {PointsTransactionCreateManyAndReturnArgs} args - Arguments to create many PointsTransactions.
     * @example
     * // Create many PointsTransactions
     * const pointsTransaction = await prisma.pointsTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PointsTransactions and only return the `id`
     * const pointsTransactionWithIdOnly = await prisma.pointsTransaction.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PointsTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, PointsTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PointsTransaction.
     * @param {PointsTransactionDeleteArgs} args - Arguments to delete one PointsTransaction.
     * @example
     * // Delete one PointsTransaction
     * const PointsTransaction = await prisma.pointsTransaction.delete({
     *   where: {
     *     // ... filter to delete one PointsTransaction
     *   }
     * })
     * 
     */
    delete<T extends PointsTransactionDeleteArgs>(args: SelectSubset<T, PointsTransactionDeleteArgs<ExtArgs>>): Prisma__PointsTransactionClient<$Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PointsTransaction.
     * @param {PointsTransactionUpdateArgs} args - Arguments to update one PointsTransaction.
     * @example
     * // Update one PointsTransaction
     * const pointsTransaction = await prisma.pointsTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PointsTransactionUpdateArgs>(args: SelectSubset<T, PointsTransactionUpdateArgs<ExtArgs>>): Prisma__PointsTransactionClient<$Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PointsTransactions.
     * @param {PointsTransactionDeleteManyArgs} args - Arguments to filter PointsTransactions to delete.
     * @example
     * // Delete a few PointsTransactions
     * const { count } = await prisma.pointsTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PointsTransactionDeleteManyArgs>(args?: SelectSubset<T, PointsTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PointsTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PointsTransactions
     * const pointsTransaction = await prisma.pointsTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PointsTransactionUpdateManyArgs>(args: SelectSubset<T, PointsTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PointsTransaction.
     * @param {PointsTransactionUpsertArgs} args - Arguments to update or create a PointsTransaction.
     * @example
     * // Update or create a PointsTransaction
     * const pointsTransaction = await prisma.pointsTransaction.upsert({
     *   create: {
     *     // ... data to create a PointsTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PointsTransaction we want to update
     *   }
     * })
     */
    upsert<T extends PointsTransactionUpsertArgs>(args: SelectSubset<T, PointsTransactionUpsertArgs<ExtArgs>>): Prisma__PointsTransactionClient<$Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PointsTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsTransactionCountArgs} args - Arguments to filter PointsTransactions to count.
     * @example
     * // Count the number of PointsTransactions
     * const count = await prisma.pointsTransaction.count({
     *   where: {
     *     // ... the filter for the PointsTransactions we want to count
     *   }
     * })
    **/
    count<T extends PointsTransactionCountArgs>(
      args?: Subset<T, PointsTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PointsTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PointsTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PointsTransactionAggregateArgs>(args: Subset<T, PointsTransactionAggregateArgs>): Prisma.PrismaPromise<GetPointsTransactionAggregateType<T>>

    /**
     * Group by PointsTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PointsTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PointsTransactionGroupByArgs['orderBy'] }
        : { orderBy?: PointsTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PointsTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPointsTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PointsTransaction model
   */
  readonly fields: PointsTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PointsTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PointsTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stats<T extends UserStatsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserStatsDefaultArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PointsTransaction model
   */ 
  interface PointsTransactionFieldRefs {
    readonly id: FieldRef<"PointsTransaction", 'String'>
    readonly userId: FieldRef<"PointsTransaction", 'String'>
    readonly points: FieldRef<"PointsTransaction", 'Int'>
    readonly reason: FieldRef<"PointsTransaction", 'PointsReason'>
    readonly eventId: FieldRef<"PointsTransaction", 'String'>
    readonly mediaId: FieldRef<"PointsTransaction", 'String'>
    readonly balanceAfter: FieldRef<"PointsTransaction", 'Int'>
    readonly createdAt: FieldRef<"PointsTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PointsTransaction findUnique
   */
  export type PointsTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointsTransaction
     */
    select?: PointsTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointsTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PointsTransaction to fetch.
     */
    where: PointsTransactionWhereUniqueInput
  }

  /**
   * PointsTransaction findUniqueOrThrow
   */
  export type PointsTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointsTransaction
     */
    select?: PointsTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointsTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PointsTransaction to fetch.
     */
    where: PointsTransactionWhereUniqueInput
  }

  /**
   * PointsTransaction findFirst
   */
  export type PointsTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointsTransaction
     */
    select?: PointsTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointsTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PointsTransaction to fetch.
     */
    where?: PointsTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointsTransactions to fetch.
     */
    orderBy?: PointsTransactionOrderByWithRelationInput | PointsTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PointsTransactions.
     */
    cursor?: PointsTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointsTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointsTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PointsTransactions.
     */
    distinct?: PointsTransactionScalarFieldEnum | PointsTransactionScalarFieldEnum[]
  }

  /**
   * PointsTransaction findFirstOrThrow
   */
  export type PointsTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointsTransaction
     */
    select?: PointsTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointsTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PointsTransaction to fetch.
     */
    where?: PointsTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointsTransactions to fetch.
     */
    orderBy?: PointsTransactionOrderByWithRelationInput | PointsTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PointsTransactions.
     */
    cursor?: PointsTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointsTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointsTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PointsTransactions.
     */
    distinct?: PointsTransactionScalarFieldEnum | PointsTransactionScalarFieldEnum[]
  }

  /**
   * PointsTransaction findMany
   */
  export type PointsTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointsTransaction
     */
    select?: PointsTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointsTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PointsTransactions to fetch.
     */
    where?: PointsTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointsTransactions to fetch.
     */
    orderBy?: PointsTransactionOrderByWithRelationInput | PointsTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PointsTransactions.
     */
    cursor?: PointsTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointsTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointsTransactions.
     */
    skip?: number
    distinct?: PointsTransactionScalarFieldEnum | PointsTransactionScalarFieldEnum[]
  }

  /**
   * PointsTransaction create
   */
  export type PointsTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointsTransaction
     */
    select?: PointsTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointsTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a PointsTransaction.
     */
    data: XOR<PointsTransactionCreateInput, PointsTransactionUncheckedCreateInput>
  }

  /**
   * PointsTransaction createMany
   */
  export type PointsTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PointsTransactions.
     */
    data: PointsTransactionCreateManyInput | PointsTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PointsTransaction createManyAndReturn
   */
  export type PointsTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointsTransaction
     */
    select?: PointsTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PointsTransactions.
     */
    data: PointsTransactionCreateManyInput | PointsTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointsTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PointsTransaction update
   */
  export type PointsTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointsTransaction
     */
    select?: PointsTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointsTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a PointsTransaction.
     */
    data: XOR<PointsTransactionUpdateInput, PointsTransactionUncheckedUpdateInput>
    /**
     * Choose, which PointsTransaction to update.
     */
    where: PointsTransactionWhereUniqueInput
  }

  /**
   * PointsTransaction updateMany
   */
  export type PointsTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PointsTransactions.
     */
    data: XOR<PointsTransactionUpdateManyMutationInput, PointsTransactionUncheckedUpdateManyInput>
    /**
     * Filter which PointsTransactions to update
     */
    where?: PointsTransactionWhereInput
  }

  /**
   * PointsTransaction upsert
   */
  export type PointsTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointsTransaction
     */
    select?: PointsTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointsTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the PointsTransaction to update in case it exists.
     */
    where: PointsTransactionWhereUniqueInput
    /**
     * In case the PointsTransaction found by the `where` argument doesn't exist, create a new PointsTransaction with this data.
     */
    create: XOR<PointsTransactionCreateInput, PointsTransactionUncheckedCreateInput>
    /**
     * In case the PointsTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PointsTransactionUpdateInput, PointsTransactionUncheckedUpdateInput>
  }

  /**
   * PointsTransaction delete
   */
  export type PointsTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointsTransaction
     */
    select?: PointsTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointsTransactionInclude<ExtArgs> | null
    /**
     * Filter which PointsTransaction to delete.
     */
    where: PointsTransactionWhereUniqueInput
  }

  /**
   * PointsTransaction deleteMany
   */
  export type PointsTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PointsTransactions to delete
     */
    where?: PointsTransactionWhereInput
  }

  /**
   * PointsTransaction without action
   */
  export type PointsTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointsTransaction
     */
    select?: PointsTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointsTransactionInclude<ExtArgs> | null
  }


  /**
   * Model Badge
   */

  export type AggregateBadge = {
    _count: BadgeCountAggregateOutputType | null
    _avg: BadgeAvgAggregateOutputType | null
    _sum: BadgeSumAggregateOutputType | null
    _min: BadgeMinAggregateOutputType | null
    _max: BadgeMaxAggregateOutputType | null
  }

  export type BadgeAvgAggregateOutputType = {
    pointsBonus: number | null
  }

  export type BadgeSumAggregateOutputType = {
    pointsBonus: number | null
  }

  export type BadgeMinAggregateOutputType = {
    id: string | null
    category: $Enums.BadgeCategory | null
    name: string | null
    description: string | null
    iconUrl: string | null
    pointsBonus: number | null
    rarity: $Enums.BadgeRarity | null
    createdAt: Date | null
  }

  export type BadgeMaxAggregateOutputType = {
    id: string | null
    category: $Enums.BadgeCategory | null
    name: string | null
    description: string | null
    iconUrl: string | null
    pointsBonus: number | null
    rarity: $Enums.BadgeRarity | null
    createdAt: Date | null
  }

  export type BadgeCountAggregateOutputType = {
    id: number
    category: number
    name: number
    description: number
    iconUrl: number
    pointsBonus: number
    rarity: number
    createdAt: number
    _all: number
  }


  export type BadgeAvgAggregateInputType = {
    pointsBonus?: true
  }

  export type BadgeSumAggregateInputType = {
    pointsBonus?: true
  }

  export type BadgeMinAggregateInputType = {
    id?: true
    category?: true
    name?: true
    description?: true
    iconUrl?: true
    pointsBonus?: true
    rarity?: true
    createdAt?: true
  }

  export type BadgeMaxAggregateInputType = {
    id?: true
    category?: true
    name?: true
    description?: true
    iconUrl?: true
    pointsBonus?: true
    rarity?: true
    createdAt?: true
  }

  export type BadgeCountAggregateInputType = {
    id?: true
    category?: true
    name?: true
    description?: true
    iconUrl?: true
    pointsBonus?: true
    rarity?: true
    createdAt?: true
    _all?: true
  }

  export type BadgeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Badge to aggregate.
     */
    where?: BadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Badges to fetch.
     */
    orderBy?: BadgeOrderByWithRelationInput | BadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Badges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Badges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Badges
    **/
    _count?: true | BadgeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BadgeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BadgeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BadgeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BadgeMaxAggregateInputType
  }

  export type GetBadgeAggregateType<T extends BadgeAggregateArgs> = {
        [P in keyof T & keyof AggregateBadge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBadge[P]>
      : GetScalarType<T[P], AggregateBadge[P]>
  }




  export type BadgeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BadgeWhereInput
    orderBy?: BadgeOrderByWithAggregationInput | BadgeOrderByWithAggregationInput[]
    by: BadgeScalarFieldEnum[] | BadgeScalarFieldEnum
    having?: BadgeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BadgeCountAggregateInputType | true
    _avg?: BadgeAvgAggregateInputType
    _sum?: BadgeSumAggregateInputType
    _min?: BadgeMinAggregateInputType
    _max?: BadgeMaxAggregateInputType
  }

  export type BadgeGroupByOutputType = {
    id: string
    category: $Enums.BadgeCategory
    name: string
    description: string
    iconUrl: string
    pointsBonus: number
    rarity: $Enums.BadgeRarity
    createdAt: Date
    _count: BadgeCountAggregateOutputType | null
    _avg: BadgeAvgAggregateOutputType | null
    _sum: BadgeSumAggregateOutputType | null
    _min: BadgeMinAggregateOutputType | null
    _max: BadgeMaxAggregateOutputType | null
  }

  type GetBadgeGroupByPayload<T extends BadgeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BadgeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BadgeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BadgeGroupByOutputType[P]>
            : GetScalarType<T[P], BadgeGroupByOutputType[P]>
        }
      >
    >


  export type BadgeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    name?: boolean
    description?: boolean
    iconUrl?: boolean
    pointsBonus?: boolean
    rarity?: boolean
    createdAt?: boolean
    userBadges?: boolean | Badge$userBadgesArgs<ExtArgs>
    _count?: boolean | BadgeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["badge"]>

  export type BadgeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    name?: boolean
    description?: boolean
    iconUrl?: boolean
    pointsBonus?: boolean
    rarity?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["badge"]>

  export type BadgeSelectScalar = {
    id?: boolean
    category?: boolean
    name?: boolean
    description?: boolean
    iconUrl?: boolean
    pointsBonus?: boolean
    rarity?: boolean
    createdAt?: boolean
  }

  export type BadgeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userBadges?: boolean | Badge$userBadgesArgs<ExtArgs>
    _count?: boolean | BadgeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BadgeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BadgePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Badge"
    objects: {
      userBadges: Prisma.$UserBadgePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      category: $Enums.BadgeCategory
      name: string
      description: string
      iconUrl: string
      pointsBonus: number
      rarity: $Enums.BadgeRarity
      createdAt: Date
    }, ExtArgs["result"]["badge"]>
    composites: {}
  }

  type BadgeGetPayload<S extends boolean | null | undefined | BadgeDefaultArgs> = $Result.GetResult<Prisma.$BadgePayload, S>

  type BadgeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BadgeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BadgeCountAggregateInputType | true
    }

  export interface BadgeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Badge'], meta: { name: 'Badge' } }
    /**
     * Find zero or one Badge that matches the filter.
     * @param {BadgeFindUniqueArgs} args - Arguments to find a Badge
     * @example
     * // Get one Badge
     * const badge = await prisma.badge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BadgeFindUniqueArgs>(args: SelectSubset<T, BadgeFindUniqueArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Badge that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BadgeFindUniqueOrThrowArgs} args - Arguments to find a Badge
     * @example
     * // Get one Badge
     * const badge = await prisma.badge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BadgeFindUniqueOrThrowArgs>(args: SelectSubset<T, BadgeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Badge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeFindFirstArgs} args - Arguments to find a Badge
     * @example
     * // Get one Badge
     * const badge = await prisma.badge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BadgeFindFirstArgs>(args?: SelectSubset<T, BadgeFindFirstArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Badge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeFindFirstOrThrowArgs} args - Arguments to find a Badge
     * @example
     * // Get one Badge
     * const badge = await prisma.badge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BadgeFindFirstOrThrowArgs>(args?: SelectSubset<T, BadgeFindFirstOrThrowArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Badges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Badges
     * const badges = await prisma.badge.findMany()
     * 
     * // Get first 10 Badges
     * const badges = await prisma.badge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const badgeWithIdOnly = await prisma.badge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BadgeFindManyArgs>(args?: SelectSubset<T, BadgeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Badge.
     * @param {BadgeCreateArgs} args - Arguments to create a Badge.
     * @example
     * // Create one Badge
     * const Badge = await prisma.badge.create({
     *   data: {
     *     // ... data to create a Badge
     *   }
     * })
     * 
     */
    create<T extends BadgeCreateArgs>(args: SelectSubset<T, BadgeCreateArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Badges.
     * @param {BadgeCreateManyArgs} args - Arguments to create many Badges.
     * @example
     * // Create many Badges
     * const badge = await prisma.badge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BadgeCreateManyArgs>(args?: SelectSubset<T, BadgeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Badges and returns the data saved in the database.
     * @param {BadgeCreateManyAndReturnArgs} args - Arguments to create many Badges.
     * @example
     * // Create many Badges
     * const badge = await prisma.badge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Badges and only return the `id`
     * const badgeWithIdOnly = await prisma.badge.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BadgeCreateManyAndReturnArgs>(args?: SelectSubset<T, BadgeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Badge.
     * @param {BadgeDeleteArgs} args - Arguments to delete one Badge.
     * @example
     * // Delete one Badge
     * const Badge = await prisma.badge.delete({
     *   where: {
     *     // ... filter to delete one Badge
     *   }
     * })
     * 
     */
    delete<T extends BadgeDeleteArgs>(args: SelectSubset<T, BadgeDeleteArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Badge.
     * @param {BadgeUpdateArgs} args - Arguments to update one Badge.
     * @example
     * // Update one Badge
     * const badge = await prisma.badge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BadgeUpdateArgs>(args: SelectSubset<T, BadgeUpdateArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Badges.
     * @param {BadgeDeleteManyArgs} args - Arguments to filter Badges to delete.
     * @example
     * // Delete a few Badges
     * const { count } = await prisma.badge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BadgeDeleteManyArgs>(args?: SelectSubset<T, BadgeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Badges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Badges
     * const badge = await prisma.badge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BadgeUpdateManyArgs>(args: SelectSubset<T, BadgeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Badge.
     * @param {BadgeUpsertArgs} args - Arguments to update or create a Badge.
     * @example
     * // Update or create a Badge
     * const badge = await prisma.badge.upsert({
     *   create: {
     *     // ... data to create a Badge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Badge we want to update
     *   }
     * })
     */
    upsert<T extends BadgeUpsertArgs>(args: SelectSubset<T, BadgeUpsertArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Badges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeCountArgs} args - Arguments to filter Badges to count.
     * @example
     * // Count the number of Badges
     * const count = await prisma.badge.count({
     *   where: {
     *     // ... the filter for the Badges we want to count
     *   }
     * })
    **/
    count<T extends BadgeCountArgs>(
      args?: Subset<T, BadgeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BadgeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Badge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BadgeAggregateArgs>(args: Subset<T, BadgeAggregateArgs>): Prisma.PrismaPromise<GetBadgeAggregateType<T>>

    /**
     * Group by Badge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BadgeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BadgeGroupByArgs['orderBy'] }
        : { orderBy?: BadgeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BadgeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBadgeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Badge model
   */
  readonly fields: BadgeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Badge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BadgeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userBadges<T extends Badge$userBadgesArgs<ExtArgs> = {}>(args?: Subset<T, Badge$userBadgesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Badge model
   */ 
  interface BadgeFieldRefs {
    readonly id: FieldRef<"Badge", 'String'>
    readonly category: FieldRef<"Badge", 'BadgeCategory'>
    readonly name: FieldRef<"Badge", 'String'>
    readonly description: FieldRef<"Badge", 'String'>
    readonly iconUrl: FieldRef<"Badge", 'String'>
    readonly pointsBonus: FieldRef<"Badge", 'Int'>
    readonly rarity: FieldRef<"Badge", 'BadgeRarity'>
    readonly createdAt: FieldRef<"Badge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Badge findUnique
   */
  export type BadgeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * Filter, which Badge to fetch.
     */
    where: BadgeWhereUniqueInput
  }

  /**
   * Badge findUniqueOrThrow
   */
  export type BadgeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * Filter, which Badge to fetch.
     */
    where: BadgeWhereUniqueInput
  }

  /**
   * Badge findFirst
   */
  export type BadgeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * Filter, which Badge to fetch.
     */
    where?: BadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Badges to fetch.
     */
    orderBy?: BadgeOrderByWithRelationInput | BadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Badges.
     */
    cursor?: BadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Badges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Badges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Badges.
     */
    distinct?: BadgeScalarFieldEnum | BadgeScalarFieldEnum[]
  }

  /**
   * Badge findFirstOrThrow
   */
  export type BadgeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * Filter, which Badge to fetch.
     */
    where?: BadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Badges to fetch.
     */
    orderBy?: BadgeOrderByWithRelationInput | BadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Badges.
     */
    cursor?: BadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Badges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Badges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Badges.
     */
    distinct?: BadgeScalarFieldEnum | BadgeScalarFieldEnum[]
  }

  /**
   * Badge findMany
   */
  export type BadgeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * Filter, which Badges to fetch.
     */
    where?: BadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Badges to fetch.
     */
    orderBy?: BadgeOrderByWithRelationInput | BadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Badges.
     */
    cursor?: BadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Badges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Badges.
     */
    skip?: number
    distinct?: BadgeScalarFieldEnum | BadgeScalarFieldEnum[]
  }

  /**
   * Badge create
   */
  export type BadgeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * The data needed to create a Badge.
     */
    data: XOR<BadgeCreateInput, BadgeUncheckedCreateInput>
  }

  /**
   * Badge createMany
   */
  export type BadgeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Badges.
     */
    data: BadgeCreateManyInput | BadgeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Badge createManyAndReturn
   */
  export type BadgeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Badges.
     */
    data: BadgeCreateManyInput | BadgeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Badge update
   */
  export type BadgeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * The data needed to update a Badge.
     */
    data: XOR<BadgeUpdateInput, BadgeUncheckedUpdateInput>
    /**
     * Choose, which Badge to update.
     */
    where: BadgeWhereUniqueInput
  }

  /**
   * Badge updateMany
   */
  export type BadgeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Badges.
     */
    data: XOR<BadgeUpdateManyMutationInput, BadgeUncheckedUpdateManyInput>
    /**
     * Filter which Badges to update
     */
    where?: BadgeWhereInput
  }

  /**
   * Badge upsert
   */
  export type BadgeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * The filter to search for the Badge to update in case it exists.
     */
    where: BadgeWhereUniqueInput
    /**
     * In case the Badge found by the `where` argument doesn't exist, create a new Badge with this data.
     */
    create: XOR<BadgeCreateInput, BadgeUncheckedCreateInput>
    /**
     * In case the Badge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BadgeUpdateInput, BadgeUncheckedUpdateInput>
  }

  /**
   * Badge delete
   */
  export type BadgeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
    /**
     * Filter which Badge to delete.
     */
    where: BadgeWhereUniqueInput
  }

  /**
   * Badge deleteMany
   */
  export type BadgeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Badges to delete
     */
    where?: BadgeWhereInput
  }

  /**
   * Badge.userBadges
   */
  export type Badge$userBadgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    where?: UserBadgeWhereInput
    orderBy?: UserBadgeOrderByWithRelationInput | UserBadgeOrderByWithRelationInput[]
    cursor?: UserBadgeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserBadgeScalarFieldEnum | UserBadgeScalarFieldEnum[]
  }

  /**
   * Badge without action
   */
  export type BadgeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badge
     */
    select?: BadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeInclude<ExtArgs> | null
  }


  /**
   * Model UserBadge
   */

  export type AggregateUserBadge = {
    _count: UserBadgeCountAggregateOutputType | null
    _min: UserBadgeMinAggregateOutputType | null
    _max: UserBadgeMaxAggregateOutputType | null
  }

  export type UserBadgeMinAggregateOutputType = {
    id: string | null
    userId: string | null
    badgeId: string | null
    earnedAt: Date | null
  }

  export type UserBadgeMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    badgeId: string | null
    earnedAt: Date | null
  }

  export type UserBadgeCountAggregateOutputType = {
    id: number
    userId: number
    badgeId: number
    earnedAt: number
    _all: number
  }


  export type UserBadgeMinAggregateInputType = {
    id?: true
    userId?: true
    badgeId?: true
    earnedAt?: true
  }

  export type UserBadgeMaxAggregateInputType = {
    id?: true
    userId?: true
    badgeId?: true
    earnedAt?: true
  }

  export type UserBadgeCountAggregateInputType = {
    id?: true
    userId?: true
    badgeId?: true
    earnedAt?: true
    _all?: true
  }

  export type UserBadgeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserBadge to aggregate.
     */
    where?: UserBadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBadges to fetch.
     */
    orderBy?: UserBadgeOrderByWithRelationInput | UserBadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserBadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBadges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBadges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserBadges
    **/
    _count?: true | UserBadgeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserBadgeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserBadgeMaxAggregateInputType
  }

  export type GetUserBadgeAggregateType<T extends UserBadgeAggregateArgs> = {
        [P in keyof T & keyof AggregateUserBadge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserBadge[P]>
      : GetScalarType<T[P], AggregateUserBadge[P]>
  }




  export type UserBadgeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserBadgeWhereInput
    orderBy?: UserBadgeOrderByWithAggregationInput | UserBadgeOrderByWithAggregationInput[]
    by: UserBadgeScalarFieldEnum[] | UserBadgeScalarFieldEnum
    having?: UserBadgeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserBadgeCountAggregateInputType | true
    _min?: UserBadgeMinAggregateInputType
    _max?: UserBadgeMaxAggregateInputType
  }

  export type UserBadgeGroupByOutputType = {
    id: string
    userId: string
    badgeId: string
    earnedAt: Date
    _count: UserBadgeCountAggregateOutputType | null
    _min: UserBadgeMinAggregateOutputType | null
    _max: UserBadgeMaxAggregateOutputType | null
  }

  type GetUserBadgeGroupByPayload<T extends UserBadgeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserBadgeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserBadgeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserBadgeGroupByOutputType[P]>
            : GetScalarType<T[P], UserBadgeGroupByOutputType[P]>
        }
      >
    >


  export type UserBadgeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    badgeId?: boolean
    earnedAt?: boolean
    stats?: boolean | UserStatsDefaultArgs<ExtArgs>
    badge?: boolean | BadgeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userBadge"]>

  export type UserBadgeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    badgeId?: boolean
    earnedAt?: boolean
    stats?: boolean | UserStatsDefaultArgs<ExtArgs>
    badge?: boolean | BadgeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userBadge"]>

  export type UserBadgeSelectScalar = {
    id?: boolean
    userId?: boolean
    badgeId?: boolean
    earnedAt?: boolean
  }

  export type UserBadgeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stats?: boolean | UserStatsDefaultArgs<ExtArgs>
    badge?: boolean | BadgeDefaultArgs<ExtArgs>
  }
  export type UserBadgeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stats?: boolean | UserStatsDefaultArgs<ExtArgs>
    badge?: boolean | BadgeDefaultArgs<ExtArgs>
  }

  export type $UserBadgePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserBadge"
    objects: {
      stats: Prisma.$UserStatsPayload<ExtArgs>
      badge: Prisma.$BadgePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      badgeId: string
      earnedAt: Date
    }, ExtArgs["result"]["userBadge"]>
    composites: {}
  }

  type UserBadgeGetPayload<S extends boolean | null | undefined | UserBadgeDefaultArgs> = $Result.GetResult<Prisma.$UserBadgePayload, S>

  type UserBadgeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserBadgeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserBadgeCountAggregateInputType | true
    }

  export interface UserBadgeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserBadge'], meta: { name: 'UserBadge' } }
    /**
     * Find zero or one UserBadge that matches the filter.
     * @param {UserBadgeFindUniqueArgs} args - Arguments to find a UserBadge
     * @example
     * // Get one UserBadge
     * const userBadge = await prisma.userBadge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserBadgeFindUniqueArgs>(args: SelectSubset<T, UserBadgeFindUniqueArgs<ExtArgs>>): Prisma__UserBadgeClient<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UserBadge that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserBadgeFindUniqueOrThrowArgs} args - Arguments to find a UserBadge
     * @example
     * // Get one UserBadge
     * const userBadge = await prisma.userBadge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserBadgeFindUniqueOrThrowArgs>(args: SelectSubset<T, UserBadgeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserBadgeClient<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UserBadge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBadgeFindFirstArgs} args - Arguments to find a UserBadge
     * @example
     * // Get one UserBadge
     * const userBadge = await prisma.userBadge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserBadgeFindFirstArgs>(args?: SelectSubset<T, UserBadgeFindFirstArgs<ExtArgs>>): Prisma__UserBadgeClient<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UserBadge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBadgeFindFirstOrThrowArgs} args - Arguments to find a UserBadge
     * @example
     * // Get one UserBadge
     * const userBadge = await prisma.userBadge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserBadgeFindFirstOrThrowArgs>(args?: SelectSubset<T, UserBadgeFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserBadgeClient<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UserBadges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBadgeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserBadges
     * const userBadges = await prisma.userBadge.findMany()
     * 
     * // Get first 10 UserBadges
     * const userBadges = await prisma.userBadge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userBadgeWithIdOnly = await prisma.userBadge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserBadgeFindManyArgs>(args?: SelectSubset<T, UserBadgeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UserBadge.
     * @param {UserBadgeCreateArgs} args - Arguments to create a UserBadge.
     * @example
     * // Create one UserBadge
     * const UserBadge = await prisma.userBadge.create({
     *   data: {
     *     // ... data to create a UserBadge
     *   }
     * })
     * 
     */
    create<T extends UserBadgeCreateArgs>(args: SelectSubset<T, UserBadgeCreateArgs<ExtArgs>>): Prisma__UserBadgeClient<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UserBadges.
     * @param {UserBadgeCreateManyArgs} args - Arguments to create many UserBadges.
     * @example
     * // Create many UserBadges
     * const userBadge = await prisma.userBadge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserBadgeCreateManyArgs>(args?: SelectSubset<T, UserBadgeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserBadges and returns the data saved in the database.
     * @param {UserBadgeCreateManyAndReturnArgs} args - Arguments to create many UserBadges.
     * @example
     * // Create many UserBadges
     * const userBadge = await prisma.userBadge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserBadges and only return the `id`
     * const userBadgeWithIdOnly = await prisma.userBadge.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserBadgeCreateManyAndReturnArgs>(args?: SelectSubset<T, UserBadgeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a UserBadge.
     * @param {UserBadgeDeleteArgs} args - Arguments to delete one UserBadge.
     * @example
     * // Delete one UserBadge
     * const UserBadge = await prisma.userBadge.delete({
     *   where: {
     *     // ... filter to delete one UserBadge
     *   }
     * })
     * 
     */
    delete<T extends UserBadgeDeleteArgs>(args: SelectSubset<T, UserBadgeDeleteArgs<ExtArgs>>): Prisma__UserBadgeClient<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UserBadge.
     * @param {UserBadgeUpdateArgs} args - Arguments to update one UserBadge.
     * @example
     * // Update one UserBadge
     * const userBadge = await prisma.userBadge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserBadgeUpdateArgs>(args: SelectSubset<T, UserBadgeUpdateArgs<ExtArgs>>): Prisma__UserBadgeClient<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UserBadges.
     * @param {UserBadgeDeleteManyArgs} args - Arguments to filter UserBadges to delete.
     * @example
     * // Delete a few UserBadges
     * const { count } = await prisma.userBadge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserBadgeDeleteManyArgs>(args?: SelectSubset<T, UserBadgeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserBadges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBadgeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserBadges
     * const userBadge = await prisma.userBadge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserBadgeUpdateManyArgs>(args: SelectSubset<T, UserBadgeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserBadge.
     * @param {UserBadgeUpsertArgs} args - Arguments to update or create a UserBadge.
     * @example
     * // Update or create a UserBadge
     * const userBadge = await prisma.userBadge.upsert({
     *   create: {
     *     // ... data to create a UserBadge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserBadge we want to update
     *   }
     * })
     */
    upsert<T extends UserBadgeUpsertArgs>(args: SelectSubset<T, UserBadgeUpsertArgs<ExtArgs>>): Prisma__UserBadgeClient<$Result.GetResult<Prisma.$UserBadgePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UserBadges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBadgeCountArgs} args - Arguments to filter UserBadges to count.
     * @example
     * // Count the number of UserBadges
     * const count = await prisma.userBadge.count({
     *   where: {
     *     // ... the filter for the UserBadges we want to count
     *   }
     * })
    **/
    count<T extends UserBadgeCountArgs>(
      args?: Subset<T, UserBadgeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserBadgeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserBadge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBadgeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserBadgeAggregateArgs>(args: Subset<T, UserBadgeAggregateArgs>): Prisma.PrismaPromise<GetUserBadgeAggregateType<T>>

    /**
     * Group by UserBadge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBadgeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserBadgeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserBadgeGroupByArgs['orderBy'] }
        : { orderBy?: UserBadgeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserBadgeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserBadgeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserBadge model
   */
  readonly fields: UserBadgeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserBadge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserBadgeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stats<T extends UserStatsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserStatsDefaultArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    badge<T extends BadgeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BadgeDefaultArgs<ExtArgs>>): Prisma__BadgeClient<$Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserBadge model
   */ 
  interface UserBadgeFieldRefs {
    readonly id: FieldRef<"UserBadge", 'String'>
    readonly userId: FieldRef<"UserBadge", 'String'>
    readonly badgeId: FieldRef<"UserBadge", 'String'>
    readonly earnedAt: FieldRef<"UserBadge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserBadge findUnique
   */
  export type UserBadgeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    /**
     * Filter, which UserBadge to fetch.
     */
    where: UserBadgeWhereUniqueInput
  }

  /**
   * UserBadge findUniqueOrThrow
   */
  export type UserBadgeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    /**
     * Filter, which UserBadge to fetch.
     */
    where: UserBadgeWhereUniqueInput
  }

  /**
   * UserBadge findFirst
   */
  export type UserBadgeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    /**
     * Filter, which UserBadge to fetch.
     */
    where?: UserBadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBadges to fetch.
     */
    orderBy?: UserBadgeOrderByWithRelationInput | UserBadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserBadges.
     */
    cursor?: UserBadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBadges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBadges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserBadges.
     */
    distinct?: UserBadgeScalarFieldEnum | UserBadgeScalarFieldEnum[]
  }

  /**
   * UserBadge findFirstOrThrow
   */
  export type UserBadgeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    /**
     * Filter, which UserBadge to fetch.
     */
    where?: UserBadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBadges to fetch.
     */
    orderBy?: UserBadgeOrderByWithRelationInput | UserBadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserBadges.
     */
    cursor?: UserBadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBadges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBadges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserBadges.
     */
    distinct?: UserBadgeScalarFieldEnum | UserBadgeScalarFieldEnum[]
  }

  /**
   * UserBadge findMany
   */
  export type UserBadgeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    /**
     * Filter, which UserBadges to fetch.
     */
    where?: UserBadgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBadges to fetch.
     */
    orderBy?: UserBadgeOrderByWithRelationInput | UserBadgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserBadges.
     */
    cursor?: UserBadgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBadges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBadges.
     */
    skip?: number
    distinct?: UserBadgeScalarFieldEnum | UserBadgeScalarFieldEnum[]
  }

  /**
   * UserBadge create
   */
  export type UserBadgeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    /**
     * The data needed to create a UserBadge.
     */
    data: XOR<UserBadgeCreateInput, UserBadgeUncheckedCreateInput>
  }

  /**
   * UserBadge createMany
   */
  export type UserBadgeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserBadges.
     */
    data: UserBadgeCreateManyInput | UserBadgeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserBadge createManyAndReturn
   */
  export type UserBadgeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many UserBadges.
     */
    data: UserBadgeCreateManyInput | UserBadgeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserBadge update
   */
  export type UserBadgeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    /**
     * The data needed to update a UserBadge.
     */
    data: XOR<UserBadgeUpdateInput, UserBadgeUncheckedUpdateInput>
    /**
     * Choose, which UserBadge to update.
     */
    where: UserBadgeWhereUniqueInput
  }

  /**
   * UserBadge updateMany
   */
  export type UserBadgeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserBadges.
     */
    data: XOR<UserBadgeUpdateManyMutationInput, UserBadgeUncheckedUpdateManyInput>
    /**
     * Filter which UserBadges to update
     */
    where?: UserBadgeWhereInput
  }

  /**
   * UserBadge upsert
   */
  export type UserBadgeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    /**
     * The filter to search for the UserBadge to update in case it exists.
     */
    where: UserBadgeWhereUniqueInput
    /**
     * In case the UserBadge found by the `where` argument doesn't exist, create a new UserBadge with this data.
     */
    create: XOR<UserBadgeCreateInput, UserBadgeUncheckedCreateInput>
    /**
     * In case the UserBadge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserBadgeUpdateInput, UserBadgeUncheckedUpdateInput>
  }

  /**
   * UserBadge delete
   */
  export type UserBadgeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
    /**
     * Filter which UserBadge to delete.
     */
    where: UserBadgeWhereUniqueInput
  }

  /**
   * UserBadge deleteMany
   */
  export type UserBadgeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserBadges to delete
     */
    where?: UserBadgeWhereInput
  }

  /**
   * UserBadge without action
   */
  export type UserBadgeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBadge
     */
    select?: UserBadgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBadgeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserStatsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    totalPoints: 'totalPoints',
    eventsJoined: 'eventsJoined',
    eventsCompleted: 'eventsCompleted',
    currentStreakDays: 'currentStreakDays',
    longestStreakDays: 'longestStreakDays',
    lastEventAt: 'lastEventAt',
    kgWasteEstimated: 'kgWasteEstimated',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserStatsScalarFieldEnum = (typeof UserStatsScalarFieldEnum)[keyof typeof UserStatsScalarFieldEnum]


  export const PointsTransactionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    points: 'points',
    reason: 'reason',
    eventId: 'eventId',
    mediaId: 'mediaId',
    balanceAfter: 'balanceAfter',
    createdAt: 'createdAt'
  };

  export type PointsTransactionScalarFieldEnum = (typeof PointsTransactionScalarFieldEnum)[keyof typeof PointsTransactionScalarFieldEnum]


  export const BadgeScalarFieldEnum: {
    id: 'id',
    category: 'category',
    name: 'name',
    description: 'description',
    iconUrl: 'iconUrl',
    pointsBonus: 'pointsBonus',
    rarity: 'rarity',
    createdAt: 'createdAt'
  };

  export type BadgeScalarFieldEnum = (typeof BadgeScalarFieldEnum)[keyof typeof BadgeScalarFieldEnum]


  export const UserBadgeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    badgeId: 'badgeId',
    earnedAt: 'earnedAt'
  };

  export type UserBadgeScalarFieldEnum = (typeof UserBadgeScalarFieldEnum)[keyof typeof UserBadgeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'PointsReason'
   */
  export type EnumPointsReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PointsReason'>
    


  /**
   * Reference to a field of type 'PointsReason[]'
   */
  export type ListEnumPointsReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PointsReason[]'>
    


  /**
   * Reference to a field of type 'BadgeCategory'
   */
  export type EnumBadgeCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BadgeCategory'>
    


  /**
   * Reference to a field of type 'BadgeCategory[]'
   */
  export type ListEnumBadgeCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BadgeCategory[]'>
    


  /**
   * Reference to a field of type 'BadgeRarity'
   */
  export type EnumBadgeRarityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BadgeRarity'>
    


  /**
   * Reference to a field of type 'BadgeRarity[]'
   */
  export type ListEnumBadgeRarityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BadgeRarity[]'>
    
  /**
   * Deep Input Types
   */


  export type UserStatsWhereInput = {
    AND?: UserStatsWhereInput | UserStatsWhereInput[]
    OR?: UserStatsWhereInput[]
    NOT?: UserStatsWhereInput | UserStatsWhereInput[]
    id?: StringFilter<"UserStats"> | string
    userId?: StringFilter<"UserStats"> | string
    totalPoints?: IntFilter<"UserStats"> | number
    eventsJoined?: IntFilter<"UserStats"> | number
    eventsCompleted?: IntFilter<"UserStats"> | number
    currentStreakDays?: IntFilter<"UserStats"> | number
    longestStreakDays?: IntFilter<"UserStats"> | number
    lastEventAt?: DateTimeNullableFilter<"UserStats"> | Date | string | null
    kgWasteEstimated?: FloatFilter<"UserStats"> | number
    createdAt?: DateTimeFilter<"UserStats"> | Date | string
    updatedAt?: DateTimeFilter<"UserStats"> | Date | string
    pointsHistory?: PointsTransactionListRelationFilter
    badges?: UserBadgeListRelationFilter
  }

  export type UserStatsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    totalPoints?: SortOrder
    eventsJoined?: SortOrder
    eventsCompleted?: SortOrder
    currentStreakDays?: SortOrder
    longestStreakDays?: SortOrder
    lastEventAt?: SortOrderInput | SortOrder
    kgWasteEstimated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pointsHistory?: PointsTransactionOrderByRelationAggregateInput
    badges?: UserBadgeOrderByRelationAggregateInput
  }

  export type UserStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserStatsWhereInput | UserStatsWhereInput[]
    OR?: UserStatsWhereInput[]
    NOT?: UserStatsWhereInput | UserStatsWhereInput[]
    totalPoints?: IntFilter<"UserStats"> | number
    eventsJoined?: IntFilter<"UserStats"> | number
    eventsCompleted?: IntFilter<"UserStats"> | number
    currentStreakDays?: IntFilter<"UserStats"> | number
    longestStreakDays?: IntFilter<"UserStats"> | number
    lastEventAt?: DateTimeNullableFilter<"UserStats"> | Date | string | null
    kgWasteEstimated?: FloatFilter<"UserStats"> | number
    createdAt?: DateTimeFilter<"UserStats"> | Date | string
    updatedAt?: DateTimeFilter<"UserStats"> | Date | string
    pointsHistory?: PointsTransactionListRelationFilter
    badges?: UserBadgeListRelationFilter
  }, "id" | "userId">

  export type UserStatsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    totalPoints?: SortOrder
    eventsJoined?: SortOrder
    eventsCompleted?: SortOrder
    currentStreakDays?: SortOrder
    longestStreakDays?: SortOrder
    lastEventAt?: SortOrderInput | SortOrder
    kgWasteEstimated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserStatsCountOrderByAggregateInput
    _avg?: UserStatsAvgOrderByAggregateInput
    _max?: UserStatsMaxOrderByAggregateInput
    _min?: UserStatsMinOrderByAggregateInput
    _sum?: UserStatsSumOrderByAggregateInput
  }

  export type UserStatsScalarWhereWithAggregatesInput = {
    AND?: UserStatsScalarWhereWithAggregatesInput | UserStatsScalarWhereWithAggregatesInput[]
    OR?: UserStatsScalarWhereWithAggregatesInput[]
    NOT?: UserStatsScalarWhereWithAggregatesInput | UserStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserStats"> | string
    userId?: StringWithAggregatesFilter<"UserStats"> | string
    totalPoints?: IntWithAggregatesFilter<"UserStats"> | number
    eventsJoined?: IntWithAggregatesFilter<"UserStats"> | number
    eventsCompleted?: IntWithAggregatesFilter<"UserStats"> | number
    currentStreakDays?: IntWithAggregatesFilter<"UserStats"> | number
    longestStreakDays?: IntWithAggregatesFilter<"UserStats"> | number
    lastEventAt?: DateTimeNullableWithAggregatesFilter<"UserStats"> | Date | string | null
    kgWasteEstimated?: FloatWithAggregatesFilter<"UserStats"> | number
    createdAt?: DateTimeWithAggregatesFilter<"UserStats"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserStats"> | Date | string
  }

  export type PointsTransactionWhereInput = {
    AND?: PointsTransactionWhereInput | PointsTransactionWhereInput[]
    OR?: PointsTransactionWhereInput[]
    NOT?: PointsTransactionWhereInput | PointsTransactionWhereInput[]
    id?: StringFilter<"PointsTransaction"> | string
    userId?: StringFilter<"PointsTransaction"> | string
    points?: IntFilter<"PointsTransaction"> | number
    reason?: EnumPointsReasonFilter<"PointsTransaction"> | $Enums.PointsReason
    eventId?: StringNullableFilter<"PointsTransaction"> | string | null
    mediaId?: StringNullableFilter<"PointsTransaction"> | string | null
    balanceAfter?: IntFilter<"PointsTransaction"> | number
    createdAt?: DateTimeFilter<"PointsTransaction"> | Date | string
    stats?: XOR<UserStatsRelationFilter, UserStatsWhereInput>
  }

  export type PointsTransactionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    reason?: SortOrder
    eventId?: SortOrderInput | SortOrder
    mediaId?: SortOrderInput | SortOrder
    balanceAfter?: SortOrder
    createdAt?: SortOrder
    stats?: UserStatsOrderByWithRelationInput
  }

  export type PointsTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PointsTransactionWhereInput | PointsTransactionWhereInput[]
    OR?: PointsTransactionWhereInput[]
    NOT?: PointsTransactionWhereInput | PointsTransactionWhereInput[]
    userId?: StringFilter<"PointsTransaction"> | string
    points?: IntFilter<"PointsTransaction"> | number
    reason?: EnumPointsReasonFilter<"PointsTransaction"> | $Enums.PointsReason
    eventId?: StringNullableFilter<"PointsTransaction"> | string | null
    mediaId?: StringNullableFilter<"PointsTransaction"> | string | null
    balanceAfter?: IntFilter<"PointsTransaction"> | number
    createdAt?: DateTimeFilter<"PointsTransaction"> | Date | string
    stats?: XOR<UserStatsRelationFilter, UserStatsWhereInput>
  }, "id">

  export type PointsTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    reason?: SortOrder
    eventId?: SortOrderInput | SortOrder
    mediaId?: SortOrderInput | SortOrder
    balanceAfter?: SortOrder
    createdAt?: SortOrder
    _count?: PointsTransactionCountOrderByAggregateInput
    _avg?: PointsTransactionAvgOrderByAggregateInput
    _max?: PointsTransactionMaxOrderByAggregateInput
    _min?: PointsTransactionMinOrderByAggregateInput
    _sum?: PointsTransactionSumOrderByAggregateInput
  }

  export type PointsTransactionScalarWhereWithAggregatesInput = {
    AND?: PointsTransactionScalarWhereWithAggregatesInput | PointsTransactionScalarWhereWithAggregatesInput[]
    OR?: PointsTransactionScalarWhereWithAggregatesInput[]
    NOT?: PointsTransactionScalarWhereWithAggregatesInput | PointsTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PointsTransaction"> | string
    userId?: StringWithAggregatesFilter<"PointsTransaction"> | string
    points?: IntWithAggregatesFilter<"PointsTransaction"> | number
    reason?: EnumPointsReasonWithAggregatesFilter<"PointsTransaction"> | $Enums.PointsReason
    eventId?: StringNullableWithAggregatesFilter<"PointsTransaction"> | string | null
    mediaId?: StringNullableWithAggregatesFilter<"PointsTransaction"> | string | null
    balanceAfter?: IntWithAggregatesFilter<"PointsTransaction"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PointsTransaction"> | Date | string
  }

  export type BadgeWhereInput = {
    AND?: BadgeWhereInput | BadgeWhereInput[]
    OR?: BadgeWhereInput[]
    NOT?: BadgeWhereInput | BadgeWhereInput[]
    id?: StringFilter<"Badge"> | string
    category?: EnumBadgeCategoryFilter<"Badge"> | $Enums.BadgeCategory
    name?: StringFilter<"Badge"> | string
    description?: StringFilter<"Badge"> | string
    iconUrl?: StringFilter<"Badge"> | string
    pointsBonus?: IntFilter<"Badge"> | number
    rarity?: EnumBadgeRarityFilter<"Badge"> | $Enums.BadgeRarity
    createdAt?: DateTimeFilter<"Badge"> | Date | string
    userBadges?: UserBadgeListRelationFilter
  }

  export type BadgeOrderByWithRelationInput = {
    id?: SortOrder
    category?: SortOrder
    name?: SortOrder
    description?: SortOrder
    iconUrl?: SortOrder
    pointsBonus?: SortOrder
    rarity?: SortOrder
    createdAt?: SortOrder
    userBadges?: UserBadgeOrderByRelationAggregateInput
  }

  export type BadgeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    category?: $Enums.BadgeCategory
    AND?: BadgeWhereInput | BadgeWhereInput[]
    OR?: BadgeWhereInput[]
    NOT?: BadgeWhereInput | BadgeWhereInput[]
    name?: StringFilter<"Badge"> | string
    description?: StringFilter<"Badge"> | string
    iconUrl?: StringFilter<"Badge"> | string
    pointsBonus?: IntFilter<"Badge"> | number
    rarity?: EnumBadgeRarityFilter<"Badge"> | $Enums.BadgeRarity
    createdAt?: DateTimeFilter<"Badge"> | Date | string
    userBadges?: UserBadgeListRelationFilter
  }, "id" | "category">

  export type BadgeOrderByWithAggregationInput = {
    id?: SortOrder
    category?: SortOrder
    name?: SortOrder
    description?: SortOrder
    iconUrl?: SortOrder
    pointsBonus?: SortOrder
    rarity?: SortOrder
    createdAt?: SortOrder
    _count?: BadgeCountOrderByAggregateInput
    _avg?: BadgeAvgOrderByAggregateInput
    _max?: BadgeMaxOrderByAggregateInput
    _min?: BadgeMinOrderByAggregateInput
    _sum?: BadgeSumOrderByAggregateInput
  }

  export type BadgeScalarWhereWithAggregatesInput = {
    AND?: BadgeScalarWhereWithAggregatesInput | BadgeScalarWhereWithAggregatesInput[]
    OR?: BadgeScalarWhereWithAggregatesInput[]
    NOT?: BadgeScalarWhereWithAggregatesInput | BadgeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Badge"> | string
    category?: EnumBadgeCategoryWithAggregatesFilter<"Badge"> | $Enums.BadgeCategory
    name?: StringWithAggregatesFilter<"Badge"> | string
    description?: StringWithAggregatesFilter<"Badge"> | string
    iconUrl?: StringWithAggregatesFilter<"Badge"> | string
    pointsBonus?: IntWithAggregatesFilter<"Badge"> | number
    rarity?: EnumBadgeRarityWithAggregatesFilter<"Badge"> | $Enums.BadgeRarity
    createdAt?: DateTimeWithAggregatesFilter<"Badge"> | Date | string
  }

  export type UserBadgeWhereInput = {
    AND?: UserBadgeWhereInput | UserBadgeWhereInput[]
    OR?: UserBadgeWhereInput[]
    NOT?: UserBadgeWhereInput | UserBadgeWhereInput[]
    id?: StringFilter<"UserBadge"> | string
    userId?: StringFilter<"UserBadge"> | string
    badgeId?: StringFilter<"UserBadge"> | string
    earnedAt?: DateTimeFilter<"UserBadge"> | Date | string
    stats?: XOR<UserStatsRelationFilter, UserStatsWhereInput>
    badge?: XOR<BadgeRelationFilter, BadgeWhereInput>
  }

  export type UserBadgeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    badgeId?: SortOrder
    earnedAt?: SortOrder
    stats?: UserStatsOrderByWithRelationInput
    badge?: BadgeOrderByWithRelationInput
  }

  export type UserBadgeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_badgeId?: UserBadgeUserIdBadgeIdCompoundUniqueInput
    AND?: UserBadgeWhereInput | UserBadgeWhereInput[]
    OR?: UserBadgeWhereInput[]
    NOT?: UserBadgeWhereInput | UserBadgeWhereInput[]
    userId?: StringFilter<"UserBadge"> | string
    badgeId?: StringFilter<"UserBadge"> | string
    earnedAt?: DateTimeFilter<"UserBadge"> | Date | string
    stats?: XOR<UserStatsRelationFilter, UserStatsWhereInput>
    badge?: XOR<BadgeRelationFilter, BadgeWhereInput>
  }, "id" | "userId_badgeId">

  export type UserBadgeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    badgeId?: SortOrder
    earnedAt?: SortOrder
    _count?: UserBadgeCountOrderByAggregateInput
    _max?: UserBadgeMaxOrderByAggregateInput
    _min?: UserBadgeMinOrderByAggregateInput
  }

  export type UserBadgeScalarWhereWithAggregatesInput = {
    AND?: UserBadgeScalarWhereWithAggregatesInput | UserBadgeScalarWhereWithAggregatesInput[]
    OR?: UserBadgeScalarWhereWithAggregatesInput[]
    NOT?: UserBadgeScalarWhereWithAggregatesInput | UserBadgeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserBadge"> | string
    userId?: StringWithAggregatesFilter<"UserBadge"> | string
    badgeId?: StringWithAggregatesFilter<"UserBadge"> | string
    earnedAt?: DateTimeWithAggregatesFilter<"UserBadge"> | Date | string
  }

  export type UserStatsCreateInput = {
    id?: string
    userId: string
    totalPoints?: number
    eventsJoined?: number
    eventsCompleted?: number
    currentStreakDays?: number
    longestStreakDays?: number
    lastEventAt?: Date | string | null
    kgWasteEstimated?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    pointsHistory?: PointsTransactionCreateNestedManyWithoutStatsInput
    badges?: UserBadgeCreateNestedManyWithoutStatsInput
  }

  export type UserStatsUncheckedCreateInput = {
    id?: string
    userId: string
    totalPoints?: number
    eventsJoined?: number
    eventsCompleted?: number
    currentStreakDays?: number
    longestStreakDays?: number
    lastEventAt?: Date | string | null
    kgWasteEstimated?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    pointsHistory?: PointsTransactionUncheckedCreateNestedManyWithoutStatsInput
    badges?: UserBadgeUncheckedCreateNestedManyWithoutStatsInput
  }

  export type UserStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalPoints?: IntFieldUpdateOperationsInput | number
    eventsJoined?: IntFieldUpdateOperationsInput | number
    eventsCompleted?: IntFieldUpdateOperationsInput | number
    currentStreakDays?: IntFieldUpdateOperationsInput | number
    longestStreakDays?: IntFieldUpdateOperationsInput | number
    lastEventAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kgWasteEstimated?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pointsHistory?: PointsTransactionUpdateManyWithoutStatsNestedInput
    badges?: UserBadgeUpdateManyWithoutStatsNestedInput
  }

  export type UserStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalPoints?: IntFieldUpdateOperationsInput | number
    eventsJoined?: IntFieldUpdateOperationsInput | number
    eventsCompleted?: IntFieldUpdateOperationsInput | number
    currentStreakDays?: IntFieldUpdateOperationsInput | number
    longestStreakDays?: IntFieldUpdateOperationsInput | number
    lastEventAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kgWasteEstimated?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pointsHistory?: PointsTransactionUncheckedUpdateManyWithoutStatsNestedInput
    badges?: UserBadgeUncheckedUpdateManyWithoutStatsNestedInput
  }

  export type UserStatsCreateManyInput = {
    id?: string
    userId: string
    totalPoints?: number
    eventsJoined?: number
    eventsCompleted?: number
    currentStreakDays?: number
    longestStreakDays?: number
    lastEventAt?: Date | string | null
    kgWasteEstimated?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalPoints?: IntFieldUpdateOperationsInput | number
    eventsJoined?: IntFieldUpdateOperationsInput | number
    eventsCompleted?: IntFieldUpdateOperationsInput | number
    currentStreakDays?: IntFieldUpdateOperationsInput | number
    longestStreakDays?: IntFieldUpdateOperationsInput | number
    lastEventAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kgWasteEstimated?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalPoints?: IntFieldUpdateOperationsInput | number
    eventsJoined?: IntFieldUpdateOperationsInput | number
    eventsCompleted?: IntFieldUpdateOperationsInput | number
    currentStreakDays?: IntFieldUpdateOperationsInput | number
    longestStreakDays?: IntFieldUpdateOperationsInput | number
    lastEventAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kgWasteEstimated?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointsTransactionCreateInput = {
    id?: string
    points: number
    reason: $Enums.PointsReason
    eventId?: string | null
    mediaId?: string | null
    balanceAfter: number
    createdAt?: Date | string
    stats: UserStatsCreateNestedOneWithoutPointsHistoryInput
  }

  export type PointsTransactionUncheckedCreateInput = {
    id?: string
    userId: string
    points: number
    reason: $Enums.PointsReason
    eventId?: string | null
    mediaId?: string | null
    balanceAfter: number
    createdAt?: Date | string
  }

  export type PointsTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: EnumPointsReasonFieldUpdateOperationsInput | $Enums.PointsReason
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
    mediaId?: NullableStringFieldUpdateOperationsInput | string | null
    balanceAfter?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: UserStatsUpdateOneRequiredWithoutPointsHistoryNestedInput
  }

  export type PointsTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: EnumPointsReasonFieldUpdateOperationsInput | $Enums.PointsReason
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
    mediaId?: NullableStringFieldUpdateOperationsInput | string | null
    balanceAfter?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointsTransactionCreateManyInput = {
    id?: string
    userId: string
    points: number
    reason: $Enums.PointsReason
    eventId?: string | null
    mediaId?: string | null
    balanceAfter: number
    createdAt?: Date | string
  }

  export type PointsTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: EnumPointsReasonFieldUpdateOperationsInput | $Enums.PointsReason
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
    mediaId?: NullableStringFieldUpdateOperationsInput | string | null
    balanceAfter?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointsTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: EnumPointsReasonFieldUpdateOperationsInput | $Enums.PointsReason
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
    mediaId?: NullableStringFieldUpdateOperationsInput | string | null
    balanceAfter?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BadgeCreateInput = {
    id?: string
    category: $Enums.BadgeCategory
    name: string
    description: string
    iconUrl: string
    pointsBonus: number
    rarity: $Enums.BadgeRarity
    createdAt?: Date | string
    userBadges?: UserBadgeCreateNestedManyWithoutBadgeInput
  }

  export type BadgeUncheckedCreateInput = {
    id?: string
    category: $Enums.BadgeCategory
    name: string
    description: string
    iconUrl: string
    pointsBonus: number
    rarity: $Enums.BadgeRarity
    createdAt?: Date | string
    userBadges?: UserBadgeUncheckedCreateNestedManyWithoutBadgeInput
  }

  export type BadgeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumBadgeCategoryFieldUpdateOperationsInput | $Enums.BadgeCategory
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    pointsBonus?: IntFieldUpdateOperationsInput | number
    rarity?: EnumBadgeRarityFieldUpdateOperationsInput | $Enums.BadgeRarity
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userBadges?: UserBadgeUpdateManyWithoutBadgeNestedInput
  }

  export type BadgeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumBadgeCategoryFieldUpdateOperationsInput | $Enums.BadgeCategory
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    pointsBonus?: IntFieldUpdateOperationsInput | number
    rarity?: EnumBadgeRarityFieldUpdateOperationsInput | $Enums.BadgeRarity
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userBadges?: UserBadgeUncheckedUpdateManyWithoutBadgeNestedInput
  }

  export type BadgeCreateManyInput = {
    id?: string
    category: $Enums.BadgeCategory
    name: string
    description: string
    iconUrl: string
    pointsBonus: number
    rarity: $Enums.BadgeRarity
    createdAt?: Date | string
  }

  export type BadgeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumBadgeCategoryFieldUpdateOperationsInput | $Enums.BadgeCategory
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    pointsBonus?: IntFieldUpdateOperationsInput | number
    rarity?: EnumBadgeRarityFieldUpdateOperationsInput | $Enums.BadgeRarity
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BadgeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumBadgeCategoryFieldUpdateOperationsInput | $Enums.BadgeCategory
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    pointsBonus?: IntFieldUpdateOperationsInput | number
    rarity?: EnumBadgeRarityFieldUpdateOperationsInput | $Enums.BadgeRarity
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBadgeCreateInput = {
    id?: string
    earnedAt?: Date | string
    stats: UserStatsCreateNestedOneWithoutBadgesInput
    badge: BadgeCreateNestedOneWithoutUserBadgesInput
  }

  export type UserBadgeUncheckedCreateInput = {
    id?: string
    userId: string
    badgeId: string
    earnedAt?: Date | string
  }

  export type UserBadgeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: UserStatsUpdateOneRequiredWithoutBadgesNestedInput
    badge?: BadgeUpdateOneRequiredWithoutUserBadgesNestedInput
  }

  export type UserBadgeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    badgeId?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBadgeCreateManyInput = {
    id?: string
    userId: string
    badgeId: string
    earnedAt?: Date | string
  }

  export type UserBadgeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBadgeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    badgeId?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PointsTransactionListRelationFilter = {
    every?: PointsTransactionWhereInput
    some?: PointsTransactionWhereInput
    none?: PointsTransactionWhereInput
  }

  export type UserBadgeListRelationFilter = {
    every?: UserBadgeWhereInput
    some?: UserBadgeWhereInput
    none?: UserBadgeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PointsTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserBadgeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserStatsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalPoints?: SortOrder
    eventsJoined?: SortOrder
    eventsCompleted?: SortOrder
    currentStreakDays?: SortOrder
    longestStreakDays?: SortOrder
    lastEventAt?: SortOrder
    kgWasteEstimated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserStatsAvgOrderByAggregateInput = {
    totalPoints?: SortOrder
    eventsJoined?: SortOrder
    eventsCompleted?: SortOrder
    currentStreakDays?: SortOrder
    longestStreakDays?: SortOrder
    kgWasteEstimated?: SortOrder
  }

  export type UserStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalPoints?: SortOrder
    eventsJoined?: SortOrder
    eventsCompleted?: SortOrder
    currentStreakDays?: SortOrder
    longestStreakDays?: SortOrder
    lastEventAt?: SortOrder
    kgWasteEstimated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserStatsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalPoints?: SortOrder
    eventsJoined?: SortOrder
    eventsCompleted?: SortOrder
    currentStreakDays?: SortOrder
    longestStreakDays?: SortOrder
    lastEventAt?: SortOrder
    kgWasteEstimated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserStatsSumOrderByAggregateInput = {
    totalPoints?: SortOrder
    eventsJoined?: SortOrder
    eventsCompleted?: SortOrder
    currentStreakDays?: SortOrder
    longestStreakDays?: SortOrder
    kgWasteEstimated?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumPointsReasonFilter<$PrismaModel = never> = {
    equals?: $Enums.PointsReason | EnumPointsReasonFieldRefInput<$PrismaModel>
    in?: $Enums.PointsReason[] | ListEnumPointsReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.PointsReason[] | ListEnumPointsReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumPointsReasonFilter<$PrismaModel> | $Enums.PointsReason
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserStatsRelationFilter = {
    is?: UserStatsWhereInput
    isNot?: UserStatsWhereInput
  }

  export type PointsTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    reason?: SortOrder
    eventId?: SortOrder
    mediaId?: SortOrder
    balanceAfter?: SortOrder
    createdAt?: SortOrder
  }

  export type PointsTransactionAvgOrderByAggregateInput = {
    points?: SortOrder
    balanceAfter?: SortOrder
  }

  export type PointsTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    reason?: SortOrder
    eventId?: SortOrder
    mediaId?: SortOrder
    balanceAfter?: SortOrder
    createdAt?: SortOrder
  }

  export type PointsTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    reason?: SortOrder
    eventId?: SortOrder
    mediaId?: SortOrder
    balanceAfter?: SortOrder
    createdAt?: SortOrder
  }

  export type PointsTransactionSumOrderByAggregateInput = {
    points?: SortOrder
    balanceAfter?: SortOrder
  }

  export type EnumPointsReasonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PointsReason | EnumPointsReasonFieldRefInput<$PrismaModel>
    in?: $Enums.PointsReason[] | ListEnumPointsReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.PointsReason[] | ListEnumPointsReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumPointsReasonWithAggregatesFilter<$PrismaModel> | $Enums.PointsReason
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPointsReasonFilter<$PrismaModel>
    _max?: NestedEnumPointsReasonFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumBadgeCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.BadgeCategory | EnumBadgeCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.BadgeCategory[] | ListEnumBadgeCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.BadgeCategory[] | ListEnumBadgeCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumBadgeCategoryFilter<$PrismaModel> | $Enums.BadgeCategory
  }

  export type EnumBadgeRarityFilter<$PrismaModel = never> = {
    equals?: $Enums.BadgeRarity | EnumBadgeRarityFieldRefInput<$PrismaModel>
    in?: $Enums.BadgeRarity[] | ListEnumBadgeRarityFieldRefInput<$PrismaModel>
    notIn?: $Enums.BadgeRarity[] | ListEnumBadgeRarityFieldRefInput<$PrismaModel>
    not?: NestedEnumBadgeRarityFilter<$PrismaModel> | $Enums.BadgeRarity
  }

  export type BadgeCountOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    name?: SortOrder
    description?: SortOrder
    iconUrl?: SortOrder
    pointsBonus?: SortOrder
    rarity?: SortOrder
    createdAt?: SortOrder
  }

  export type BadgeAvgOrderByAggregateInput = {
    pointsBonus?: SortOrder
  }

  export type BadgeMaxOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    name?: SortOrder
    description?: SortOrder
    iconUrl?: SortOrder
    pointsBonus?: SortOrder
    rarity?: SortOrder
    createdAt?: SortOrder
  }

  export type BadgeMinOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    name?: SortOrder
    description?: SortOrder
    iconUrl?: SortOrder
    pointsBonus?: SortOrder
    rarity?: SortOrder
    createdAt?: SortOrder
  }

  export type BadgeSumOrderByAggregateInput = {
    pointsBonus?: SortOrder
  }

  export type EnumBadgeCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BadgeCategory | EnumBadgeCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.BadgeCategory[] | ListEnumBadgeCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.BadgeCategory[] | ListEnumBadgeCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumBadgeCategoryWithAggregatesFilter<$PrismaModel> | $Enums.BadgeCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBadgeCategoryFilter<$PrismaModel>
    _max?: NestedEnumBadgeCategoryFilter<$PrismaModel>
  }

  export type EnumBadgeRarityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BadgeRarity | EnumBadgeRarityFieldRefInput<$PrismaModel>
    in?: $Enums.BadgeRarity[] | ListEnumBadgeRarityFieldRefInput<$PrismaModel>
    notIn?: $Enums.BadgeRarity[] | ListEnumBadgeRarityFieldRefInput<$PrismaModel>
    not?: NestedEnumBadgeRarityWithAggregatesFilter<$PrismaModel> | $Enums.BadgeRarity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBadgeRarityFilter<$PrismaModel>
    _max?: NestedEnumBadgeRarityFilter<$PrismaModel>
  }

  export type BadgeRelationFilter = {
    is?: BadgeWhereInput
    isNot?: BadgeWhereInput
  }

  export type UserBadgeUserIdBadgeIdCompoundUniqueInput = {
    userId: string
    badgeId: string
  }

  export type UserBadgeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    badgeId?: SortOrder
    earnedAt?: SortOrder
  }

  export type UserBadgeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    badgeId?: SortOrder
    earnedAt?: SortOrder
  }

  export type UserBadgeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    badgeId?: SortOrder
    earnedAt?: SortOrder
  }

  export type PointsTransactionCreateNestedManyWithoutStatsInput = {
    create?: XOR<PointsTransactionCreateWithoutStatsInput, PointsTransactionUncheckedCreateWithoutStatsInput> | PointsTransactionCreateWithoutStatsInput[] | PointsTransactionUncheckedCreateWithoutStatsInput[]
    connectOrCreate?: PointsTransactionCreateOrConnectWithoutStatsInput | PointsTransactionCreateOrConnectWithoutStatsInput[]
    createMany?: PointsTransactionCreateManyStatsInputEnvelope
    connect?: PointsTransactionWhereUniqueInput | PointsTransactionWhereUniqueInput[]
  }

  export type UserBadgeCreateNestedManyWithoutStatsInput = {
    create?: XOR<UserBadgeCreateWithoutStatsInput, UserBadgeUncheckedCreateWithoutStatsInput> | UserBadgeCreateWithoutStatsInput[] | UserBadgeUncheckedCreateWithoutStatsInput[]
    connectOrCreate?: UserBadgeCreateOrConnectWithoutStatsInput | UserBadgeCreateOrConnectWithoutStatsInput[]
    createMany?: UserBadgeCreateManyStatsInputEnvelope
    connect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
  }

  export type PointsTransactionUncheckedCreateNestedManyWithoutStatsInput = {
    create?: XOR<PointsTransactionCreateWithoutStatsInput, PointsTransactionUncheckedCreateWithoutStatsInput> | PointsTransactionCreateWithoutStatsInput[] | PointsTransactionUncheckedCreateWithoutStatsInput[]
    connectOrCreate?: PointsTransactionCreateOrConnectWithoutStatsInput | PointsTransactionCreateOrConnectWithoutStatsInput[]
    createMany?: PointsTransactionCreateManyStatsInputEnvelope
    connect?: PointsTransactionWhereUniqueInput | PointsTransactionWhereUniqueInput[]
  }

  export type UserBadgeUncheckedCreateNestedManyWithoutStatsInput = {
    create?: XOR<UserBadgeCreateWithoutStatsInput, UserBadgeUncheckedCreateWithoutStatsInput> | UserBadgeCreateWithoutStatsInput[] | UserBadgeUncheckedCreateWithoutStatsInput[]
    connectOrCreate?: UserBadgeCreateOrConnectWithoutStatsInput | UserBadgeCreateOrConnectWithoutStatsInput[]
    createMany?: UserBadgeCreateManyStatsInputEnvelope
    connect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PointsTransactionUpdateManyWithoutStatsNestedInput = {
    create?: XOR<PointsTransactionCreateWithoutStatsInput, PointsTransactionUncheckedCreateWithoutStatsInput> | PointsTransactionCreateWithoutStatsInput[] | PointsTransactionUncheckedCreateWithoutStatsInput[]
    connectOrCreate?: PointsTransactionCreateOrConnectWithoutStatsInput | PointsTransactionCreateOrConnectWithoutStatsInput[]
    upsert?: PointsTransactionUpsertWithWhereUniqueWithoutStatsInput | PointsTransactionUpsertWithWhereUniqueWithoutStatsInput[]
    createMany?: PointsTransactionCreateManyStatsInputEnvelope
    set?: PointsTransactionWhereUniqueInput | PointsTransactionWhereUniqueInput[]
    disconnect?: PointsTransactionWhereUniqueInput | PointsTransactionWhereUniqueInput[]
    delete?: PointsTransactionWhereUniqueInput | PointsTransactionWhereUniqueInput[]
    connect?: PointsTransactionWhereUniqueInput | PointsTransactionWhereUniqueInput[]
    update?: PointsTransactionUpdateWithWhereUniqueWithoutStatsInput | PointsTransactionUpdateWithWhereUniqueWithoutStatsInput[]
    updateMany?: PointsTransactionUpdateManyWithWhereWithoutStatsInput | PointsTransactionUpdateManyWithWhereWithoutStatsInput[]
    deleteMany?: PointsTransactionScalarWhereInput | PointsTransactionScalarWhereInput[]
  }

  export type UserBadgeUpdateManyWithoutStatsNestedInput = {
    create?: XOR<UserBadgeCreateWithoutStatsInput, UserBadgeUncheckedCreateWithoutStatsInput> | UserBadgeCreateWithoutStatsInput[] | UserBadgeUncheckedCreateWithoutStatsInput[]
    connectOrCreate?: UserBadgeCreateOrConnectWithoutStatsInput | UserBadgeCreateOrConnectWithoutStatsInput[]
    upsert?: UserBadgeUpsertWithWhereUniqueWithoutStatsInput | UserBadgeUpsertWithWhereUniqueWithoutStatsInput[]
    createMany?: UserBadgeCreateManyStatsInputEnvelope
    set?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    disconnect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    delete?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    connect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    update?: UserBadgeUpdateWithWhereUniqueWithoutStatsInput | UserBadgeUpdateWithWhereUniqueWithoutStatsInput[]
    updateMany?: UserBadgeUpdateManyWithWhereWithoutStatsInput | UserBadgeUpdateManyWithWhereWithoutStatsInput[]
    deleteMany?: UserBadgeScalarWhereInput | UserBadgeScalarWhereInput[]
  }

  export type PointsTransactionUncheckedUpdateManyWithoutStatsNestedInput = {
    create?: XOR<PointsTransactionCreateWithoutStatsInput, PointsTransactionUncheckedCreateWithoutStatsInput> | PointsTransactionCreateWithoutStatsInput[] | PointsTransactionUncheckedCreateWithoutStatsInput[]
    connectOrCreate?: PointsTransactionCreateOrConnectWithoutStatsInput | PointsTransactionCreateOrConnectWithoutStatsInput[]
    upsert?: PointsTransactionUpsertWithWhereUniqueWithoutStatsInput | PointsTransactionUpsertWithWhereUniqueWithoutStatsInput[]
    createMany?: PointsTransactionCreateManyStatsInputEnvelope
    set?: PointsTransactionWhereUniqueInput | PointsTransactionWhereUniqueInput[]
    disconnect?: PointsTransactionWhereUniqueInput | PointsTransactionWhereUniqueInput[]
    delete?: PointsTransactionWhereUniqueInput | PointsTransactionWhereUniqueInput[]
    connect?: PointsTransactionWhereUniqueInput | PointsTransactionWhereUniqueInput[]
    update?: PointsTransactionUpdateWithWhereUniqueWithoutStatsInput | PointsTransactionUpdateWithWhereUniqueWithoutStatsInput[]
    updateMany?: PointsTransactionUpdateManyWithWhereWithoutStatsInput | PointsTransactionUpdateManyWithWhereWithoutStatsInput[]
    deleteMany?: PointsTransactionScalarWhereInput | PointsTransactionScalarWhereInput[]
  }

  export type UserBadgeUncheckedUpdateManyWithoutStatsNestedInput = {
    create?: XOR<UserBadgeCreateWithoutStatsInput, UserBadgeUncheckedCreateWithoutStatsInput> | UserBadgeCreateWithoutStatsInput[] | UserBadgeUncheckedCreateWithoutStatsInput[]
    connectOrCreate?: UserBadgeCreateOrConnectWithoutStatsInput | UserBadgeCreateOrConnectWithoutStatsInput[]
    upsert?: UserBadgeUpsertWithWhereUniqueWithoutStatsInput | UserBadgeUpsertWithWhereUniqueWithoutStatsInput[]
    createMany?: UserBadgeCreateManyStatsInputEnvelope
    set?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    disconnect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    delete?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    connect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    update?: UserBadgeUpdateWithWhereUniqueWithoutStatsInput | UserBadgeUpdateWithWhereUniqueWithoutStatsInput[]
    updateMany?: UserBadgeUpdateManyWithWhereWithoutStatsInput | UserBadgeUpdateManyWithWhereWithoutStatsInput[]
    deleteMany?: UserBadgeScalarWhereInput | UserBadgeScalarWhereInput[]
  }

  export type UserStatsCreateNestedOneWithoutPointsHistoryInput = {
    create?: XOR<UserStatsCreateWithoutPointsHistoryInput, UserStatsUncheckedCreateWithoutPointsHistoryInput>
    connectOrCreate?: UserStatsCreateOrConnectWithoutPointsHistoryInput
    connect?: UserStatsWhereUniqueInput
  }

  export type EnumPointsReasonFieldUpdateOperationsInput = {
    set?: $Enums.PointsReason
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserStatsUpdateOneRequiredWithoutPointsHistoryNestedInput = {
    create?: XOR<UserStatsCreateWithoutPointsHistoryInput, UserStatsUncheckedCreateWithoutPointsHistoryInput>
    connectOrCreate?: UserStatsCreateOrConnectWithoutPointsHistoryInput
    upsert?: UserStatsUpsertWithoutPointsHistoryInput
    connect?: UserStatsWhereUniqueInput
    update?: XOR<XOR<UserStatsUpdateToOneWithWhereWithoutPointsHistoryInput, UserStatsUpdateWithoutPointsHistoryInput>, UserStatsUncheckedUpdateWithoutPointsHistoryInput>
  }

  export type UserBadgeCreateNestedManyWithoutBadgeInput = {
    create?: XOR<UserBadgeCreateWithoutBadgeInput, UserBadgeUncheckedCreateWithoutBadgeInput> | UserBadgeCreateWithoutBadgeInput[] | UserBadgeUncheckedCreateWithoutBadgeInput[]
    connectOrCreate?: UserBadgeCreateOrConnectWithoutBadgeInput | UserBadgeCreateOrConnectWithoutBadgeInput[]
    createMany?: UserBadgeCreateManyBadgeInputEnvelope
    connect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
  }

  export type UserBadgeUncheckedCreateNestedManyWithoutBadgeInput = {
    create?: XOR<UserBadgeCreateWithoutBadgeInput, UserBadgeUncheckedCreateWithoutBadgeInput> | UserBadgeCreateWithoutBadgeInput[] | UserBadgeUncheckedCreateWithoutBadgeInput[]
    connectOrCreate?: UserBadgeCreateOrConnectWithoutBadgeInput | UserBadgeCreateOrConnectWithoutBadgeInput[]
    createMany?: UserBadgeCreateManyBadgeInputEnvelope
    connect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
  }

  export type EnumBadgeCategoryFieldUpdateOperationsInput = {
    set?: $Enums.BadgeCategory
  }

  export type EnumBadgeRarityFieldUpdateOperationsInput = {
    set?: $Enums.BadgeRarity
  }

  export type UserBadgeUpdateManyWithoutBadgeNestedInput = {
    create?: XOR<UserBadgeCreateWithoutBadgeInput, UserBadgeUncheckedCreateWithoutBadgeInput> | UserBadgeCreateWithoutBadgeInput[] | UserBadgeUncheckedCreateWithoutBadgeInput[]
    connectOrCreate?: UserBadgeCreateOrConnectWithoutBadgeInput | UserBadgeCreateOrConnectWithoutBadgeInput[]
    upsert?: UserBadgeUpsertWithWhereUniqueWithoutBadgeInput | UserBadgeUpsertWithWhereUniqueWithoutBadgeInput[]
    createMany?: UserBadgeCreateManyBadgeInputEnvelope
    set?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    disconnect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    delete?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    connect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    update?: UserBadgeUpdateWithWhereUniqueWithoutBadgeInput | UserBadgeUpdateWithWhereUniqueWithoutBadgeInput[]
    updateMany?: UserBadgeUpdateManyWithWhereWithoutBadgeInput | UserBadgeUpdateManyWithWhereWithoutBadgeInput[]
    deleteMany?: UserBadgeScalarWhereInput | UserBadgeScalarWhereInput[]
  }

  export type UserBadgeUncheckedUpdateManyWithoutBadgeNestedInput = {
    create?: XOR<UserBadgeCreateWithoutBadgeInput, UserBadgeUncheckedCreateWithoutBadgeInput> | UserBadgeCreateWithoutBadgeInput[] | UserBadgeUncheckedCreateWithoutBadgeInput[]
    connectOrCreate?: UserBadgeCreateOrConnectWithoutBadgeInput | UserBadgeCreateOrConnectWithoutBadgeInput[]
    upsert?: UserBadgeUpsertWithWhereUniqueWithoutBadgeInput | UserBadgeUpsertWithWhereUniqueWithoutBadgeInput[]
    createMany?: UserBadgeCreateManyBadgeInputEnvelope
    set?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    disconnect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    delete?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    connect?: UserBadgeWhereUniqueInput | UserBadgeWhereUniqueInput[]
    update?: UserBadgeUpdateWithWhereUniqueWithoutBadgeInput | UserBadgeUpdateWithWhereUniqueWithoutBadgeInput[]
    updateMany?: UserBadgeUpdateManyWithWhereWithoutBadgeInput | UserBadgeUpdateManyWithWhereWithoutBadgeInput[]
    deleteMany?: UserBadgeScalarWhereInput | UserBadgeScalarWhereInput[]
  }

  export type UserStatsCreateNestedOneWithoutBadgesInput = {
    create?: XOR<UserStatsCreateWithoutBadgesInput, UserStatsUncheckedCreateWithoutBadgesInput>
    connectOrCreate?: UserStatsCreateOrConnectWithoutBadgesInput
    connect?: UserStatsWhereUniqueInput
  }

  export type BadgeCreateNestedOneWithoutUserBadgesInput = {
    create?: XOR<BadgeCreateWithoutUserBadgesInput, BadgeUncheckedCreateWithoutUserBadgesInput>
    connectOrCreate?: BadgeCreateOrConnectWithoutUserBadgesInput
    connect?: BadgeWhereUniqueInput
  }

  export type UserStatsUpdateOneRequiredWithoutBadgesNestedInput = {
    create?: XOR<UserStatsCreateWithoutBadgesInput, UserStatsUncheckedCreateWithoutBadgesInput>
    connectOrCreate?: UserStatsCreateOrConnectWithoutBadgesInput
    upsert?: UserStatsUpsertWithoutBadgesInput
    connect?: UserStatsWhereUniqueInput
    update?: XOR<XOR<UserStatsUpdateToOneWithWhereWithoutBadgesInput, UserStatsUpdateWithoutBadgesInput>, UserStatsUncheckedUpdateWithoutBadgesInput>
  }

  export type BadgeUpdateOneRequiredWithoutUserBadgesNestedInput = {
    create?: XOR<BadgeCreateWithoutUserBadgesInput, BadgeUncheckedCreateWithoutUserBadgesInput>
    connectOrCreate?: BadgeCreateOrConnectWithoutUserBadgesInput
    upsert?: BadgeUpsertWithoutUserBadgesInput
    connect?: BadgeWhereUniqueInput
    update?: XOR<XOR<BadgeUpdateToOneWithWhereWithoutUserBadgesInput, BadgeUpdateWithoutUserBadgesInput>, BadgeUncheckedUpdateWithoutUserBadgesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumPointsReasonFilter<$PrismaModel = never> = {
    equals?: $Enums.PointsReason | EnumPointsReasonFieldRefInput<$PrismaModel>
    in?: $Enums.PointsReason[] | ListEnumPointsReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.PointsReason[] | ListEnumPointsReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumPointsReasonFilter<$PrismaModel> | $Enums.PointsReason
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumPointsReasonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PointsReason | EnumPointsReasonFieldRefInput<$PrismaModel>
    in?: $Enums.PointsReason[] | ListEnumPointsReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.PointsReason[] | ListEnumPointsReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumPointsReasonWithAggregatesFilter<$PrismaModel> | $Enums.PointsReason
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPointsReasonFilter<$PrismaModel>
    _max?: NestedEnumPointsReasonFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumBadgeCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.BadgeCategory | EnumBadgeCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.BadgeCategory[] | ListEnumBadgeCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.BadgeCategory[] | ListEnumBadgeCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumBadgeCategoryFilter<$PrismaModel> | $Enums.BadgeCategory
  }

  export type NestedEnumBadgeRarityFilter<$PrismaModel = never> = {
    equals?: $Enums.BadgeRarity | EnumBadgeRarityFieldRefInput<$PrismaModel>
    in?: $Enums.BadgeRarity[] | ListEnumBadgeRarityFieldRefInput<$PrismaModel>
    notIn?: $Enums.BadgeRarity[] | ListEnumBadgeRarityFieldRefInput<$PrismaModel>
    not?: NestedEnumBadgeRarityFilter<$PrismaModel> | $Enums.BadgeRarity
  }

  export type NestedEnumBadgeCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BadgeCategory | EnumBadgeCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.BadgeCategory[] | ListEnumBadgeCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.BadgeCategory[] | ListEnumBadgeCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumBadgeCategoryWithAggregatesFilter<$PrismaModel> | $Enums.BadgeCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBadgeCategoryFilter<$PrismaModel>
    _max?: NestedEnumBadgeCategoryFilter<$PrismaModel>
  }

  export type NestedEnumBadgeRarityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BadgeRarity | EnumBadgeRarityFieldRefInput<$PrismaModel>
    in?: $Enums.BadgeRarity[] | ListEnumBadgeRarityFieldRefInput<$PrismaModel>
    notIn?: $Enums.BadgeRarity[] | ListEnumBadgeRarityFieldRefInput<$PrismaModel>
    not?: NestedEnumBadgeRarityWithAggregatesFilter<$PrismaModel> | $Enums.BadgeRarity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBadgeRarityFilter<$PrismaModel>
    _max?: NestedEnumBadgeRarityFilter<$PrismaModel>
  }

  export type PointsTransactionCreateWithoutStatsInput = {
    id?: string
    points: number
    reason: $Enums.PointsReason
    eventId?: string | null
    mediaId?: string | null
    balanceAfter: number
    createdAt?: Date | string
  }

  export type PointsTransactionUncheckedCreateWithoutStatsInput = {
    id?: string
    points: number
    reason: $Enums.PointsReason
    eventId?: string | null
    mediaId?: string | null
    balanceAfter: number
    createdAt?: Date | string
  }

  export type PointsTransactionCreateOrConnectWithoutStatsInput = {
    where: PointsTransactionWhereUniqueInput
    create: XOR<PointsTransactionCreateWithoutStatsInput, PointsTransactionUncheckedCreateWithoutStatsInput>
  }

  export type PointsTransactionCreateManyStatsInputEnvelope = {
    data: PointsTransactionCreateManyStatsInput | PointsTransactionCreateManyStatsInput[]
    skipDuplicates?: boolean
  }

  export type UserBadgeCreateWithoutStatsInput = {
    id?: string
    earnedAt?: Date | string
    badge: BadgeCreateNestedOneWithoutUserBadgesInput
  }

  export type UserBadgeUncheckedCreateWithoutStatsInput = {
    id?: string
    badgeId: string
    earnedAt?: Date | string
  }

  export type UserBadgeCreateOrConnectWithoutStatsInput = {
    where: UserBadgeWhereUniqueInput
    create: XOR<UserBadgeCreateWithoutStatsInput, UserBadgeUncheckedCreateWithoutStatsInput>
  }

  export type UserBadgeCreateManyStatsInputEnvelope = {
    data: UserBadgeCreateManyStatsInput | UserBadgeCreateManyStatsInput[]
    skipDuplicates?: boolean
  }

  export type PointsTransactionUpsertWithWhereUniqueWithoutStatsInput = {
    where: PointsTransactionWhereUniqueInput
    update: XOR<PointsTransactionUpdateWithoutStatsInput, PointsTransactionUncheckedUpdateWithoutStatsInput>
    create: XOR<PointsTransactionCreateWithoutStatsInput, PointsTransactionUncheckedCreateWithoutStatsInput>
  }

  export type PointsTransactionUpdateWithWhereUniqueWithoutStatsInput = {
    where: PointsTransactionWhereUniqueInput
    data: XOR<PointsTransactionUpdateWithoutStatsInput, PointsTransactionUncheckedUpdateWithoutStatsInput>
  }

  export type PointsTransactionUpdateManyWithWhereWithoutStatsInput = {
    where: PointsTransactionScalarWhereInput
    data: XOR<PointsTransactionUpdateManyMutationInput, PointsTransactionUncheckedUpdateManyWithoutStatsInput>
  }

  export type PointsTransactionScalarWhereInput = {
    AND?: PointsTransactionScalarWhereInput | PointsTransactionScalarWhereInput[]
    OR?: PointsTransactionScalarWhereInput[]
    NOT?: PointsTransactionScalarWhereInput | PointsTransactionScalarWhereInput[]
    id?: StringFilter<"PointsTransaction"> | string
    userId?: StringFilter<"PointsTransaction"> | string
    points?: IntFilter<"PointsTransaction"> | number
    reason?: EnumPointsReasonFilter<"PointsTransaction"> | $Enums.PointsReason
    eventId?: StringNullableFilter<"PointsTransaction"> | string | null
    mediaId?: StringNullableFilter<"PointsTransaction"> | string | null
    balanceAfter?: IntFilter<"PointsTransaction"> | number
    createdAt?: DateTimeFilter<"PointsTransaction"> | Date | string
  }

  export type UserBadgeUpsertWithWhereUniqueWithoutStatsInput = {
    where: UserBadgeWhereUniqueInput
    update: XOR<UserBadgeUpdateWithoutStatsInput, UserBadgeUncheckedUpdateWithoutStatsInput>
    create: XOR<UserBadgeCreateWithoutStatsInput, UserBadgeUncheckedCreateWithoutStatsInput>
  }

  export type UserBadgeUpdateWithWhereUniqueWithoutStatsInput = {
    where: UserBadgeWhereUniqueInput
    data: XOR<UserBadgeUpdateWithoutStatsInput, UserBadgeUncheckedUpdateWithoutStatsInput>
  }

  export type UserBadgeUpdateManyWithWhereWithoutStatsInput = {
    where: UserBadgeScalarWhereInput
    data: XOR<UserBadgeUpdateManyMutationInput, UserBadgeUncheckedUpdateManyWithoutStatsInput>
  }

  export type UserBadgeScalarWhereInput = {
    AND?: UserBadgeScalarWhereInput | UserBadgeScalarWhereInput[]
    OR?: UserBadgeScalarWhereInput[]
    NOT?: UserBadgeScalarWhereInput | UserBadgeScalarWhereInput[]
    id?: StringFilter<"UserBadge"> | string
    userId?: StringFilter<"UserBadge"> | string
    badgeId?: StringFilter<"UserBadge"> | string
    earnedAt?: DateTimeFilter<"UserBadge"> | Date | string
  }

  export type UserStatsCreateWithoutPointsHistoryInput = {
    id?: string
    userId: string
    totalPoints?: number
    eventsJoined?: number
    eventsCompleted?: number
    currentStreakDays?: number
    longestStreakDays?: number
    lastEventAt?: Date | string | null
    kgWasteEstimated?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    badges?: UserBadgeCreateNestedManyWithoutStatsInput
  }

  export type UserStatsUncheckedCreateWithoutPointsHistoryInput = {
    id?: string
    userId: string
    totalPoints?: number
    eventsJoined?: number
    eventsCompleted?: number
    currentStreakDays?: number
    longestStreakDays?: number
    lastEventAt?: Date | string | null
    kgWasteEstimated?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    badges?: UserBadgeUncheckedCreateNestedManyWithoutStatsInput
  }

  export type UserStatsCreateOrConnectWithoutPointsHistoryInput = {
    where: UserStatsWhereUniqueInput
    create: XOR<UserStatsCreateWithoutPointsHistoryInput, UserStatsUncheckedCreateWithoutPointsHistoryInput>
  }

  export type UserStatsUpsertWithoutPointsHistoryInput = {
    update: XOR<UserStatsUpdateWithoutPointsHistoryInput, UserStatsUncheckedUpdateWithoutPointsHistoryInput>
    create: XOR<UserStatsCreateWithoutPointsHistoryInput, UserStatsUncheckedCreateWithoutPointsHistoryInput>
    where?: UserStatsWhereInput
  }

  export type UserStatsUpdateToOneWithWhereWithoutPointsHistoryInput = {
    where?: UserStatsWhereInput
    data: XOR<UserStatsUpdateWithoutPointsHistoryInput, UserStatsUncheckedUpdateWithoutPointsHistoryInput>
  }

  export type UserStatsUpdateWithoutPointsHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalPoints?: IntFieldUpdateOperationsInput | number
    eventsJoined?: IntFieldUpdateOperationsInput | number
    eventsCompleted?: IntFieldUpdateOperationsInput | number
    currentStreakDays?: IntFieldUpdateOperationsInput | number
    longestStreakDays?: IntFieldUpdateOperationsInput | number
    lastEventAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kgWasteEstimated?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    badges?: UserBadgeUpdateManyWithoutStatsNestedInput
  }

  export type UserStatsUncheckedUpdateWithoutPointsHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalPoints?: IntFieldUpdateOperationsInput | number
    eventsJoined?: IntFieldUpdateOperationsInput | number
    eventsCompleted?: IntFieldUpdateOperationsInput | number
    currentStreakDays?: IntFieldUpdateOperationsInput | number
    longestStreakDays?: IntFieldUpdateOperationsInput | number
    lastEventAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kgWasteEstimated?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    badges?: UserBadgeUncheckedUpdateManyWithoutStatsNestedInput
  }

  export type UserBadgeCreateWithoutBadgeInput = {
    id?: string
    earnedAt?: Date | string
    stats: UserStatsCreateNestedOneWithoutBadgesInput
  }

  export type UserBadgeUncheckedCreateWithoutBadgeInput = {
    id?: string
    userId: string
    earnedAt?: Date | string
  }

  export type UserBadgeCreateOrConnectWithoutBadgeInput = {
    where: UserBadgeWhereUniqueInput
    create: XOR<UserBadgeCreateWithoutBadgeInput, UserBadgeUncheckedCreateWithoutBadgeInput>
  }

  export type UserBadgeCreateManyBadgeInputEnvelope = {
    data: UserBadgeCreateManyBadgeInput | UserBadgeCreateManyBadgeInput[]
    skipDuplicates?: boolean
  }

  export type UserBadgeUpsertWithWhereUniqueWithoutBadgeInput = {
    where: UserBadgeWhereUniqueInput
    update: XOR<UserBadgeUpdateWithoutBadgeInput, UserBadgeUncheckedUpdateWithoutBadgeInput>
    create: XOR<UserBadgeCreateWithoutBadgeInput, UserBadgeUncheckedCreateWithoutBadgeInput>
  }

  export type UserBadgeUpdateWithWhereUniqueWithoutBadgeInput = {
    where: UserBadgeWhereUniqueInput
    data: XOR<UserBadgeUpdateWithoutBadgeInput, UserBadgeUncheckedUpdateWithoutBadgeInput>
  }

  export type UserBadgeUpdateManyWithWhereWithoutBadgeInput = {
    where: UserBadgeScalarWhereInput
    data: XOR<UserBadgeUpdateManyMutationInput, UserBadgeUncheckedUpdateManyWithoutBadgeInput>
  }

  export type UserStatsCreateWithoutBadgesInput = {
    id?: string
    userId: string
    totalPoints?: number
    eventsJoined?: number
    eventsCompleted?: number
    currentStreakDays?: number
    longestStreakDays?: number
    lastEventAt?: Date | string | null
    kgWasteEstimated?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    pointsHistory?: PointsTransactionCreateNestedManyWithoutStatsInput
  }

  export type UserStatsUncheckedCreateWithoutBadgesInput = {
    id?: string
    userId: string
    totalPoints?: number
    eventsJoined?: number
    eventsCompleted?: number
    currentStreakDays?: number
    longestStreakDays?: number
    lastEventAt?: Date | string | null
    kgWasteEstimated?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    pointsHistory?: PointsTransactionUncheckedCreateNestedManyWithoutStatsInput
  }

  export type UserStatsCreateOrConnectWithoutBadgesInput = {
    where: UserStatsWhereUniqueInput
    create: XOR<UserStatsCreateWithoutBadgesInput, UserStatsUncheckedCreateWithoutBadgesInput>
  }

  export type BadgeCreateWithoutUserBadgesInput = {
    id?: string
    category: $Enums.BadgeCategory
    name: string
    description: string
    iconUrl: string
    pointsBonus: number
    rarity: $Enums.BadgeRarity
    createdAt?: Date | string
  }

  export type BadgeUncheckedCreateWithoutUserBadgesInput = {
    id?: string
    category: $Enums.BadgeCategory
    name: string
    description: string
    iconUrl: string
    pointsBonus: number
    rarity: $Enums.BadgeRarity
    createdAt?: Date | string
  }

  export type BadgeCreateOrConnectWithoutUserBadgesInput = {
    where: BadgeWhereUniqueInput
    create: XOR<BadgeCreateWithoutUserBadgesInput, BadgeUncheckedCreateWithoutUserBadgesInput>
  }

  export type UserStatsUpsertWithoutBadgesInput = {
    update: XOR<UserStatsUpdateWithoutBadgesInput, UserStatsUncheckedUpdateWithoutBadgesInput>
    create: XOR<UserStatsCreateWithoutBadgesInput, UserStatsUncheckedCreateWithoutBadgesInput>
    where?: UserStatsWhereInput
  }

  export type UserStatsUpdateToOneWithWhereWithoutBadgesInput = {
    where?: UserStatsWhereInput
    data: XOR<UserStatsUpdateWithoutBadgesInput, UserStatsUncheckedUpdateWithoutBadgesInput>
  }

  export type UserStatsUpdateWithoutBadgesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalPoints?: IntFieldUpdateOperationsInput | number
    eventsJoined?: IntFieldUpdateOperationsInput | number
    eventsCompleted?: IntFieldUpdateOperationsInput | number
    currentStreakDays?: IntFieldUpdateOperationsInput | number
    longestStreakDays?: IntFieldUpdateOperationsInput | number
    lastEventAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kgWasteEstimated?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pointsHistory?: PointsTransactionUpdateManyWithoutStatsNestedInput
  }

  export type UserStatsUncheckedUpdateWithoutBadgesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalPoints?: IntFieldUpdateOperationsInput | number
    eventsJoined?: IntFieldUpdateOperationsInput | number
    eventsCompleted?: IntFieldUpdateOperationsInput | number
    currentStreakDays?: IntFieldUpdateOperationsInput | number
    longestStreakDays?: IntFieldUpdateOperationsInput | number
    lastEventAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kgWasteEstimated?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pointsHistory?: PointsTransactionUncheckedUpdateManyWithoutStatsNestedInput
  }

  export type BadgeUpsertWithoutUserBadgesInput = {
    update: XOR<BadgeUpdateWithoutUserBadgesInput, BadgeUncheckedUpdateWithoutUserBadgesInput>
    create: XOR<BadgeCreateWithoutUserBadgesInput, BadgeUncheckedCreateWithoutUserBadgesInput>
    where?: BadgeWhereInput
  }

  export type BadgeUpdateToOneWithWhereWithoutUserBadgesInput = {
    where?: BadgeWhereInput
    data: XOR<BadgeUpdateWithoutUserBadgesInput, BadgeUncheckedUpdateWithoutUserBadgesInput>
  }

  export type BadgeUpdateWithoutUserBadgesInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumBadgeCategoryFieldUpdateOperationsInput | $Enums.BadgeCategory
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    pointsBonus?: IntFieldUpdateOperationsInput | number
    rarity?: EnumBadgeRarityFieldUpdateOperationsInput | $Enums.BadgeRarity
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BadgeUncheckedUpdateWithoutUserBadgesInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumBadgeCategoryFieldUpdateOperationsInput | $Enums.BadgeCategory
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    pointsBonus?: IntFieldUpdateOperationsInput | number
    rarity?: EnumBadgeRarityFieldUpdateOperationsInput | $Enums.BadgeRarity
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointsTransactionCreateManyStatsInput = {
    id?: string
    points: number
    reason: $Enums.PointsReason
    eventId?: string | null
    mediaId?: string | null
    balanceAfter: number
    createdAt?: Date | string
  }

  export type UserBadgeCreateManyStatsInput = {
    id?: string
    badgeId: string
    earnedAt?: Date | string
  }

  export type PointsTransactionUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: EnumPointsReasonFieldUpdateOperationsInput | $Enums.PointsReason
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
    mediaId?: NullableStringFieldUpdateOperationsInput | string | null
    balanceAfter?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointsTransactionUncheckedUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: EnumPointsReasonFieldUpdateOperationsInput | $Enums.PointsReason
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
    mediaId?: NullableStringFieldUpdateOperationsInput | string | null
    balanceAfter?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointsTransactionUncheckedUpdateManyWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: EnumPointsReasonFieldUpdateOperationsInput | $Enums.PointsReason
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
    mediaId?: NullableStringFieldUpdateOperationsInput | string | null
    balanceAfter?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBadgeUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    badge?: BadgeUpdateOneRequiredWithoutUserBadgesNestedInput
  }

  export type UserBadgeUncheckedUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    badgeId?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBadgeUncheckedUpdateManyWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    badgeId?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBadgeCreateManyBadgeInput = {
    id?: string
    userId: string
    earnedAt?: Date | string
  }

  export type UserBadgeUpdateWithoutBadgeInput = {
    id?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: UserStatsUpdateOneRequiredWithoutBadgesNestedInput
  }

  export type UserBadgeUncheckedUpdateWithoutBadgeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBadgeUncheckedUpdateManyWithoutBadgeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    earnedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserStatsCountOutputTypeDefaultArgs instead
     */
    export type UserStatsCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserStatsCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BadgeCountOutputTypeDefaultArgs instead
     */
    export type BadgeCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BadgeCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserStatsDefaultArgs instead
     */
    export type UserStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserStatsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PointsTransactionDefaultArgs instead
     */
    export type PointsTransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PointsTransactionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BadgeDefaultArgs instead
     */
    export type BadgeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BadgeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserBadgeDefaultArgs instead
     */
    export type UserBadgeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserBadgeDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}