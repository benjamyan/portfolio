export default function getStoryblokComponentFields(blok) {
  const newBlok = { ...blok };
  for (const item in newBlok) {
    if (item.startsWith('_') || item === 'component') {
      delete newBlok[item];
    }
  }
  return newBlok;
}
