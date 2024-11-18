export let produtosList = [];

// URL base para chamadas à API
const BASE_URL = "https://script.google.com/macros/s/::ID/exec";

/**
 * Função para buscar dados de uma planilha.
 * @param {string} sheet_id - ID da planilha.
 * @param {string} sheetName - Nome da aba na planilha.
 * @param {string} [uuid] - Identificador opcional para buscar um registro específico.
 * @returns {Promise<{success: boolean, message: string}>} - Resultado da operação.
 */
export async function getAPI(sheet_id, sheetName, uuid = "") {
  if (!sheet_id || !sheetName) {
    console.error("sheet_id e sheetName são obrigatórios.");
    return { success: false, message: "Parâmetros inválidos." };
  }

  try {
    const URL = BASE_URL.replace("::ID", sheet_id);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      sheetName,
      type: "ser",
      uuid,
    });

    const requestOptions = {
      method: "POST",
      headers,
      body: raw,
    };

    const response = await fetch(URL, requestOptions);
    const data = await response.json();

    if (data.statuscode === 200) {
      produtosList = data.data;

      return { success: true, message: "Dados obtidos com sucesso." };
    }

    return { success: false, message: `Erro na API: ${data.message || "Desconhecido."}` };
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return { success: false, message: "Erro ao buscar dados da API." };
  }
}

/**
 * Função para inserir ou atualizar dados na planilha.
 * @param {string} sheet_id - ID da planilha.
 * @param {string} sheetName - Nome da aba na planilha.
 * @param {Object} newValues - Novos valores a serem inseridos/atualizados.
 * @param {Array} columnsUpd - Colunas a serem atualizadas.
 * @param {string} [uuid] - Identificador do registro (vazio para inserção).
 * @returns {Promise<{success: boolean, uuid?: string, message: string}>} - Resultado da operação.
 */
export async function ins_updAPI(sheet_id, sheetName, newValues, columnsUpd, type, uuid = "") {
  if (!sheet_id || !sheetName || !newValues) {
    console.error("Parâmetros obrigatórios não fornecidos.");
    return { success: false, message: "Parâmetros inválidos." };
  }

  try {
    const URL = BASE_URL.replace("::ID", sheet_id);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      sheetName,
      type,
      uuid,
      newValues,
      columnsUpd,
    });

    const requestOptions = {
      method: "POST",
      headers,
      body: raw,
    };

    const response = await fetch(URL, requestOptions);
    const data = await response.json();

    if (data.statuscode === 204) {
      return { success: true, message: "Operação concluída com sucesso." };
    } else if (data.statuscode === 200) {
      return { success: true, uuid: data.uuid, message: "Registro atualizado com sucesso." };
    }

    return { success: false, message: `Erro na API: ${data.message || "Desconhecido."}` };
  } catch (error) {
    console.error("Erro ao inserir/atualizar dados:", error);
    return { success: false, message: "Erro ao inserir/atualizar dados da API." };
  }
}

/**
 * Função para buscar dados de uma planilha.
 * @param {string} sheet_id - ID da planilha.
 * @param {string} sheetName - Nome da aba na planilha.
 * @param {string} [uuid] - Identificador opcional para buscar um registro específico.
 * @returns {Promise<{success: boolean, message: string}>} - Resultado da operação.
 */
export async function delAPI(sheet_id, sheetName, uuid) {
  if (!sheet_id || !sheetName || !uuid) {
    console.error("sheet_id, sheetName e uuid são obrigatórios.");
    return { success: false, message: "Parâmetros inválidos." };
  }

  try {
    const URL = BASE_URL.replace("::ID", sheet_id);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      sheetName,
      type: "del",
      uuid,
    });

    const requestOptions = {
      method: "POST",
      headers,
      body: raw,
    };

    const response = await fetch(URL, requestOptions);
    const data = await response.json();
    if (data.statucode === 204) { return { success: true, message: "Operação concluída com sucesso." }; }

    return { success: false, message: `Erro na API: ${data.message || "Desconhecido."}` };
  } catch (error) {
    console.error("Erro ao deletar os dados:", error);
    return { success: false, message: "Erro ao deletar os dados da API." };
  }
}