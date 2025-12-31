"use client";
import Room from "./components/Room";
import Header from "./components/Header";
import Layout from "./components/Layout";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#19192C] font-sans ">
      <Header />
      <Layout />
    </div>
  );
}
