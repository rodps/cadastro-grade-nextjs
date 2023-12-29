"use client"

import { apiUrl } from '@/config'
import ProdutoForm, { IProduto } from '../../produto-form'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function Editar({ params }: {params: { id: string }}) {

  const [produto, setProduto] = useState<IProduto>()

  useEffect(() => {
    const getProduto = async () => {
      fetch(`${apiUrl}/produtos/${params.id}`)
      .then(res => res.json())
      .then(data => setProduto({
        nome: data.nome,
        grade: data.grade,
        variacoes: data.variacoes.map((variacao: any) => ({
          nome: variacao.nome,
          valores: variacao.valores.split(",")
        }))
      }))
    }
    getProduto()
  }, [params.id])

  const salvarProduto = async (produto: IProduto) => {
    const data = {
      nome: produto.nome,
      variacoes: produto.variacoes.map(v => ({
        nome: v.nome,
        valores: v.valores.join(',')
      })),
      grade: produto.grade
    }
    fetch(`${apiUrl}/produtos/${params.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(() => {
      toast.success("Produto atualizado")
    })
  }

  return (
    <main className='container'>
      <div className='my-3'>
        <Link href="/">Voltar</Link>
      </div>
      <div className='my-5'>
        <h1>Produto {params.id} - {produto ? produto.nome : ''}</h1>
      </div>

      <ProdutoForm onSave={salvarProduto} produto={produto} />

    </main>
  )
}
