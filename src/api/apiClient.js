import { API_BASE_URL } from "../config/constants"

/**
 * Cliente API base para realizar solicitudes HTTP
 * Centraliza la lógica de comunicación con el backend .NET
 */
class ApiClient {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  /**
   * Método para realizar solicitudes GET
   * @param {string} endpoint - Ruta del endpoint
   * @param {Object} params - Parámetros de consulta
   * @returns {Promise<any>} - Respuesta del servidor
   */
  async get(endpoint, params = {}) {
    const url = this._buildUrl(endpoint, params)

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: this._getHeaders(),
      })

      return this._handleResponse(response)
    } catch (error) {
      return this._handleError(error)
    }
  }

  /**
   * Método para realizar solicitudes POST
   * @param {string} endpoint - Ruta del endpoint
   * @param {Object} data - Datos a enviar
   * @returns {Promise<any>} - Respuesta del servidor
   */
  async post(endpoint, data = {}) {
    const url = this._buildUrl(endpoint)

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: this._getHeaders(),
        body: JSON.stringify(data),
      })

      return this._handleResponse(response)
    } catch (error) {
      return this._handleError(error)
    }
  }

  /**
   * Método para realizar solicitudes PUT
   * @param {string} endpoint - Ruta del endpoint
   * @param {Object} data - Datos a enviar
   * @returns {Promise<any>} - Respuesta del servidor
   */
  async put(endpoint, data = {}) {
    const url = this._buildUrl(endpoint)

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: this._getHeaders(),
        body: JSON.stringify(data),
      })

      return this._handleResponse(response)
    } catch (error) {
      return this._handleError(error)
    }
  }

  /**
   * Método para realizar solicitudes DELETE
   * @param {string} endpoint - Ruta del endpoint
   * @returns {Promise<any>} - Respuesta del servidor
   */
  async delete(endpoint) {
    const url = this._buildUrl(endpoint)

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: this._getHeaders(),
      })

      return this._handleResponse(response)
    } catch (error) {
      return this._handleError(error)
    }
  }

  /**
   * Construye la URL completa con parámetros
   * @private
   */
  _buildUrl(endpoint, params = {}) {
    const url = new URL(`${this.baseUrl}${endpoint}`)

    Object.keys(params).forEach((key) => {
      url.searchParams.append(key, params[key])
    })

    return url.toString()
  }

  /**
   * Obtiene los headers para las solicitudes
   * @private
   */
  _getHeaders() {
    // Aquí puedes agregar el token de autenticación cuando implementes auth
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  }

  /**
   * Maneja la respuesta del servidor
   * @private
   */
  async _handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw {
        status: response.status,
        statusText: response.statusText,
        data: errorData,
      }
    }

    return response.json()
  }

  /**
   * Maneja los errores de red
   * @private
   */
  _handleError(error) {
    console.error("API Error:", error)
    throw {
      status: 0,
      statusText: "Network Error",
      data: { message: "Error de conexión con el servidor" },
    }
  }
}

// Exportamos una instancia única (singleton)
export default new ApiClient()

