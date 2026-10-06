import type { NewsItem, EventItem, GalleryItem } from './types';

export const images = {
  hero: 'https://images.pexels.com/photos/8533860/pexels-photo-8533860.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  mountain: 'https://images.pexels.com/photos/30057008/pexels-photo-30057008.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  sunrise: 'https://images.pexels.com/photos/12931460/pexels-photo-12931460.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ridge: 'https://images.pexels.com/photos/17767111/pexels-photo-17767111.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  dawn: 'https://images.pexels.com/photos/16960973/pexels-photo-16960973.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  forest: 'https://images.pexels.com/photos/15639315/pexels-photo-15639315.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

export const news: NewsItem[] = [
  { title: 'SOS Serra promove mutirão de recuperação de nascentes', excerpt: 'Comunidade se reúne para cuidar das águas que atravessam os bairros da serra.', category: 'Ação comunitária', date: '12 jun 2026', image: images.mountain },
  { title: 'Memórias de Petrópolis: histórias que a serra guarda', excerpt: 'Uma conversa com moradores que ajudam a preservar a memória de cada encosta.', category: 'Memórias', date: '04 jun 2026', image: images.dawn },
  { title: 'Campanha de inverno arrecada cobertores e agasalhos', excerpt: 'A mobilização já alcançou 180 famílias e segue recebendo doações.', category: 'Campanhas', date: '28 mai 2026', image: images.forest },
];

export const events: EventItem[] = [
  { title: 'Roda de conversa: a força da comunidade', date: '20 JUN 2026', day: '20', month: 'JUN', time: '10:00', place: 'Centro Comunitário da Serra', description: 'Um encontro aberto para compartilhar histórias, desafios e próximos passos do território.' },
  { title: 'Mutirão pela Serra', date: '27 JUN 2026', day: '27', month: 'JUN', time: '08:00', place: 'Praça do Alto da Serra', description: 'Vamos cuidar juntos dos caminhos, praças e áreas verdes que fazem parte da nossa casa.' },
  { title: 'Feira de projetos locais', date: '04 JUL 2026', day: '04', month: 'JUL', time: '14:00', place: 'Galpão da Estação', description: 'Uma tarde para conhecer iniciativas, produtores e talentos que movimentam a região.' },
];

export const gallery: GalleryItem[] = [
  { image: images.hero, title: 'A serra ao amanhecer' },
  { image: images.mountain, title: 'Caminhos da comunidade' },
  { image: images.sunrise, title: 'Cuidar das nascentes' },
  { image: images.ridge, title: 'Mutirão pela Serra' },
  { image: images.dawn, title: 'Memórias vivas' },
  { image: images.forest, title: 'Natureza que aproxima' },
];
