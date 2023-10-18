import { Variacao } from "@/app/page";

interface VariacoesListProps {
    variacoes: Variacao[]
}

export default function VariacoesList({ variacoes }: VariacoesListProps) {
    return (
        <ul className='list-group'>
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
                    <button className="btn btn-sm btn-danger">Excluir</button>
                </div>
            </li>)}
        </ul>
    )
}