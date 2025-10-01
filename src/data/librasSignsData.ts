// Libras signs database with text-to-sign mappings
export interface LibrasSign {
  id: string;
  word: string;
  description: string;
  emoji: string;
  category: string;
}

export const librasSignsData: LibrasSign[] = [
  {
    id: "ola",
    word: "olá",
    description: "Saudação - Mão aberta acenando",
    emoji: "👋",
    category: "saudacoes"
  },
  {
    id: "boa-noite",
    word: "boa noite",
    description: "Saudação noturna",
    emoji: "🌙",
    category: "saudacoes"
  },
  {
    id: "bom-dia",
    word: "bom dia",
    description: "Saudação matinal",
    emoji: "☀️",
    category: "saudacoes"
  },
  {
    id: "obrigado",
    word: "obrigado",
    description: "Agradecimento",
    emoji: "🙏",
    category: "cortesia"
  },
  {
    id: "por-favor",
    word: "por favor",
    description: "Pedido educado",
    emoji: "🙏",
    category: "cortesia"
  },
  {
    id: "sim",
    word: "sim",
    description: "Afirmação",
    emoji: "✅",
    category: "respostas"
  },
  {
    id: "nao",
    word: "não",
    description: "Negação",
    emoji: "❌",
    category: "respostas"
  },
  {
    id: "ajuda",
    word: "ajuda",
    description: "Pedido de socorro",
    emoji: "🆘",
    category: "necessidades"
  },
  {
    id: "com-licenca",
    word: "com licença",
    description: "Pedido de passagem",
    emoji: "🚶",
    category: "cortesia"
  },
  {
    id: "desculpa",
    word: "desculpa",
    description: "Pedido de desculpas",
    emoji: "😔",
    category: "cortesia"
  },
  {
    id: "entendi",
    word: "entendi",
    description: "Compreensão",
    emoji: "💡",
    category: "respostas"
  },
  {
    id: "nao-entendi",
    word: "não entendi",
    description: "Falta de compreensão",
    emoji: "❓",
    category: "respostas"
  }
];

// Find sign by text (case-insensitive, removes accents)
export const findSignByText = (text: string): LibrasSign | undefined => {
  const normalizedText = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  
  return librasSignsData.find(sign => {
    const normalizedWord = sign.word
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return normalizedText.includes(normalizedWord);
  });
};

// Get all signs by category
export const getSignsByCategory = (category: string): LibrasSign[] => {
  return librasSignsData.filter(sign => sign.category === category);
};
