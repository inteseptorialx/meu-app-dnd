import React, { useState, useEffect } from "react";

// Dados iniciais do personagem Gnork para pré-popular a aplicação.
const initialCharacterData = {
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
  story: `A vida de Gnork começou com uma anomalia. Filho de uma mãe orc, forte e imponente, e de um pai gnomo, astuto e engenhoso, ele foi uma aberração, um elo quebrado na corrente de duas linhagens. A aceitação nunca foi uma opção. Repudiados por ambas as tribos, seus pais buscaram refúgio em uma existência marginalizada, caçando e vivendo de forma itinerante, sempre sob a sombra do ostracismo.\nAos nove anos, essa frágil paz se desfez em violência. O rugido de mercenários ecoou pelo acampamento, e o último som que Gnork ouviu de sua mãe foi um urro de guerra, seguido pelo silêncio. Seu pai, com um último ato desesperado de amor, o empurrou para a escuridão da floresta. Gnork, com a pequena lâmina que seu pai lhe dera, correu sem rumo, o medo e a adrenalina borrando sua visão. Em sua fuga desesperada, o solo cedeu sob seus pés. Ele rolou, o mundo virando de cabeça para baixo, até que um baque o jogou na mais completa escuridão.\nQuando seus sentidos retornaram, ele estava no subsolo, em um lugar que a superfície só conhece em pesadelos. As profundezas do subterrâneo eram um labirinto de cavernas úmidas e passagens estreitas, iluminadas apenas pelo brilho sulfúrico de fungos bioluminescentes. Ali, entre as ruínas de uma antiga cidade, ele encontrou um assentamento de anões duergar. Esses seres de pele cinzenta, com olhos que refletiam a luz fria do aço, toleraram sua presença, mas não ofereceram calor humano. Sob seu olhar desconfiado, Gnork aprendeu a navegar nesse mundo cruel, aprendendo o idioma ríspido dos anões negros para sobreviver.\nNo entanto, sua jornada mudou drasticamente quando ele foi notado por um ser que existia além da compreensão mortal: um demônio de sangue, um mestre da guerra e da mente, que via no garoto um potencial inexplorado. Sob a tutela desse ser abissal, Gnork não aprendeu apenas magia e alquimia; ele aprendeu a disciplina fria da lógica, a arte de forjar a própria vontade e o dialeto gutural do Abissal. O demônio o treinou não por bondade, mas por interesse, lapidando-o como uma arma. Para ele, o alinhamento de Gnork, neutro e sem âncoras morais, era a tela perfeita para pintar a sua arte.\nAos trinta anos, já um homem, seu mestre o chamou para um último e fatídico encontro. "Você não é mais um aprendiz", o demônio rosnou, a voz ressoando com um eco infernal. "O conhecimento que precisa agora deve ser conquistado por si mesmo." Com um último gesto, ele lhe ensinou o Comum, a língua que o ligaria novamente ao mundo da superfície, e o mandou para longe. A escuridão do subsolo era um lar, mas um lar frio, onde a fome era uma constante e a única refeição digna eram os restos de criaturas grotescas. Ele se lembrava com um misto de saudade e nojo dos banquetes de espetos de ratos e pernas de rãs e sapos que o mantinham vivo.\nCom a mochila nas costas e a mente cheia de conhecimento proibido, Gnork emergiu para a superfície. O sol, um brilho quase insuportável, o cegou. A vastidão do céu o fez sentir-se pequeno, mas a curiosidade o impulsionou. Seus passos o levaram a uma cidade chamada Greenest, onde cores, sons e cheiros normais o atingiram como uma onda. Um festival! A ideia era nova, tentadora. Ele, o meio-orc, meio-gnomo, criado nas profundezas do inferno, veria o que a vida na superfície tinha a oferecer. E por curiosidade, ele decidiu ficar. A aventura mal havia começado.`,
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
  spellcasting: {
    ability: "Inteligência",
    saveDC: "15",
    attackBonus: "",
  },
  spells: Array.from({ length: 26 }, (_, i) => ({
    level: i,
    slots: i > 0 ? "0/0" : "",
    list: [],
  })),
};

