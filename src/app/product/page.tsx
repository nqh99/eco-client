import React from "react";

export default function Home() {

  return (
    <main className="px-10">
      <div className="bg-slate-400">Sub Nav</div>
      <div className="flex flex-row gap-3">
        <div className="bg-white w-3/4">Product Detail</div>
        <div className="bg-white w-1/4">Order Information</div>
      </div>
      <div>San pham lien quan</div>
      <div>Promise Section</div>
    </main>
  );
}
