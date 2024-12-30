import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { jsPDF } from 'jspdf'
import * as XLSX from 'xlsx'

export default function ResultsTable({ commissions }) {
  const [exportFormat, setExportFormat] = useState('pdf')

  const exportResults = () => {
    if (exportFormat === 'pdf') {
      const doc = new jsPDF()
      doc.text('Relatório de Comissões', 10, 10)
      commissions.forEach((commission, index) => {
        doc.text(`${commission.seller}: R$ ${commission.amount.toFixed(2)}`, 10, 20 + index * 10)
      })
      doc.save('comissoes.pdf')
    } else if (exportFormat === 'excel') {
      const ws = XLSX.utils.json_to_sheet(commissions)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Comissões')
      XLSX.writeFile(wb, 'comissoes.xlsx')
    } else if (exportFormat === 'csv') {
      const ws = XLSX.utils.json_to_sheet(commissions)
      const csv = XLSX.utils.sheet_to_csv(ws)
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', 'comissoes.csv')
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-1xl font-semibold text-gray-800">Resultados</CardTitle>
      </CardHeader>
      <CardContent>
        {commissions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhum resultado para exibir ainda.
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendedor</TableHead>
                  <TableHead>Comissão</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissions.map((commission, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{commission.seller}</TableCell>
                    <TableCell>R$ {commission.amount.toFixed(2)}</TableCell>
                    <TableCell>{new Date(commission.date).toLocaleDateString('pt-BR')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex gap-4 mt-4">
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Formato de Exportação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={exportResults} className="bg-emerald-500 hover:bg-emerald-600 text-white">
                Exportar Resultados
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
