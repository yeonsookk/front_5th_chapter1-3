export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입 비교
  // 동일한 참조 이거나, 둘다 null/undefined인 경우
  if (objA === objB) return true;

  // 한쪽만 null/undefined인 경우
  if (objA == null || objB == null) return false;

  // 타입 비교 {} != []
  if (typeof objA !== typeof objB) return false;

  // 2. 배열 비교
  if (Array.isArray(objA) && Array.isArray(objB)) {
    // 길이 비교
    if (objA.length !== objB.length) return false;

    // 요소 비교
    for (let i = 0; i < objA.length; i++) {
      if (objA[i] !== objB[i]) return false;
    }

    return true;
  }

  // 객체 비교
  if (typeof objA === "object" && typeof objB === "object") {
    // 객체 키 비교
    const keysA = Object.keys(objA as object);
    const keysB = Object.keys(objB as object);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (
        (objA as Record<string, unknown>)[key] !==
        (objB as Record<string, unknown>)[key]
      )
        return false;
    }

    return true;
  }

  // 3. 기본 타입 비교
  return objA === objB;
}
