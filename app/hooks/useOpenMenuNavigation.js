import { useState } from "react";

export function useOpen() {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
}
