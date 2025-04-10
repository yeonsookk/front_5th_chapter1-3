/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

/**
 * 의존성 배열이 변경될 때마다 함수를 호출하여 결과 반환
 * @param factory 메모이제이션할 값을 계산하는 콜백함수
 * @param _deps 의존성 배열 (값 변경시 메모이제이션 결과가 변경되는 값들)
 * @param _equals 비교 함수 (기본값: 얕은 비교)
 * @returns 메모이제이션된 값
 */
export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals
): T {
  // 이전 의존성 배열을 저장할 ref
  const ref = useRef(_deps);
  // 메모이제이션된 값을 저장할 ref
  const memoRef = useRef<T | null>(null);

  // 1. 처음 렌더링될 때(memoRef.current === null) factory 호출
  // 2. 의존성 배열이 변경될 때 (ref.current !== _deps) factory 호출
  if (memoRef.current === null || !_equals(ref.current, _deps)) {
    // 새 의존성 배열을 ref에 저장
    ref.current = _deps;
    // 새로운 값 계산 후 memoRef에 저장
    memoRef.current = factory();
  }

  // 메모이제이션된 값 반환 (null이 아님 보장)
  return memoRef.current as T;
}
