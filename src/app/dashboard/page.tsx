'use client';

import { useEffect, useState } from 'react';

type Transaction = {
  id: number;
  description: string;
  amount: number;
  date: string;
};

type TransactionIn = {
  id: number;
  member: string;
  description: string;
  amount: number;
  date: string;
  status: string;
};

type TransactionsResponse = {
  outs: Transaction[];
  ins: TransactionIn[];
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionsResponse | null>(
    null
  );
  useEffect(() => {
    fetch('/api/sheet') // <-- gọi API route
      .then((res) => res.json())
      .then((d) => setTransactions(d))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-6 flex flex-col">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-indigo-700 mb-2 drop-shadow">
          Dashboard Quỹ Team
        </h1>
        <p className="text-gray-600">
          Theo dõi chi của quỹ và đóng góp từ thành viên
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl min-w-7xl mx-auto flex-1 min-h-0">
        {/* Chi của quỹ */}
        <div className="flex-1 flex flex-col min-h-0 ">
          <div className="bg-white/90 rounded-2xl shadow-xl border border-red-100 flex flex-col h-full">
            <div className="bg-red-50 px-6 py-4 rounded-t-2xl border-b border-red-100">
              <h2 className="text-2xl font-bold text-red-700 flex items-center gap-2">
                <span className="text-red-500">💸</span>
                Chi từ quỹ
              </h2>
            </div>
            <div className="px-6 overflow-x-auto flex-1 overflow-y-auto">
              {loading ? (
                <div className="text-center text-gray-500 py-10">
                  Đang tải dữ liệu...
                </div>
              ) : !transactions?.outs || transactions.outs.length === 0 ? (
                <div className="text-center text-gray-400 py-10 min-w-full">
                  Chưa có giao dịch chi nào.
                </div>
              ) : (
                <table className="min-w-full text-sm text-gray-700 ">
                  <thead className="sticky top-0 z-10 bg-green-500">
                    <tr className="bg-red-50">
                      <th className="px-4 py-2 font-semibold text-red-700">
                        STT
                      </th>
                      <th className="px-4 py-2 font-semibold text-red-700">
                        Lý do
                      </th>
                      <th className="px-4 py-2 font-semibold text-red-700">
                        Ngày
                      </th>
                      <th className="px-4 py-2 font-semibold text-red-700">
                        Số tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.outs
                      .filter((tx) => tx.amount)
                      .map((tx) => (
                        <tr
                          key={tx.id}
                          className="border-b last:border-0 hover:bg-red-50/40 transition"
                        >
                          <td className="px-4 py-2 whitespace-nowrap text-center">
                            {tx.id}
                          </td>
                          <td className="px-4 py-2 text-left">
                            {tx.description}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-center">
                            {tx.date}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap font-semibold text-center text-red-600">
                            {tx.amount}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Đóng góp thành viên */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="bg-white/90 rounded-2xl shadow-xl border border-green-100 flex flex-col h-full">
            <div className="bg-green-50 px-6 py-4 rounded-t-2xl border-b border-green-100">
              <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2">
                <span className="text-green-500">💰</span>
                Đóng góp thành viên
              </h2>
            </div>
            <div className="px-6 overflow-x-auto flex-1 overflow-y-auto">
              {loading ? (
                <div className="text-center text-gray-500 py-10 min-w-full">
                  Đang tải dữ liệu...
                </div>
              ) : !transactions?.ins || transactions.ins.length === 0 ? (
                <div className="text-center text-gray-400 py-10">
                  Chưa có đóng góp nào.
                </div>
              ) : (
                <table className="min-w-full text-sm text-gray-700">
                  <thead className="sticky top-0 z-10 bg-red-500">
                    <tr className="bg-green-50">
                      <th className="px-4 py-2 font-semibold text-green-700">
                        Ngày
                      </th>
                      <th className="px-4 py-2 font-semibold text-green-700">
                        Thành viên
                      </th>
                      <th className="px-4 py-2 font-semibold text-green-700">
                        Lý do
                      </th>
                      <th className="px-4 py-2 font-semibold text-green-700">
                        Số tiền
                      </th>
                      <th className="px-4 py-2 font-semibold text-green-700">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.ins
                      .filter((tx) => tx.amount)
                      .map((tx) => (
                        <tr
                          key={tx.id}
                          className="border-b last:border-0 hover:bg-green-50/40 transition"
                        >
                          <td className="px-4 py-2 whitespace-nowrap text-center">
                            {tx.date}
                          </td>
                          <td className=" whitespace-nowrap text-center ">
                            <span className="rounded-full bg-green-100 px-4 py-1 min-w-full">
                              {tx.member}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-left">
                            {tx.description}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap font-semibold text-center text-green-600">
                            {tx.amount}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-center">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                tx.status
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {tx.status ? 'Đã đóng' : 'Chưa đóng'}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
