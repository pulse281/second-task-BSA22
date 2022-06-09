import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
  
  // todo: show fighter info (image, name, health, etc.)
  if (fighter) {
    const imageElement = createFighterImage(fighter);
    fighterElement.append(imageElement);

    const infoElement = createFighterInfo(fighter);
    fighterElement.append(infoElement);
  }

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}

export function createFighterInfo(fighter) {
    const { name, attack, defense, health } = fighter;
    const infoElement = createElement({
      tagName: 'ul',
      className: 'fighter-preview___info-block',
    });

    infoElement.innerHTML = (
        `<li fighter-preview___info-item>name: ${name}</li>
        <li fighter-preview___info-item>atack: ${attack}</li>
        <li fighter-preview___info-item>defense: ${defense}</li>
        <li fighter-preview___info-item>health: ${health}</li>`
    );
  
    return infoElement;
  }
  
