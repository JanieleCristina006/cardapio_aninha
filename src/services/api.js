import {
  ACCESS_TOKEN_STORAGE_KEY,
  apiConfig,
  defaultProfile,
  PROFILE_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
  SESSION_STORAGE_KEY,
  STORE_ID_STORAGE_KEY,
} from "../data/catalog";

const API_ROOT = `${apiConfig.baseUrl.replace(/\/+$/, "")}/api/v1`;

export function getStoreId() {
  return localStorage.getItem(STORE_ID_STORAGE_KEY) || apiConfig.storeId;
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
}

export function saveAuthTokens(tokens) {
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, tokens.access);
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, tokens.refresh);
  localStorage.setItem(SESSION_STORAGE_KEY, "api");
}

export function clearAuthSession() {
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

function getErrorMessage(data, fallback) {
  if (!data) return fallback;
  if (typeof data === "string") return data;
  if (data.detail) return data.detail;
  if (data.message) return data.message;

  const firstError = Object.values(data).flat().find(Boolean);
  if (firstError) return String(firstError);

  return fallback;
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (response.status === 204) return null;
  if (contentType.includes("application/json")) return response.json();

  return response.text();
}

async function request(
  path,
  { body, headers, method = "GET", ...options } = {},
  { auth = true, store = false } = {}
) {
  const requestHeaders = new Headers(headers);

  if (auth) {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("Faca login para continuar.");
    }

    requestHeaders.set("Authorization", `Bearer ${accessToken}`);
  }

  if (store) {
    requestHeaders.set("X-Store-ID", getStoreId());
  }

  if (body && !(body instanceof FormData) && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_ROOT}/${path.replace(/^\/+/, "")}`, {
    ...options,
    method,
    headers: requestHeaders,
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(data, "Nao foi possivel concluir a acao."));
  }

  return data;
}

function getResults(data) {
  if (Array.isArray(data)) return data;
  return data?.results || [];
}

function buildImageUrl(value) {
  if (!value) return "";
  if (String(value).startsWith("http")) return value;
  return `${apiConfig.baseUrl.replace(/\/+$/, "")}${value}`;
}

export function normalizeProfile(rawProfile) {
  if (!rawProfile) return defaultProfile;

  const firstName = rawProfile.first_name || rawProfile.user?.first_name || "";
  const lastName = rawProfile.last_name || rawProfile.user?.last_name || "";
  const fullName =
    rawProfile.name ||
    [firstName, lastName].filter(Boolean).join(" ") ||
    rawProfile.email ||
    rawProfile.user?.email ||
    defaultProfile.name;

  return {
    id: rawProfile.id || defaultProfile.id,
    email: rawProfile.email || rawProfile.user?.email || "",
    first_name: firstName,
    last_name: lastName,
    name: fullName,
    phone: rawProfile.telephone || rawProfile.phone || defaultProfile.phone,
    address: rawProfile.address || defaultProfile.address,
    house_number: rawProfile.house_number || defaultProfile.house_number,
    avatar_url: buildImageUrl(
      rawProfile.avatar_url || rawProfile.image_url || rawProfile.image
    ),
    points: rawProfile.coins ?? rawProfile.points ?? 0,
    coins: rawProfile.coins ?? rawProfile.points ?? 0,
    created_at: rawProfile.created_at || defaultProfile.created_at,
  };
}

export function normalizeCategory(rawCategory) {
  return {
    id: String(rawCategory.id),
    label: rawCategory.name || rawCategory.label || "Categoria",
    description: rawCategory.description || "",
  };
}

export function normalizeProduct(rawProduct) {
  const rawCategory = Array.isArray(rawProduct.category)
    ? rawProduct.category[0]
    : rawProduct.category;

  return {
    id: rawProduct.id,
    categoryId: rawCategory?.id ? String(rawCategory.id) : String(rawCategory || ""),
    name: rawProduct.name || "Produto",
    description: rawProduct.description || "",
    price: Number(rawProduct.price) || 0,
    stock: rawProduct.stock ?? null,
    image: buildImageUrl(
      rawProduct.image_url || rawProduct.avatar_url || rawProduct.image
    ),
  };
}

export function normalizeOrder(rawOrder) {
  const items = rawOrder.itens || rawOrder.items || [];

  return {
    id: rawOrder.code || rawOrder.id,
    apiId: rawOrder.id,
    date: rawOrder.created_at
      ? new Date(rawOrder.created_at).toLocaleDateString("pt-BR")
      : "-",
    status: rawOrder.status || "pendente",
    deliveryType: rawOrder.rate_delivery && Number(rawOrder.rate_delivery) > 0
      ? "Entrega"
      : "Retirada",
    paymentMethod: rawOrder.payment_method || "-",
    total: Number(rawOrder.total) || 0,
    items: items.map((item) => ({
      id: item.id,
      name: item.name || "Item",
      price: Number(item.price) || 0,
      image: item.image || item.image_url || "",
      quantity: item.quantity || item.qty || 1,
    })),
  };
}

export async function loginCustomer({ email, password }) {
  const tokens = await request(
    "authentication/token/",
    {
      method: "POST",
      body: { email, password },
    },
    { auth: false }
  );

  saveAuthTokens(tokens);
  return tokens;
}

export async function registerCustomer(form, image) {
  const formData = new FormData();
  formData.append("email", form.email);
  formData.append("password", form.password);
  formData.append("first_name", form.first_name);
  formData.append("last_name", form.last_name);

  if (form.telephone) formData.append("telephone", form.telephone);
  if (form.address) formData.append("address", form.address);
  if (form.house_number) formData.append("house_number", form.house_number);
  formData.append("coins", "0");
  if (image) formData.append("image", image);

  return request(
    "customers/register/",
    {
      method: "POST",
      body: formData,
    },
    { auth: false }
  );
}

export async function getCustomerProfile() {
  const data = await request("customers/");
  const profile = getResults(data)[0] || data;
  const normalizedProfile = normalizeProfile(profile);

  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(normalizedProfile));
  window.dispatchEvent(new Event("profile-updated"));

  return normalizedProfile;
}

export async function updateCustomerProfile(profileId, form, image) {
  const formData = new FormData();
  formData.append("first_name", form.first_name);
  formData.append("last_name", form.last_name);
  formData.append("telephone", form.phone);
  formData.append("address", form.address);
  formData.append("house_number", form.house_number);
  if (image) formData.append("image", image);

  const data = await request(`customers/${profileId}/`, {
    method: "PATCH",
    body: formData,
  });

  const normalizedProfile = normalizeProfile(data);
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(normalizedProfile));
  window.dispatchEvent(new Event("profile-updated"));

  return normalizedProfile;
}

export async function getCategories() {
  const params = new URLSearchParams({ store: getStoreId() });
  const data = await request(`categories/?${params.toString()}`);

  return getResults(data).map(normalizeCategory);
}

export async function getProducts(categoryId) {
  const params = new URLSearchParams();
  if (categoryId && categoryId !== "todos") params.set("category", categoryId);

  const suffix = params.toString() ? `?${params.toString()}` : "";
  const data = await request(`products/${suffix}`, undefined, { store: true });

  return getResults(data).map(normalizeProduct);
}

export async function createOrder(payload) {
  return request(
    "orders/",
    {
      method: "POST",
      body: payload,
    },
    { store: true }
  );
}

export async function getOrders() {
  const data = await request("orders/", undefined, { store: true });
  return getResults(data).map(normalizeOrder);
}
