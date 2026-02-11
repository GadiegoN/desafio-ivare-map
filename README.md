# 🗺️ Desafio Técnico - Mapa de Locais

Aplicação web desenvolvida para o processo seletivo da IVARE.

O sistema permite visualizar um mapa interativo, buscar endereços, selecionar coordenadas e salvar locais personalizados com persistência.

---

## 🚀 Funcionalidades Implementadas

- ✅ Mapa iniciado em **Uberlândia - MG**
- ✅ Seleção de coordenadas ao clicar no mapa
- ✅ Exibição de latitude e longitude selecionadas
- ✅ Busca de endereço/local via API pública (Geocoding)
- ✅ Centralização automática do mapa ao selecionar resultado
- ✅ Salvamento de locais favoritos (Nome + Latitude + Longitude)
- ✅ Persistência em `localStorage`
- ✅ Listagem de locais salvos
- ✅ Centralização ao clicar em um local salvo
- ✅ Remoção de locais salvos
- ✅ Marcadores diferenciados (Selecionado vs Salvos)

---

## 🧠 Decisões Técnicas

- **React Leaflet + OpenStreetMap**  
  Utilizado para renderização do mapa sem necessidade de chave de API.

- **React Query (@tanstack/react-query)**  
  Gerenciamento de requisições, cache, loading e estados de erro (Geocoding e lista de locais).

- **Zustand**  
  Gerenciamento de estado global da aplicação (coordenadas selecionadas e estado de formulário).

- **localStorage**  
  Persistência simples para simular backend e manter favoritos após reload.

---

## 🧩 Tecnologias

- React (Vite + TypeScript)
- TailwindCSS
- React Query
- Zustand
- Leaflet / React Leaflet

---

## ▶️ Como rodar o projeto

```bash
 # instalar dependências
 npm install

 # rodar ambiente de desenvolvimento
 npm run dev
```

A aplicação será iniciada em:

```
 http://localhost:5173
```

---

## 📁 Estrutura Simplificada

```
src/
  components/
    map/
    places/
    search/
    ui/
  lib/
  store/
  types/
```
