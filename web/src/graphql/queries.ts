/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNews = /* GraphQL */ `
  query GetNews($id: ID!) {
    getNews(id: $id) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const listNewss = /* GraphQL */ `
  query ListNewss(
    $filter: ModelNewsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNewss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStudentProfile = /* GraphQL */ `
  query GetStudentProfile($owner: String!) {
    getStudentProfile(owner: $owner) {
      owner
      weeks
      periods
      createdAt
      updatedAt
    }
  }
`;
export const listStudentProfiles = /* GraphQL */ `
  query ListStudentProfiles(
    $owner: String
    $filter: ModelStudentProfileFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listStudentProfiles(
      owner: $owner
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        owner
        weeks
        periods
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
