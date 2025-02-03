export function highlightText(text: string, searchTerm: string) {
  if (!searchTerm.trim()) return text

  const regex = new RegExp(`(${searchTerm})`, "gi")
  return text.replace(regex, '<mark style="background-color: yellow;">$1</mark>')
}