// Populando as magias de Gnork
initialCharacterData.spells[0].list = [
  {
    name: "Toque Arrepiante",
    description:
      "Truque de necromancia\nTempo de conjuração: 1ação\nAlcance: 36 metros\nComponentes: V,S\nDuração 1 rodada\nVocê cria uma mão esquelética fantasmagórica no espaço de uma criatura, dentro do alcance, realize um ataque a distancia com magia contra a criatura para afeta-la com o frio seputeral. Se atingir, a criatura sofre 1d8 de dano necrótico e não poderá recuperar pontos de vida até o inicio do proximo turno. Até la, a mão ficará presa ao alvo.\nSe você atingir um alvo morto-vivo, ele terá, desvantagem nas jogadas de ataque contra você até o final do seu próximo turno.\nO dano dessa magia aumenta 1d8 quando você alcança o 5° nivel (2d8), 11° nivel (3d8), 17° nivel (4d8).",
  },
  {
    name: "prestidigitação",
    description:
      "truque de transmutação\ntempo de conjuração: 1 ação\nalcance: 3 metros\ncomponentes: V, S\nduração: até 1 hora\nessa magia é um truque de magico simples que conjuradores iniciantes usam para praticar. você cria um dos seguintes efeitos\n\nvocê cria, instantaneamente, um feitiço sensorial inofensivo, como uma chuva de faiscas, um sopro de vento, notas musicais suaves ou um odor estranho\nvocê, instantaneamente, acende ou apaga uma vela, uma tocha ou uma pequena fogueira\nvocê, instantaneamente, limpa ou suja, um objeto de ate 1 metro cubico\nvocê esfria, esquenta ou melhora o sabor de até 1 metro cubico, de materia inorganica, por 1 hora\nvocê faz uma cor, uma pequena marca ou um simbolo aparecer em um objeto ou superficie por 1 hora\nvocê cria uma bugiganga não-magica ou uma imagem ilusoria que caiba na sua mão e que dura até o final do seu proximo turno\nse você conjurar essa magia diversas vezes, você pode ter até 3 dos efeitos não-instantaneos ativos, ao mesmo tempo, e você pode dissipar um desses efeitos com uma ação.",
  },
  {
    name: "Mãos magicas",
    description:
      "truque de conjuração\ntempo de conjuração: 1 ação\nalcance: 9 metros\nComponentes: V, S\nduração: 1 minuto\nUma mão espectral flutuante aparece num ponto, a sua escolha, , dentro do alcance. A mão permanece pela duração ou até você dissipa-la com uma ação, a mão some se estiver a mais de 9 metros de você ou se conjurar essa magia novamente.\nvocê pode usar sua ação para controlar a mão, você pode usar a mão para manipular um objeto, abrir uma porta ou recipiente destrancado, guardar ou pegar um item do recipiente aberto ou derramar o onteudo de um frasco. você pode mover a mão ate 9 metros a cada vez que usa.\nA mão não pode atacar, ativar itens magicos ou carregar mais de 5 quilos",
  },
];
initialCharacterData.spells[1].slots = "4/4";
initialCharacterData.spells[1].list = [
  {
    name: "QUEDA SUAVE",
    description:
      "1° nível de transmutação\nTempo de Conjuração: 1 reação, que você realiza quando você ou uma criatura a até 18 metros cair\nAlcance: 18 metros\nComponentes: V, M (uma pequena pena ou penugem similar)\nDuração: 1 minuto\nEscolha até cinco criaturas caindo, dentro do alcance. A taxa de descendência de uma criatura caindo é reduzida para 18 metros por rodada, até o fim da magia. Se a criatura aterrissar antes da magia acabar, ela não sofre nenhum dano de queda, pode aterrissar em pé e a magia termina para essa criatura.",
  },
  {
    name: "IDENTIFICAÇÃO",
    description:
      "1° nível de adivinhação (ritual)\nTempo de Conjuração: 1 minuto\nAlcance: Toque Componentes: V, S, M (uma perola valendo, no mínimo, 100 po e uma pena de coruja)\nDuração: Instantânea\nVocê escolhe um objeto que você deve tocar durante toda a conjuração da magia. Se ele for um item mágico ou algum outro objeto imbuído por magia, você descobre suas propriedades e como usá-lo, se exige sintonia para ser usado e quantas cargas ele tem, se aplicáveL Você descobre se quaisquer magias estão afetando o item e quais eles são. Se o item foi criado por magia, você descobre que magia o criou.\nSe você, ao invés, tocar uma criatura durante toda a conjuração, você descobre quais magias, se houver alguma, estão afetando-a atualmente.",
  },
  {
    name: "AREA ESCORREGADIA",
    description:
      "1° nível de conjuração\nTempo de Conjuração: 1 ação\nAlcance: 18 metros\nComponentes: V, S, M (um pouco de pele de porco ou manteiga)\nDuração: 1 minuto\nGraxa escorregadia cobre o solo em um quadrado de 3 metros centrado em um ponto, dentro do alcance, tornando essa área em terreno dificil pela duração.\nQuando a graxa aparece, cada criatura de pé na área deve ser bem sucedida num teste de resistência de Destreza ou cairá no chão. Uma criatura que entre na área ou termine seu turno nela, deve ser bem sucedido num teste de resistência de Destreza ou cairá no chão.",
  },
  {
    name: "RAIO ADOECENTE",
    description:
      "1° nível de necroniancia\nTempo de Conjuração: 1 ação\nAlcance: 18 metros\nComponentes: V, S\nDuração: Instantânea\nUm raio adoecente de energia esverdeada chicoteia na direção de uma criatura dentro do alcance. Faça um ataque à distância com magia contra o alvo. Se atingir, o alvo sofrerá 2d8 de dano de veneno e deve realizar um teste de resistência de Constituição. Se falhar na resistência, ele também ficará envenenado até o final do seu próximo turno.\nEm Níveis Superiores. Quando você conjurar essa magia usando um espaço de magia de 2° nível ou superior, o dano da magia aumenta em 1d8 para cada nível do espaço acima do 1°.",
  },
];
initialCharacterData.spells[2].slots = "2/2";
initialCharacterData.spells[2].list = [
  {
    name: "ALTERAR-SE",
    description:
      "2° nível de transmutação\nTempo de Conjuração: 1 ação\nAlcance: Pessoal\nComponentes: V, S\nDuração: Concentração, até 1 hora\nVocê assume uma forma diferente. Quando conjurar essa magia, escolha uma das seguintes opções, o efeito durará pela duração da magia. Enquanto a magia durar, você pode terminar uma opção com uma ação para ganhar os beneficios de uma diferente.\nAdaptação Aquática. Você adapta seu corpo para um ambiente aquático, brotando guelras e crescendo membranas entre seus dedos. Você pode respirar embaixo d'água e ganha deslocamento de natação igual a seu deslocamento terrestre.\nMudar Aparência. Você transforam sua aparência. Você decide com o que você parece, incluindo altura, peso, traços faciais, timbre da sua voz, comprimento do cabelo, coloração e características distintas, se tiverem. Você pode ficar parecido com um membro de outra raça, apesar de nenhuma de suas estatísticas mudar. Você também não pode parecer com uma criatura de um tamanho diferente do seu, e seu formado básico permanece o mesmo; se você for bípede, você não pode usar essa magia para se tornar quadrupede, por exemplo. A qualquer momento, pela duração da magia, você pode usar sua ação para mudar sua aparência dessa forma, novamente.\nArmas Naturais. Você faz crescerem garras, presas, espinhos, chifres ou armas naturais diferentes, à sua escolha. Seus ataques desarmados causam 1d6 de dano de concussão, perfurante ou cortante, como apropriado para a arma natural que você escolheu, e você é proficiente com seus ataques desarmados. Finalmente, a arma natural é mágica e você tem +1 de bônus nas jogadas de ataque e dano que você fizer com ela.",
  },
  {
    name: "CEGUEIRA/SURDEZ",
    description:
      "2° nível de necronmancia\nTempo de Conjuração: 1 ação\nAlcance: 9 metros\nComponentes: V\nDuração: 1 minuto\nVocê pode cegar ou ensurdecer um oponente. Escolha uma criatura que você possa ver dentro do alcance para fazer um teste de resistência de Constituição. Se ela falhar, ficará ou cega ou surda (à sua escolha) pela duração. No final de cada um dos turnos dele, o alvo pode realizar um teste de resistência de Constituição. Se obtiver sucesso, a magia termina.\nEm Níveis Superiores. Se você conjurar essa magia usando um espaço de magia de 3° nível ou superior, você pode afetar uma criatura adicional para cada nível de espaço acima do 2°.",
  },
];

