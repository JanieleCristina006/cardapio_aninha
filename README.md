# Catalogo Online

Template de vitrine, cardapio e pedidos online para loja, restaurante, confeitaria, mercado ou outro negocio local.

O projeto usa React, Vite, Tailwind CSS e uma API REST com JWT. A parte administrativa fica fora deste frontend; este app foca no fluxo do cliente.

## Status atual

- Layout neutro para reaproveitar em varios tipos de negocio.
- Catalogo com categorias e produtos.
- Carrinho com controle de quantidade.
- Checkout em bottom sheet, com comportamento de app mobile.
- Login e cadastro de cliente usando API.
- Perfil do cliente com edicao em bottom sheet.
- Historico de pedidos no perfil.
- Fallback estatico para catalogo enquanto a API nao responde ou a loja nao esta configurada.

## API

A base da API esta configurada em `src/data/catalog.js`:

```js
export const apiConfig = {
  baseUrl: "https://mystore.vps10920.panel.icontainer.online",
  storeId: "ABC123",
};
```

Troque `storeId` pelo ID real da loja. A API exige esse valor no header `X-Store-ID` para produtos e pedidos.

## Fluxo do cliente

- Cadastro: `POST /api/v1/customers/register/`
- Login: `POST /api/v1/authentication/token/`
- Perfil: `GET /api/v1/customers/`
- Editar perfil: `PATCH /api/v1/customers/{id}/`
- Categorias: `GET /api/v1/categories/`
- Produtos: `GET /api/v1/products/`
- Criar pedido: `POST /api/v1/orders/`
- Historico: `GET /api/v1/orders/`

## Onde editar

- Configuracao da loja e API: `src/data/catalog.js`
- Requisicoes da API: `src/services/api.js`
- Home/catalogo: `src/pages/Home.jsx`
- Carrinho e checkout: `src/components/cart/CartDrawer.jsx`
- Perfil e historico: `src/pages/ProfileUser/PerfilUsuario.jsx`
- Edicao de perfil: `src/pages/ProfileUser/EditProfileModal.jsx`

## Rotas

- `/` - catalogo
- `/login` - login do cliente
- `/cadastrar` - cadastro do cliente
- `/perfil` - perfil e historico de pedidos

## Rodar localmente

```bash
npm install
npm run dev
```

O Vite normalmente abre em:

```txt
http://127.0.0.1:5173/
```

## Validar

```bash
npm run lint
npm run build
```

## Observacoes

- O projeto ainda mantem dados estaticos em `src/data/catalog.js` para visualizacao sem API.
- Produtos e pedidos reais dependem do `storeId` correto.
- Tokens JWT ficam no `localStorage`.
- O historico de pedidos vem da API quando o cliente esta autenticado.
