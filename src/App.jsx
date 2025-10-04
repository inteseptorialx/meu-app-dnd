import React, { useState, useEffect, useCallback, memo } from "react";
import "./App.css";

// --- O NOVO "BLUEPRINT" COMPLETO PARA PERSONAGENS ---

const createBlankCharacter = (name) => ({
  id: Date.now().toString(),
  // Informações Básicas
  name: name || "Novo Personagem",
  class: "",
  race: "",
  age: "",
  height: "",
  weight: "",
  eyes: "",
  skin: "",
  hair: "",
  allies: "",
  level: "1",
  alignment: "",
  playerName: "",
  // Atributos de Combate
  inspiration: "",
  proficiencyBonus: "+2",
  armorClass: "10",
  initiative: "0",
  speed: "9",
  // Pontos de Vida
  currentHp: "10",
  tempHp: "",
  totalHp: "10",
  // Personalidade
  personalityTraits: "",
  ideals: "",
  bonds: "",
  flaws: "",
  // Inventário e Habilidades
  gold: "0",
  equipment: "",
  languages: "",
  features: "",
  // Atributos Principais
  stats: {
    strength: { value: "10", mod: "+0" },
    dexterity: { value: "10", mod: "+0" },
    constitution: { value: "10", mod: "+0" },
    intelligence: { value: "10", mod: "+0" },
    wisdom: { value: "10", mod: "+0" },
    charisma: { value: "10", mod: "+0" },
  },
  // Testes de Resistência
  savingThrows: {
    strength: "10",
    dexterity: "10",
    constitution: "10",
    intelligence: "10",
    wisdom: "10",
    charisma: "10",
  },
  // Perícias
  skills: {
    acrobatics: "+0",
    arcana: "+0",
    athletics: "+0",
    performance: "+0",
    bluff: "+0",
    stealth: "+0",
    history: "+0",
    intimidation: "+0",
    insight: "+0",
    investigation: "+0",
    animalHandling: "+0",
    medicine: "+0",
    nature: "+0",
    perception: "+0",
    persuasion: "+0",
    sleightOfHand: "+0",
    religion: "+0",
    survival: "+0",
  },
  // Conjuração
  spellcasting: {
    ability: "",
    saveDC: "",
    attackBonus: "",
  },
  // Magias (Níveis 0-9)
  spells: Array.from({ length: 10 }, (_, i) => ({
    level: i,
    slots: { used: 0, total: 0 },
    list: [],
  })),
});

