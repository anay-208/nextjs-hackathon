<div className="flex h-full w-full flex-row items-center justify-start gap-4 px-3">
  <div className="flex h-full w-full flex-col items-start justify-start gap-4">
    <div className="flex h-fit w-fit flex-col items-start justify-start">
      <p>Label:</p>
      <input
        className="h-fit w-full border-2 border-red-500 focus:outline-none"
        type="text"
        name="label"
        placeholder="Transaction Label"
        value={transaction?.label}
        onChange={(e) => {
          setTransaction({ ...transaction, label: e.target.value });
        }}
        required
        maxLength={100}
        autoFocus
      />
    </div>
    <div className="flex h-fit w-fit flex-col items-start justify-start">
      <p>Note:</p>
      <textarea
        className="h-fit w-full border-2 border-red-500 focus:outline-none"
        name="note"
        placeholder="Transaction Note"
        value={transaction?.notes ?? ""}
        onChange={(e) => {
          setTransaction({ ...transaction, notes: e.target.value });
        }}
      />
    </div>
    <div className="flex h-fit w-fit flex-col items-start justify-start">
      <p>Amount:</p>
      <input
        className="h-fit w-full border-2 border-red-500 focus:outline-none"
        type="number"
        name="amount"
        placeholder="Transaction Amount"
        value={transaction?.amount}
        onChange={(e) => {
          setTransaction({
            ...transaction,
            amount: Number(e.target.value),
          });
        }}
        required
      />
    </div>

    <DropdownMenu>
      <DropdownMenuTrigger>
        {transaction?.category?.label ?? "Uncategorized"}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Available Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={() => {
            openDialog();
          }}
        >
          Create new
        </DropdownMenuItem>
        {categories.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onSelect={() => {
              setTransaction({ ...transaction, category: t });
            }}
          >
            {t.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
    <DropdownMenu>
      <DropdownMenuTrigger>
        {transaction.type === "income" ? "Income" : "Expense"}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Available Transaction Types</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            setTransaction({ ...transaction, type: "income" });
          }}
        >
          Income
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            setTransaction({ ...transaction, type: "expense" });
          }}
        >
          Expense
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  <div className="flex h-full w-full flex-col items-center justify-start gap-10">
    <Command className="flex h-[20svh] w-full flex-col rounded-md border p-2 shadow-sm">
      <form className="flex h-9 w-full flex-row items-center justify-start gap-2 rounded-md border px-2">
        <CommandInput className="w-full" placeholder="Search preset" />
      </form>
      <CommandList className="overflow-y-auto">
        <CommandEmpty>No preset found.</CommandEmpty>
        {presets.map((p) => (
          <CommandItem
            key={p.id}
            value={p.label}
            onSelect={async (currentValue) => {
              const presetData = presets.find((t) => t.label === currentValue)!;
              setTransaction({
                id: "",
                label: presetData.label,
                amount: presetData.amount,
                type: presetData.type,
                notes: presetData.notes,
                category: presetData.category,
                category_id: presetData.category_id,
                created_at: presetData.created_at,
                is_preset: true,
              });
            }}
            className="hover:bg-muted flex cursor-pointer items-center justify-between rounded px-2 py-1"
          >
            {p.label}
          </CommandItem>
        ))}
      </CommandList>
    </Command>
    <Command className="flex h-[20svh] w-full flex-col rounded-md border p-2 shadow-sm">
      <form className="flex h-9 w-full flex-row items-center justify-start gap-2 rounded-md border px-2">
        <CommandInput
          className="w-full"
          placeholder="Search recent transactions"
        />
      </form>
      <CommandList className="overflow-y-auto">
        <CommandEmpty>No transactions found.</CommandEmpty>
        {transactions.map((t) => (
          <CommandItem
            key={t.id}
            value={t.label}
            onSelect={async (currentValue) => {
              const transactionData = transactions.find(
                (t) => t.label === currentValue,
              )!;
              setTransaction(transactionData);
            }}
            className="hover:bg-muted flex cursor-pointer items-center justify-between rounded px-2 py-1"
          >
            {t.label}
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  </div>
</div>;
