export const business = {
  name: "Catalogo Online",
  eyebrow: "Modelo neutro",
  tagline: "Uma vitrine flexivel para qualquer negocio",
  description:
    "Use esta base para loja, restaurante, confeitaria, mercado, servico local ou catalogo de produtos.",
  heroImage:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80",
  schedule: "Segunda a sabado - 09:00 as 18:00",
  location: "Retirada, entrega ou atendimento combinado",
  whatsappNumber: "5500000000000",
  deliveryFee: 5,
};

export const apiConfig = {
  baseUrl: "https://mystore.vps10920.panel.icontainer.online",
  storeId: "ABC123",
};

export const ACCESS_TOKEN_STORAGE_KEY = "catalog-access-token";
export const REFRESH_TOKEN_STORAGE_KEY = "catalog-refresh-token";
export const PROFILE_STORAGE_KEY = "catalog-profile";
export const SESSION_STORAGE_KEY = "catalog-session";
export const STORE_ID_STORAGE_KEY = "catalog-store-id";

export const defaultProfile = {
  id: "demo-user",
  name: "Cliente exemplo",
  phone: "(00) 00000-0000",
  address: "Rua exemplo",
  house_number: "100",
  avatar_url: "",
  points: 120,
  created_at: "2026-01-01T12:00:00.000Z",
};

export const categories = [
  { id: "todos", label: "Todos" },
  { id: "destaques", label: "Destaques" },
  { id: "produtos", label: "Produtos" },
  { id: "refeicoes", label: "Refeicoes" },
  { id: "bebidas", label: "Bebidas" },
  { id: "kits", label: "Kits" },
];

export const products = [
  {
    id: "produto-destaque",
    categoryId: "destaques",
    name: "Item destaque",
    description:
      "Produto principal da vitrine, ideal para representar a opcao mais procurada do negocio.",
    price: 39.9,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "produto-especial",
    categoryId: "produtos",
    name: "Produto especial",
    description:
      "Item versatil para uma loja, mercado, cafeteria ou catalogo de produtos personalizados.",
    price: 24.9,
    image:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "opcao-principal",
    categoryId: "refeicoes",
    name: "Opcao principal",
    description:
      "Sugestao estatica para restaurantes, lanchonetes ou negocios que trabalham com refeicoes.",
    price: 32.5,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "bebida-da-casa",
    categoryId: "bebidas",
    name: "Bebida da casa",
    description:
      "Bebida fria ou quente para acompanhar pedidos, combos ou atendimento local.",
    price: 12.9,
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "kit-presente",
    categoryId: "kits",
    name: "Kit combinado",
    description:
      "Conjunto pronto para presente, combo promocional, cesta, caixa ou pedido fechado.",
    price: 59.9,
    image:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "item-extra",
    categoryId: "destaques",
    name: "Item extra",
    description:
      "Complemento simples para testar adicionais, variacoes e sugestoes dentro do carrinho.",
    price: 9.9,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
  },
];

export const highlights = [
  {
    id: "entrega",
    title: "Entrega flexivel",
    description: "Configure retirada, entrega local ou combinacao manual.",
    image:
      "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "pagamento",
    title: "Pagamentos variados",
    description: "Use Pix, dinheiro, cartao ou outro formato de pagamento.",
    image:
      "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "catalogo",
    title: "Catalogo editavel",
    description: "Troque nomes, categorias, fotos e precos em um unico arquivo.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80",
  },
];

export const orderHistory = [
  {
    id: "PED-1008",
    date: "12/09/2026",
    status: "Entregue",
    deliveryType: "Entrega",
    paymentMethod: "Pix",
    total: 72.8,
    items: [
      { name: "Item destaque", quantity: 1 },
      { name: "Bebida da casa", quantity: 2 },
      { name: "Item extra", quantity: 1 },
    ],
  },
  {
    id: "PED-1004",
    date: "04/09/2026",
    status: "Retirado",
    deliveryType: "Retirada",
    paymentMethod: "Cartao",
    total: 59.9,
    items: [{ name: "Kit combinado", quantity: 1 }],
  },
  {
    id: "PED-0998",
    date: "28/08/2026",
    status: "Concluido",
    deliveryType: "Entrega",
    paymentMethod: "Dinheiro",
    total: 37.4,
    items: [
      { name: "Opcao principal", quantity: 1 },
      { name: "Bebida da casa", quantity: 1 },
    ],
  },
];
