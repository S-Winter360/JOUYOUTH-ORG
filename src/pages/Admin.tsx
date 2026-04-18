import { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [authError, setAuthError] = useState("");
  const [dataError, setDataError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        fetchData();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setAuthError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      setAuthError(error.message);
    }
  };

  const fetchData = async () => {
    setDataError("");
    try {
      const vSnap = await getDocs(query(collection(db, "volunteers"), orderBy("createdAt", "desc")));
      setVolunteers(vSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      
      const mSnap = await getDocs(query(collection(db, "messages"), orderBy("createdAt", "desc")));
      setMessages(mSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error: any) {
      setDataError("Failed to load data. You may not be listed directly as an admin in Firebase rules.");
      console.error(error);
    }
  };

  if (loading) return <div className="pt-32 text-center text-text-muted">Loading...</div>;

  if (!user) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-4 max-w-sm text-center">
        <h1 className="text-3xl font-extrabold mb-6">Admin <span className="text-[#6366f1]">Login</span></h1>
        <div className="glass-card p-8">
          <p className="text-text-muted mb-6 text-sm">Please sign in with your Google account to access the dashboard.</p>
          <button onClick={handleLogin} className="btn-primary w-full">Sign in with Google</button>
          {authError && <p className="text-red-400 mt-4 text-xs">{authError}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold">Admin <span className="text-[#a855f7]">Dashboard</span></h1>
          <p className="text-text-muted text-sm mt-1">Logged in as {user.email}</p>
        </div>
        <button onClick={() => signOut(auth)} className="px-4 py-2 text-sm bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded hover:bg-[rgba(255,255,255,0.1)] transition-colors text-white">
          Sign Out
        </button>
      </div>

      {dataError && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-100 p-4 rounded-xl mb-8">
          {dataError}
        </div>
      )}

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-[rgba(255,255,255,0.1)] pb-2">Recent Volunteers ({volunteers.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left bg-[rgba(255,255,255,0.02)] rounded-xl overflow-hidden glass border border-[rgba(255,255,255,0.05)]">
              <thead className="bg-[rgba(255,255,255,0.05)] text-xs uppercase tracking-widest text-text-muted">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.05)] text-sm">
                {volunteers.map(v => (
                  <tr key={v.id} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <td className="p-4 font-medium">{v.fullName}</td>
                    <td className="p-4 text-text-muted">
                      <div>{v.email}</div>
                      <div>{v.phoneNumber}</div>
                    </td>
                    <td className="p-4 text-[#818cf8]">{v.role}</td>
                    <td className="p-4 text-text-muted">{new Date(v.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {volunteers.length === 0 && (
                  <tr><td colSpan={4} className="p-4 text-center text-text-muted">No volunteers found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-[rgba(255,255,255,0.1)] pb-2">Contact Messages ({messages.length})</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {messages.map(m => (
              <div key={m.id} className="glass-card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold">{m.name}</h4>
                    <a href={`mailto:${m.email}`} className="text-xs text-[#a855f7] hover:underline">{m.email}</a>
                  </div>
                  <span className="text-xs text-text-muted bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-text-muted whitespace-pre-wrap">{m.message}</p>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="text-text-muted col-span-2">No messages found.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
