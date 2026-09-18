import { Badge } from "./components/modules/badge"
import { Chip } from "./components/modules/chip"
import { PokemonCard } from "./components/modules/pokemon-card"
import { StatBar } from "./components/modules/stat-bar"

function App() {
  return (
    <>
      <Chip color="accent" selected>oi 1</Chip>
      <Chip color="fighting">oi 2</Chip>

      <Badge color="fire">Ola</Badge>

      <StatBar color="fighting" label="HP" value={20} max={100} />

      <PokemonCard atk={20} def={30} hp={50} id={1} name="pikachu" types={['electric']} />
      <p> oi </p>
    </>
  )
}

export default App
