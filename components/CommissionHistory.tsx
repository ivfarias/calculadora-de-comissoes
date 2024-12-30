import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// Define the type for a commission entry
type CommissionEntry = {
  seller: string;
  amount: number;
  date: string;
}

// Define the props type for the CommissionHistory component
interface CommissionHistoryProps {
  history: CommissionEntry[];
}

export default function CommissionHistory({ history }: CommissionHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-1xl font-semibold text-gray-800">Histórico de Comissões</CardTitle>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhum histórico de comissões para exibir ainda.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendedor</TableHead>
                <TableHead>Comissão</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{entry.seller}</TableCell>
                  <TableCell>R$ {entry.amount.toFixed(2)}</TableCell>
                  <TableCell>{new Date(entry.date).toLocaleDateString('pt-BR')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

