/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNews = /* GraphQL */ `
  mutation CreateNews(
    $input: CreateNewsInput!
    $condition: ModelNewsConditionInput
  ) {
    createNews(input: $input, condition: $condition) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const updateNews = /* GraphQL */ `
  mutation UpdateNews(
    $input: UpdateNewsInput!
    $condition: ModelNewsConditionInput
  ) {
    updateNews(input: $input, condition: $condition) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const deleteNews = /* GraphQL */ `
  mutation DeleteNews(
    $input: DeleteNewsInput!
    $condition: ModelNewsConditionInput
  ) {
    deleteNews(input: $input, condition: $condition) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const createStudentProfile = /* GraphQL */ `
  mutation CreateStudentProfile(
    $input: CreateStudentProfileInput!
    $condition: ModelStudentProfileConditionInput
  ) {
    createStudentProfile(input: $input, condition: $condition) {
      owner
      weeks
      periods
      createdAt
      updatedAt
    }
  }
`;
export const updateStudentProfile = /* GraphQL */ `
  mutation UpdateStudentProfile(
    $input: UpdateStudentProfileInput!
    $condition: ModelStudentProfileConditionInput
  ) {
    updateStudentProfile(input: $input, condition: $condition) {
      owner
      weeks
      periods
      createdAt
      updatedAt
    }
  }
`;
export const deleteStudentProfile = /* GraphQL */ `
  mutation DeleteStudentProfile(
    $input: DeleteStudentProfileInput!
    $condition: ModelStudentProfileConditionInput
  ) {
    deleteStudentProfile(input: $input, condition: $condition) {
      owner
      weeks
      periods
      createdAt
      updatedAt
    }
  }
`;
