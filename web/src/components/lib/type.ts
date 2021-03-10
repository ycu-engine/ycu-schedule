/* eslint-disable @typescript-eslint/no-explicit-any */
type NumericChars = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
type TupleLength<T extends any[]> = any[] extends T ? never : T["length"]
// from microsoft/TypeScript#40336
type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ""
  ? []
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S]
// used by MakeZeroTuple
interface MakeTuplesMap<T extends any[]> {
  "0": []
  "1": [...T]
  "2": [...T, ...T]
  "3": [...T, ...T, ...T]
  "4": [...T, ...T, ...T, ...T]
  "5": [...T, ...T, ...T, ...T, ...T]
  "6": [...T, ...T, ...T, ...T, ...T, ...T]
  "7": [...T, ...T, ...T, ...T, ...T, ...T, ...T]
  "8": [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T]
  "9": [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T]
  // (extra field)
  "10": [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T]
}
/**
 * Makes a tuple filled with '0' (T must be the tuple of NumericChars[])
 * @samples
 * type Test1 = TupleLength<MakeZeroTuple<['2', '1', '0']>>;
 * // --> 210
 */
type MakeZeroTuple<T extends any[]> = T extends NumericChars[]
  ? NumericChars[] extends T
    ? []
    : T extends []
    ? []
    : T extends [...infer U, infer V]
    ? V extends NumericChars
      ? [...MakeTuplesMap<MakeZeroTuple<U>>["10"], ...MakeTuplesMap<["0"]>[V]]
      : []
    : MakeTuplesMap<["0"]>[T[0]]
  : []
type ConcatTuple<A extends any[], B extends any[]> = [...A, ...B]
/** Check whether T is either a numeric literal or 'numeric string' literal */
type CheckIsNumeric<
  T extends string | number | bigint
> = `${T}` extends `-${infer U}`
  ? U extends `-${any}`
    ? false
    : CheckIsNumeric<U>
  : `${T}` extends `${NumericChars}${infer U}`
  ? U extends ""
    ? true
    : CheckIsNumeric<U>
  : false
type AddInner<A extends string[], B extends string[]> = ConcatTuple<
  MakeZeroTuple<A>,
  MakeZeroTuple<B>
>
type SubInner<A extends string[], B extends string[]> =
  // store the result of MakeZeroTuple to RA
  MakeZeroTuple<A> extends [...infer RA]
    ? // store the result of MakeZeroTuple to RB
      MakeZeroTuple<B> extends [...infer RB]
      ? RA extends [...RB, ...infer R]
        ? TupleLength<R>
        : RB extends [...RA, ...infer R]
        ? `-${TupleLength<R>}`
        : never
      : never
    : never
/** Makes a type of sum result for A and B */
export type Add<
  A extends string | number | bigint,
  B extends string | number | bigint
> = CheckIsNumeric<A> & CheckIsNumeric<B> extends true
  ? `${A}` extends `-${infer P}`
    ? `${B}` extends `-${infer Q}`
      ? // use [...infer R] to suppress errors
        // (`-${TupleLength<AddInner<...>>}` causes an error)
        AddInner<Split<P, "">, Split<Q, "">> extends [...infer R]
        ? `-${TupleLength<R>}`
        : never
      : SubInner<Split<`${B}`, "">, Split<P, "">>
    : `${B}` extends `-${infer Q}`
    ? SubInner<Split<`${A}`, "">, Split<Q, "">>
    : TupleLength<AddInner<Split<`${A}`, "">, Split<`${B}`, "">>>
  : never
/** Makes a type of subtraction result for A and B */
export type Sub<
  A extends string | number | bigint,
  B extends string | number | bigint
> = CheckIsNumeric<A> & CheckIsNumeric<B> extends true
  ? B extends `-${infer Q}`
    ? Add<A, Q>
    : Add<A, `-${B}`>
  : never
