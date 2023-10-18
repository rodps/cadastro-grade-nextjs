"use client"

import { useEffect, useState } from 'react'

interface Variacao {
  nome: string,
  valores: string[]
}

export default function Home() {

  const [variacoes, setVariacoes] = useState<Variacao[]>([])

  const [nomeVariacao, setNomeVariacao] = useState<string>("")
  const [valorVariacao, setValorVariacao] = useState<string>("")
  const [valoresArray, setValoresArray] = useState<string[]>([])

  let gradeArray = Array<string[]>()

  useEffect(() => {
    percorre(0, [])
    console.log(gradeArray)
  }, [variacoes])

  const addVariacao = (): void => {
    const variacao: Variacao = {
      nome: nomeVariacao,
      valores: valoresArray
    }
    setVariacoes(variacoes => [...variacoes, variacao])
    setNomeVariacao("")
    setValoresArray([])
  }

  const addValor = (): void => {
    setValoresArray(valoresArray => [...valoresArray, valorVariacao])
    setValorVariacao("")
  }

  // const atualizarGrade = (): void => {
  //   let j = 0;
  //   let i = 0;
  //   let grade = []
  //   let isEnd = false
  //   while (isEnd) {
  //     const valores = variacoes[i].valores
  //     grade.push(valores[j])
  //     if (i < variacoes.length) {
  //       percorre(i++)
  //     }
  //     else {
  //       gradeArray.push(grade)
  //       grade.pop()
  //       if (j < valores.length) {
  //         j++
  //       } else {
  //         j = 0
  //       }
  //     }
  //   }
  // }

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
        <ul>
          {variacoes.map((v, idx) => <li key={idx}>
            <p>{v.nome}</p>
            <ul className='list-unstyled d-flex gap-2'>{v.valores.map((valor, j) => <li className='list-style-none' key={j}><span className='badge bg-secondary'>{valor}</span></li> )}</ul>
            </li>)}
        </ul>
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
          </div>
          <button className='btn btn-warning' onClick={() => addValor()}>Adicionar valor</button>
        </div>
        <ul className='list-unstyled d-flex gap-2'>
          {valoresArray.map((valor, idx) => <li className='list-style-none' key={idx}><span className='badge bg-secondary'>{valor}</span></li>)}
        </ul>
        <button className='btn btn-primary' onClick={() => addVariacao()}>Adicionar variação</button>
      </div>

      <h3 className='my-3'>Grade</h3>

      

    </main>
  )
}
