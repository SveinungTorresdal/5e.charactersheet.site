import BloodElf from './BloodElf.json';
import DarkIronDwarf from './DarkIronDwarf.json';
import Human from './Human.json';
import IronforgeDwarf from './IronforgeDwarf.json';
import Orc from './Orc.json';
import WildhammerDwarf from './WildhammerDwarf.json'

const HighElf = {...BloodElf};
HighElf.name = "High Elf";

export {
    BloodElf,
    HighElf,
    DarkIronDwarf,
    IronforgeDwarf,
    Human,
    Orc,
    WildhammerDwarf
}