export type ToastPosition =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"

type LogicalToastPosition =
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"

export type ToastPositionWithLogical = ToastPosition | LogicalToastPosition

type LogicalPlacementMap = Record<
  LogicalToastPosition,
  { ltr: ToastPosition; rtl: ToastPosition }
>

const logicals: LogicalPlacementMap = {
  "top-start": { ltr: "top-left", rtl: "top-right" },
  "top-end": { ltr: "top-right", rtl: "top-left" },
  "bottom-start": { ltr: "bottom-left", rtl: "bottom-right" },
  "bottom-end": { ltr: "bottom-right", rtl: "bottom-left" },
}

export function getToastPlacement(
  position: ToastPositionWithLogical | undefined,
  dir: "ltr" | "rtl",
): ToastPosition {
  const computedPosition = position ?? "bottom"
  const logical = logicals[computedPosition as LogicalToastPosition]
  return logical?.[dir] ?? computedPosition
}
