import { useState } from "react";

export default function useOpen() {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
}
