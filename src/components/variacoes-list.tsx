import { Variacao } from "@/app/page";

interface VariacoesListProps {
    variacoes: Variacao[]
    onDelete: (nome: string) => void
    onUpdate: (index: number) => void
}

export default function VariacoesList({ variacoes, onDelete, onUpdate }: VariacoesListProps) {
    return (
        <ul className='list-group list-group-flush mb-3'>
          {variacoes.map((v, idx) => 
            <li className='list-group-item' key={idx}>
                <div className="d-flex justify-content-between">
                    <div>
                        <p>{v.nome}</p>
                        <ul className='list-unstyled d-flex gap-2'>{v.valores.map((valor, j) => 
                            <li className='list-style-none' key={j}>
                                <span className='badge bg-secondary'>{valor}</span>
                            </li> 
                        )}</ul>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <button className="btn btn-warning" onClick={() => onUpdate(idx)}>Editar</button>
                        <button className="btn btn-danger" onClick={() => onDelete(v.nome)}>Excluir</button>
                    </div>
                </div>
            </li>)}
        </ul>
    )
}