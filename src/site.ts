export const SITE = {
  title: 'sabfodel',
  // Sekme başlığında ve paylaşım kartlarında görünen satır.
  tagline: 'Physics, built from first principles.',
  description:
    'Physics undergraduate building simulators from first principles — general relativity, N-body dynamics, quantum circuits — and heading toward quantum computation.',
  author: 'sabfodel',
  lang: 'en',
  github: 'https://github.com/sabfodel',
  // Fotoğraf hesabı — /photos/ sayfasında ve alt bilgide görünür
  instagram: 'https://instagram.com/sabsabfo',
  instagramHandle: '@sabsabfo',
  // TODO: LinkedIn profilini açınca buraya ekle; alt bilgi ve /about/ otomatik gösterir.
  linkedin: '',
  // TODO: CV PDF'ini public/cv.pdf olarak koyunca '/cv.pdf' yaz.
  cv: '',
};

/** Ana menü — portfolyonun yüzü. */
export const NAV = [
  { href: '/projects/', label: 'work' },
  { href: '/lab/',      label: 'lab' },
  { href: '/notes/',    label: 'notes' },
  { href: '/about/',    label: 'about' },
];

/** Fizik dışı bölümler — yalnızca alt bilgide durur. */
export const OFF_THE_CLOCK = [
  { href: '/photos/',   label: 'photos' },
  { href: '/reading/',  label: 'reading' },
  { href: '/practice/', label: 'practice' },
  { href: '/journal/',  label: 'journal' },
  { href: '/uses/',     label: 'uses' },
];
