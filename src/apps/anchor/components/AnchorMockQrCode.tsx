const qrRows = [
  '111001011101',
  '100101000101',
  '101101110101',
  '100000010001',
  '111011011101',
  '001010101000',
  '111100111011',
  '100010000101',
  '101011101101',
  '100010100001',
  '111010111101',
  '000101001010',
]

export function AnchorMockQrCode({ address }: { address: string }) {
  return (
    <div className="rounded-[1.2rem] border border-white/[0.08] bg-white/[0.045] p-4">
      <div className="mx-auto grid w-full max-w-[12.5rem] grid-cols-12 gap-1 rounded-xl bg-slate-100 p-3 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]">
        {qrRows.flatMap((row, rowIndex) =>
          row.split('').map((cell, columnIndex) => {
            const finder =
              (rowIndex < 4 && columnIndex < 4) ||
              (rowIndex < 4 && columnIndex > 7) ||
              (rowIndex > 7 && columnIndex < 4)
            return (
              <span
                className={`aspect-square rounded-[0.18rem] ${
                  cell === '1' || finder ? 'bg-slate-950' : 'bg-slate-100'
                }`}
                key={`${rowIndex}-${columnIndex}`}
              />
            )
          }),
        )}
      </div>
      <p className="mt-3 truncate text-center text-xs font-medium text-slate-200">
        {address}
      </p>
    </div>
  )
}
