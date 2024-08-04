import { AxiosError, isAxiosError } from "axios"
import { version } from "chai"
import { HttpResponseError } from "../../models/errors/http-response.error"
import { FetchMlOptionsModel } from "../../models/fetch-ml-options.model"
import {
  getAppConfigValue,
  setAppConfig,
} from "../../repository/app-config.repository"
import { httpGet, httpPost } from "../httpLayer/fetch-ml.httpLayer"
import authMlService from "./auth.ml.service"

const base_url = "https://api.mercadolibre.com"
const fetchMl = async (url: string, options: FetchMlOptionsModel = {}) => {
  const { data, method, userId }: FetchMlOptionsModel = options
  if (!userId) throw new Error("userId is required")
  const retry = 3
  let counter = 0
  let dataResponse
  while (counter < retry) {
    try {
      const userAccessToken = await _getAppConfigValueFromKey(
        userId,
        "access_token"
      )
      const headers = options.headers
      const optionsWithAuthorization = {
        Authorization: `Bearer ${userAccessToken}`,
        ...headers,
      }
      console.log(userAccessToken)
      const result =
        method === "POST" || data != null
          ? await httpPost(`${base_url}${url}`, data, optionsWithAuthorization)
          : await httpGet(`${base_url}${url}`, optionsWithAuthorization)
      setAppConfig({
        domain: userId,
        key: "refresh_token_ttl",
        value: 3,
      })
      return result
    } catch (e) {
      if (!isAxiosError(e) || !e?.response) return JSON.stringify(e)
      /** Tenho que verificar se o código é 401 e sse tem "messagem":invalid access token. Só assim podera entrar nesse escope abaixo.
       * Agora mesmo tudo entr e está causando erro
       */
      dataResponse = e.response && e.response?.data
      console.log("ERRR", dataResponse)
      const invalidTokenMessage = ["invalid_token", "mlauth: invalid token"]
      if (invalidTokenMessage.includes(dataResponse?.message)) {
        console.log("is axios", userId)
        const refreshTokenTtl = await _getAppConfigValueFromKey(
          userId,
          "refresh_token_ttl"
        )
        console.log(" ", refreshTokenTtl)
        console.log(typeof refreshTokenTtl)
        if ((refreshTokenTtl as number) < 1) return
        const refreshToken = await _getAppConfigValueFromKey(
          userId,
          "refresh_token"
        )
        console.log("refreshToken", refreshToken)
        await authMlService.reAuthentication(refreshToken)
      }
      counter++
    }
  }
  return dataResponse
}

const _getAppConfigValueFromKey = async (userId: string, key: string) => {
  const value = await getAppConfigValue({
    domain: userId,
    key,
  })
  return value
}

export { fetchMl }
