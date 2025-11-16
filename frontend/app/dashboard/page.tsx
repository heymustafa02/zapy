// "use client";
// import { Appbar } from "@/components/Appbar";
// import { DarkButton } from "@/components/buttons/DarkButton";
// import { LinkButton } from "@/components/buttons/LinkButton";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { BACKEND_URL, HOOKS_URL } from "../config";
// import { useRouter } from "next/navigation";
// import { useSession, signIn } from "next-auth/react";

// interface Zap {
//   id: string;
//   triggerId: string;
//   userId: number;
//   actions: {
//     id: string;
//     zapId: string;
//     actionId: string;
//     sortingOrder: number;
//     type: {
//       id: string;
//       name: string;
//       image: string;
//     };
//   }[];
//   trigger: {
//     id: string;
//     zapId: string;
//     triggerId: string;
//     type: {
//       id: string;
//       name: string;
//       image: string;
//     };
//   };
// }

// function useZaps(token: string | undefined) {
//   const [loading, setLoading] = useState(true);
//   const [zaps, setZaps] = useState<Zap[]>([]);

//   useEffect(() => {
//     if (!token) return;
//     axios
//       .get(`${BACKEND_URL}/api/v1/zap`, {
//         headers: { Authorization: token },
//       })
//       .then((res) => setZaps(res.data.zaps))
//       .catch((e) => console.error(e))
//       .finally(() => setLoading(false));
//   }, [token]);

//   return { loading, zaps };
// }

// export default function ZapsPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [token, setToken] = useState<string | undefined>(undefined);

//   // 🔒 Redirect if unauthenticated
//   useEffect(() => {
//     if (status === "unauthenticated") {
//       signIn();
//     }
//   }, [status]);

//   // ✅ Safely read localStorage only on client
//   useEffect(() => {
//     if (session?.user?.accessToken) {
//       setToken(session.user.accessToken);
//     } else if (typeof window !== "undefined") {
//       const storedToken = localStorage.getItem("token");
//       if (storedToken) setToken(storedToken);
//     }
//   }, [session]);

//   const { loading, zaps } = useZaps(token);

//   if (status === "loading") {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <p className="text-gray-500">Checking authentication...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Appbar />
//       <div className="max-w-6xl mx-auto py-10 px-4">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold tracking-tight">My Zaps ⚡</h1>
//           <DarkButton onClick={() => router.push("/zap/create")}>
//             + Create Zap
//           </DarkButton>
//         </div>

//         {loading ? (
//           <p className="text-gray-500 text-center mt-10">
//             Loading your zaps...
//           </p>
//         ) : zaps.length === 0 ? (
//           <p className="text-gray-400 text-center mt-10">No zaps found yet.</p>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {zaps.map((z) => (
//               <ZapCard key={z.id} zap={z} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function ZapCard({ zap }: { zap: Zap }) {
//   const router = useRouter();
//   const webhookUrl = `${HOOKS_URL}/hooks/catch/1/${zap.id}`;

//   const handleTrigger = async () => {
//     try {
//       await axios.post(`${BACKEND_URL}/api/v1/test-trigger/${zap.id}`);
//       alert("✅ Test trigger executed successfully!");
//     } catch (err) {
//       alert("❌ Failed to test trigger. Check backend logs for details.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between border border-gray-100">
//       <div>
//         <div className="flex items-center gap-3 mb-3">
//           <img
//             src={zap.trigger?.type?.image || "https://via.placeholder.com/30"}
//             alt={zap.trigger?.type?.name || "Trigger"}
//             className="w-10 h-10 rounded-full border object-cover"
//           />
//           <span className="font-semibold">{zap.trigger?.type?.name}</span>
//           <span className="text-gray-400">→</span>
//           {zap.actions.map((action) => (
//             <img
//               key={action.id}
//               src={action.type.image}
//               alt={action.type.name}
//               className="w-8 h-8 rounded-full border object-cover"
//             />
//           ))}
//         </div>

//         <div className="text-xs text-gray-400 mb-1">
//           <strong>ID:</strong> {zap.id}
//         </div>

