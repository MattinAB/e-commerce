"use client";

import { AppStore, makeStore } from "@/redux/store/store";
import { useMemo } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useMemo<AppStore>(() => makeStore(), []);
  return <Provider store={store}>{children}</Provider>;
}