// Gnork agora usa a mesma estrutura completa
const initialCharacterData = {
  ...createBlankCharacter("Gnork"),
  id: "gnork-1",
  class: "Mago",
  race: "mestiço (Gnomo + Orc)",
  age: "30",
  height: "170cm",
  weight: "100kg",
  eyes: "roxos com a esclera preta",
  skin: "roxa",
  hair: "negros",
  level: "3",
  alignment: "Neutro",
  playerName: "Caio Bisesti",
  proficiencyBonus: "+2",
  armorClass: "15",
  initiative: "+3",
  speed: "9",
  currentHp: "8",
  gold: "79",
  equipment: `Um vidro de tinta escura, uma pena, uma faca pequena, uma carta de um falecido colega perguntando a você algo que você nunca terá a chance de responder, um conjunto de roupas comuns e uma algibeira contendo 10 po\numa adaga, um foco arcano, um pacote de estudioso, Um grimório\n4x adaga 1x saco de dormir 1x urna de metal com cinzas de heroi\n1x equipamento de pescaria, 1x esferas.1x orbe, Utensílios de cozinheiro`,
  languages: `comum\ngnomico\nabissal\ndialeto subterraneo`,
  features: `alquinista e pequisador\nobjetivo = criar aldeia mestiços\nmedo = perder memorias\npersonalidade = frieza\nimportante = poder e conhecimento\nduvida = sua propria capcidade\nvida = confortavel`,
  story: `A vida de Gnork começou com uma anomalia...`,
  stats: {
    strength: { value: "12", mod: "+1" },
    dexterity: { value: "16", mod: "+3" },
    constitution: { value: "15", mod: "+2" },
    intelligence: { value: "21", mod: "+5" },
    wisdom: { value: "13", mod: "+1" },
    charisma: { value: "11", mod: "+0" },
  },
  savingThrows: {
    strength: "12",
    dexterity: "16",
    constitution: "15",
    intelligence: "21",
    wisdom: "13",
    charisma: "11",
  },
  skills: {
    acrobatics: "+3",
    arcana: "+7",
    athletics: "+1",
    performance: "+0",
    bluff: "+0",
    stealth: "+3",
    history: "+7",
    intimidation: "+0",
    insight: "+3",
    investigation: "+7",
    animalHandling: "+1",
    medicine: "+1",
    nature: "+5",
    perception: "+1",
    persuasion: "+0",
    sleightOfHand: "+3",
    religion: "+5",
    survival: "+1",
  },
  spellcasting: { ability: "Inteligência", saveDC: "15", attackBonus: "" },
  spells: Array.from({ length: 10 }, (_, i) => ({
    level: i,
    slots: { used: 0, total: 0 },
    list: [],
  })),
};
// Populando magias do Gnork
initialCharacterData.spells[0].list = [
  { name: "Toque Arrepiante", description: "Truque de necromancia..." },
  { name: "Prestidigitação", description: "truque de transmutação..." },
  { name: "Mãos Mágicas", description: "truque de conjuração..." },
];
initialCharacterData.spells[1].slots = { used: 0, total: 4 };
initialCharacterData.spells[1].list = [
  { name: "QUEDA SUAVE", description: "1° nível de transmutação..." },
  { name: "IDENTIFICAÇÃO", description: "1° nível de adivinhação (ritual)..." },
];
initialCharacterData.spells[2].slots = { used: 0, total: 2 };
initialCharacterData.spells[2].list = [
  { name: "ALTERAR-SE", description: "2° nível de transmutação..." },
  { name: "CEGUEIRA/SURDEZ", description: "2° nível de necromancia..." },
];

// --- COMPONENTES ---

const EditableField = ({ label, value, onChange, type = "text", rows = 1 }) => (
  <div className="form-field">
    <label>{label}</label>
    {type === "textarea" ? (
      <textarea value={value} onChange={onChange} rows={rows} />
    ) : (
      <input type={type} value={value} onChange={onChange} />
    )}
  </div>
);

