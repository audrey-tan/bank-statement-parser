import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function TransactionTable({ transactions }: { transactions: { Amount: number; Date: string; Description: string }[] }) {   
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-extrabold">Date</TableHead>
                        <TableHead className="font-extrabold">Description</TableHead>
                        <TableHead className="font-extrabold text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.length > 0 ? (
                        transactions.map((transaction, index) => (
                            <TableRow key={index}>
                                <TableCell>{transaction.Date}</TableCell>
                                <TableCell className="break-words whitespace-normal">{transaction.Description}</TableCell>
                                <TableCell className="text-right text-accent font-extrabold">$ {transaction.Amount.toFixed(2)}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="h-24 text-center">
                                No transactions found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
