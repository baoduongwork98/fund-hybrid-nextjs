export async function GET() {
  const MM_AUTHTOKEN = 'bgzwojxn4in9jxid5d5h6aandw';
  const MM_CSRF = 'tsfkbbp74jg9pgueughcqe93zh';
  const url =
    'https://chat.runsystem.vn/api/v4/users?in_channel=433jzqg4of8ppgfoq74paduz1w&page=0&per_page=100&sort=status';
  // Thực hiện fetch để lấy dữ liệu
  const headers = {
    'x-csrf-token': MM_CSRF,
    cookie: 'MMAUTHTOKEN=' + MM_AUTHTOKEN,
    'Content-Type': 'application/json',
  };
  const res = await fetch(url, { headers: headers });
  const data = await res.json();
  // Trả về dữ liệu dưới dạng JSON
  if (!res.ok) {
    return Response.json(
      { success: false, message: 'Failed to fetch data' },
      { status: res.status }
    );
  }
  return Response.json(data);
}
