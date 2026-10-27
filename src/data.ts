import type { NewsItem, MemoryItem, GalleryItem, TeamMember } from './types';
export type Edicao = {
  mes: string;
  ano: number;
  turma: 'A' | 'B';
  pdf: string;
};

export const mesesOrdem = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

export const edicoes: Edicao[] = [
  { mes: 'Setembro', ano: 2026, turma: 'A', pdf: '/pdfs/2026/setembro-a.pdf' },
  { mes: 'Setembro', ano: 2026, turma: 'B', pdf: '/pdfs/2026/setembro-b.pdf' },
  { mes: 'Agosto', ano: 2026, turma: 'A', pdf: '/pdfs/2026/agosto-a.pdf' },
  { mes: 'Agosto', ano: 2026, turma: 'B', pdf: '/pdfs/2026/agosto-b.pdf' },
  { mes: 'Julho', ano: 2026, turma: 'A', pdf: '/pdfs/2026/julho-a.pdf' },
  { mes: 'Julho', ano: 2026, turma: 'B', pdf: '/pdfs/2026/julho-b.pdf' },
  { mes: 'Junho', ano: 2025, turma: 'A', pdf: '/pdfs/2025/junho-a.pdf' },
  { mes: 'Junho', ano: 2025, turma: 'B', pdf: '/pdfs/2025/junho-b.pdf' },
];
export const images = {
  hero: 'https://images.pexels.com/photos/8533860/pexels-photo-8533860.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  mountain: 'https://images.pexels.com/photos/30057008/pexels-photo-30057008.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  sunrise: 'images/cefet.jpg',
  ridge: 'https://images.pexels.com/photos/17767111/pexels-photo-17767111.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  dawn: 'https://images.pexels.com/photos/16960973/pexels-photo-16960973.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  forest: 'https://images.pexels.com/photos/15639315/pexels-photo-15639315.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

export const memories: MemoryItem[] = [
  { title: 'As águas que descem da serra', excerpt: 'Memórias de quem cresceu ouvindo o som das nascentes que atravessam os bairros.', author: 'Dona Maria das Graças', date: '12 jun 2026', image: images.mountain },
  { title: 'O trem que uniu Petrópolis', excerpt: 'Uma viagem no tempo pelos trilhos que construíram a identidade da cidade.', author: 'Seu Antônio Ferreira', date: '04 jun 2026', image: images.dawn },
  { title: 'Festas de bairro: a serra que celebra', excerpt: 'Como as festas tradicionais mantêm viva a cultura de cada comunidade.', author: 'Cecília Rocha', date: '28 mai 2026', image: images.forest },
];

export const articles: NewsItem[] = [
  { title: 'SOS Serra promove mutirão de recuperação de nascentes', excerpt: 'Comunidade se reúne para cuidar das águas que atravessam os bairros da serra.', category: 'Ação comunitária', date: '12 jun 2026', image: images.mountain },
  { title: 'Memórias de Petrópolis: histórias que a serra guarda', excerpt: 'Uma conversa com moradores que ajudam a preservar a memória de cada encosta.', category: 'Memórias', date: '04 jun 2026', image: images.dawn },
  { title: 'Campanha de inverno arrecada cobertores e agasalhos', excerpt: 'A mobilização já alcançou 180 famílias e segue recebendo doações.', category: 'Campanhas', date: '28 mai 2026', image: images.forest },
];

export const gallery: GalleryItem[] = [
  { image: images.hero, title: 'A serra ao amanhecer' },
  { image: images.mountain, title: 'Caminhos da comunidade' },
  { image: images.sunrise, title: 'Cuidar das nascentes' },
  { image: images.ridge, title: 'Mutirão pela Serra' },
  { image: images.dawn, title: 'Memórias vivas' },
  { image: images.forest, title: 'Natureza que aproxima' },
];

export const team: TeamMember[] = [
  { name: 'Carolina Freitas', role: 'Coordenadora do Folha da Memória', bio: 'Professora que coordena o jornal escrito pelos próprios alunos com base nos conteúdos aprendidos a cada ciclo do projeto.', image: 'https://images.pexels.com/photos/8543367/pexels-photo-8543367.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { name: 'Raquel Neves', role: 'Guia de turismo · Aulas de campo', bio: 'Acompanha os alunos nas saídas de campo, ajudando-os a se apropriarem dos espaços e histórias da cidade.', image: 'https://images.pexels.com/photos/6347743/pexels-photo-6347743.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { name: 'Associação SOS Serra', role: 'Realização', bio: 'Entidade responsável pelo Memórias de Petrópolis, criado em setembro de 2023 para despertar o pertencimento dos jovens à cidade.', image: 'https://images.pexels.com/photos/33323689/pexels-photo-33323689.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
];
