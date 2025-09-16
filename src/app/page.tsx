'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation'; // App Router
import { useMember } from '@/context/MemberContext';

export default function Home() {
  const router = useRouter();
  const [members, setMembers] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const { setMemberId } = useMember();
  const handleLogin = () => {
    if (selectedMember) {
      setMemberId(selectedMember);
      router.push(`/dashboard`);
    }
  };

  useEffect(() => {
    fetch('/api/members')
      .then((res) => res.json())
      .then((data) => setMembers(data));
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 relative">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(120% 120% at 50% 90%, #fff 40%, #6366f1 100%)',
        }}
      />
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-lg border border-indigo-100">
        {/* Left: Welcome */}
        <div className="md:w-1/2 w-full flex flex-col items-center justify-center p-10 bg-gradient-to-br from-indigo-50 to-indigo-100">
          <Image
            src="/globe.svg"
            alt="Fund Logo"
            width={80}
            height={80}
            className="mb-6"
          />
          <h1 className="text-4xl font-extrabold mb-3 text-indigo-700 drop-shadow">
            Quỹ Team
          </h1>
          <p className="text-lg text-gray-700 mb-6 text-center max-w-xs">
            Ứng dụng quản lý quỹ nội bộ cho team. Theo dõi, đóng góp, minh bạch
            và gắn kết!
          </p>
          <span className="text-xs text-gray-400">
            © {new Date().getFullYear()} Team Fund
          </span>
        </div>
        {/* Right: Select member */}
        <div className="md:w-1/2 w-full flex flex-col items-center justify-center p-10 bg-white/90">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-800">
            Bạn là ai?
          </h2>
          <Select onValueChange={setSelectedMember}>
            <SelectTrigger className="w-64 h-12 text-base border-indigo-300 focus:ring-2 focus:ring-indigo-400">
              <SelectValue placeholder="Chọn tên của bạn" />
            </SelectTrigger>
            <SelectContent>
              {members.map((member) => (
                <SelectItem key={member.id} value={member.id.toString()}>
                  {member.first_name} {member.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button
            className="mt-8 w-64 h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow transition disabled:opacity-50"
            disabled={!selectedMember}
            onClick={() => handleLogin()}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