const DiceRollerModal = ({ onClose }) => {
  const diceTypes = [2, 4, 6, 8, 10, 12, 20];
  const [diceCounts, setDiceCounts] = useState(
    diceTypes.reduce((acc, d) => ({ ...acc, [`d${d}`]: 0 }), {})
  );
  const [modifier, setModifier] = useState(0);
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);

  const rollDice = () => {
    let newResults = [];
    let newTotal = 0;
    for (const die in diceCounts) {
      for (let i = 0; i < diceCounts[die]; i++) {
        const sides = parseInt(die.substring(1));
        const roll = Math.floor(Math.random() * sides) + 1;
        newResults.push({ sides, roll });
        newTotal += roll;
      }
    }
    newTotal += modifier;
    setResults(newResults);
    setTotal(newTotal);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Rolador de Dados</h2>
          <button onClick={onClose} className="close-btn">
            &times;
          </button>
        </div>
        <div className="dice-grid">
          {" "}
          {/* Usando CSS Grid para melhor alinhamento */}
          {diceTypes.map((d) => (
            <div key={d} className="dice-control">
              <span>d{d}</span>
              <div className="dice-buttons">
                <button
                  onClick={() =>
                    setDiceCounts((p) => ({
                      ...p,
                      [`d${d}`]: Math.max(0, p[`d${d}`] - 1),
                    }))
                  }
                >
                  -
                </button>
                <span>{diceCounts[`d${d}`]}</span>
                <button
                  onClick={() =>
                    setDiceCounts((p) => ({ ...p, [`d${d}`]: p[`d${d}`] + 1 }))
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="modifier-control">
          <label>Modificador:</label>
          <input
            type="number"
            value={modifier}
            onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
          />
        </div>
        <button
          onClick={rollDice}
          className="button-primary"
          style={{ marginTop: "20px" }}
        >
          Rolar
        </button>
        {results.length > 0 && (
          <div className="results-box">
            <div className="rolls-display">
              {results.map((r, i) => (
                <span key={i} className="roll-tag">
                  {r.roll}/{r.sides}
                </span>
              ))}
            </div>
            <p>Modificador: {modifier > 0 ? `+${modifier}` : modifier}</p>
            <h3>
              Total: <span>{total}</span>
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

const CharacterSheet = memo(function CharacterSheet({ character, onUpdate }) {
  if (!character)
    return (
      <div className="main-content">
        <p>Carregando personagem...</p>
      </div>
    );

  const handleUpdate = (path, value) => {
    const keys = path.split(".");
    let charCopy = JSON.parse(JSON.stringify(character));
    let temp = charCopy;
    for (let i = 0; i < keys.length - 1; i++) {
      temp = temp[keys[i]];
    }
    temp[keys[keys.length - 1]] = value;
    onUpdate(charCopy);
  };

  const addSpell = (level) => {
    let charCopy = JSON.parse(JSON.stringify(character));
    charCopy.spells[level].list.push({ name: "Nova Magia", description: "" });
    onUpdate(charCopy);
  };

  const deleteSpell = (level, spellIndex) => {
    let charCopy = JSON.parse(JSON.stringify(character));
    charCopy.spells[level].list.splice(spellIndex, 1);
    onUpdate(charCopy);
  };

  return (
    <div className="main-content">
      {/* --- CABEÇALHO --- */}
      <div className="character-sheet-grid">
        <div className="card grid-col-span-4">
          <div className="char-header-grid">
            <EditableField
              label="Nome do Personagem"
              value={character.name}
              onChange={(e) => handleUpdate("name", e.target.value)}
            />
            <EditableField
              label="Classe & Nível"
              value={`${character.class} ${character.level}`}
              onChange={(e) => {
                const parts = e.target.value.split(" ");
                handleUpdate("level", parts.pop());
                handleUpdate("class", parts.join(" "));
              }}
            />
            <EditableField
              label="Raça"
              value={character.race}
              onChange={(e) => handleUpdate("race", e.target.value)}
            />
            <EditableField
              label="Tendência"
              value={character.alignment}
              onChange={(e) => handleUpdate("alignment", e.target.value)}
            />
            <EditableField
              label="Jogador"
              value={character.playerName}
              onChange={(e) => handleUpdate("playerName", e.target.value)}
            />
          </div>
        </div>
        {/* --- COLUNA 1: ATRIBUTOS E PERÍCIAS --- */}
        <div className="grid-col-span-1 flex flex-col gap-6">
          <div className="card">
            {Object.keys(character.stats).map((stat) => (
              <div key={stat} className="stat-row">
                <label>{stat}</label>
                <div className="stat-inputs">
                  <input
                    type="text"
                    value={character.stats[stat].mod}
                    onChange={(e) =>
                      handleUpdate(`stats.${stat}.mod`, e.target.value)
                    }
                    className="stat-mod"
                  />
                  <input
                    type="number"
                    value={character.stats[stat].value}
                    onChange={(e) =>
                      handleUpdate(`stats.${stat}.value`, e.target.value)
                    }
                    className="stat-value"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <h3 className="card-title">Testes de Resistência</h3>
            {Object.keys(character.savingThrows).map((st) => (
              <EditableField
                key={st}
                label={st}
                value={character.savingThrows[st]}
                onChange={(e) =>
                  handleUpdate(`savingThrows.${st}`, e.target.value)
                }
              />
            ))}
          </div>
          <div className="card">
            <h3 className="card-title">Perícias</h3>
            {Object.keys(character.skills).map((skill) => (
              <EditableField
                key={skill}
                label={skill}
                value={character.skills[skill]}
                onChange={(e) =>
                  handleUpdate(`skills.${skill}`, e.target.value)
                }
              />
            ))}
          </div>
        </div>
        {/* --- COLUNA 2: COMBATE, PERSONALIDADE, EQUIPAMENTOS --- */}
        <div className="grid-col-span-2 flex flex-col gap-6">
          <div className="card-group">
            <div className="card">
              <EditableField
                label="Classe de Armadura"
                value={character.armorClass}
                onChange={(e) => handleUpdate("armorClass", e.target.value)}
              />
            </div>
            <div className="card">
              <EditableField
                label="Iniciativa"
                value={character.initiative}
                onChange={(e) => handleUpdate("initiative", e.target.value)}
              />
            </div>
            <div className="card">
              <EditableField
                label="Deslocamento"
                value={character.speed}
                onChange={(e) => handleUpdate("speed", e.target.value)}
              />
            </div>
          </div>
          <div className="card">
            <div className="hp-box">
              <EditableField
                label="PV Atuais"
                value={character.currentHp}
                onChange={(e) => handleUpdate("currentHp", e.target.value)}
              />
              <EditableField
                label="PV Temporários"
                value={character.tempHp}
                onChange={(e) => handleUpdate("tempHp", e.target.value)}
              />
              <EditableField
                label="PV Totais"
                value={character.totalHp}
                onChange={(e) => handleUpdate("totalHp", e.target.value)}
              />
            </div>
          </div>
          <div className="card">
            <EditableField
              label="Traços de Personalidade"
              value={character.personalityTraits}
              onChange={(e) =>
                handleUpdate("personalityTraits", e.target.value)
              }
              type="textarea"
              rows={2}
            />
            <EditableField
              label="Ideais"
              value={character.ideals}
              onChange={(e) => handleUpdate("ideals", e.target.value)}
              type="textarea"
              rows={2}
            />
            <EditableField
              label="Vínculos"
              value={character.bonds}
              onChange={(e) => handleUpdate("bonds", e.target.value)}
              type="textarea"
              rows={2}
            />
            <EditableField
              label="Defeitos"
              value={character.flaws}
              onChange={(e) => handleUpdate("flaws", e.target.value)}
              type="textarea"
              rows={2}
            />
          </div>
          <div className="card">
            <EditableField
              label="Equipamento & Ouro"
              value={character.equipment}
              onChange={(e) => handleUpdate("equipment", e.target.value)}
              type="textarea"
              rows={8}
            />
            <EditableField
              label="Idiomas e Proficiências"
              value={character.languages}
              onChange={(e) => handleUpdate("languages", e.target.value)}
              type="textarea"
              rows={4}
            />
          </div>
        </div>
        {/* --- COLUNA 3: MAGIAS --- */}
        <div className="grid-col-span-1 flex flex-col gap-6">
          <div className="card">
            <h3 className="card-title">Conjuração</h3>
            <EditableField
              label="Habilidade Chave"
              value={character.spellcasting.ability}
              onChange={(e) =>
                handleUpdate("spellcasting.ability", e.target.value)
              }
            />
            <EditableField
              label="CD da Magia"
              value={character.spellcasting.saveDC}
              onChange={(e) =>
                handleUpdate("spellcasting.saveDC", e.target.value)
              }
            />
            <EditableField
              label="Bônus de Ataque"
              value={character.spellcasting.attackBonus}
              onChange={(e) =>
                handleUpdate("spellcasting.attackBonus", e.target.value)
              }
            />
          </div>
          <div className="card spell-list">
            <h3 className="card-title">Magias</h3>
            {character.spells.map((level, i) => (
              <div key={i} className="spell-level">
                <h4>{i === 0 ? "Truques" : `Nível ${i}`}</h4>
                {i > 0 && (
                  <div className="spell-slots">
                    <input
                      type="number"
                      value={level.slots.used}
                      onChange={(e) =>
                        handleUpdate(`spells.${i}.slots.used`, e.target.value)
                      }
                    />
                    <span>/</span>
                    <input
                      type="number"
                      value={level.slots.total}
                      onChange={(e) =>
                        handleUpdate(`spells.${i}.slots.total`, e.target.value)
                      }
                    />
                  </div>
                )}
                {level.list.map((spell, spellIndex) => (
                  <details key={spellIndex} className="spell-details">
                    <summary>
                      {spell.name}{" "}
                      <button onClick={() => deleteSpell(i, spellIndex)}>
                        🗑️
                      </button>
                    </summary>
                    <EditableField
                      label="Nome"
                      value={spell.name}
                      onChange={(e) =>
                        handleUpdate(
                          `spells.${i}.list.${spellIndex}.name`,
                          e.target.value
                        )
                      }
                    />
                    <EditableField
                      label="Descrição"
                      value={spell.description}
                      onChange={(e) =>
                        handleUpdate(
                          `spells.${i}.list.${spellIndex}.description`,
                          e.target.value
                        )
                      }
                      type="textarea"
                      rows={5}
                    />
                  </details>
                ))}
                <button className="add-spell-btn" onClick={() => addSpell(i)}>
                  + Adicionar Magia
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [modal, setModal] = useState(null);
  const [newCharacterName, setNewCharacterName] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("dnd_characters_v3");
      if (saved && saved !== "[]") {
        setCharacters(JSON.parse(saved));
        setSelectedCharacterId(JSON.parse(saved)[0]?.id || null);
      } else {
        setCharacters([initialCharacterData]);
        setSelectedCharacterId(initialCharacterData.id);
      }
    } catch {
      setCharacters([initialCharacterData]);
      setSelectedCharacterId(initialCharacterData.id);
    }
  }, []);

  useEffect(() => {
    if (characters.length > 0) {
      localStorage.setItem("dnd_characters_v3", JSON.stringify(characters));
    }
  }, [characters]);

  const handleCreateCharacter = useCallback(
    (e) => {
      e.preventDefault();
      if (!newCharacterName.trim()) return;
      const newCharacter = createBlankCharacter(newCharacterName);
      setCharacters((prev) => [...prev, newCharacter]);
      setSelectedCharacterId(newCharacter.id);
      setNewCharacterName("");
      setModal(null);
    },
    [newCharacterName]
  );

  const handleDeleteCharacter = useCallback(
    (idToDelete) => {
      setCharacters((prev) => {
        const updated = prev.filter((c) => c.id !== idToDelete);
        if (selectedCharacterId === idToDelete) {
          setSelectedCharacterId(updated[0]?.id || null);
        }
        return updated;
      });
    },
    [selectedCharacterId]
  );

  const handleUpdateCharacter = useCallback((updatedCharacter) => {
    setCharacters((prev) =>
      prev.map((c) => (c.id === updatedCharacter.id ? updatedCharacter : c))
    );
  }, []);

  const selectedCharacter = characters.find(
    (c) => c.id === selectedCharacterId
  );

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Fichas Arcanas</h1>
        </div>
        <select
          className="mobile-char-selector"
          style={{ display: "none" }}
          value={selectedCharacterId || ""}
          onChange={(e) => setSelectedCharacterId(e.target.value)}
        >
          {characters.map((char) => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
        <nav className="character-list">
          {characters.map((char) => (
            <div
              key={char.id}
              className={`character-item ${
                selectedCharacterId === char.id ? "active" : ""
              }`}
            >
              <button
                onClick={() => setSelectedCharacterId(char.id)}
                className="select-char-btn"
              >
                {char.name || "Sem nome"}
              </button>
              <button
                onClick={() => handleDeleteCharacter(char.id)}
                className="delete-char-btn"
              >
                🗑️
              </button>
            </div>
          ))}
        </nav>
        <div className="sidebar-actions">
          <button onClick={() => setModal("dice")} className="button-primary">
            🎲 Rolar Dados
          </button>
          <button onClick={() => setModal("create")} className="button-primary">
            Criar Personagem
          </button>
        </div>
      </aside>

      {selectedCharacter ? (
        <CharacterSheet
          character={selectedCharacter}
          onUpdate={handleUpdateCharacter}
        />
      ) : (
        <div className="main-content">
          <h2>Selecione ou crie um personagem.</h2>
        </div>
      )}

      {modal === "create" && (
        <div className="modal-overlay">
          <form onSubmit={handleCreateCharacter} className="modal-content">
            <div className="modal-header">
              <h2>Criar Personagem</h2>
              <button
                type="button"
                onClick={() => setModal(null)}
                className="close-btn"
              >
                &times;
              </button>
            </div>
            <EditableField
              label="Nome do Personagem"
              value={newCharacterName}
              onChange={(e) => setNewCharacterName(e.target.value)}
            />
            <div className="modal-actions">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="button-primary button-secondary"
              >
                Cancelar
              </button>
              <button type="submit" className="button-primary">
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}
      {modal === "dice" && <DiceRollerModal onClose={() => setModal(null)} />}
    </div>
  );
}