// Componente reutilizável para campos de texto editáveis
const EditableField = ({ label, value, onChange, type = "text", rows = 1 }) => (
  <div className="flex flex-col">
    <label className="text-sm font-bold text-purple-300 mb-1">{label}</label>
    {type === "textarea" ? (
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        className="bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
      />
    )}
  </div>
);

// Modal da Mesa de Dados
const DiceRollerModal = ({ onClose }) => {
  const diceTypes = [4, 6, 8, 10, 12, 20, 100];
  const [diceCounts, setDiceCounts] = useState(
    diceTypes.reduce((acc, d) => ({ ...acc, [`d${d}`]: 0 }), {})
  );
  const [modifier, setModifier] = useState(0);
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);

  const handleCountChange = (die, amount) => {
    setDiceCounts((prev) => ({
      ...prev,
      [die]: Math.max(0, prev[die] + amount),
    }));
  };

  const rollDice = () => {
    let newResults = [];
    let newTotal = 0;
    for (const die in diceCounts) {
      const count = diceCounts[die];
      const sides = parseInt(die.substring(1));
      for (let i = 0; i < count; i++) {
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
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto text-white border border-purple-500">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-400">Mesa de Dados</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
          {diceTypes.map((d) => (
            <div
              key={d}
              className="bg-gray-700 p-3 rounded-lg flex flex-col items-center"
            >
              <span className="font-bold text-lg">d{d}</span>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => handleCountChange(`d${d}`, -1)}
                  className="bg-purple-600 rounded-full w-6 h-6 text-lg"
                >
                  -
                </button>
                <span className="text-xl font-mono w-8 text-center">
                  {diceCounts[`d${d}`]}
                </span>
                <button
                  onClick={() => handleCountChange(`d${d}`, 1)}
                  className="bg-purple-600 rounded-full w-6 h-6 text-lg"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-4">
          <label className="font-bold">Modificador:</label>
          <input
            type="number"
            value={modifier}
            onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
            className="bg-gray-700 text-white p-2 rounded-md w-24 text-center border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          onClick={rollDice}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg text-lg transition"
        >
          Rolar Dados
        </button>

        {results.length > 0 && (
          <div className="mt-6 bg-gray-900 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2 text-purple-400">
              Resultados
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {results.map((r, i) => (
                <span key={i} className="bg-gray-700 px-3 py-1 rounded-md">
                  {r.roll}
                  <span className="text-xs text-gray-400">/{r.sides}</span>
                </span>
              ))}
            </div>
            <p className="text-2xl font-bold text-center">
              Total: <span className="text-green-400">{total}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Modal do Dashboard do Personagem
const CharacterDashboard = ({
  character,
  onUpdate,
  onClose,
  onOpenDiceRoller,
}) => {
  const handleFieldChange = (field, value) => {
    onUpdate({ ...character, [field]: value });
  };

  const handleNestedChange = (category, field, value) => {
    onUpdate({
      ...character,
      [category]: {
        ...character[category],
        [field]: value,
      },
    });
  };

  const handleStatChange = (stat, key, value) => {
    onUpdate({
      ...character,
      stats: {
        ...character.stats,
        [stat]: {
          ...character.stats[stat],
          [key]: value,
        },
      },
    });
  };

  const handleSpellSlotChange = (level, value) => {
    const newSpells = [...character.spells];
    newSpells[level].slots = value;
    onUpdate({ ...character, spells: newSpells });
  };

  const addSpell = (level) => {
    const newSpells = [...character.spells];
    newSpells[level].list.push({
      name: "Nova Magia",
      description: "Descrição da magia.",
    });
    onUpdate({ ...character, spells: newSpells });
  };

  const updateSpell = (level, spellIndex, field, value) => {
    const newSpells = [...character.spells];
    newSpells[level].list[spellIndex][field] = value;
    onUpdate({ ...character, spells: newSpells });
  };

  const deleteSpell = (level, spellIndex) => {
    const newSpells = [...character.spells];
    newSpells[level].list.splice(spellIndex, 1);
    onUpdate({ ...character, spells: newSpells });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-40 p-2 sm:p-4">
      <div className="bg-gray-800 w-full h-full max-w-7xl rounded-lg shadow-2xl text-white border border-purple-500 flex flex-col">
        <header className="p-4 bg-gray-900/50 flex justify-between items-center gap-2 sm:gap-4 rounded-t-lg border-b border-gray-700">
          <input
            value={character.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            className="text-2xl sm:text-3xl font-bold text-purple-400 bg-transparent outline-none flex-1 min-w-0"
          />
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={onOpenDiceRoller}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 sm:px-4 rounded-lg mr-2 sm:mr-4 transition text-sm sm:text-base whitespace-nowrap"
            >
              Mesa de Dados
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-3xl sm:text-4xl font-bold"
            >
              &times;
            </button>
          </div>
        </header>
        <main className="p-4 overflow-y-auto flex-grow">
          {/* Character Core Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <EditableField
              label="Classe & Nível"
              value={`${character.class} ${character.level}`}
              onChange={(e) => {
                const parts = e.target.value.split(" ");
                const level = parts.pop();
                const className = parts.join(" ");
                onUpdate({ ...character, class: className, level: level });
              }}
            />
            <EditableField
              label="Raça"
              value={character.race}
              onChange={(e) => handleFieldChange("race", e.target.value)}
            />
            <EditableField
              label="Tendência"
              value={character.alignment}
              onChange={(e) => handleFieldChange("alignment", e.target.value)}
            />
            <EditableField
              label="Nome do Jogador"
              value={character.playerName}
              onChange={(e) => handleFieldChange("playerName", e.target.value)}
            />
          </div>

          {/* Main Stats and Skills */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left Column: Attributes & Skills */}
            <div className="md:col-span-1 flex flex-col gap-6">
              {/* Attributes */}
              <div className="bg-gray-700/50 p-4 rounded-lg">
                {Object.keys(character.stats).map((stat) => (
                  <div
                    key={stat}
                    className="flex items-center justify-between mb-3 text-center"
                  >
                    <label className="font-bold w-1/3 text-left capitalize">
                      {stat}
                    </label>
                    <input
                      type="text"
                      value={character.stats[stat].mod}
                      onChange={(e) =>
                        handleStatChange(stat, "mod", e.target.value)
                      }
                      className="bg-gray-800 text-white p-2 w-16 text-xl rounded-md border border-gray-600 text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="number"
                      value={character.stats[stat].value}
                      onChange={(e) =>
                        handleStatChange(stat, "value", e.target.value)
                      }
                      className="bg-gray-600 text-white p-1 w-12 rounded-md border border-gray-500 text-center focus:outline-none"
                    />
                  </div>
                ))}
              </div>
              {/* Saving Throws & Skills (simplified for brevity) */}
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-purple-400 mb-2">
                  Perícias
                </h3>
                {Object.entries(character.skills).map(([skill, value]) => (
                  <div
                    key={skill}
                    className="flex justify-between items-center mb-1"
                  >
                    <label className="text-sm capitalize">
                      {skill.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        handleNestedChange("skills", skill, e.target.value)
                      }
                      className="bg-gray-600 w-16 text-center rounded-md p-1 border border-gray-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Middle Column: Combat & Character Details */}
            <div className="md:col-span-2 flex flex-col gap-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <EditableField
                  label="Classe de Armadura"
                  value={character.armorClass}
                  onChange={(e) =>
                    handleFieldChange("armorClass", e.target.value)
                  }
                />
                <EditableField
                  label="Iniciativa"
                  value={character.initiative}
                  onChange={(e) =>
                    handleFieldChange("initiative", e.target.value)
                  }
                />
                <EditableField
                  label="Deslocamento"
                  value={character.speed}
                  onChange={(e) => handleFieldChange("speed", e.target.value)}
                />
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <EditableField
                    label="PV Atuais"
                    value={character.currentHp}
                    onChange={(e) =>
                      handleFieldChange("currentHp", e.target.value)
                    }
                  />
                  <EditableField
                    label="PV Temporários"
                    value={character.tempHp}
                    onChange={(e) =>
                      handleFieldChange("tempHp", e.target.value)
                    }
                  />
                  <EditableField
                    label="PV Totais"
                    value={character.totalHp}
                    onChange={(e) =>
                      handleFieldChange("totalHp", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <EditableField
                  label="Equipamento"
                  value={character.equipment}
                  onChange={(e) =>
                    handleFieldChange("equipment", e.target.value)
                  }
                  type="textarea"
                  rows={10}
                />
                <EditableField
                  label="Idiomas e Proficiências"
                  value={character.languages}
                  onChange={(e) =>
                    handleFieldChange("languages", e.target.value)
                  }
                  type="textarea"
                  rows={10}
                />
              </div>
              <EditableField
                label="Características e Habilidades"
                value={character.features}
                onChange={(e) => handleFieldChange("features", e.target.value)}
                type="textarea"
                rows={8}
              />
            </div>

            {/* Right Column: Personality & Backstory */}
            <div className="md:col-span-1 flex flex-col gap-6">
              <EditableField
                label="Traços de Personalidade"
                value={character.personalityTraits}
                onChange={(e) =>
                  handleFieldChange("personalityTraits", e.target.value)
                }
                type="textarea"
                rows={3}
              />
              <EditableField
                label="Ideais"
                value={character.ideals}
                onChange={(e) => handleFieldChange("ideals", e.target.value)}
                type="textarea"
                rows={3}
              />
              <EditableField
                label="Ligações"
                value={character.bonds}
                onChange={(e) => handleFieldChange("bonds", e.target.value)}
                type="textarea"
                rows={3}
              />
              <EditableField
                label="Defeitos"
                value={character.flaws}
                onChange={(e) => handleFieldChange("flaws", e.target.value)}
                type="textarea"
                rows={3}
              />
              <EditableField
                label="História do Personagem"
                value={character.story}
                onChange={(e) => handleFieldChange("story", e.target.value)}
                type="textarea"
                rows={15}
              />
            </div>
          </div>

          {/* Spellcasting section */}
          <div className="mt-6 bg-gray-900/50 p-4 rounded-lg">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">Magias</h2>
            {character.spells.map((spellLevel, level) => (
              <div key={level} className="mb-4 p-3 bg-gray-800 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">
                    {level === 0 ? "Truques" : `Nível ${level}`}
                  </h3>
                  {level > 0 && (
                    <div className="flex items-center gap-2">
                      <label className="text-sm">Espaços:</label>
                      <input
                        type="text"
                        value={spellLevel.slots}
                        onChange={(e) =>
                          handleSpellSlotChange(level, e.target.value)
                        }
                        className="bg-gray-700 w-20 text-center rounded p-1 border border-gray-600"
                      />
                    </div>
                  )}
                </div>
                {spellLevel.list.map((spell, spellIndex) => (
                  <details
                    key={spellIndex}
                    className="bg-gray-700 rounded-md mb-2"
                  >
                    <summary className="p-2 cursor-pointer font-semibold">
                      {spell.name}
                    </summary>
                    <div className="p-3 border-t border-gray-600">
                      <EditableField
                        label="Nome da Magia"
                        value={spell.name}
                        onChange={(e) =>
                          updateSpell(level, spellIndex, "name", e.target.value)
                        }
                      />
                      <EditableField
                        label="Descrição"
                        value={spell.description}
                        onChange={(e) =>
                          updateSpell(
                            level,
                            spellIndex,
                            "description",
                            e.target.value
                          )
                        }
                        type="textarea"
                        rows={8}
                      />
                      <button
                        onClick={() => deleteSpell(level, spellIndex)}
                        className="mt-2 bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded"
                      >
                        Apagar Magia
                      </button>
                    </div>
                  </details>
                ))}
                <button
                  onClick={() => addSpell(level)}
                  className="mt-2 bg-purple-600 hover:bg-purple-700 text-white text-sm py-1 px-3 rounded"
                >
                  Adicionar Magia
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

// Componente principal da aplicação
export default function App() {
  const [characters, setCharacters] = useState([]);
  const [modal, setModal] = useState(null); // null, 'create', 'dashboard', 'dice'
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [newCharacterName, setNewCharacterName] = useState("");

  // Carregar personagens do localStorage ao iniciar
  useEffect(() => {
    const savedCharacters = localStorage.getItem("dnd_characters");
    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters));
    } else {
      // Se não houver personagens salvos, carrega Gnork como inicial
      setCharacters([initialCharacterData]);
    }
  }, []);

  // Salvar personagens no localStorage sempre que houver uma alteração
  useEffect(() => {
    if (characters.length > 0) {
      localStorage.setItem("dnd_characters", JSON.stringify(characters));
    }
  }, [characters]);

  const handleCreateCharacter = (e) => {
    e.preventDefault();
    if (!newCharacterName.trim()) return;

    const newCharacter = JSON.parse(JSON.stringify(initialCharacterData)); // Deep copy
    newCharacter.id = Date.now().toString();
    newCharacter.name = newCharacterName;
    // Resetar campos específicos para um novo personagem
    Object.keys(newCharacter).forEach((key) => {
      if (
        typeof newCharacter[key] === "string" &&
        key !== "id" &&
        key !== "name"
      ) {
        newCharacter[key] = "";
      }
    });
    newCharacter.name = newCharacterName;
    newCharacter.level = "1";
    newCharacter.proficiencyBonus = "+2";

    setCharacters([...characters, newCharacter]);
    setNewCharacterName("");
    setModal(null);
  };

  const handleDeleteCharacter = (idToDelete) => {
    setCharacters(
      characters.filter((character) => character.id !== idToDelete)
    );
  };

  const handleOpenDashboard = (id) => {
    setSelectedCharacterId(id);
    setModal("dashboard");
  };

  const handleUpdateCharacter = (updatedCharacter) => {
    setCharacters(
      characters.map((c) =>
        c.id === updatedCharacter.id ? updatedCharacter : c
      )
    );
  };

  const selectedCharacter = characters.find(
    (c) => c.id === selectedCharacterId
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-purple-400 tracking-wider">
            Gerenciador de Fichas de D&D
          </h1>
          <p className="text-gray-400 mt-2">
            Crie e edite suas fichas de personagem com facilidade.
          </p>
        </header>

        <div className="text-center mb-8">
          <button
            onClick={() => setModal("create")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition shadow-lg shadow-purple-900/50"
          >
            Criar Personagem
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300 border-b-2 border-purple-500 pb-2">
            Personagens Criados
          </h2>
          <div className="flex flex-wrap gap-4">
            {characters.length > 0 ? (
              characters.map((char) => (
                <div
                  key={char.id}
                  className="flex items-center bg-gray-700 rounded-md shadow-md"
                >
                  <button
                    onClick={() => handleOpenDashboard(char.id)}
                    className="hover:bg-purple-800 text-white font-semibold py-2 px-5 rounded-l-md transition flex-grow text-left"
                  >
                    {char.name || "Sem nome"}
                  </button>
                  <button
                    onClick={() => handleDeleteCharacter(char.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-r-md transition"
                    aria-label={`Apagar ${char.name}`}
                  >
                    X
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Nenhum personagem criado ainda.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Criação de Personagem */}
      {modal === "create" && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <form
            onSubmit={handleCreateCharacter}
            className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-sm border border-purple-500"
          >
            <h2 className="text-2xl font-bold mb-6 text-purple-400">
              Criar Novo Personagem
            </h2>
            <input
              type="text"
              value={newCharacterName}
              onChange={(e) => setNewCharacterName(e.target.value)}
              placeholder="Nome do Personagem"
              className="w-full bg-gray-700 text-white p-3 rounded-md mb-6 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              autoFocus
            />
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal do Dashboard */}
      {modal === "dashboard" && selectedCharacter && (
        <CharacterDashboard
          character={selectedCharacter}
          onUpdate={handleUpdateCharacter}
          onClose={() => setModal(null)}
          onOpenDiceRoller={() => setModal("dice")}
        />
      )}

      {/* Modal da Mesa de Dados */}
      {modal === "dice" && (
        <DiceRollerModal onClose={() => setModal("dashboard")} />
      )}
    </div>
  );
}

