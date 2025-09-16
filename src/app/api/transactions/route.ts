// Fake API for transactions (demo)
import { NextResponse } from 'next/server';

const transactions = [
  {
    id: 1,
    member: 'An',
    type: 'Đóng quỹ',
    amount: 500000,
    date: '2025-09-01',
    note: 'Tháng 9',
  },
  {
    id: 2,
    member: 'Bình',
    type: 'Chi',
    amount: -200000,
    date: '2025-09-03',
    note: 'Liên hoan',
  },
  {
    id: 3,
    member: 'Chi',
    type: 'Đóng quỹ',
    amount: 500000,
    date: '2025-09-05',
    note: 'Tháng 9',
  },
  {
    id: 4,
    member: 'Dũng',
    type: 'Đóng quỹ',
    amount: 500000,
    date: '2025-09-06',
    note: 'Tháng 9',
  },
  {
    id: 5,
    member: 'An',
    type: 'Chi',
    amount: -100000,
    date: '2025-09-07',
    note: 'Mua nước',
  },
];

export async function GET() {
  return NextResponse.json(transactions);
}
