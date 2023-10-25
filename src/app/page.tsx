"use client"

import NovaVariacaoModal from '@/components/nova-variacao-modal'
import VariacoesList from '@/components/variacoes-list'
import { useEffect, useState } from 'react'

export interface IVariacao {
  nome: string,
  valores: string[]
}

export interface IVariacaoErrors {
  nome: string | null | undefined
  valor: string | null | undefined
}

export default function Home() {

  const [variacoes, setVariacoes] = useState<IVariacao[]>([])
  const [gradeState, setGradeState] = useState<Array<string[]>>([])
  const [showNovaVariacaoModal, setShowNovaVariacaoModal] = useState(false)
  const [editarVariacao, setEditarVariacao] = useState<number | undefined>()

  let gradeArray = Array<string[]>()

  const addVariacao = (variacao: IVariacao): void => {
    const novasVariacoes = [...variacoes, variacao]
    atualizarGrade(novasVariacoes)
    setVariacoes(novasVariacoes)
  }

  const updateVariacao = (index: number, variacao: IVariacao): void => {
    const novasVariacoes = [...variacoes]
    novasVariacoes[index] = variacao
    atualizarGrade(novasVariacoes)
    setVariacoes(novasVariacoes)
  }

  const excluirVariacao = (nome: String): void => {
    const novasVariacoes = variacoes.filter(v => v.nome !== nome)
    atualizarGrade(novasVariacoes)
    setVariacoes(novasVariacoes)
  }

  const atualizarGrade = (variacoesArr: IVariacao[]): void => {
    percorre(0, [], variacoesArr)
    setGradeState(gradeArray)
  }

  const percorre = (index: number, grade: string[], variacoesArr: IVariacao[]): void => {
    if (variacoesArr.length == 0) return
    const valores = variacoesArr[index].valores
    valores.forEach(valor => {
      grade.push(valor)
      if (index < variacoesArr.length - 1) {
        percorre(index + 1, grade, variacoesArr)
      } else {
        gradeArray.push([...grade])
      }
      grade.pop()
    })
  }

  const abrirModalEditarVariacao = (index: number): void => {
    setEditarVariacao(index)
    setShowNovaVariacaoModal(true)
  }

  const abrirModalNovaVariacao = (): void => {
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
      <div className='row mb-3'>
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
      <table className='table'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Estoque</th>
            <th>Preco</th>
          </tr>
        </thead>
        <tbody>
          {gradeState.map((g, idx) =>
            <tr key={idx} className='mb-3'>
              <th className='col-6'>{g.join(" ")}</th>
              <td className='col-3'><input type="number" className="form-control" id="estoque" placeholder="Estoque" /></td>
              <td className='col-3'><input type="number" className="form-control" id="estoque" placeholder="Preco" /></td>
            </tr>)}
        </tbody>
      </table>

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
