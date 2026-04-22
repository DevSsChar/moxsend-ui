"use client";

import { MoxsendProvider, useMoxsend } from "./context/MoxsendContext";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Toast from "./components/Toast";
import DashboardView from "./components/DashboardView";
import VariationsView from "./components/VariationsView";
import ComparisonView from "./components/ComparisonView";
import CSVUploadView from "./components/CSVUploadView";

function AppContent() {
  const { view } = useMoxsend();

  return (
    <>
      <Header />

      {view === "dashboard" && <DashboardView />}
      {view === "variations" && <VariationsView />}
      {view === "comparison" && <ComparisonView />}
      {view === "csv" && <CSVUploadView />}

      <BottomNav />
      <Toast />
    </>
  );
}

export default function Home() {
  return (
    <MoxsendProvider>
      <AppContent />
    </MoxsendProvider>
  );
}
