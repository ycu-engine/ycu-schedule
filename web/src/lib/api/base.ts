import axios, { AxiosResponse } from "axios"
import { QueryObserverResult, useQuery } from "react-query"
import { ServiceEndpoint } from "~/info"
import { Course, MyCourse } from "~/model/cource"

export const apiBasePath: string =
  process.env.NODE_ENV === "production"
    ? ServiceEndpoint
    : "http://localhost:4000/dev"

export class API {
  static getCources(properties: {
    token: string
    week: number
    period: number
  }): QueryObserverResult<AxiosResponse<Course>, unknown> {
    return useQuery(["getCources", properties], () =>
      axios.get(`${apiBasePath}/cources`, { data: properties })
    )
  }

  static getCourcesByCode(properties: {
    token: string
    code: string
  }): QueryObserverResult<AxiosResponse<Course[]>, unknown> {
    return useQuery(["getCourcesByCode", properties], () =>
      axios.get(`${apiBasePath}/courceByCode`, { data: properties })
    )
  }

  static getMuCource(properties: {
    token: string
  }): QueryObserverResult<AxiosResponse<MyCourse>, unknown> {
    return useQuery(["getMuCource", properties], () =>
      axios.get(`${apiBasePath}/myCource`, { data: properties })
    )
  }
}
