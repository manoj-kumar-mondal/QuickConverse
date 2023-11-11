'use client';

import QuickConverse from "@/components/main/QuickConverse";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
import store from "@/state-manager/store";

export default function Home() {
  return (
    <main >
      <Provider store={store}>
        <RecoilRoot>
          <QuickConverse />
        </RecoilRoot>
      </Provider>
    </main>
  )
}
