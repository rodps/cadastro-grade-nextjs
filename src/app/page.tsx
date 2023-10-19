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

  let gradeArray = Array<string[]>()

  useEffect(() => {
    atualizarGrade()
  }, [variacoes])

  const addVariacao = (variacao: Variacao): void => {
    setVariacoes(variacoes => [...variacoes, variacao])
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

  return (
    <main className='container'>
      <h1 className='my-5'>Cadastro de produtos</h1>

      <form action="">
        <div className='form-group'>
          <label htmlFor="nome">Nome do produto</label>
          <input type="text" id='nome' className='form-control' />
        </div>
      </form>

      <h3 className='my-3'>Variações</h3>
      <div>
        <VariacoesList variacoes={variacoes} onDelete={excluirVariacao} />
        <button className='btn btn-primary my-4' onClick={() => setShowNovaVariacaoModal(true)}>Adicionar variação</button>
        <NovaVariacaoModal 
          titulo={"Nova Variacão"}
          variacoes={variacoes} 
          onAdd={addVariacao} 
          onClose={() => setShowNovaVariacaoModal(false)} 
          show={showNovaVariacaoModal} />
      </div>

      <h3 className='my-3'>Grade</h3>

      <ul>
        {gradeState.map((g, idx) => <li key={idx}>
          {g.join(" ")}
        </li>)}
      </ul>

    </main>
  )
}
