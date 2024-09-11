import { animais } from './animais.js';

export function validarAnimal(animalTipo) {
  return Object.keys(animais).includes(animalTipo.toUpperCase());
}

export function validarQuantidade(quantidade) {
  return Number.isInteger(quantidade) && quantidade > 0;
}

export function encontrarRecintosViaveis(animalTipo, quantidade, recintos, animais) {
  const tipo = animalTipo.toUpperCase();
  const animal = animais[tipo];
  const resultados = [];

  recintos.forEach(recinto => {
    const biomas = recinto.bioma;
    const tamanhoTotal = recinto.tamanho;
    const tamanhoAnimal = animal.tamanho;
    const animaisNoRecinto = recinto.animais;

    // Verificar se o bioma é adequado
    if (!animal.biomas.some(bioma => biomas.includes(bioma))) {
      return;
    }

    // Verificar regras específicas para animais carnívoros
    if (tipo === 'LEAO' || tipo === 'LEOPARDO' || tipo === 'CROCODILO') {
      if (Object.keys(animaisNoRecinto).some(key => key !== tipo)) {
        return; // Animais carnívoros não podem compartilhar recinto com outras espécies
      }
    }

    // Calcular o espaço ocupado
    let espacoOcupado = quantidade * tamanhoAnimal;

    // Adicionar espaço extra se houver outras espécies no recinto
    if (Object.keys(animaisNoRecinto).length > 0) {
      espacoOcupado += 1;
    }

    const espacoLivre = tamanhoTotal - espacoOcupado;

    // Regras específicas para macacos
    if (tipo === 'MACACO') {
      if (quantidade > 1 || Object.keys(animaisNoRecinto).length > 0) {
        if (espacoLivre >= 0) {
          resultados.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${tamanhoTotal})`);
        }
      }
      return;
    }

    // Regras específicas para hipopótamos
    if (tipo === 'HIPOPOTAMO') {
      if (!biomas.includes('savana') || !biomas.includes('rio')) {
        return;
      }
    }

    // Regras específicas para crocodilos
    if (tipo === 'CROCODILO') {
      if (!biomas.includes('rio')) {
        return;
      }
    }

    // Regras específicas para leões
    if (tipo === 'LEAO') {
      if (Object.keys(animaisNoRecinto).some(key => key !== tipo)) {
        return;
      }
    }

    if (espacoLivre >= 0) {
      resultados.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${tamanhoTotal})`);
    }
  });

  // Verificar se há recintos viáveis e retornar o resultado adequado
  if (resultados.length === 0) {
    return { erro: "Não há recinto viável" };
  }

  return { recintosViaveis: resultados };
}
