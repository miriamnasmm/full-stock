// Data store de productos y utilidades del carrito (localStorage)

const FEATURES = {
  polos: [
    'Estampado resistente que mantiene sus colores vibrantes lavado tras lavado.',
    'Hecho de algodón suave que asegura comodidad y frescura.',
    'Costuras reforzadas para una mayor durabilidad.',
    'Corte moderno que se adapta perfectamente al cuerpo.',
  ],
  tazas: [
    'Cerámica de alta calidad apta para microondas y lavavajillas.',
    'Capacidad de 350 ml, perfecta para tu café matutino.',
    'Estampado que resiste el lavado sin perder color.',
    'Asa ergonómica para un agarre cómodo.',
  ],
  stickers: [
    'Vinilo de alta calidad resistente al agua y rayones.',
    'Adhesivo fuerte que se pega en laptops, botellas y más.',
    'Impresión vibrante con acabado mate.',
    'Fácil de quitar sin dejar residuos.',
  ],
};

const PRODUCTS = {
  // Polos
  'polo-react':     { id: 'polo-react',     name: 'Polo React',                  price: 20.00, category: 'polos', image: 'images/polos/polo-react.png',     description: 'Viste tu pasión por React con estilo y comodidad en cada línea de código.' },
  'polo-js':        { id: 'polo-js',        name: 'Polo JavaScript',             price: 20.00, category: 'polos', image: 'images/polos/polo-js.png',        description: 'Deja que tu amor por JavaScript hable a través de cada hilo de este polo.' },
  'polo-node':      { id: 'polo-node',      name: 'Polo Node.js',                price: 20.00, category: 'polos', image: 'images/polos/polo-node.png',      description: 'Conéctate al estilo con este polo de Node.js, tan robusto como tu código.' },
  'polo-ts':        { id: 'polo-ts',        name: 'Polo TypeScript',             price: 20.00, category: 'polos', image: 'images/polos/polo-ts.png',        description: 'Tipa tu estilo con precisión: lleva tu pasión por TypeScript en cada hilo.' },
  'polo-backend':   { id: 'polo-backend',   name: 'Polo Backend Developer',      price: 25.00, category: 'polos', image: 'images/polos/polo-backend.png',   description: 'Domina el servidor con estilo: viste con orgullo tu título de Backend Developer.' },
  'polo-frontend':  { id: 'polo-frontend',  name: 'Polo Frontend Developer',     price: 25.00, category: 'polos', image: 'images/polos/polo-frontend.png',  description: 'Construye experiencias con estilo: luce con orgullo tu polo de Frontend Developer.' },
  'polo-fullstack': { id: 'polo-fullstack', name: 'Polo Full-Stack Developer',   price: 25.00, category: 'polos', image: 'images/polos/polo-fullstack.png', description: 'Domina ambos mundos con estilo: lleva tu título de FullStack Developer en cada línea de tu look.' },
  'polo-feature':   { id: 'polo-feature',   name: "Polo It's A Feature",         price: 15.00, category: 'polos', image: 'images/polos/polo-feature.png',   description: "Cuando el bug se convierte en arte: lleva con orgullo tu polo 'It's a feature'." },
  'polo-works':     { id: 'polo-works',     name: 'Polo It Works On My Machine', price: 15.00, category: 'polos', image: 'images/polos/polo-works.png',     description: "El clásico del desarrollador: presume tu confianza con 'It works on my machine'." },
  // Tazas
  'taza-js':        { id: 'taza-js',        name: 'Taza JavaScript', price: 14.99, category: 'tazas', image: 'images/tazas/taza-js.png',     description: 'Disfruta tu café mientras programas con el logo de JavaScript.' },
  'taza-react':     { id: 'taza-react',     name: 'Taza React',      price: 13.99, category: 'tazas', image: 'images/tazas/taza-react.png',  description: 'Una taza que hace render de tu bebida favorita con estilo React.' },
  'taza-git':       { id: 'taza-git',       name: 'Taza Git',        price: 12.99, category: 'tazas', image: 'images/tazas/taza-git.png',    description: 'Commit a tu rutina diaria de café con esta taza de Git.' },
  'taza-sql':       { id: 'taza-sql',       name: 'Taza SQL',        price: 15.99, category: 'tazas', image: 'images/tazas/taza-sql.png',    description: 'Tu amor por los lenguajes estructurados en una taza de SQL.' },
  'taza-linux':     { id: 'taza-linux',     name: 'Taza Linux',      price: 13.99, category: 'tazas', image: 'images/tazas/taza-linux.png',  description: 'Toma tu café con la libertad que solo Linux puede ofrecer.' },
  'taza-github':    { id: 'taza-github',    name: 'Taza GitHub',     price: 14.99, category: 'tazas', image: 'images/tazas/taza-github.png', description: 'Colabora con tu café en esta taza con el logo de GitHub.' },
  // Stickers
  'sticker-js':     { id: 'sticker-js',     name: 'Sticker JavaScript', price: 2.99, category: 'stickers', image: 'images/stickers/sticker-js.png',     description: 'Muestra tu amor por JavaScript con este elegante sticker clásico.' },
  'sticker-react':  { id: 'sticker-react',  name: 'Sticker React',      price: 2.49, category: 'stickers', image: 'images/stickers/sticker-react.png',  description: 'Decora tus dispositivos con el icónico átomo giratorio de React.' },
  'sticker-git':    { id: 'sticker-git',    name: 'Sticker Git',        price: 3.99, category: 'stickers', image: 'images/stickers/sticker-git.png',    description: 'Visualiza el poder del control de versiones con este sticker de Git.' },
  'sticker-docker': { id: 'sticker-docker', name: 'Sticker Docker',     price: 2.99, category: 'stickers', image: 'images/stickers/sticker-docker.png', description: 'La adorable ballena de Docker llevando contenedores en un sticker único.' },
  'sticker-linux':  { id: 'sticker-linux',  name: 'Sticker Linux',      price: 2.49, category: 'stickers', image: 'images/stickers/sticker-linux.png',  description: 'El querido pingüino Tux, mascota oficial de Linux, en formato sticker.' },
  'sticker-vscode': { id: 'sticker-vscode', name: 'Sticker VS Code',    price: 2.49, category: 'stickers', image: 'images/stickers/sticker-vscode.png', description: 'El elegante logo del editor favorito de los desarrolladores.' },
  'sticker-github': { id: 'sticker-github', name: 'Sticker GitHub',     price: 2.99, category: 'stickers', image: 'images/stickers/sticker-github.png', description: 'El alojamiento de repositorios más popular en un sticker de alta calidad.' },
  'sticker-html':   { id: 'sticker-html',   name: 'Sticker HTML',       price: 2.99, category: 'stickers', image: 'images/stickers/sticker-html.png',   description: 'El escudo naranja de HTML5, el lenguaje que estructura la web.' },
};

const CART_KEY = 'fullstock-cart';

const Cart = {
  get() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  },
  save(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  },
  add(productId, qty = 1) {
    const items = Cart.get();
    const existing = items.find((i) => i.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ id: productId, qty });
    }
    Cart.save(items);
  },
  remove(productId) {
    const items = Cart.get().filter((i) => i.id !== productId);
    Cart.save(items);
  },
  updateQty(productId, qty) {
    const items = Cart.get();
    const item = items.find((i) => i.id === productId);
    if (item) {
      item.qty = Math.max(1, qty);
      Cart.save(items);
    }
  },
  clear() {
    localStorage.removeItem(CART_KEY);
  },
  total() {
    return Cart.get().reduce((sum, item) => {
      const p = PRODUCTS[item.id];
      return p ? sum + p.price * item.qty : sum;
    }, 0);
  },
  count() {
    return Cart.get().reduce((sum, item) => sum + item.qty, 0);
  },
};

function formatPrice(n) {
  return 'S/ ' + n.toFixed(2);
}