//         <div className="text-xs text-gray-400 break-all">
//           <strong>Webhook:</strong> {webhookUrl}
//         </div>
//       </div>

//       <div className="flex justify-between items-center mt-5">
//         <LinkButton onClick={() => router.push(`/zap/${zap.id}`)}>
//           Open
//         </LinkButton>
//         <button
//           onClick={handleTrigger}
//           className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1.5 rounded-md transition-all"
//         >
//           Trigger Test
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { Appbar } from "@/components/Appbar";
import { DarkButton } from "@/components/buttons/DarkButton";
import { LinkButton } from "@/components/buttons/LinkButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, HOOKS_URL } from "../config";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

interface Zap {
  id: string;
  triggerId: string;
  userId: number;
  actions: {
    id: string;
    zapId: string;
    actionId: string;
    sortingOrder: number;
    type: {
      id: string;
      name: string;
      image: string;
    };
  }[];
  trigger: {
    id: string;
    zapId: string;
    triggerId: string;
    type: {
      id: string;
      name: string;
      image: string;
    };
  };
}

function useZaps(token: string | undefined) {
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<Zap[]>([]);

  useEffect(() => {
    if (!token) return;
    axios
      .get(`${BACKEND_URL}/api/v1/zap`, {
        headers: { Authorization: token },
      })
      .then((res) => setZaps(res.data.zaps))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [token]);

  return { loading, zaps };
}

export default function ZapsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>(undefined);

  // 🔒 Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  // ✅ Read localStorage or session for token
  useEffect(() => {
    if (session?.user?.accessToken) {
      setToken(session.user.accessToken);
    } else if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) setToken(storedToken);
    }
  }, [session]);

  const { loading, zaps } = useZaps(token);
  const userId = (session as any)?.user?.id || 1;


  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">My Zaps ⚡</h1>
          <DarkButton onClick={() => router.push("/zap/create")}>
            + Create Zap
          </DarkButton>
        </div>

        {loading ? (
          <p className="text-gray-500 text-center mt-10">
            Loading your zaps...
          </p>
        ) : zaps.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">No zaps found yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {zaps.map((z) => (
              <ZapCard key={z.id} zap={z} userId={userId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ZapCard({ zap, userId }: { zap: Zap; userId: number }) {
  const router = useRouter();
  const webhookUrl = `${HOOKS_URL}/hooks/catch/${userId}/${zap.id}`;

  const handleTrigger = async () => {
    try {
      const testBody = {
        amount: 123,
        address: "DEMO_ADDRESS_123",
        email: "demo@example.com",
      };

      await axios.post(webhookUrl, testBody);
      alert(" Test webhook triggered successfully!");
    } catch (err) {
      alert(" Failed to trigger webhook. Check hooks service logs.");
      console.error(err);
    }
  };

  const copyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl);
    alert("✅ Webhook URL copied to clipboard!");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between border border-gray-100">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <img
            src={zap.trigger?.type?.image || "https://via.placeholder.com/30"}
            alt={zap.trigger?.type?.name || "Trigger"}
            className="w-10 h-10 rounded-full border object-cover"
          />
          <span className="font-semibold">{zap.trigger?.type?.name}</span>
          <span className="text-gray-400">→</span>
          {zap.actions.map((action) => (
            <img
              key={action.id}
              src={action.type.image}
              alt={action.type.name}
              className="w-8 h-8 rounded-full border object-cover"
            />
          ))}
        </div>

        <div className="text-xs text-gray-400 mb-1">
          <strong>ID:</strong> {zap.id}
        </div>

        <div className="text-xs text-gray-400 break-all">
          <strong>Webhook:</strong> {webhookUrl}
        </div>
      </div>

      <div className="flex justify-between items-center mt-5 gap-2">
        <LinkButton onClick={() => router.push(`/zap/${zap.id}`)}>
          Open
        </LinkButton>

        <button
          onClick={copyWebhook}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm px-3 py-1.5 rounded-md transition-all"
        >
          Copy URL
        </button>

        <button
          onClick={handleTrigger}
          className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1.5 rounded-md transition-all"
        >
          Trigger Test
        </button>
      </div>
    </div>
  );
}
