"use client"

import NovaVariacaoModal from '@/components/nova-variacao-modal'
import VariacoesList from '@/components/variacoes-list'
import { apiUrl } from '@/config'
import { useEffect, useState } from 'react'

export interface IVariacao {
    nome: string,
    valores: string[]
}

export interface IVariacaoErrors {
    nome: string | null | undefined
    valor: string | null | undefined
}

export interface IProduto {
    nome: string
}

export interface IGrade {
    nome: string
    estoque: number
    valor: number
}

export interface IProduto {
    nome: string
    variacoes: IVariacao[],
    grade: IGrade[]
}

interface ProdutoFormProps {
    produto?: IProduto
    onSave: (produto: IProduto) => Promise<void>
}

export default function ProdutoForm({ produto, onSave }: ProdutoFormProps) {

    const [produtoNome, setProdutoNome] = useState<string>('')
    const [variacoes, setVariacoes] = useState<IVariacao[]>([])
    const [gradeState, setGradeState] = useState<IGrade[]>([])
    const [showNovaVariacaoModal, setShowNovaVariacaoModal] = useState(false)
    const [editarVariacao, setEditarVariacao] = useState<number | undefined>()
    const [disableSave, setDisableSave] = useState<boolean>(false)

    useEffect(() => {
        if (produto) {
            setProdutoNome(produto.nome)
            setVariacoes(produto.variacoes)
            setGradeState(produto.grade)
        }
    }, [produto])

    const addVariacao = (variacao: IVariacao) => {
        const novasVariacoes = [...variacoes, variacao]
        atualizarGrade(novasVariacoes)
    }

    const updateVariacao = (index: number, variacao: IVariacao) => {
        const novasVariacoes = [...variacoes]
        novasVariacoes[index] = variacao
        atualizarGrade(novasVariacoes)
    }

    const excluirVariacao = (nome: String) => {
        const novasVariacoes = variacoes.filter(v => v.nome !== nome)
        atualizarGrade(novasVariacoes)
    }

    const atualizarGrade = (variacoesArray: IVariacao[]) => {
        const gradeArray = Array<string[]>()
        percorre(0, [], variacoesArray, gradeArray)
        setGradeState(gradeArray.map(grade => ({
            nome: grade.join('-'),
            estoque: 0,
            valor: 0
        })))
        setVariacoes(variacoesArray)
    }

    const percorre = (index: number, grade: string[], variacoesArray: IVariacao[], gradeArray: Array<string[]>) => {
        if (variacoesArray.length == 0) return
        const valores = variacoesArray[index].valores
        valores.forEach(valor => {
            grade.push(valor)
            if (index < variacoesArray.length - 1) {
                percorre(index + 1, grade, variacoesArray, gradeArray)
            } else {
                gradeArray.push([...grade])
            }
            grade.pop()
        })
    }

    const abrirModalEditarVariacao = (index: number) => {
        setEditarVariacao(index)
        setShowNovaVariacaoModal(true)
    }

    const abrirModalNovaVariacao = () => {
        setEditarVariacao(undefined)
        setShowNovaVariacaoModal(true)
    }

    const changeEstoque = (idx: number, estoque: string) => {
        const grade = [...gradeState]
        grade[idx].estoque = parseInt(estoque)
        setGradeState(grade)
    }

    const changeValor = (idx: number, valor: string) => {
        const grade = [...gradeState]
        grade[idx].valor = parseInt(valor)
        setGradeState(grade)
    }

    const salvar = async () => {
        setDisableSave(true)
        const produto: IProduto = {
            nome: produtoNome,
            variacoes: variacoes,
            grade: gradeState
        }
        await onSave(produto)
        setDisableSave(false)
    }

    return (
        <div>
            <div className='row mb-3'>
                <div className='form-group mb-3 col-6'>
                    <label htmlFor="nome">Nome do produto</label>
                    <input type="text" id='nome' className='form-control' value={produtoNome ? produtoNome : ''} onChange={e => setProdutoNome(e.target.value)} />
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
                            <th className='col-6'>{g.nome}</th>
                            <td className='col-3'><input type="number" className="form-control" id="estoque" placeholder="Estoque" value={g.estoque ? g.estoque : 0} onChange={e => changeEstoque(idx, e.target.value)} /></td>
                            <td className='col-3'><input type="number" className="form-control" id="estoque" placeholder="Preco" value={g.valor ? g.valor : 0} onChange={e => changeValor(idx, e.target.value)} /></td>
                        </tr>)}
                </tbody>
            </table>

            <button className='btn btn-primary my-5' onClick={salvar} disabled={disableSave}>Salvar</button>

            {showNovaVariacaoModal &&
                <NovaVariacaoModal
                    variacoes={variacoes}
                    editarIndex={editarVariacao}
                    onAdd={addVariacao}
                    onUpdate={updateVariacao}
                    onClose={() => setShowNovaVariacaoModal(false)}
                />
            }

        </div>
    )
}
