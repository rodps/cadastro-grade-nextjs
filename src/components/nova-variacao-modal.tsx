import { IVariacao, IVariacaoErrors } from "@/app/(produtos)/produto-form"
import styles from "@/styles/nova-variacao-modal.module.css"
import { useState } from "react"

interface NovaVariacaoModalProps {
  variacoes: IVariacao[]
  onAdd: (variacao: IVariacao) => void
  onUpdate: (index: number, variacao: IVariacao) => void
  onClose: () => void
  editarIndex: number | undefined
}

export default function NovaVariacaoModal({ variacoes, onAdd, onClose, editarIndex, onUpdate }: NovaVariacaoModalProps) {

  const [nomeVariacao, setNomeVariacao] = useState<string>(editarIndex != undefined ? variacoes[editarIndex].nome : "")
  const [valorVariacao, setValorVariacao] = useState<string>("")
  const [valoresArray, setValoresArray] = useState<string[]>(editarIndex != undefined ? variacoes[editarIndex].valores : [])
  const [variacaoErrors, setVariacaoErrors] = useState<IVariacaoErrors>({
    nome: "",
    valor: ""
  })

  const addVariacao = (): void => {
    //validação
    if (nomeVariacao.length == 0) {
      setVariacaoErrors({ ...variacaoErrors, nome: "Este campo é obrigatório!" })
      return
    }
    if (valoresArray.length == 0) {
      setVariacaoErrors({ ...variacaoErrors, valor: "É necessário pelo menos 1 valor!" })
      return
    }
    for (let i = 0; i < variacoes.length; i++) {
      const nome = variacoes[i].nome
      if (nome === nomeVariacao) {
        setVariacaoErrors({ ...variacaoErrors, nome: "Este nome já está sendo utilizado!" })
        return
      }
    }
    //end validacao

    const variacao: IVariacao = {
      nome: nomeVariacao,
      valores: valoresArray
    }
    onAdd(variacao)
    fecharModal()
  }

  const editarVariacao = (): void => {
    //validação
    if (nomeVariacao.length == 0) {
      setVariacaoErrors({ ...variacaoErrors, nome: "Este campo é obrigatório!" })
      return
    }
    if (valoresArray.length == 0) {
      setVariacaoErrors({ ...variacaoErrors, valor: "É necessário pelo menos 1 valor!" })
      return
    }
    //end validacao

    const variacao: IVariacao = {
      nome: nomeVariacao,
      valores: valoresArray
    }
    if (editarIndex != null && editarIndex != undefined) {
      onUpdate(editarIndex, variacao)
    }
    fecharModal()
  }

  const fecharModal = (): void => {
    setNomeVariacao("")
    setValoresArray([])
    setVariacaoErrors({
      nome: "",
      valor: ""
    })
    onClose()
  }

  const addValor = (): void => {
    //validacao
    if (valorVariacao.length === 0) {
      setVariacaoErrors({ ...variacaoErrors, valor: "Não é permitido valor em branco!" })
      return
    }
    for (let i = 0; i < valoresArray.length; i++) {
      const valor = valoresArray[i]
      if (valor === valorVariacao) {
        setVariacaoErrors({ ...variacaoErrors, valor: "Este valor já foi adicionado!" })
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

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <h3 className={styles.modalTitle}>{editarIndex ? "Editar Variação" : "Nova Variação"}</h3>
        <div className={styles.modalBody}>
          <div className='form-group mb-3'>
            <label htmlFor="variacao">Nome da variação</label>
            <input
              type="text"
              name="variacao"
              id="variacao"
              className='form-control'
              value={nomeVariacao}
              onChange={(ev) => setNomeVariacao(ev.target.value)}
              placeholder="Ex.: Cor"
            />
            {variacaoErrors.nome &&
              <div className="invalid-feedback d-block">{variacaoErrors.nome}</div>
            }
          </div>
          <div className='form-group mb-3'>
            <label htmlFor="variacao">Valor</label>
            <input
              type="text"
              name="valor"
              id="valor"
              className='form-control'
              value={valorVariacao}
              onChange={(ev) => setValorVariacao(ev.target.value)}
              placeholder="Ex.: Preto"
            />
            {variacaoErrors.valor &&
              <div className="invalid-feedback d-block">{variacaoErrors.valor}</div>
            }
          </div>
          <button className='btn btn-warning mb-3' onClick={() => addValor()}>Adicionar valor</button>
          <ul className='list-unstyled d-flex gap-2'>
            {valoresArray.map((valor, idx) =>
              <li className='list-style-none' key={idx}>
                <h5>
                  <span className='badge bg-secondary d-flex align-items-center gap-2'>{valor} <button type="button" className="btn-close" aria-label="Close" onClick={() => excluirValor(valor)}></button></span>
                </h5>
              </li>)}
          </ul>
          <div className={styles.modalFooter}>
            {editarIndex != undefined ?
              <button className='btn btn-primary' onClick={() => editarVariacao()}>Editar</button>
              :
              <button className='btn btn-primary' onClick={() => addVariacao()}>Salvar</button>
            }
            <button className="btn btn-secondary" onClick={() => fecharModal()}>Fechar</button>
          </div>
        </div>
      </div>
    </div>
  )
}