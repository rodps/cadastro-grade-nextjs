"use client"

import VariacoesList from '@/components/variacoes-list'
import { useEffect, useState } from 'react'

export interface Variacao {
  nome: string,
  valores: string[]
}

interface VariacaoErrors {
  nome: string | null | undefined
  valor: string | null | undefined
}

export default function Home() {

  const [variacoes, setVariacoes] = useState<Variacao[]>([])
  const [nomeVariacao, setNomeVariacao] = useState<string>("")
  const [valorVariacao, setValorVariacao] = useState<string>("")
  const [valoresArray, setValoresArray] = useState<string[]>([])

  const [gradeState, setGradeState] = useState<Array<string[]>>([])

  let gradeArray = Array<string[]>()

  const [variacaoErrors, setVariacaoErrors] = useState<VariacaoErrors>({
    nome: "",
    valor: ""
  })

  useEffect(() => {
    atualizarGrade()
    setVariacaoErrors({
      nome: "",
      valor: ""
    })
  }, [variacoes])

  const addVariacao = (): void => {
    //validação
    if (nomeVariacao.length == 0) {
      setVariacaoErrors({...variacaoErrors, nome: "Este campo é obrigatório!"})
      return
    }
    if (valoresArray.length == 0) {
      setVariacaoErrors({...variacaoErrors, valor: "É necessário pelo menos 1 valor!" })
      return
    }
    for (let i = 0; i < variacoes.length; i++) {
      const nome = variacoes[i].nome;
      if (nome === nomeVariacao) {
        setVariacaoErrors({...variacaoErrors, nome: "Este nome já está sendo utilizado!" })
        return
      }
    }
    //end validacao

    const variacao: Variacao = {
      nome: nomeVariacao,
      valores: valoresArray
    }
    setVariacoes(variacoes => [...variacoes, variacao])
    setNomeVariacao("")
    setValoresArray([])
  }

  const excluirVariacao = (nome: String): void => {
    setVariacoes(variacoes.filter(v => v.nome !== nome))
  }

  const addValor = (): void => {
    //validacao
    if (valorVariacao.length === 0) {
      setVariacaoErrors({...variacaoErrors, valor: "Não é permitido valor em branco!"})
      return
    }
    for (let i = 0; i < valoresArray.length; i++) {
      const valor = valoresArray[i];
      if (valor === valorVariacao) {
        setVariacaoErrors({...variacaoErrors, valor: "Este valor já foi adicionado!"})
        return
      }
    }
    //end validacao

    setValoresArray(valoresArray => [...valoresArray, valorVariacao])
    setValorVariacao("")
  }

  const excluirValor = (valor: string): void => {
    setValoresArray(valoresArray.filter(v => v !== valor))
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
        <div className='form-group mb-3'>
          <label htmlFor="variacao">Nome da variação</label>
          <input 
            type="text" 
            name="variacao" 
            id="variacao" 
            className='form-control' 
            value={nomeVariacao} 
            onChange={(ev) => setNomeVariacao(ev.target.value)} 
            />
            {variacaoErrors.nome && 
              <div className="invalid-feedback d-block">{variacaoErrors.nome}</div>
            }
        </div>
        <div className='d-flex gap-3'>
          <div className='form-group mb-3'>
            <label htmlFor="variacao">Valores</label>
            <input 
              type="text" 
              name="valor" 
              id="valor" 
              className='form-control' 
              value={valorVariacao} 
              onChange={(ev) => setValorVariacao(ev.target.value)} 
              />
              {variacaoErrors.valor && 
                <div className="invalid-feedback d-block">{variacaoErrors.valor}</div>
              }
          </div>
          <button className='btn btn-warning' onClick={() => addValor()}>Adicionar valor</button>
        </div>
        <ul className='list-unstyled d-flex gap-2'>
          {valoresArray.map((valor, idx) => 
            <li className='list-style-none' key={idx}>
              <h5>
                <span className='badge bg-secondary d-flex align-items-center gap-2'>{valor} <button type="button" className="btn-close" aria-label="Close" onClick={() => excluirValor(valor)}></button></span>
              </h5>
            </li>)}
        </ul>
        <button className='btn btn-primary' onClick={() => addVariacao()}>Adicionar variação</button>
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
