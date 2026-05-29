import type { StratDetail, RoleDetail } from './types';

export function createStrat(strat: StratDetail): StratDetail {
  return strat;
}

export function fillRole(overrides: Partial<RoleDetail>, base: RoleDetail): RoleDetail {
  return {
    ...base,
    ...overrides,
  };
}
