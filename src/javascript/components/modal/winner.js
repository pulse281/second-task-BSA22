import { showModal } from './modal';
import { createElement } from '../../helpers/domHelper';
import { createFighterImage } from '../fighterPreview'

export function showWinnerModal(fighter) {
/* const elem = createElement({ tagName: 'div', className: 'modal-body'})
const img = createFighterImage(fighter);
elem.append(img); */
  // call showModal function 
  const title = `Winner - ${fighter.name}`;
  showModal({title});

}
