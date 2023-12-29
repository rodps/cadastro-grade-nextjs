"use client"

import { apiUrl } from '@/config'
import { redirect } from 'next/navigation'
import ProdutoForm, { IProduto } from '../produto-form'

export default function Cadastrar() {

  const salvarProduto = async (produto: IProduto) => {
    const data = {
      nome: produto.nome,
      variacoes: produto.variacoes.map(v => ({
        nome: v.nome,
        valores: v.valores.join(',')
      })),
      grade: produto.grade
    }
    fetch(`${apiUrl}/produtos`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(() => {
      redirect('/')
    })
  }

  return (
    <main className='container'>
      <div className='my-5'>
        <h1>Cadastro de produtos</h1>
        <p>Preencha os campos abaixo para cadastrar um novo produto.</p>
      </div>

      <ProdutoForm onSave={salvarProduto} />

    </main>
  )
}
