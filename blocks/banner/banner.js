export default function decorate(block) {
  const [imageRow, contentRow] = [...block.children];

  // imagen de fondo (fila 1, opcional)
  if (imageRow) {
    const picture = imageRow.querySelector('picture');
    if (picture) {
      picture.classList.add('banner-background');
      block.prepend(picture);
      imageRow.remove();
    }
  }

  // contenido: título, subtítulo, botón CTA (fila 2)
  if (contentRow) {
    const content = document.createElement('div');
    content.classList.add('banner-content');

    [...contentRow.children].forEach((cell) => {
      const link = cell.querySelector('a');
      if (link && cell.children.length === 1 && cell.textContent.trim() === link.textContent.trim()) {
        // celda con solo un enlace → botón CTA
        link.classList.add('button');
        const cta = document.createElement('div');
        cta.classList.add('banner-cta');
        cta.append(link);
        content.append(cta);
      } else {
        content.append(cell);
      }
    });

    block.replaceChildren(...[...block.children].filter((c) => c.classList.contains('banner-background') || c === contentRow));
    if (block.querySelector('.banner-background')) {
      block.querySelector('.banner-background').after(content);
    } else {
      block.append(content);
    }
    contentRow.remove();
  }
}
