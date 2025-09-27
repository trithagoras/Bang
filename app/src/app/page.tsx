import TabView from "./components/TabView";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-6 space-y-6 text-center">
        <h1 className="text-6xl text-blue-500 font-bold my-24">Bang!</h1>
        <TabView />
      </div>
    </main>
  );
}
