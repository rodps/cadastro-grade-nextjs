import { apiUrl } from "@/config"
import Link from "next/link"

const getData = async () => {
  const res = await fetch(`${apiUrl}/produtos`, { cache: "no-cache" })
  return await res.json()
}

export default async function Home() {
  const data = await getData()

  return (
    <main className='container'>
      <h1 className="my-5">Produtos</h1>
      <Link className="btn btn-primary mb-3" href={"/cadastrar"}>Novo</Link>
      <ul className="my-5">
        {data.produtos.map((d: any) => 
          <li key={d.id}><Link href={`/produto/${d.id}`}>{d.nome}</Link></li>
        )}
      </ul>
    </main>
  )
}
