import { animais } from './animais.js';
import { recintos } from './recintos.js';
import { validarAnimal, validarQuantidade, encontrarRecintosViaveis } from './utils.js';

class RecintosZoo {
  analisaRecintos(animalTipo, quantidade) {
    // Validar animal
    if (!validarAnimal(animalTipo)) {
      return { erro: 'Animal inválido' };
    }

    // Validar quantidade
    if (!validarQuantidade(quantidade)) {
      return { erro: 'Quantidade inválida' };
    }

    // Encontrar recintos viáveis
    const resultados = encontrarRecintosViaveis(animalTipo, quantidade, recintos, animais);
    
    // Verificar se existem recintos viáveis
    if (resultados.length === 0) {
      return { erro: 'Não há recinto viável' };
    }

    return { recintosViaveis: resultados };
  }
}

export default RecintosZoo;
export { RecintosZoo as RecintosZoo };
