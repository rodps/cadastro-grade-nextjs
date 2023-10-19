"use client"

import NovaVariacaoModal from '@/components/nova-variacao-modal'
import VariacoesList from '@/components/variacoes-list'
import { useEffect, useState } from 'react'

export interface Variacao {
  nome: string,
  valores: string[]
}

export interface VariacaoErrors {
  nome: string | null | undefined
  valor: string | null | undefined
}

export default function Home() {

  const [variacoes, setVariacoes] = useState<Variacao[]>([])
  const [gradeState, setGradeState] = useState<Array<string[]>>([])
  const [showNovaVariacaoModal, setShowNovaVariacaoModal] = useState(false);
  const [editarVariacao, setEditarVariacao] = useState<number | undefined>()

  let gradeArray = Array<string[]>()

  useEffect(() => {
    atualizarGrade()
  }, [variacoes])

  const addVariacao = (variacao: Variacao): void => {
    setVariacoes(variacoes => [...variacoes, variacao])
  }

  const updateVariacao = (index: number, variacao: Variacao): void => {
    const updatedVariacoes = [...variacoes]
    updatedVariacoes[index] = variacao
    setVariacoes(updatedVariacoes)
  }

  const excluirVariacao = (nome: String): void => {
    setVariacoes(variacoes.filter(v => v.nome !== nome))
  }

  const atualizarGrade = () => {
    percorre(0, [])
    setGradeState(gradeArray);
  }

  const percorre = (index: number, grade: string[]) => {
    if (variacoes.length == 0) return
    const valores = variacoes[index].valores
    valores.forEach(valor => {
      grade.push(valor)
      if (index < variacoes.length -1) {
        percorre(index+1, grade)
      } else {
        gradeArray.push([...grade])
      }
      grade.pop()
    })
  }

  const abrirModalEditarVariacao = (index: number) => {
    const variacao = variacoes[index]
    setEditarVariacao(index)
    setShowNovaVariacaoModal(true)
  }

  const abrirModalNovaVariacao = () => {
    setEditarVariacao(undefined)
    setShowNovaVariacaoModal(true)
  }

  return (
    <main className='container'>
      <div className='my-5'>
        <h1>Cadastro de produtos</h1>
        <p>Preencha os campos abaixo para cadastrar um novo produto.</p>
      </div>

      <h4 className='mb-3'>Informações</h4>
      <div className='row'>
        <div className='form-group mb-3 col-6'>
          <label htmlFor="nome">Nome do produto</label>
          <input type="text" id='nome' className='form-control' />
        </div>
      </div>

      <h4 className='mb-3'>Variações</h4>
      <div className='mb-3 row'>
        <div className='col-6'>
          <VariacoesList variacoes={variacoes} onDelete={excluirVariacao} onUpdate={abrirModalEditarVariacao} />
          <button className='btn btn-primary' onClick={() => abrirModalNovaVariacao()}>Adicionar variação</button>
        </div>
      </div>

      <h4 className='my-5'>Grade</h4>
      <ul>
        {gradeState.map((g, idx) => <li key={idx}>
          {g.join(" ")}
        </li>)}
      </ul>

      <NovaVariacaoModal 
            variacoes={variacoes} 
            editarIndex={editarVariacao}
            onAdd={addVariacao} 
            onUpdate={updateVariacao}
            onClose={() => setShowNovaVariacaoModal(false)} 
            show={showNovaVariacaoModal} />

    </main>
  )
}
