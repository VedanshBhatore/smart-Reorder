export type TestStep =
  | { kind: "setup" }
  | { kind: "instructions"; flowIndex: 0 | 1 }
  | { kind: "running"; flowIndex: 0 | 1 }
  | { kind: "sus"; flowIndex: 0 | 1 }
  | { kind: "preference" }
  | { kind: "done" };
