// Dados iniciais do personagem Gnork.
// Manter isso em um arquivo separado deixa o App.jsx mais limpo.
export const initialCharacterData = {
  id: "gnork-1",
  name: "Gnork",
  class: "Mago",
  race: "mestiço (Gnomo + Orc)",
  age: "30",
  height: "170cm",
  weight: "100kg",
  eyes: "roxos com a esclera preta",
  skin: "roxa",
  hair: "negros",
  allies: "",
  level: "3",
  alignment: "Neutro",
  playerName: "Caio Bisesti",
  inspiration: "",
  proficiencyBonus: "+2",
  armorClass: "15",
  initiative: "+3",
  speed: "9",
  currentHp: "8",
  tempHp: "",
  totalHp: "",
  personalityTraits: "",
  ideals: "",
  bonds: "",
  flaws: "",
  gold: "79",
  equipment: `Um vidro de tinta escura, uma pena, uma faca pequena, uma carta de um falecido colega perguntando a você algo que você nunca terá a chance de responder, um conjunto de roupas comuns e uma algibeira contendo 10 po
uma adaga, um foco arcano, um pacote de estudioso, Um grimório
4x adaga 1x saco de dormir 1x urna de metal com cinzas de heroi
1x equipamento de pescaria, 1x esferas.1x orbe, Utensílios de cozinheiro`,
  languages: `comum\ngnomico\nabissal\ndialeto subterraneo`,
  features: `alquinista e pequisador
objetivo = criar aldeia mestiços
medo = perder memorias
personalidade = frieza
importante = poder e conhecimento
duvida = sua propria capcidade
vida = confortavel`,
  story: `A vida de Gnork começou com uma anomalia...`, // A história completa fica aqui
  stats: { strength: { value: "12", mod: "+1" }, dexterity: { value: "16", mod: "+3" }, constitution: { value: "15", mod: "+2" }, intelligence: { value: "21", mod: "+5" }, wisdom: { value: "13", mod: "+1" }, charisma: { value: "11", mod: "+0" }, },
  savingThrows: { strength: "12", dexterity: "16", constitution: "15", intelligence: "21", wisdom: "13", charisma: "11", },
  skills: { acrobatics: "+3", arcana: "+7", athletics: "+1", performance: "+0", bluff: "+0", stealth: "+3", history: "+7", intimidation: "+0", insight: "+3", investigation: "+7", animalHandling: "+1", medicine: "+1", nature: "+5", perception: "+1", persuasion: "+0", sleightOfHand: "+3", religion: "+5", survival: "+1", },
  spellcasting: { ability: "Inteligência", saveDC: "15", attackBonus: "", },
  spells: Array.from({ length: 10 }, (_, i) => ({ level: i, slots: i > 0 ? "0/0" : "", list: [], })),
};

// Populando as magias de Gnork
initialCharacterData.spells[0].list = [ { name: "Toque Arrepiante", description: "Descrição...", }, { name: "prestidigitação", description: "Descrição...", }, { name: "Mãos magicas", description: "Descrição...", },];
initialCharacterData.spells[1].slots = "4/4";
initialCharacterData.spells[1].list = [ { name: "QUEDA SUAVE", description: "Descrição...", }, { name: "IDENTIFICAÇÃO", description: "Descrição...", }, { name: "AREA ESCORREGADIA", description: "Descrição...", }, { name: "RAIO ADOECENTE", description: "Descrição...", },];
initialCharacterData.spells[2].slots = "2/2";
initialCharacterData.spells[2].list = [ { name: "ALTERAR-SE", description: "Descrição...", }, { name: "CEGUEIRA/SURDEZ", description: "Descrição...", },];